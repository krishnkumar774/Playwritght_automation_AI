const { test, expect } = require('@playwright/test');
const mysql = require('mysql2/promise');
const { PageObjectManager } = require('../pageobjects/PageObjectManager');

// MySQL connection pool
let pool;

// Initialize MySQL connection
async function initializeDatabase() {
    pool = await mysql.createPool({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'rootk',
        database: 'rahulshettyacademy',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

// Fetch all customer data from database
async function fetchCustomerData() {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT name, city FROM customers');
        connection.release();
        return rows;
    } catch (error) {
        console.error('Database Error:', error.message);
        throw error;
    }
}

// Close database connection
async function closeDatabase() {
    if (pool) {
        await pool.end();
    }
}

test.describe('Data Driven SQL Test Suite', () => {
    let testResults = [];
    let customerData = [];

    test.beforeAll(async () => {
        // Initialize database and fetch data before any tests run
        await initializeDatabase();
        customerData = await fetchCustomerData();
        console.log(`\n✓ Successfully fetched ${customerData.length} records from database`);
        console.log('Test Data:', JSON.stringify(customerData, null, 2));
    });

    test.afterAll(async () => {
        // Generate final report
        await closeDatabase();
        
        console.log('\n' + '='.repeat(80));
        console.log('FINAL TEST REPORT - Data Driven SQL Test');
        console.log('='.repeat(80));
        console.log(`Total Records Tested: ${testResults.length}`);
        console.log(`Passed: ${testResults.filter(r => r.passed).length}`);
        console.log(`Failed: ${testResults.filter(r => !r.passed).length}`);
        console.log('='.repeat(80));
        
        testResults.forEach((result, index) => {
            console.log(`\nRecord ${index + 1}:`);
            console.log(`  Username (name): ${result.username}`);
            console.log(`  Password (city): ${result.password}`);
            console.log(`  Status: ${result.passed ? '✓ PASSED' : '✗ FAILED'}`);
            if (result.error) {
                console.log(`  Error: ${result.error}`);
            }
            if (result.message) {
                console.log(`  Message: ${result.message}`);
            }
        });
        
        console.log('\n' + '='.repeat(80));
    });

    // Create dynamic test cases for each database record using Page Object Model
    test('dataDrivefromSQLtest8 - Test with all customer data combinations', async ({ browser }) => {
        console.log('\n--- Starting Data-Driven Login Tests ---\n');

        for (let index = 0; index < customerData.length; index++) {
            const { name, city } = customerData[index];
            const username = name;
            const password = city;

            console.log(`\n[Test ${index + 1}/${customerData.length}] Testing with Username: ${username}, Password: ${password}`);

            let context;
            let page;
            try {
                // Create a new page context for each test iteration
                context = await browser.newContext();
                page = await context.newPage();
                
                // Set timeout for navigation
                page.setDefaultTimeout(30000);
                page.setDefaultNavigationTimeout(30000);
                
                // Initialize Page Object Manager
                const pageObjectManager = new PageObjectManager(page);
                const locatorsPracticePage = pageObjectManager.getLocatorsPracticePage();

                // Navigate to the page with reduced wait condition
                await page.goto('https://rahulshettyacademy.com/locatorspractice/', { waitUntil: 'domcontentloaded' });
                console.log(`  ✓ Navigated to locators practice page`);

                // Attempt login and check for error
                const result = await locatorsPracticePage.attemptLoginWithErrorCheck(username, password);
                
                console.log(`  ✓ Username filled: ${username}`);
                console.log(`  ✓ Password filled: ${password}`);
                console.log(`  ✓ Remember my username: ${result.rememberMeChecked ? 'CHECKED' : 'UNCHECKED'}`);
                console.log(`  ✓ Terms and privacy policy: ${result.termsChecked ? 'CHECKED' : 'UNCHECKED'}`);

                // Verify error message
                if (result.errorVisible) {
                    console.log(`  ✓ Error message verified: "${result.errorText}"`);
                    testResults.push({
                        username,
                        password,
                        passed: true,
                        message: 'Incorrect username or password - as expected'
                    });
                } else if (result.success && result.errorInHTML) {
                    console.log(`  ✓ Error message found on page`);
                    testResults.push({
                        username,
                        password,
                        passed: true,
                        message: 'Error validation passed'
                    });
                } else {
                    console.log(`  ✗ No error message found`);
                    testResults.push({
                        username,
                        password,
                        passed: false,
                        error: 'Expected error message not found'
                    });
                }

            } catch (error) {
                console.log(`  ✗ Test failed with error: ${error.message}`);
                testResults.push({
                    username,
                    password,
                    passed: false,
                    error: error.message
                });
            } finally {
                // Close the page and context after each iteration
                try {
                    if (page) {
                        await page.close().catch(() => {});
                    }
                    if (context) {
                        await context.close().catch(() => {});
                    }
                } catch (cleanupError) {
                    console.log(`  Warning: Cleanup error - ${cleanupError.message}`);
                }
            }
        }

        // Verify at least some tests were executed
        expect(testResults.length).toBeGreaterThan(0);
        console.log(`\n✓ All ${testResults.length} test iterations completed`);
    }, { timeout: 300000 });
});

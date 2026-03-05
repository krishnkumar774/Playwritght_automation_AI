const {test, expect} = require('@playwright/test');
const { title } = require('node:process');

/*test.only('first test',  async({page}) => {
    await page.goto('https://www.google.com/');
}) */

test('first test',  async({page}) => {
    await page.goto('https://www.google.com/');
    console.log(await page.title());
    expect(await page.title()).toBe('Google');
})

test('second test',  async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/');
   console.log(await page.title());
   // actual title doesn't include a trailing "1"
   expect(await page.title()).toBe('Rahul Shetty Academy');
})

test('Browser context-validating Error login',  async({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const signIn = page.locator('#signInBtn');
    await userName.fill('rahulshettyacademy');
    await passWord.fill('learning');
    await signIn.click();
    const errorText = await page.locator("[style*='block']").textContent();
    console.log(errorText);
    // the message begins with "Old" (capital O) so use the proper case
    await expect(errorText).toContain('Old password "learning" is no longer valid. Please use the new password "Learning@830$3mK2".');
    await passWord.fill(''); // to wipe the previous password before filling the new one
    await passWord.fill('Learning@830$3mK2');
    await signIn.click();

   /*console.log(await (page.locator('.card-body a').first().textContent()));
   console.log(await (page.locator('.card-body a').last().textContent()));
   console.log(await (page.locator('.card-body a').nth(0)).textContent()); */

   //await page.waitForLoadState('networkidle');
   await page.locator('.card-body a').first().waitFor();
   console.log(await page.locator('.card-body a').allTextContents()); 
   // allTextContents this will not wait for element so we need to use waitForLoadState to wait for the page to load completely before fetching the text contents of the elements.

})

test('Ui dropdown radio checkbox',  async({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const radioButton = page.locator('.radiotextsty');
    const checkBox = page.locator('#terms');
    await userName.fill('rahulshettyacademy');
    await passWord.fill('Learning@830$3mK2');
    await radioButton.nth(1).click();
    expect(radioButton.nth(1)).toBeChecked();
    expect(radioButton.nth(0)).not.toBeChecked();
    await page.locator('.btn-success').click(); //for pop up
    await page.locator('select.form-control').selectOption('Teacher');
    await checkBox.check();
    await checkBox.uncheck();
    expect(checkBox).not.toBeChecked();
    // check the blink link is visible and has the correct href attribute
    const blinklink =page.locator('[href*="documents-request"]');
    await expect(blinklink).toBeVisible();
    // to check if the link has the class "blinkingText"
    await expect(blinklink).toHaveAttribute('class', 'blinkingText'); 
    expect(await page.title()).toBe('LoginPage Practise |Rahul Shetty Academy');
// delected .only / this is just for test
})

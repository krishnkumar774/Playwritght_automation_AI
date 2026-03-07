const {test, expect} = require('@playwright/test');
const {LoginPage} =require('../pageobjects/LoginPage');

test('Ui dropdown radio checkbox',  async({page}) => {
    const userName = 'rahulshettyacademy';
    const passWord = 'learning';
    const loginPage = new LoginPage(page);
    await loginPage.gotoUrl(page);
    await loginPage.login('userName','passWord');
    await loginPage.radioButton.nth(1).click();
    expect(loginPage.radioButton.nth(1)).toBeChecked();
    expect(loginPage.radioButton.nth(0)).not.toBeChecked();
    await loginPage.popup.click(); //for pop up
    await loginPage.dropdown.selectOption('Teacher');
    await loginPage.checkBox.check();
    await loginPage.checkBox.uncheck();
    expect(loginPage.checkBox).not.toBeChecked();
    await expect(loginPage.blinklink).toBeVisible();
    await expect(loginPage.blinklink).toHaveAttribute('class', 'blinkingText'); 
    expect(await page.title()).toBe('LoginPage Practise | Rahul Shetty Academy');
    
    await loginPage.childWindowBlinkTest();




})
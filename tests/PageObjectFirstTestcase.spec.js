const {test, expect} = require('@playwright/test');
//const {LoginPage} =require('../pageobjects/LoginPage');
//const {DocumentPage} =require('../pageobjects/DocumentPage');
const {PageObjectManager} =require('../pageobjects/PageObjectManager');

test('Ui dropdown radio checkbox',  async({page}) => {
    const pageObjectManager = new PageObjectManager(page);
    const username = 'rahulshettyacademy';
    const password = 'learning';
    const loginPage = pageObjectManager.getLoginPage();
    const documentPage = pageObjectManager.getDocumentPage();
    await loginPage.gotoUrl(page);
    await loginPage.login(username,password);
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
    
    await documentPage.redMessage();
    await documentPage.mainpageLoin(username,password);

})
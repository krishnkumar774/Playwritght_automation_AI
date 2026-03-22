const {test, expect} = require('@playwright/test');
//const {LoginPage} =require('../pageobjects/LoginPage');
//const {DocumentPage} =require('../pageobjects/DocumentPage');
const {PageObjectManager} =require('../pageobjects/PageObjectManager');
//jason -> string -> js object 
const dataSet=JSON.parse(JSON.stringify(require('../utils/PageobjectTestData.json')));

test('@web Ui dropdown radio checkbox',  async({page}) => {
    const pageObjectManager = new PageObjectManager(page);
    const loginPage = pageObjectManager.getLoginPage();
    const documentPage = pageObjectManager.getDocumentPage();
    await loginPage.gotoUrl(page);
    await loginPage.login(dataSet.username, dataSet.password);
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
    await documentPage.mainpageLogin(dataSet.username,dataSet.password);

//test file will trigger parallel
//individual test in the file will run in  sequentially
})
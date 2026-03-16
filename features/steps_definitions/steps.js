const { When, Then ,Given } = require('@cucumber/cucumber');
const {PageObjectManager} =require('../../pageobjects/PageObjectManager');
const {expect} = require('@playwright/test');
const playwright = require('playwright/test');


         Given('on the login page  entered the {string} and {string}',{timeout: 300*1000}, async function (username, password ) {
           // Write code here that turns the phrase above into concrete actions
            const browser = await playwright.chromium.launch();
            const context = await browser.newContext();
            const page = await context.newPage();

            this.pageObjectManager = new PageObjectManager(page);
            this.loginPage = this.pageObjectManager.getLoginPage();
            this.documentPage = this.pageObjectManager.getDocumentPage();
            await this.loginPage.gotoUrl(page);
            await this.loginPage.login(username,password);
         });

         When('enter username and password and click on login button',{timeout: 1000*1000}, async function () {     
           // Write code here that turns the phrase above into concrete actions
           await this.loginPage.dropdown.selectOption('Teacher');
           await this.loginPage.checkBox.check();
         });

         Then('verify the title og the page  and dropdown and radio button and checkbox should be selected and click on submit button',{timeout: 1000*1000}, async function () {
            expect(this.loginPage.checkBox).toBeChecked();
            await expect(this.loginPage.blinklink).toBeVisible();
            await expect(this.loginPage.blinklink).toHaveAttribute('class', 'blinkingText'); 
         });

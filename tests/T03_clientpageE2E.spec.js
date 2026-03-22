
const {test, expect, selectors} = require('@playwright/test');

test('@Webst Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const password = "Iamking@000";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   const dropdown1 = page.locator('select.input').first();
   const dropdown2 = page.locator('select.input').last();
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill(password);
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); 
   //h3:has-text('ZARA COAT 3')- play`wright selector, it will find the h3 element that contains the text 'ZARA COAT 3'
   console.log(bool);
   expect(bool).toBeTruthy();
   await page.locator("button[type='button']").nth('1').click();
   await page.locator ("[placeholder*='Country']").pressSequentially("ind");
   await page.locator(".ta-results").waitFor();
   const dropdownOptions = page.locator(".ta-results button");
   const count1 = await dropdownOptions.count();
   for(let i=0; i<count1; ++i){
      if(await dropdownOptions.nth(i).textContent() === " India"){
         await dropdownOptions.nth(i).click();
         break;
      }}
   await expect(page.locator(".user__name [type='text']").nth(0)).toHaveText(email);
   await page.locator(".input.txt.text-validated").nth(0).fill("1234567890");
   await dropdown1.selectOption('04');
   await dropdown2.selectOption('10');
   await page.locator(".form__cc div .field.small .input.txt").nth(0).fill("5544");
   await page.locator("[name='coupon']").fill("anshika kumar");
   await page.locator(".action__submit").click();
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
})
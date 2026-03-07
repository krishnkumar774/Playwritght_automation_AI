const {test, expect} = require('@playwright/test');
const { title } = require('node:process');

test('Ui dropdown radio checkbox',  async({page}) => {

    const context = page.context();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const passWord = page.locator("[type='password']");
    const radioButton = page.locator('.radiotextsty');
    const checkBox = page.locator('#terms');
    const signIn = page.locator('#signInBtn');
    await userName.fill('rahulshettyacademy');
    await passWord.fill('learning');
    await signIn.click();
    const errorText = await page.locator("[style*='block']").textContent();
    console.log(errorText);
    await userName.fill('rahulshettyacademy');
    await passWord.fill('Learning@830$3mK2');
    await radioButton.nth(1).click();
    await expect(radioButton.nth(1)).toBeChecked();
    await expect(radioButton.nth(0)).not.toBeChecked();
    await page.locator('.btn-success').click(); //for pop up
    await page.locator('select.form-control').selectOption('Teacher');
    await checkBox.check();
    await checkBox.uncheck();
    await expect(checkBox).not.toBeChecked();
    
    const blinklink =page.locator('[href*="documents-request"]');
    await expect(blinklink).toBeVisible();
    await expect(blinklink).toHaveAttribute('class', 'blinkingText'); 
    const [newPage] = await Promise.all(
    [
    context.waitForEvent('page'), 
    blinklink.click(), 
    ]);

    const text=await newPage.locator('.red').textContent(); 
    await expect(text).toContain('mentor@rahulshettyacademy.com');
    const userid = text.split('@')[0].split(' ')[1];
    console.log(userid);

    await page.locator('#username').fill(userid); 
    await page.pause();
    await passWord.fill('Learning@830$3mK2');
    await signIn.click();
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await page.waitForLoadState('networkidle');
    console.log(await page.locator('.card-body a').allTextContents());
  
});


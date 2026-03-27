const { test, expect } = require('@playwright/test');

test("TC07_FrameAndAlertAndMouseOver", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("[value='Hide']").click();
    expect(await page.locator("#displayed-text")).toBeHidden();
    await page.locator("[value='Show']").click();
    expect(await page.locator("#displayed-text")).toBeVisible();
    const mouseHover = page.locator("#mousehover");
    await page.on("dialog", dialog => dialog.accept()); //to handelp tha alert pop up 
    //page.on("dialog", dialog=> dialog.dismiss());
    await mouseHover.hover();
    await page.locator("a:has-text('Top')").click();
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("a[href='learning-path']:visible").click();


});


test("Screenhotor off page", async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.screenshot({path: 'screenshot.png'});
    await page.locator("#mousehover").hover();
    await page.locator("#mousehover").screenshot({path: 'scree.png'});
});
    
test.only("Visual testing ", async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

        
})


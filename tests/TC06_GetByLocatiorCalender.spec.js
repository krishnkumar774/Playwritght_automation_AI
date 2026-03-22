const { test, expect } = require('@playwright/test');
const { link } = require("node:fs");

test('TC06_GetByLocatorCalender', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.locator("[name='name']").first().fill("anshika");
    await page.locator("[name='email']").fill("anshika@gmail.com");
    await page.getByPlaceholder("Password").fill("Iamking@000");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Student").check();
    expect(await page.getByText("Entrepreneur (disabled)").isDisabled()).toBe(true);
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible();
    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: 'Blackberry' }).getByText("Add").click();
    await page.locator(".nav-link.btn.btn-primary").click();
    // await page.getByRole("link", {name:'Checkout ( 1 )' }).click();
})  
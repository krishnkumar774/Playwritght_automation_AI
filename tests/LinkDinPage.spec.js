import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww.linkedin.com%2Ffeed%2F');
  await page.getByRole('textbox', { name: 'Email or phone' }).click();
  await page.getByRole('textbox', { name: 'Email or phone' }).click();
  await page.getByRole('textbox', { name: 'Email or phone' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('iframe[title="Sign in with Google Button"]').contentFrame().getByRole('button', { name: 'Continue with Google. Opens' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('textbox', { name: 'Email or phone' }).click();
  await page1.getByRole('textbox', { name: 'Email or phone' }).click();
  await page1.getByRole('textbox', { name: 'Email or phone' }).click();
  await page.getByRole('textbox', { name: 'Email or phone' }).click();
  await page.getByRole('textbox', { name: 'Email or phone' }).fill('abbbb');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('dsfsgsgg');
  await page.locator('#app__container').click();
  await page.locator('#app__container').click();
  await page.locator('#app__container').click();
  await page.locator('#app__container').click();
  await page.locator('#app__container').click();
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByText('Please enter a valid username.').click();
  await page.getByText('Please enter a valid username.').click();
  await expect(page.getByRole('textbox', { name: 'Email or phone' })).toHaveValue('abbbb');
  await expect(page.getByLabel('Sign in', { exact: true })).toMatchAriaSnapshot(`- button "Sign in"`);
  await expect(page.getByRole('button', { name: 'Sign in with Apple' })).toBeVisible();
});
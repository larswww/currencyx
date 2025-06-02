import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  
  // Verify the page has loaded and contains some basic structure
  await expect(page.locator('body')).toBeVisible();
  
  // Check that we have the main app div (Vue typically mounts to #app)
  await expect(page.locator('#app')).toBeVisible();
  
  // Verify page title contains something related to currency
  await expect(page).toHaveTitle(/currency/i);
});

test('app renders without errors', async ({ page }) => {
  await page.goto('/');
  
  // Check that no console errors occurred during page load
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  // Wait a bit for any async operations to complete
  await page.waitForTimeout(1000);
  
  // Verify no console errors
  expect(errors).toHaveLength(0);
});

import { test } from '@playwright/test';

test('Take Screenshot', async ({ page }) => {

    // Open Bookworm Central
    await page.goto('https://www.bookwormcentral.com/');

    // Take screenshot
    await page.screenshot({
        path: 'screenshots/homepage.png',
        fullPage: true
    });

});
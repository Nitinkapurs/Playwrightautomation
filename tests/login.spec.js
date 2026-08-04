import { test } from '@playwright/test';

test('Create Virginia Reader Choice Order', async ({ page }) => {

    test.setTimeout(10 * 60 * 1000);

    // ============================
    // Random Test Data
    // ============================

    const names = [
        "James Smith",
        "John Johnson",
        "Michael Brown",
        "William Davis",
        "Robert Miller",
        "David Wilson",
        "Daniel Moore",
        "Joseph Taylor",
        "Christopher Anderson",
        "Matthew Thomas"
    ];

    const randomName = names[Math.floor(Math.random() * names.length)];

    const orderNumber = "ORD" + Date.now();

    const randomPhone =
        "9" + Math.floor(100000000 + Math.random() * 900000000);

    const randomEmail =
        "test" + Date.now() + "@gmail.com";

    // ============================
    // Open Website
    // ============================

    await page.goto("https://www.bookwormcentral.com/");

    // Click on Literacy Services
    await page.locator("//li[contains(@class,'nav-item')]//a[normalize-space()='Literacy Services']").click();

    // Click on Virginia Reader's Choice
    await page.locator("//a[@class='list-group-item' and normalize-space()=\"Virginia Reader’s Choice\"]").click();

    // Click on Primary
    await page.locator("//button[contains(@class,'vrc-btn') and normalize-space()='Primary']").click();

    // Click on Book Image
    await page.locator("//img[contains(@src,'9781419768170.jpg')]").click();

    // Click on Add to Order Form
    await page.locator("//button[contains(@class,'vrc-block-btn1') and contains(.,'Add to Order Form')]").click();

    // Click on View Order Form
    await page.locator("//button[@onclick=\"location.href='vrc-order-form.php';\"]").click();

    // Click on Next
    await page.locator("//div[@class='nx-btn']//button").click();

    // Wait for Checkout Page
    await page.locator("//input[@id='b_child']").waitFor({ state: "visible" });

    // First & Last Name
    await page.locator("//input[@id='b_child']").fill(randomName);

    // Order Number
    await page.locator("//input[@id='bbox_number']").fill(orderNumber);

    // School Name
    await page.locator("//input[@id='b_school']").click();

    await page.locator("//input[@id='b_school']").pressSequentially(
        "Demo Elementary",
        { delay: 150 }
    );

    await page.waitForTimeout(1000);

    // Select Demo Elementary School
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    // Trigger auto-fill
    await page.keyboard.press("Tab");

    // Wait for auto-filled values
    await page.waitForTimeout(2000);

    // Replace Phone Number
    await page.locator("//input[@id='bphone']").clear();
    await page.locator("//input[@id='bphone']").fill(randomPhone);

    // Replace Email
    await page.locator("//input[@id='email']").clear();
    await page.locator("//input[@id='email']").fill(randomEmail);

    // Scroll to Review Order button
    await page.locator("//button[@id='card-button']").scrollIntoViewIfNeeded();

    // Click Review Order
    await page.locator("//button[@id='card-button']").click();

    // Pause
    await page.pause();

});
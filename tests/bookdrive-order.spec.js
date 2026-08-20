import { test } from '@playwright/test';

test('Create BookDrive Order', async ({ page }) => {

    test.setTimeout(10 * 60 * 1000);

    // Open Website
    await page.goto('https://www.bookwormcentral.com/');

    // Find Your School
    await page.locator("//div[@class='text-end']//a").click();

    // Search Box
    await page.locator("//input[@type='search']").fill("Demo");

    // Click Search Button
    await page.locator("//button[@type='submit']").click();

    // Wait for search results
    await page.waitForTimeout(3000);

    // Select 4th Demo Elementary School
    const school = page.locator("//a[contains(@class,'result-red')]").nth(3);

    await school.scrollIntoViewIfNeeded();

    // Open School (New Tab)
    const [newPage] = await Promise.all([
        page.context().waitForEvent("page"),
        school.click()
    ]);

    // Wait for new tab
    await newPage.waitForLoadState();

    // ===========================
    // Book Details
    // ===========================

    // Book Image
    await newPage.locator("//a[contains(.,'Alex & Eliza Trilogy #03')]").click();

    // Add to Cart
    await newPage.locator("#button-cart").click();

    // View Shopping Cart
    await newPage.locator("//button[normalize-space()='View Shopping Cart']").click();

    // Pay with Credit Card
    await newPage.locator("//button[normalize-space()='Pay with Credit Card']").click();

    // Guest Checkout
    await newPage.locator("//a[normalize-space()='Guest Checkout']").click();

    await newPage.waitForLoadState("networkidle");
    await newPage.waitForTimeout(2000);

    // ===========================
    // Checkout Details
    // ===========================

    // Random Names
    const firstNames = [
        "James", "John", "Michael", "William", "David",
        "Daniel", "Joseph", "Robert", "Thomas", "Matthew"
    ];

    const lastNames = [
        "Smith", "Johnson", "Brown", "Davis", "Wilson",
        "Taylor", "Anderson", "Thomas", "Moore", "Martin"
    ];

    const randomFirstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];

    const randomLastName =
        lastNames[Math.floor(Math.random() * lastNames.length)];

    // First Name
await newPage.locator("#ship_fname").click();
await newPage.locator("#ship_fname").type(randomFirstName, { delay: 50 });

// Last Name
await newPage.locator("#ship_lname").click();
await newPage.locator("#ship_lname").type(randomLastName, { delay: 50 });

    // Address
const address = newPage.locator("#ship_add1");

await address.click();
await newPage.waitForTimeout(500);

await address.type("1600 Pennsylvania Avenue NW", {
    delay: 150
});

    // Wait for Google Suggestions
    await newPage.waitForFunction(() => {
        return document.querySelectorAll(".pac-item").length > 0;
    });

    // Select First Google Address
    await newPage.locator(".pac-item").first().click();

    // City
    await newPage.locator("#ship_city").fill("Washington");

    // Random Number
const randomNumber = Math.floor(Math.random() * 100000);

// Random Email
const randomEmail = `testuser${randomNumber}@gmail.com`;

// Email
await newPage.locator("#bwc_email").fill(randomEmail);

// Random Phone Number
const randomPhone =
    `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;

// Fill Phone Number
await newPage.locator("#bwc_number").fill(randomPhone);

//await newPage.locator("#bphone").fill(randomPhone);

// Scroll down to Credit Card section
await newPage.evaluate(() => {
    window.scrollBy({
        top: 1200,
        behavior: "smooth"
    });
});

await newPage.waitForTimeout(1500);

// ============================
// Credit Card Details
// ============================

// Card Number
await newPage.locator("#cardNumber").fill("DUMMY_CARD_NUMBER");

// Expiry Date
await newPage.locator("#expirationDate").fill("MM/YY");

// CVV
await newPage.locator("#cvv").fill("DUMMY_CVV");

    // Pause
    await newPage.pause();

});



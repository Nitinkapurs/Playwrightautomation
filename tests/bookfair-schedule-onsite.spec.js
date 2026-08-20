import { test } from '@playwright/test';

test('Schedule an Onsite Book Fair', async ({ page }) => {

    test.setTimeout(10 * 60 * 1000);

    // Open Website
    await page.goto("https://www.bookwormcentral.com/");

    // Wait for page
    await page.waitForLoadState("networkidle");

    // Click Book Fairs
await page.getByRole("link", {
    name: "Book Fairs",
    exact: true
}).first().click();

await page.waitForTimeout(1000);

// Open Onsite Book Fair (New Tab)
const [newPage] = await Promise.all([
    page.context().waitForEvent("page"),
    page.locator("(//a[@href='onsite-book-fair.php'])[1]").click()
]);

// Wait for new tab
await newPage.waitForLoadState("networkidle");

// Scroll to form
await newPage.locator("#schoolname").scrollIntoViewIfNeeded();

// Scroll to form
await newPage.locator("#schoolname").scrollIntoViewIfNeeded();

// ===========================
// Random Test Data
// ===========================

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

const randomNumber = Math.floor(Math.random() * 100000);

const randomEmail = `testuser${randomNumber}@gmail.com`;

const phone =
    `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;

const userId = `user${Math.floor(Math.random() * 100000)}`;
const password = "Test@12345";

// ===========================
// Fill Form
// ===========================

// School Name
await newPage.locator("#schoolname").fill("Demo Elementary School");

// School Type
await newPage.locator("//select[@id='stype']").selectOption("Public Elementary School");

// First Name
await newPage.locator("#fname").fill(randomFirstName);

// Last Name
await newPage.locator("#lname").fill(randomLastName);

// Email
await newPage.locator("#email").fill(randomEmail);

// Phone
await newPage.locator("#phone").fill(phone);

// Grade From
await newPage.locator("//select[@id='gradelevel1']").selectOption("K");

// Grade To
await newPage.locator("//select[@id='gradelevel2']").selectOption("5");

// ===========================
// Address
// ===========================

const address = newPage.locator("#addres1");

await address.click();

await address.type("1600 Pennsylvania Avenue NW", {
    delay: 150
});

await newPage.waitForFunction(() => {
    return document.querySelectorAll(".pac-item").length > 0;
});

await newPage.locator(".pac-item").first().click();

// City
await newPage.locator("#Cityname").fill("Washington");

// County
await newPage.locator("#County").fill("Washington");

// State
await newPage.locator("#state").selectOption("DC");

// Zip Code
await newPage.locator("#zipcode").fill("20500");

// Number of Members
await newPage.locator("#numberofstudents1").fill("500");

// User ID
await newPage.locator("#userid").fill(userId);

// Password
await newPage.locator("#password2").fill(password);

// Confirm Password
await newPage.locator("#input-payment-confirm").fill(password);

// Checkbox
await newPage.locator("//input[@name='agree']").check();

// Submit
//await newPage.locator("//button[@type='submit' and normalize-space()='Submit']").click();

// Pause
await newPage.pause();

});
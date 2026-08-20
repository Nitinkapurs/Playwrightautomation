import { test } from '@playwright/test';

test('Schedule an Online Book Fair', async ({ page }) => {

    test.setTimeout(10 * 60 * 1000);

    // ===========================
    // Demo Pause Helper
    // ===========================

    const demoPause = async (ms = 800) => {
        await page.waitForTimeout(ms);
    };

    // ===========================
    // Open Website
    // ===========================

    await page.goto('https://www.bookwormcentral.com/', {
        waitUntil: 'domcontentloaded'
    });

    await demoPause(1500);

    // ===========================
    // Click Book Fairs Menu
    // ===========================

    const bookFairs = page.getByRole('link', {
        name: 'Book Fairs',
        exact: true
    }).first();

    await bookFairs.waitFor({ state: 'visible' });
    await demoPause(700);

    await bookFairs.click();

    await demoPause(1200);

    // ===========================
    // Click Schedule an Online Book Fair
    // ===========================

    const scheduleOnline = page.getByRole('link', {
        name: 'Schedule an online Book Fair',
        exact: true
    }).first();

    await scheduleOnline.waitFor({ state: 'visible' });
    await demoPause(700);

    await scheduleOnline.click();

    await page.waitForLoadState('domcontentloaded');
await demoPause(1500);


console.log("Current URL:", page.url());

await page.screenshot({
    path: 'screenshot.png',
    fullPage: true
});

    // ===========================
    // Scroll Down
    // ===========================

    await page.mouse.wheel(0, 800);

    await demoPause(1000);

    // ===========================
    // Random Test Data
    // ===========================

    const firstNames = [
        "James",
        "John",
        "Michael",
        "William",
        "David",
        "Daniel",
        "Joseph",
        "Robert",
        "Thomas",
        "Matthew"
    ];

    const lastNames = [
        "Smith",
        "Johnson",
        "Brown",
        "Davis",
        "Wilson",
        "Taylor",
        "Anderson",
        "Thomas",
        "Moore",
        "Martin"
    ];

    const randomFirstName =
        firstNames[Math.floor(Math.random() * firstNames.length)];

    const randomLastName =
        lastNames[Math.floor(Math.random() * lastNames.length)];

    const randomNumber =
        Math.floor(Math.random() * 100000);

    const randomEmail =
        `testuser${randomNumber}@gmail.com`;

    const phone =
        `555-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;

    // ===========================
    // Fill School Name
    // ===========================

    await page
        .locator("#schoolname")
        .fill("Demo Elementary School");

    await demoPause(800);

    // ===========================
    // First Name
    // ===========================

    await page
        .locator("#fname")
        .fill(randomFirstName);

    await demoPause(700);

    // ===========================
    // Last Name
    // ===========================

    await page
        .locator("#lname")
        .fill(randomLastName);

    await demoPause(700);

    // ===========================
    // Email
    // ===========================

    await page
        .locator("#email")
        .fill(randomEmail);

    await demoPause(800);

    // ===========================
    // Phone Number
    // ===========================

    await page
        .locator("#phone")
        .fill(phone);

    await demoPause(800);

    // ===========================
    // School Type
    // ===========================

    await page
        .locator("#stype")
        .selectOption({
            label: "Public Elementary School"
        });

    await demoPause(800);

    // ===========================
    // Grade Level From
    // ===========================

    await page
        .locator("#gradelevel1")
        .selectOption({
            label: "K"
        });

    await demoPause(700);

    // ===========================
    // Grade Level To
    // ===========================

    await page
        .locator("#gradelevel2")
        .selectOption({
            label: "5"
        });

    await demoPause(700);

    // ===========================
    // Number of Students
    // ===========================

    const members =
        Math.floor(Math.random() * 900) + 100;

    await page
        .locator("#numberofstudents1")
        .fill(members.toString());

    await demoPause(900);

    // ===========================
    // Address Details
    // ===========================

    const address = page.locator("#addres1");

    await address.scrollIntoViewIfNeeded();

    await demoPause(700);

    // ===========================
    // Street Address
    // ===========================

    await address.click();

    await address.type(
        "1600 Pennsylvania Avenue NW",
        {
            delay: 150
        }
    );

    await demoPause(1000);

    // ===========================
    // Wait for Google Suggestions
    // ===========================

    await page.waitForFunction(() => {
        return document.querySelectorAll(".pac-item").length > 0;
    });

    await demoPause(1000);

    // ===========================
    // Select First Google Address
    // ===========================

    await page
        .locator(".pac-item")
        .first()
        .click();

    await demoPause(1000);

    // ===========================
    // City
    // ===========================

    await page
        .locator("#Cityname")
        .fill("Washington");

    await demoPause(700);

    // ===========================
    // County
    // ===========================

    await page
        .locator("#County")
        .fill("Washington");

    await demoPause(700);

    // ===========================
    // State
    // ===========================

    await page
        .locator("#state")
        .selectOption("DC");

    await demoPause(700);

    // ===========================
    // Zip Code
    // ===========================

    await page
        .locator("#zipcode")
        .fill("20500");

    await demoPause(1000);

    // ===========================
    // Login Details
    // ===========================

    const userId =
        `user${Math.floor(Math.random() * 100000)}`;

    const password =
        "Test@12345";

    // ===========================
    // User ID
    // ===========================

    await page
        .locator("#userid")
        .fill(userId);

    await demoPause(800);

    // ===========================
    // Password
    // ===========================

    await page
        .locator("#password2")
        .fill(password);

    await demoPause(800);

    // ===========================
    // Confirm Password
    // ===========================

    await page
        .locator("#input-payment-confirm")
        .fill(password);

    await demoPause(800);

    // ===========================
    // Accept Terms
    // ===========================
    await page
        .locator("input[name='agree']")
        .check();

    await demoPause(1200);

    // ===========================
    // Test Data Console
    // ===========================

    console.log("=================================");
    console.log("School Name    : Demo Elementary School");
    console.log("First Name     :", randomFirstName);
    console.log("Last Name      :", randomLastName);
    console.log("Email          :", randomEmail);
    console.log("Phone          :", phone);
    console.log("School Type    : Public Elementary School");
    console.log("Grade From     : K");
    console.log("Grade To       : 5");
    console.log("Students       :", members);
    console.log("Address        : 1600 Pennsylvania Avenue NW");
    console.log("City           : Washington");
    console.log("County         : Washington");
    console.log("State          : DC");
    console.log("Zip Code       : 20500");
    console.log("User ID        :", userId);
    console.log("=================================");

    // ===========================
    // Submit
    // ===========================

    
     //await page.locator(
       //  "//button[@type='submit' and normalize-space()='Submit']"
     //).click();

    // ===========================
    // Pause for Demo
    // ===========================

await page.pause();

});
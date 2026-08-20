import { test } from '@playwright/test';
import { closeSync } from 'node:fs';

test('E Gift Card Flow', async ({ page }) => {

    test.setTimeout(10 * 60 * 1000);

    // ===========================
    // Open Website
    // ===========================

    await page.goto('https://www.bookwormcentral.com/');
    waitUntil: 'domcontentloaded',
    //await page.waitForLoadState('networkidle'); 


    // ===========================
    // Click Book Fairs
    // ===========================

    await page.getByRole('link', {
        name: 'Book Fairs',
        exact: true
    }).first().click();

    await page.waitForTimeout(1000);

    // ===========================
    // Open eGift Cards - New Tab
    // ===========================

    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),

        page.locator("a.list-group-item").filter({
            hasText: "eGift Cards"
        }).first().click()
    ]);

    await newPage.waitForLoadState('networkidle');

    // ===========================
    // Random Names
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

    const randomFirstName2 =
        firstNames[Math.floor(Math.random() * firstNames.length)];

    const randomLastName2 =
        lastNames[Math.floor(Math.random() * lastNames.length)];

    const recipientName = `${randomFirstName} ${randomLastName}`;
    const senderName = `${randomFirstName2} ${randomLastName2}`;

    // ===========================
    // Random Emails
    // ===========================

    const randomNumber = Math.floor(Math.random() * 1000000);

    const recipientEmail =
        `recipient${randomNumber}@gmail.com`;

    const senderEmail =
        `sender${randomNumber}@gmail.com`;


  // Custom Amount
const customAmountRadio = newPage.locator(
    "input[type='radio'][name='amount'][value='4']"
);

await customAmountRadio.check();

// Custom Amount = 1
const customAmountField = newPage.locator("#myCstmAmount");

await customAmountField.fill("1");

// Trigger the website's oninput function
await customAmountField.evaluate((el) => {
    el.dispatchEvent(new Event("input", { bubbles: true }));
});

// Wait for preview to update
await newPage.waitForTimeout(1000);

// ============================
// Recipient Name
// ============================

const recipientNameField = newPage.locator("#recipient_name");

await recipientNameField.fill(recipientName);
await recipientNameField.dispatchEvent("input");


// ============================
// Recipient Email
// ============================

const recipientEmailField = newPage.locator(
    "input[name='recipient_email']"
).last();

await recipientEmailField.fill(recipientEmail);

await recipientEmailField.dispatchEvent("input");

await newPage.waitForTimeout(500);

// ============================
// Personal Message
// ============================

const messageField = newPage.locator("#message");

await messageField.fill("Wishing you lots of happiness and joy!");
await messageField.dispatchEvent("input");


// Wait for Preview to update
await newPage.waitForTimeout(1000);

    // ===========================
    // Sender Details
    // ===========================

    // Sender Name
    await newPage
        .locator("#sender_name")
        .fill(senderName);

    // Sender Email
    await newPage
        .locator("#sender_email")
        .fill(senderEmail);

    // ===========================
    // Delivery Date
    // ===========================

    // Automatically use today's date
const today = new Date();

const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const year = today.getFullYear();

const deliveryDate = `${month}/${day}/${year}`;

await newPage.locator("#datepicker").fill(deliveryDate);

console.log("Delivery Date:", deliveryDate);

    // ===========================
    // Show Test Data
    // ===========================

    console.log("=================================");
    console.log("Recipient Name :", recipientName);
    console.log("Recipient Email:", recipientEmail);
    console.log("Sender Name    :", senderName);
    console.log("Sender Email   :", senderEmail);
    console.log("Amount         : 1");
    console.log("Message        : Gift card");
    console.log("Delivery Date  : 08/15/2026");
    console.log("=================================");

    await newPage.getByRole('button', {
        name: 'Purchase Gift Card',
        exact: true
    }).click();
    
// Credit Card Details - TEST CARD ONLY
const cardFrame = newPage.frameLocator(
    'iframe[title="Secure Credit Card Form"]'
  );
  
  // Wait for the secure card iframe
  await newPage
    .locator('iframe[title="Secure Credit Card Form"]')
    .waitFor({ state: 'visible' });
  
  // Card number
  await cardFrame
    .locator('input[autocomplete="cc-number"]')
    .fill('4111111111111111');
  
  // Expiry
  await cardFrame
    .locator('input[autocomplete="cc-exp"]')
    .fill('12/30');
  
  // CVV
  await cardFrame
    .locator('input[autocomplete="cc-csc"]')
    .fill('123');
  
    await cardFrame
  .locator('input[autocomplete="postal-code"]')
  .fill('122001');

 // Pause
    await newPage.pause();

});
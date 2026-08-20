import { test } from '@playwright/test';

test('E Gift Card Group Flow', async ({ page }) => {

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
    // Click eGift Cards
    // Open in New Tab
    // ===========================

    const [newPage] = await Promise.all([

        page.context().waitForEvent('page'),

        page.locator("a.list-group-item")
            .filter({ hasText: "eGift Cards" })
            .first()
            .click()

    ]);

    await newPage.waitForLoadState('networkidle');

    // ===========================
    // Click Group
    // ===========================

    await newPage
        .locator("//a[@id='pills-profile-tab']")
        .click({ force: true });

    await newPage.waitForTimeout(1000);

    // ===========================
    // Random Names
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


    // Random Recipient Name

    const randomRecipientFirst =
        firstNames[Math.floor(Math.random() * firstNames.length)];

    const randomRecipientLast =
        lastNames[Math.floor(Math.random() * lastNames.length)];

    const recipientName =
        `${randomRecipientFirst} ${randomRecipientLast}`;


    // Random Sender Name

    const randomSenderFirst =
        firstNames[Math.floor(Math.random() * firstNames.length)];

    const randomSenderLast =
        lastNames[Math.floor(Math.random() * lastNames.length)];

    const senderName =
        `${randomSenderFirst} ${randomSenderLast}`;


    // ===========================
    // Random Emails
    // ===========================

    const randomNumber =
        Math.floor(Math.random() * 1000000);

    const recipientEmail =
        `recipient${randomNumber}@gmail.com`;

    const senderEmail =
        `sender${randomNumber}@gmail.com`;

    // ===========================
    // Custom Amount - Group
    // ===========================

    await newPage
        .locator("//input[@name='amount2' and @id='amount2']")
        .last()
        .check();

    await newPage
        .locator("#myCstmAmount2")
        .last()
        .fill("100");

    // ===========================
    // Recipient Name
    // ===========================

    await newPage
        .locator("//input[@name='recipient_name2']")
        .fill(recipientName);

    // ===========================
    // Recipient Email
    // ===========================

    await newPage
        .locator("//input[@name='recipient_email2']")
        .fill(recipientEmail);

    // ===========================
    // Personal Message
    // ===========================

    await newPage
        .locator("//textarea[@name='message2']")
        .fill("Wishing you lots of happiness and joy!");

    // ===========================
    // Group Message
    // ===========================

    await newPage
        .locator("//textarea[@name='message3']")
        .fill("Best wishes from all of us!");

    // ===========================
    // Delivery Date - Automatic
    // ===========================

    const today = new Date();

    const month =
        String(today.getMonth() + 1).padStart(2, "0");

    const day =
        String(today.getDate()).padStart(2, "0");

    const year =
        today.getFullYear();

    const deliveryDate =
        `${month}/${day}/${year}`;

    await newPage
        .locator("//input[@id='datepicker2']")
        .fill(deliveryDate);

    // ===========================
    // Sender Name
    // ===========================

    await newPage
        .locator("//input[@name='sender_name2']")
        .fill(senderName);

    // ===========================
    // Sender Email
    // ===========================

    await newPage
        .locator("//input[@name='sender_email2']")
        .fill(senderEmail);


    // ===========================
    // Test Data
    // ===========================

    console.log("=================================");
    console.log("Recipient Name :", recipientName);
    console.log("Recipient Email:", recipientEmail);
    console.log("Personal Msg   : Wishing you lots of happiness and joy!");
    console.log("Group Msg      : Best wishes from all of us!");
    console.log("Delivery Date  :", deliveryDate);
    console.log("Sender Name    :", senderName);
    console.log("Sender Email   :", senderEmail);
    console.log("Amount         : 1");
    console.log("=================================");

    // ===========================
   // Scroll to Invite Contributor
  // ===========================

const contributorEmailField = newPage.locator(
    "//textarea[@placeholder='Contributors email addresses (separated by commas)']"
);

await contributorEmailField.scrollIntoViewIfNeeded();

await newPage.waitForTimeout(800);


// ===========================
// Invite Contributor - Random Email
// ===========================

const contributorNumber =
    Math.floor(Math.random() * 1000000);

const contributorEmail =
    `contributor${contributorNumber}@gmail.com`;

await newPage
    .locator("//textarea[@name='contributors_email2']")
    .fill(contributorEmail);


// ===========================
// Message to Contributor
// ===========================

await newPage
    .locator("//textarea[@name='contributors_message2']")
    .fill("Please join and contribute to this gift card.");

// ===========================
// Suggested Amount
// ===========================

await newPage
    .locator("//input[@name='suggested_amount2']")
    .fill("100");

// ===========================
// Your Contribution
// ===========================

await newPage
    .locator("//input[@name='contribute_amount2']")
    .fill("100");

console.log("Contributor Email :", contributorEmail);
console.log("Contributor Message: Please join and contribute to this gift card.");
console.log("Suggested Amount   : 100");
console.log("Your Contribution  : 100");

// ===========================
// Pay for Your Contribution
// ===========================

const payButton = newPage.locator("#add_group");

await payButton.waitFor({ state: "visible" });
await payButton.click();

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

    await newPage.pause();

});
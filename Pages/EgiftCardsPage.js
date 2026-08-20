export class EgiftCardsPage {

    constructor(page) {
        this.page = page;

        // Navigation
        this.bookFairs = page.getByRole('link', {
            name: 'Book Fairs',
            exact: true
        }).first();

        this.eGiftCards = page.locator(
            "a.list-group-item"
        ).filter({
            hasText: "eGift Cards"
        }).first();

        // Custom Amount
        this.customAmountRadio = page.locator(
            "input[type='radio'][name='amount'][value='4']"
        );

        this.customAmount = page.locator(
            "#myCstmAmount"
        );

        // Recipient
        this.recipientName = page.locator(
            "#recipient_name"
        );

        this.recipientEmail = page.locator(
            "input[name='recipient_email']"
        ).last();

        // Message
        this.message = page.locator(
            "#message"
        );

        // Sender
        this.senderName = page.locator(
            "#sender_name"
        );

        this.senderEmail = page.locator(
            "#sender_email"
        );

        // Delivery Date
        this.deliveryDate = page.locator(
            "#datepicker"
        );

        // Purchase button
        this.purchaseGiftCard = page.getByRole('button', {
            name: 'Purchase Gift Card',
            exact: true
        });
    }


    // ===========================
    // Open Website
    // ===========================

    async openWebsite() {

        await this.page.goto(
            "https://www.bookwormcentral.com/",
            {
                waitUntil: "domcontentloaded"
            }
        );
    }

    // ===========================
    // Open eGift Cards
    // ===========================

    async openEGiftCards() {

        await this.bookFairs.click();

        const [newPage] = await Promise.all([

            this.page.context().waitForEvent('page'),

            this.eGiftCards.click()
        ]);

        await newPage.waitForLoadState(
            "domcontentloaded"
        );

        return new EgiftCardsPage(newPage);
    }

    // ===========================
    // Custom Amount
    // ===========================

    async enterCustomAmount(amount) {

        await this.customAmountRadio.check();

        await this.customAmount.fill(
            String(amount)
        );

        await this.customAmount.evaluate((el) => {

            el.dispatchEvent(
                new Event("input", {
                    bubbles: true
                })
            );

        });

        await this.page.waitForTimeout(500);
    }


    // ===========================
    // Recipient Details
    // ===========================

    async enterRecipient(name, email) {

        await this.recipientName.fill(name);

        await this.recipientName.dispatchEvent(
            "input"
        );

        await this.recipientEmail.fill(email);

        await this.recipientEmail.dispatchEvent(
            "input"
        );

        await this.page.waitForTimeout(500);
    }


    // ===========================
    // Personal Message
    // ===========================

    async enterMessage(message) {

        await this.message.fill(message);

        await this.message.dispatchEvent(
            "input"
        );

        await this.page.waitForTimeout(500);
    }


    // ===========================
    // Sender Details
    // ===========================

    async enterSender(name, email) {

        await this.senderName.fill(name);

        await this.senderEmail.fill(email);
    }

    // ===========================
    // Delivery Date
    // ===========================

    async enterDeliveryDate() {

        const today = new Date();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        const year = today.getFullYear();

        const deliveryDate =
            `${month}/${day}/${year}`;

        await this.deliveryDate.fill(
            deliveryDate
        );

        console.log(
            "Delivery Date:",
            deliveryDate
        );
    }

    // ===========================
    // Purchase Gift Card
    // ===========================

    async clickPurchaseGiftCard() {

        await this.purchaseGiftCard.click();
    }
}
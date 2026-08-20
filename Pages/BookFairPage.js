import { expect } from '@playwright/test';

export class BookFairPage {

    constructor(page) {
        this.page = page;

        // Book Fairs menu
        this.bookFairsMenu = page.getByRole('link', {
            name: 'Book Fairs',
            exact: true
        }).first();

        // Online Book Fair
        this.onlineBookFair = page.getByRole('link', {
            name: 'Schedule an online Book Fair',
            exact: true
        }).first();

        // Onsite Book Fair
        this.onsiteBookFair = page.locator(
            "//a[contains(@href,'onsite-book-fair.php')]"
        ).first();

        // eGift Cards
        this.eGiftCards = page.locator(
            "//a[contains(@href,'gift_card')]"
        ).first();
    }


    // =========================
    // Open Website
    // =========================

    async openWebsite() {
        await this.page.goto(
            'https://www.bookwormcentral.com/'
        );

        await this.page.waitForLoadState('networkidle');
    }


    // =========================
    // Click Book Fairs
    // =========================

    async clickBookFairs() {
        await this.bookFairsMenu.click();

        await this.page.waitForTimeout(1000);
    }


    // =========================
    // Click Online Book Fair
    // =========================

    async clickOnlineBookFair() {

        await expect(
            this.onlineBookFair
        ).toBeVisible();

        await this.onlineBookFair.click();
    }

    // =========================
    // Click Onsite Book Fair
    // =========================

    async clickOnsiteBookFair() {

        const [newPage] = await Promise.all([

            this.page.context().waitForEvent('page'),

            this.onsiteBookFair.click()
        ]);

        await newPage.waitForLoadState('networkidle');

        return newPage;
    }

    // =========================
    // Click eGift Cards
    // =========================

    async clickEGiftCards() {

        const [newPage] = await Promise.all([

            this.page.context().waitForEvent('page'),

            this.eGiftCards.click()
        ]);

        await newPage.waitForLoadState('networkidle');

        return newPage;
    }

}



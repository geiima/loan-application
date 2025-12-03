import {Locator, Page} from "@playwright/test";
import {faker} from "@faker-js/faker/locale/en";

export class LoanPage {
    readonly URL = 'https://loan-app.tallinn-learning.ee/small-loan'
    readonly page: Page
    readonly amountField: Locator
    readonly amountSlider: Locator
    readonly periodField: Locator
    readonly periodSlider: Locator
    readonly applyButton: Locator
    readonly imageButton1: Locator
    readonly imageButton2: Locator
    readonly loginUsernameField: Locator
    readonly loginPasswordField: Locator
    readonly loginContinueButton: Locator
    readonly finalPageNameField: Locator
    readonly finalPageLanguageField: Locator
    readonly finalPageContinueButton: Locator
    readonly finalPageSuccessButton: Locator
    readonly error: Locator

    constructor(page: Page) {
        this.page = page;
        this.amountField = page.getByTestId('id-small-loan-calculator-field-amount');
        this.amountSlider = page.getByTestId('id-small-loan-calculator-field-amount-slider');
        this.periodField = page.getByTestId('ib-small-loan-calculator-field-period');
        this.periodSlider = page.getByTestId('ib-small-loan-calculator-field-period-slider')
        this.applyButton = page.getByTestId('id-small-loan-calculator-field-apply');
        this.imageButton1 = page.getByTestId('id-image-element-button-image-1');
        this.imageButton2 = page.getByTestId('id-image-element-button-image-2');
        this.loginUsernameField = page.getByTestId('login-popup-username-input');
        this.loginPasswordField = page.getByTestId('login-popup-password-input');
        this.loginContinueButton = page.getByTestId('login-popup-continue-button');
        this.finalPageNameField = page.getByTestId('final-page-full-name');
        this.finalPageLanguageField = page.getByTestId('final-page-communication-language');
        this.finalPageContinueButton = page.getByTestId('final-page-continue-button');
        this.finalPageSuccessButton = page.getByTestId('final-page-success-ok-button');
        this.error = page.getByTestId('id-small-loan-calculator-field-error');
    }

    async open() {
        await this.page.goto(this.URL);
    }

    async scrollToImage1() {
        await this.imageButton1.scrollIntoViewIfNeeded()
        await this.imageButton1.click()
    }

    async scrollToImage2() {
        await this.imageButton2.scrollIntoViewIfNeeded()
        await this.imageButton2.click()
    }

    async applyForLoan() {
        await this.applyButton.click()
    }

    async login(username: string = faker.internet.email(), password: string = faker.internet.password()) {
        await this.loginUsernameField.fill(username)
        await this.loginPasswordField.fill(password)
        await this.loginContinueButton.click()
    }

    async completeFinalForm() {
        await this.finalPageContinueButton.click()
        await this.finalPageSuccessButton.click()
    }

    async fillAmount(value: string) {
        await this.amountField.fill(value)
    }

}
import { test, expect } from '@playwright/test';
import {LoanPage} from "../pages/LoanPage";

let loan: LoanPage

test.beforeEach(async ({ page }) => {
    loan = new LoanPage(page);
    await loan.open();
});


    test('verify application fields are in place', async ({}) => {
        await expect(loan.amountField).toBeVisible();
        await expect(loan.amountSlider).toBeVisible();
        await expect(loan.periodField).toBeVisible();
        await expect(loan.periodSlider).toBeVisible();
        await expect(loan.applyButton).toBeVisible();
    });

    test('verify scrolling effect for loan', async ({}) => {
        await loan.scrollToImage1()
        await expect(loan.amountField).toBeInViewport()
        await loan.scrollToImage2()
        await expect(loan.amountField).toBeInViewport()
    });

    test('verify loan application e2e', async ({}) => {
        await loan.applyForLoan()
        await expect(loan.loginContinueButton).toBeDisabled()

        await loan.login()

        await expect(loan.finalPageNameField).toBeVisible()
        await expect(loan.finalPageLanguageField).toBeVisible()

        await loan.completeFinalForm()

        await expect(loan.amountField).toBeInViewport()
    });

    test('verify validation error', async ({}) => {
        await loan.fillAmount('0')
        await expect(loan.error).toBeVisible()

        await loan.fillAmount('500')
        await expect(loan.error).toBeHidden()
    });



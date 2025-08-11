import { test, expect } from '@playwright/test';


test.describe("Login Tests SPRCOnline", () => {

    const URL: string = "https://www.saucedemo.com";


    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
    });

    test("Login en Saucedemo", async ({ page }, testInfo) => {

        await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
        await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

    });


});
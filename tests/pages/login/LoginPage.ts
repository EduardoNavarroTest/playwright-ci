import { Locator, Page } from '@playwright/test';

class LoginPage {
    private readonly userNameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator

    constructor(page: Page) {
        this.userNameTextbox = page.locator('input[name="Username"]')
        this.passwordTextbox = page.locator('input[name="Password"]')
        this.loginButton = page.getByRole('button', { name: 'Enviar' });
    }

    async fillUsername(username: string): Promise<void> {
        await this.userNameTextbox.fill(username);
    }
    async fillPassword(password: string): Promise<void> {
        await this.passwordTextbox.fill(password);
    }
    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    // Method to perform the complete login action
    async login(username: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

}

export default LoginPage;
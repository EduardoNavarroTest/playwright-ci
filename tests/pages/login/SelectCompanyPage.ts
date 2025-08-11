import { Locator, Page, FrameLocator } from '@playwright/test';

class SelectCompanyPage {
    private readonly mainFrame: FrameLocator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        this.mainFrame = page.frameLocator('frame[name="main"]');
        this.submitButton = this.mainFrame.getByRole('button', { name: 'Submit' });
    }

    async clickCompany(company: string): Promise<void> {
        const companyRadio = this.mainFrame.locator(`input[value="${company}"]`);
        await companyRadio.waitFor({ state: 'visible' });
        await companyRadio.click();
    }

    async clickLoginButton(): Promise<void> {
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
    }

    async selectCompany(company: string): Promise<void> {
        await this.clickCompany(company);
        await this.clickLoginButton();
    }
}

export default SelectCompanyPage;

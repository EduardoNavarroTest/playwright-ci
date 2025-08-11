import { Locator, Page, FrameLocator, expect } from '@playwright/test';

class SelectTransactionPage {
    private readonly navFrame: FrameLocator;
    private readonly mainFrame: FrameLocator;
    private readonly exitButton: Locator;
    private readonly labelHome: Locator;

    constructor(page: Page) {
        this.navFrame = page.frameLocator('frame[name="nav"]'); // Frame de navegación (menú lateral)
        this.mainFrame = page.frameLocator('frame[name="main"]'); //Frame principal
        this.labelHome = this.mainFrame.getByText('HOM00');
        this.exitButton = this.navFrame.getByRole('button', { name: 'Salir' });
    }

    async selectMenu(option: string): Promise<void> {
        await this.labelHome.waitFor({ state: 'visible' });
        this.navFrame.getByRole('link', { name: `${option}` }).click();
    }

    async clickExitButton(): Promise<void> {
        await this.exitButton.click();
    }
}

export default SelectTransactionPage;

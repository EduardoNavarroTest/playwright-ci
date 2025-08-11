import { Locator, Page, FrameLocator, expect } from '@playwright/test';

class Exb00Page {
    private readonly mainFrame: FrameLocator;
    private readonly labelOption: Locator;
    private readonly submit: Locator;

    constructor(page: Page) {
        this.mainFrame = page.frameLocator('frame[name="main"]'); //Frame principal
        this.labelOption = this.mainFrame.getByText('EXB00');
        this.submit = this.mainFrame.getByRole('button', { name: 'Submit' });
    }

    async clickOption(option: string): Promise<void> {
        await this.labelOption.waitFor({ state: 'visible' });
        const link = this.mainFrame.getByRole('link', { name: option });
        await link.click();
    }
}

export default Exb00Page;

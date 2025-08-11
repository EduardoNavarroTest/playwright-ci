import { Locator, Page, FrameLocator, expect } from '@playwright/test';

class Ebk10Page {
    private readonly mainFrame: FrameLocator;
    private readonly labelOption: Locator;
    private readonly table: Locator;
    private readonly submit: Locator;
    private readonly labelSuccess: Locator;

    constructor(page: Page) {
        this.mainFrame = page.frameLocator('frame[name="main"]');
        this.labelOption = this.mainFrame.getByText('EBK10');
        this.table = this.mainFrame.locator('table.tbSumm tbody tr'); // Filas de la tabla
        this.submit = this.mainFrame.getByRole('button', { name: 'Submit' });
        this.labelSuccess = this.mainFrame.getByText('Contenedores vacios creados UVI =');
    }

    async fillTable(index: number, data: {
        container: string;
        isocodeLength: string;
        isocodeClass: string;
        booking: string;
        clasfication: string;
        seal: boolean;
        transport: string;
        otm: boolean;
    }): Promise<void> {
        const row = this.table.nth(index + 1);
        console.log(row);

        await this.labelOption.waitFor({ state: 'visible' });
        await row.locator('input[name="UNIT"]').fill(data.container);
        await row.locator('input[name="UNSZ"]').fill(data.isocodeLength);
        await row.locator('input[name="UNTP"]').fill(data.isocodeClass);
        await row.locator('input[name="BILL"]').fill(data.booking);
        await row.locator('select[name="CLAS"]').selectOption(data.clasfication);
        await row.locator('input[name="COMP_HA"]').fill(data.transport);
        await row.locator('select[name="SELLO"]').selectOption(data.seal ? 'Si' : 'No');
        await row.locator('select[name="ACEPTA"]').selectOption(data.otm ? 'Si' : 'No');

        await this.submit.click();
        

    }

}

export default Ebk10Page;

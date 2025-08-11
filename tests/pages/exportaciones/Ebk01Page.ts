import { Locator, Page, FrameLocator, expect } from '@playwright/test';

class Ebk01Page {
    private readonly mainFrame: FrameLocator;
    private readonly labelOption: Locator;
    private readonly uvi: Locator;
    private readonly port: Locator;
    private readonly emptyType: Locator;
    private readonly terminal: Locator;
    private readonly submit: Locator;
    private readonly cargoTypeEmpty: Locator

    constructor(page: Page) {
        this.mainFrame = page.frameLocator('frame[name="main"]'); //Frame principal
        this.labelOption = this.mainFrame.getByText('EBK01');
        this.uvi = this.mainFrame.locator('input[name="UVIX"]');
        this.port = this.mainFrame.locator('input[name="PORT"]');
        this.submit = this.mainFrame.getByRole('button', { name: 'Submit' });
        this.cargoTypeEmpty = this.mainFrame.getByText('Contenedor Vacio', { exact: true })
        this.terminal = this.mainFrame.locator('select[name="CIAX_Terminal"]');
        this.emptyType = page.locator('frame[name="main"]').contentFrame().locator('select[name="tiporeserva"]');
                                        //locator('select[name="tiporeserva"]')
    }

    async fillForm(obj: { uvi: string, port: string, terminal: string, reservationType: string }): Promise<void> {
        const { uvi, port, terminal, reservationType } = obj;

        await this.labelOption.waitFor({ state: 'visible' });
        await this.cargoTypeEmpty.check(); //Esto pudiera manejarse con condicionales si es necesario
        console.log(`Reserva: ${reservationType}`);
        await this.emptyType.waitFor({ state: 'visible' });
        await this.emptyType.selectOption({ value: 'T' }); //Traslado del naviero
        await this.terminal.selectOption({ value: 'SPC' });
        await this.uvi.fill(uvi); //45000
        await this.port.fill(port); //BRSSZ
        await this.submit.click();
    }
}

export default Ebk01Page;

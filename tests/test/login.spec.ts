import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login/LoginPage.ts';
import SelectCompanyPage from '../pages/login/SelectCompanyPage.ts';
import SelectTransactionPage from '../pages/login/SelectTransactionPage.ts';
import Ebk10Page from '../pages/exportaciones/Ebk10Page.ts';
import Exb00Page from '../pages/exportaciones/Exb00Page.ts';
import Exp00Page from '../pages/exportaciones/Exp00Page.ts';
import Ebk01Page from '../pages/exportaciones/Ebk01Page.ts';


test.describe("Login Tests SPRCOnline", () => {
    let loginPage: LoginPage;
    let selectCompanyPage: SelectCompanyPage;
    let selectTransactionPage: SelectTransactionPage;
    let ebk10Page: Ebk10Page;
    let exb00Page: Exb00Page;
    let exp00Page: Exp00Page;
    let ebk01Page: Ebk01Page;
    const URL: string = process.env.URL_SPRCONLINE!;


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        selectCompanyPage = new SelectCompanyPage(page);
        selectTransactionPage = new SelectTransactionPage(page);
        ebk10Page = new Ebk10Page(page);
        exb00Page = new Exb00Page(page);
        exp00Page = new Exp00Page(page);
        ebk01Page = new Ebk01Page(page);
        await page.goto(URL);
    });

    test("Crear OTM de Traslado Naviero - Exportación", async ({ page }, testInfo) => {
        //Login y selección de empresa y transacción
        await loginPage.login("EDUARDOTER", "123456");
        await selectCompanyPage.selectCompany("MSK");
        await selectTransactionPage.selectMenu("Exportaciones");


        // Selección de transacción
        await exp00Page.clickOption("Gestión de Reservas");
        await exb00Page.clickOption("EBK - Crear Reserva de Carga");
        await ebk01Page.fillForm({
            uvi: "45000",
            port: "BRSSZ",
            terminal: "SOC PORTUARIA REG CARTAGENA",
            reservationType: "Traslado del naviero"
        });

        const arrayData = [
            {
                container: "PWGX1000000",
                isocodeLength: "20",
                isocodeClass: "CT",
                booking: "BKG123456",
                clasfication: "ALIMENTOS",
                seal: true,
                transport: "TPM",
                otm: true
            }
        ];

        for (let i = 0; i < arrayData.length; i++) {
            await ebk10Page.fillTable(i, arrayData[i]);
        }
        await page.waitForTimeout(5000); // Espera 3 segundos (3000 milisegundos)


    });


});
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login/LoginPage.ts';
import SelectCompanyPage from '../pages/login/SelectCompanyPage.ts';
import SelectTransactionPage from '../pages/login/SelectTransactionPage.ts';
import Ebk10Page from '../pages/exportaciones/Ebk10Page.ts';
import Exb00Page from '../pages/exportaciones/Exb00Page.ts';
import Exp00Page from '../pages/exportaciones/Exp00Page.ts';
import Ebk01Page from '../pages/exportaciones/Ebk01Page.ts';
import { generateValidContainerCode } from '../utils/dataGeneration.ts';

const URL: string = process.env.URL_SPRCONLINE!;

// Datos de prueba por usuario
const users = [
  { username: "EDUARDOTER", password: "123456" },
  { username: "MESCALANTE", password: "123456" }
];

test.describe.parallel("Login Tests SPRCOnline", () => {

  for (const { username, password } of users) {
    test(`Crear OTM - Usuario: ${username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const selectCompanyPage = new SelectCompanyPage(page);
      const selectTransactionPage = new SelectTransactionPage(page);
      const ebk10Page = new Ebk10Page(page);
      const exb00Page = new Exb00Page(page);
      const exp00Page = new Exp00Page(page);
      const ebk01Page = new Ebk01Page(page);

      await page.goto(URL);

      // Login y flujo
      await loginPage.login(username, password);
      await selectCompanyPage.selectCompany("MSK");
      await selectTransactionPage.selectMenu("Exportaciones");

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
          container: generateValidContainerCode(),
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

      await page.waitForTimeout(5000);
    });
  }
});

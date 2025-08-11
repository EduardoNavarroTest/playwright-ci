import { test, expect } from '@playwright/test';

test('Test Info Colombia', async ({ playwright }) => {
    const apiContext = await playwright.request.newContext({});
    const response = await apiContext.get('https://api-colombia.com/api/v1/Country/Colombia');
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    console.log(responseBody);    

    console.info(`toHaveProperty:`);
    expect(responseBody).toHaveProperty('name', 'Colombia');
    expect(responseBody).toHaveProperty('isoCode', 'CO');
});
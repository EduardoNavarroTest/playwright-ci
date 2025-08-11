import { test, expect } from '@playwright/test';

test('Auth Dummy Json', async ({ playwright }) => {
    const apiContext = await playwright.request.newContext({
        baseURL: 'https://dummyjson.com/',
        extraHTTPHeaders: {
            'accept': 'application/json',
        }
    });

    const response = await apiContext.post('auth/login', {
        data: {
            username: 'emilys',
            password: 'emilyspass'
        }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log(body);

    expect(body).toHaveProperty('accessToken');
    expect(response.status()).toBe(200);
});

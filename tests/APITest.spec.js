const { test, expect } = require('@playwright/test');

test('GET API test', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.id).toBe(1);
});
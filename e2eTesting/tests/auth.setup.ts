import { test as setup, expect } from '@playwright/test';
import * as def from '../test.config';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    await page.goto(def.Adress);

    await page.getByPlaceholder('Username/Email').fill(def.AdminUser[0]);
    await page.getByPlaceholder('Password').fill(def.AdminUser[1]);
    await page.getByRole('button', { name: 'Sign in' }).click();
  
    await expect(page.getByTestId('user-center-button')).toBeVisible();   

    await page.context().storageState({ path: authFile });
});
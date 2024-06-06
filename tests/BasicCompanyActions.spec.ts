import { test, expect, Page } from '@playwright/test';
import * as def from '../test.config';
import { UsersPage } from './UserPage';

test('Search for company in base', async ({ page }) => {
  const workingPage = new UsersPage(page);

  await workingPage.gotoUsers();
  await workingPage.setFilters('dummyInc');
  await expect(page.getByText('dummyInc')).toBeVisible();
  await workingPage.resetFilter();
})

test.describe.serial('Adding and removing valid company', () => { 
  let page: Page;
  let workPage: UsersPage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    workPage = new UsersPage(page);
    
    await workPage.gotoUsers();
  }); 
  
  test('No such company exist', async () => {
    await workPage.setFilters(def.CompanyName);

    await expect(page.getByLabel('block-item-Kanban.Card-company-kanban').first()).toBeHidden();

  })
  
  test('Add new Company to list', async() => {
    await workPage.openAddForm();
    await workPage.enterName(def.CompanyName);
    await workPage.selectIndustry();
    await workPage.submitCompany();
    
    await expect(page.getByRole('dialog')).toBeHidden();
  })
  
  test('Check Company added', async () => {
    await workPage.setFilters(def.CompanyName);

    await expect(page.getByText(def.CompanyName).first()).toBeVisible();
  })

  test('Delete company', async () => {
    await workPage.setFilters(def.CompanyName);
    await workPage.editCompany(def.CompanyName);
    await workPage.selectStatus();
    await workPage.submitCompany();
    await workPage.gotoUsers();

    await expect(page.getByRole('dialog')).toBeHidden();
  })

  test('Check if company deleted', async () => {
    await workPage.setFilters(def.CompanyName);
      
    await expect(page.getByLabel('block-item-Kanban.Card-company-kanban').first()).toBeHidden();
  })




});

test.describe.serial('Editing valid company name', () =>{
  let page: Page;
  let workPage: UsersPage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    workPage = new UsersPage(page);
    
    await workPage.gotoUsers();
    await workPage.openAddForm();
    await workPage.enterName(def.CompanyName);
    await workPage.selectIndustry();
    await workPage.submitCompany();
  });   

  test('No company with edited name exist', async () => {
    await workPage.setFilters(def.SecondCompanyName);

    await expect(page.getByLabel('block-item-Kanban.Card-company-kanban').first()).toBeHidden();

  })
  
  test('Unedited named company exist', async () => {
    await workPage.setFilters(def.CompanyName);

    await expect(page.getByText(def.CompanyName).first()).toBeVisible();
    await workPage.resetFilter();
  })

  test('Edit company name', async () => {
    await workPage.setFilters(def.CompanyName);
    await workPage.editCompany(def.CompanyName);

    await workPage.enterName(def.SecondCompanyName);
    await workPage.submitCompany();
    await workPage.gotoUsers();

    await expect(page.getByRole('dialog')).toBeHidden();
  })

  test('Company with edited name exist', async () => {
    await workPage.setFilters(def.SecondCompanyName);

    await expect(page.getByText(def.SecondCompanyName).first()).toBeVisible();
    await workPage.resetFilter();
  })

  test.afterAll(async () => {  
    await workPage.setFilters(def.SecondCompanyName);
    await workPage.editCompany(def.SecondCompanyName);
    await workPage.selectStatus();
    await workPage.submitCompany();
    await workPage.gotoUsers();
  });

});
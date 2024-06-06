import type { Page, Locator } from '@playwright/test';
import * as def from '../test.config';

export class UsersPage {
  private readonly page: Page;

  constructor(public readonly newPage: Page) {
    this.page = newPage;
  }

  async gotoUsers() {
    await this.page.goto(def.AdressUsers); 
    //await this.page.getByRole('button', { name: 'Users' }).click();

    await this.resetFilter();    
  }

  async resetFilter(){
    await this.page.getByRole('button', {name: 'Filter'}).click();
    await this.page.getByRole('button', {name: 'Reset'}).click(); 
  }

  async openAddForm(){
    await this.page.getByRole('button', {name: 'Add new'}).click();    
  }

  async setFilters(name: string){
    await this.page.getByRole('button', {name: 'Filter'}).click();

    await this.page.getByRole('textbox').fill(name)
    await this.page.getByRole('button', {name: 'Submit'}).click();
  }

  async enterName(name: string){
    await this.page.getByLabel('block-item-CollectionField-company-form-company.name-Name')
      .getByRole('textbox').scrollIntoViewIfNeeded();
    await this.page.getByLabel('block-item-CollectionField-company-form-company.name-Name')
      .getByRole('textbox').fill(name);
  }

  async selectIndustry(industry: string = def.CompanyIndustry){
    await this.page.getByLabel('block-item-CollectionField-company-form-company.industry-Industry')
      .scrollIntoViewIfNeeded();  
    await this.page.getByLabel('block-item-CollectionField-company-form-company.industry-Industry')
      .getByRole('button').first().click();
    await this.page.getByRole('option', {name: industry}).click();
  }

  async selectStatus(status: string = 'Mismatch'){
    await this.page.getByLabel('block-item-CollectionField-company-form-company.status-Status')
      .scrollIntoViewIfNeeded();  
    await this.page.getByLabel('block-item-CollectionField-company-form-company.status-Status')
      .getByRole('button').first().click();
    await this.page.getByRole('option', {name: status}).click();
  }

  async submitCompany(){
    await this.page.getByRole('button', {name: 'Submit'}).scrollIntoViewIfNeeded();
    await this.page.getByRole('button', {name: 'Submit'}).click();
  }

  async editCompany(name: string){
    await this.page.getByText(name).first().click();
    await this.page.getByRole('button', {name: 'Edit'}).click();
  }
  
}
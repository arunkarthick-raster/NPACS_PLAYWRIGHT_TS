import { expect, Page, Locator } from "@playwright/test";

export class DashboardPage{
readonly page: Page;
readonly UserProfileIcon: Locator;
readonly LoginnedUserName: Locator;


constructor(page: Page){
    this.page = page;
    this.UserProfileIcon = page.locator('button.mat-focus-indicator.top-avatar.width-auto.mr-10.ml-5.ng-tns-c130-1.mat-icon-button.mat-button-base');
    this.LoginnedUserName = page.locator('div.d-ib.p-r.mt-5.full-width.fs-12.font-bold.grey-clr.mb-30.user-menu.ng-tns-c130-1');


}

async ViewUserProfile(): Promise<void>{
    await this.UserProfileIcon.click();
}

async ValidateLoginnedUser(ExpectedName: string):Promise<void>{
    await this.ViewUserProfile();
    await expect(this.LoginnedUserName).toHaveText(ExpectedName);
    console.log('Testcase passed');

}










}
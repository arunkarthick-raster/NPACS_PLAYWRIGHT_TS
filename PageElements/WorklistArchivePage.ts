import{Page, expect, Locator} from "@playwright/test";
import { DashboardPage } from "./DashboardPage";  

export class WorklistArchivePage{
readonly page: Page;
readonly MyWorklistTitle: Locator;

constructor(page: Page){
    this.page = page;
    this.MyWorklistTitle = page.locator('//*[text()="My Worklist"]');
}

async verifyWorklistArchivePage(ExpectedTitle: string){
    await expect(this.MyWorklistTitle).toHaveText(ExpectedTitle);
    console.log('Landed on Worklist Archive page successfully');
};

}
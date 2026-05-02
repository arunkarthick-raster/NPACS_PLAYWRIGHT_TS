import {test, expect, Page} from "@playwright/test";
import { POManager } from "../../PageElements/POManager";


test('Login and save session storage', async({page})=>{
    const pom = new POManager(page);
    await pom.getLoginPage().launchURL();
    await pom.getLoginPage().login('user.0','user@0');
    await expect(page).toHaveTitle('RIS | Front Office');
    const pageTitle = await page.title();
    console.log(pageTitle);
    await page.context().storageState({path:'../../.auth/drvijay.json'});
});

test.describe('Authenticated tests', () => {
    test.use({ storageState: '../../.auth/drvijay.json' });

test('Validate to land on Worklist Archive page', async({page})=>{
    const pom = new POManager(page);
    await pom.getLoginPage().launchURL();
    await pom.getDashboardPage().clickOnWorklistArchive();
    await pom.getWorklistArchivePage().verifyWorklistArchivePage('My Worklist');
});

});
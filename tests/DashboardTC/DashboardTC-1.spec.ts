import {test, expect} from '@playwright/test';
import { POManager } from '../../PageElements/POManager';


test('ValidateToApplyFilter_Modality_CT', async({page})=>{
    const pom = new POManager(page);
    await pom.getLoginPage().login('user.0','user@0');
    await expect(page).toHaveTitle('RIS | Front Office');
    const pageTitle = await page.title();
    console.log(pageTitle);

});


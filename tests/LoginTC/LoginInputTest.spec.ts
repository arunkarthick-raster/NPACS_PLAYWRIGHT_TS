import {test, expect} from '@playwright/test';
import { POManager } from '../../PageElements/POManager.js';


test('Login with Valid username and password', async({page})=>{
    const pom = new POManager(page);
    await pom.getLoginPage().launchURL();
    await pom.getLoginPage().login('raster','raster');
    await expect(page).toHaveTitle('RIS | Front Office');
    const pageTitle = await page.title();
    console.log(pageTitle);
});

test('Login with Valid username and Invalid password', async({page})=>{
    const pom = new POManager(page);
    await pom.getLoginPage().launchURL();
    await pom.getLoginPage().login('raster','rasster');
    await expect(page).toHaveTitle('Sign in to ris-pacs');
    const pageTitle = await page.title();
    console.log(pageTitle);
});

test('Login with Invalid username and valid password', async({page})=>{
    const pom = new POManager(page);
    await pom.getLoginPage().launchURL();
    await pom.getLoginPage().login('rasster','raster');
    await expect(page).toHaveTitle('Sign in to ris-pacs');
    const pageTitle = await page.title();
    console.log(pageTitle);
});

test('Login with Invalid username and Invalid password', async({page})=>{
    const pom = new POManager(page);
    await pom.getLoginPage().launchURL();
    await pom.getLoginPage().login('rasster','ra5ster');
    await expect(page).toHaveTitle('Sign in to ris-pacs');
    const pageTitle = await page.title();
    console.log(pageTitle);
});

test('Login with Whitespace in username and Valid password', async({page})=>{
    const pom = new POManager(page);
    await pom.getLoginPage().launchURL();
    await pom.getLoginPage().login('     ','raster');
    await expect(page).toHaveTitle('Sign in to ris-pacs');
    const pageTitle = await page.title();
    console.log(pageTitle);
});
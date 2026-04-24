import { expect, Page, Locator } from "@playwright/test";
import {jwtDecode} from 'jwt-decode';
import { lookup } from "node:dns/promises";
import { AuthData, LoginResult, DecodedToken } from "./auth.types.js"; 

export class LoginPage{

readonly page: Page;
readonly userName: Locator;
readonly passWord: Locator;
readonly signInButton: Locator;


constructor(page: Page){
    this.page = page;
    this.userName = page.locator('#username');
    this.passWord = page.locator('#password');
    this.signInButton = page.locator('#kc-login');
}

async launchURL(): Promise<void> {
    await this.page.goto('http://172.17.1.112:8080');
}

async dashboardURL(): Promise<void> {
    await this.page.goto('http://172.17.1.112:8080/radiologist-worklist');
}

async getAccessToken(page: Page): Promise<AuthData>{
  const response = await page.waitForResponse(res =>
  res.url().includes('/protocol/openid-connect/token') &&
  res.request().method() === 'POST' &&
  res.status() === 200);
const body: any = await response.json();
const token: string = body.access_token;
//console.log('Access_token11 : '+token);

const decoded: any = jwtDecode<DecodedToken>(token);
//console.log(decoded);   //get full response from JWT token

console.log('Groups: ', decoded.groups);    //get groups from response
//this.actualRoles = decoded.groups || [];
return {token, groups: decoded.groups || []};

}

async loginAndVerifyRoles(username: string, password: string): Promise<LoginResult>{
   await this.launchURL();
   const tokenPromise: Promise<AuthData> = this.getAccessToken(this.page);
  await this.userName.fill(username);
  await this.passWord.fill(password);
  await this.signInButton.click();
  await this.page.waitForLoadState('networkidle');
  const authData: AuthData = await tokenPromise;
  const actualRoles: string[] = this.AssertRoles(authData.groups);
   return {...authData, actualRoles};
}



AssertRoles(groups: string[]) {
  return (groups || []).filter(Boolean).map(role =>role.replace(/^\//, '').trim().toLowerCase());
}


async login(username: string, password: string){
  await this.userName.fill(username);
  await this.passWord.fill(password);
  await this.signInButton.click();
}

async loginAsAdmin():Promise<void>{
    this.login('raster','raster');
}

async loginAsHOD_DrVijay():Promise<void>{
    this.login('user.0','user@0');
}

async loginAsHOD_DrDeepak():Promise<void>{
    this.login('user.1','user@1');
}

}
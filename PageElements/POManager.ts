import { Page } from "@playwright/test";
import { DashboardPage } from "./DashboardPage";
import { LoginPage } from "./LoginPage";

export class POManager{
readonly page: Page;
readonly loginPage: LoginPage;
readonly dashboardPage: DashboardPage;

    constructor(page: Page){
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
    
}

getLoginPage(): LoginPage{
    return this.loginPage;
}

getDashboardPage(): DashboardPage{
    return this.dashboardPage;
}


}
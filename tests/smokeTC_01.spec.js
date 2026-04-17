import {test,expect} from "@playwright/test"
import AppDashboard from "../POM/appDashboard.page.js";
import ProjectLink from "../POM/projectLink.page.js";
import Login from "../POM/login.page.js";
import fs from "fs";
let dataFile=fs.readFileSync("C:/Users/sgarg/OneDrive/Desktop/Sales_Inventory_Automation_Script/DDT/smoke.json")
let commonData=JSON.parse(dataFile)

test("Login to app",async({browser}) => {
    let context=await browser.newContext();
    let page=await context.newPage();

//store the common data from json file
    let url=commonData.url;
    let usn=commonData.userName;
    let pwd=commonData.password;

//handel dialog or alert
    page.on("dialog",async(dialog)=>{
        console.log(await dialog.message())
        await dialog.accept()
    })

//create object for all the imported classes
    let AppDashboardObj=new AppDashboard(page);
    let ProjectLinkObj=new ProjectLink(page);

//launch the URL
    await page.goto(url)
//click on the app link------appDashboard Page
    await AppDashboardObj.appLink.click();
//click on the project link-------projectLink page
    let p2=page.waitForEvent('popup')
    await ProjectLinkObj.ProjectLink.click();
    let page2=await p2;
    let LoginObj=new Login(page2);
//fill the details on the login page-----login page
//enter username
    await LoginObj.usernameTF.fill(usn)
//enter password
    await LoginObj.passwordTF.fill(pwd)
//click on login button
    await LoginObj.loginButton.click()
    console.log("login successful")
//check using assertion------admin home page should displayed
    await expect(page2).toHaveURL("http://49.249.28.218:8081/AppServer/Sales_And_Inventory_System/pages/index.php")
    console.log("close");
    

})
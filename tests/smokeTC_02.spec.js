import {test,expect} from "@playwright/test"
import AppDashboard from "../POM/appDashboard.page.js"
import ProjectLink from "../POM/projectLink.page.js"
import Login from "../POM/login.page.js"
import Home from "../POM/home.page.js"
import fs from "fs"

let dataFile=fs.readFileSync("C:/Users/sgarg/OneDrive/Desktop/Sales_Inventory_Automation_Script/DDT/smoke.json")
let commonData=JSON.parse(dataFile)

test("Access customer module",async({page}) => {

//handle dialog
    page.on("dialog",async({dialog}) => {
        console.log(await dialog.message())
        await dialog.accept();
    })  

//store data from json file
    let url=commonData.url;
    let usn=commonData.userName;
    let pwd=commonData.password;

//create object for imported pom files
    let appDashboardObj=new AppDashboard(page)
    let projectLinkObj=new ProjectLink(page)

//launch the url
    await page.goto(url)
//click on the app link
    await appDashboardObj.appLink.click();
//click on project link
    let p2=page.waitForEvent('popup')
    await projectLinkObj.ProjectLink.click();
    let page2=await p2
    let loginObj=new Login(page2)
//fill the details on the login page
//enter username
    await loginObj.usernameTF.fill(usn)
//enter password
    await loginObj.passwordTF.fill(pwd);
//click on login button
    await loginObj.loginButton.click()
//click on customer module link
    let homeObj=new Home(page2)
    await homeObj.customerLink.click();
    await expect(page2).toHaveURL("http://49.249.28.218:8081/AppServer/Sales_And_Inventory_System/pages/customer.php")

})
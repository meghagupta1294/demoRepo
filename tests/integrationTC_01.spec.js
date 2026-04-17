import {test,expect} from "@playwright/test"
import AppDashboard from "../POM/appDashboard.page.js"
import ProjectLink from "../POM/projectLink.page.js"
import Login from "../POM/login.page.js"
import Home from "../POM/home.page.js"
import Customer from "../POM/customer.page.js"
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
    //create object for pom file using page2
        let loginObj=new Login(page2)
        let homeObj=new Home(page2)
        let customerObj=new Customer(page2)

//fill the details on the login page
//enter username
    await loginObj.usernameTF.fill(usn)
//enter password
    await loginObj.passwordTF.fill(pwd);
//click on login button
    await loginObj.loginButton.click()
//click on customer module link
    await homeObj.customerLink.click();
//click on customer+ button-------customer page
    await customerObj.addCustomerButton.click();
//enter firstname
    let name="mohan"+Math.random()
    await customerObj.firstNameTF.fill(name)
//enter lastname
    await customerObj.lastNameTF.fill("Ram")
//enter phone number
    await customerObj.phoneNoTF.fill("1234567890")
//click on save button
    await customerObj.saveButton.click();
    await page2.waitForTimeout(3000)
    //await page2.waitForLoadState("networkidle");
    await page2.locator('td[class="sorting_1"]').first().waitFor();{
        let allCustomer=await page2.locator('td[class="sorting_1"]').allTextContents();
            for(let firstName of allCustomer){
                if(firstName===name)
                    console.log(`customer ${firstName} is successfully added`)
            }
            await page2.locator('//a[text()="Next"]').click()
        }
    
})

import { test, expect } from '@playwright/test';
import ExcelJS from "exceljs"
import fs from "fs"
import Login from "../POM/Admin/login.page.js"
import Admin from '../POM/Admin/admin.page.js';
import Customer from '../POM/Admin/customer.page.js';
import Employee from '../POM/Admin/employee.page.js';

let datafile=fs.readFileSync("C:/Users/sgarg/OneDrive/Desktop/Sales_Inventory_Automation_Script/DDT/regression.json")
let commonData=JSON.parse(datafile)
let page;

test.beforeEach("Login to app",async({browser}) => {
    let context=await browser.newContext();
     page=await context.newPage();

  //handle alert
    page.on("dialog",async(dialog)=>{
      await dialog.accept();
    })

  //store common data from json file
    let URL=commonData.url;
    let usn=commonData.userName;
    let pwd=commonData.password;

  //create object for login class
    let loginObj=new Login(page);

  //login to app
    await page.goto(URL);
    await loginObj.userNameTF.fill(usn)
    await loginObj.passwordTF.fill(pwd)
    await loginObj.loginButton.click()

  //check using assertion admin dashboard should displayed
  await expect(page).toHaveURL("http://49.249.28.218:8081/AppServer/Sales_And_Inventory_System/pages/index.php");
});

test('@smoke customer', async () => {
  //create object of admin class
    let adminObj=new Admin(page)
  // Click the customer link.
    await adminObj.customerLink.click()
  // Expects page to have a heading with customer.
    await expect(page).toHaveURL("http://49.249.28.218:8081/AppServer/Sales_And_Inventory_System/pages/customer.php");
});

test("@regression add customer", async() => {
  //read data from customer excel
    let book=new ExcelJS.Workbook()
    await book.xlsx.readFile("C:/Users/sgarg/OneDrive/Desktop/Sales_Inventory_Automation_Script/DDT/customerData.xlsx")
    let sheet=book.getWorksheet("Sheet1")
    let firstName=sheet.getRow(2).getCell(1).toString()
    let lastName=sheet.getRow(2).getCell(2).toString();
    let phoneNumber=sheet.getRow(2).getCell(3).toString();
  //create object of Admin & customer class
    let adminObj=new Admin(page)
    let customerObj=new Customer(page)
  // Click the customer link.
    await adminObj.customerLink.click()
  //click on add customer button
    await customerObj.addCustomerButton.click();
  //fill details
    await customerObj.firstNameTF.fill(firstName);
    await customerObj.lastNameTF.fill(lastName);
    await customerObj.phoneNumberTF.fill(phoneNumber);
    await customerObj.saveButton.click();

})

test("@smoke employee",async() => {
  //create object of admin class
    let adminObj=new Admin(page)
  //click on employee link
    await adminObj.employeeLink.click();
  //expect page to have a heading with employee
    await expect(page).toHaveURL("http://49.249.28.218:8081/AppServer/Sales_And_Inventory_System/pages/employee.php")
});

test("@regression add employee", async() => {
  //read data from excel
    let book=new ExcelJS.Workbook()
   await book.xlsx.readFile("C:/Users/sgarg/OneDrive/Desktop/Sales_Inventory_Automation_Script/DDT/customerData.xlsx")
    let sheet=book.getWorksheet("empData")
    let firstName=sheet.getRow(2).getCell(1).toString()
    let lastName=sheet.getRow(2).getCell(2).toString()
    let gender=sheet.getRow(2).getCell(3).toString()
    console.log(gender)
    let email=sheet.getRow(2).getCell(4).toString()
    let phoneNumber=sheet.getRow(2).getCell(5).toString()
    let hiredDate=sheet.getRow(2).getCell(6).toString()
  //create object for admin class
    let adminObj=new Admin(page)
    let employeeObj=new Employee(page)
  //click on employee link
    await adminObj.employeeLink.click();
  //click on add employee button
    await employeeObj.addEmployeeButton.click();
  //fill details
    await employeeObj.firstNameTF.fill(firstName)
    await employeeObj.lastNameTF.fill(lastName)
    await employeeObj.genderDD.selectOption({label:gender})
    await employeeObj.emailTF.fill(email)
    await employeeObj.phoneNumberTF.fill(phoneNumber)
    await employeeObj.jobDD.selectOption({label:"Manager"})
    await employeeObj.hiredDateTF.fill(hiredDate)
    await employeeObj.provinceDD.selectOption({label:"Abra"})
    await employeeObj.cityDD.selectOption({label:"Bangued"})
    await employeeObj.saveButton.click()
})

test("@smoke product", async() => {
  //create object of admin class
    let adminObj=new Admin(page)
  //click on product link
    await adminObj.productLink.click();
  //expect page to have a heading with product
    await expect(page).toHaveURL("http://49.249.28.218:8081/AppServer/Sales_And_Inventory_System/pages/product.php")
});

test("@smoke inventory", async() => {
  //create object of admin class
    let adminObj=new Admin(page)
  //click on inventory link
    await adminObj.inventoryLink.click();
  //expect page to have a heading with inventory
    await expect(page).toHaveURL("http://49.249.28.218:8081/AppServer/Sales_And_Inventory_System/pages/inventory.php")
});



// })

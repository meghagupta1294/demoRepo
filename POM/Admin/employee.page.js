class Employee{
    constructor(page){
        this.addEmployeeButton=page.locator("//a/i[@class='fas fa-fw fa-plus']")
        this.firstNameTF=page.locator("//div[@id='employeeModal']//input[@name='firstname']")
        this.lastNameTF=page.locator("//div[@id='employeeModal']//input[@name='lastname']")
        this.genderDD=page.locator("//div[@id='employeeModal']//select[@name='gender']")
        this.emailTF=page.locator("//div[@id='employeeModal']//input[@name='email']")
        this.phoneNumberTF=page.locator("//div[@id='employeeModal']//input[@name='phonenumber']")
        this.jobDD=page.locator("//div[@id='employeeModal']//select[@name='jobs']")
        this.hiredDateTF=page.locator("//div[@id='employeeModal']//input[@name='hireddate']")
        this.provinceDD=page.locator("//div[@id='employeeModal']//select[@name='province']")
        this.cityDD=page.locator("//div[@id='employeeModal']//select[@name='city']")
        this.saveButton=page.locator("//div[@id='employeeModal']//button[@type='submit']")
        this.resetButton=page.locator("//div[@id='employeeModal']//button[@type='reset']")
        this.cancelButton=page.locator("//div[@id='employeeModal']//button[text()='Cancel']")

    }
}
export default Employee
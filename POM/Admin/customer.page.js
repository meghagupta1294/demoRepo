class Customer{
    constructor(page){
        this.addCustomerButton=page.locator("//a/i[@class='fas fa-fw fa-plus']")
        this.firstNameTF=page.locator("#customerModal input[name='firstname']");
        this.lastNameTF=page.locator("//div[@id='customerModal']//input[@name='lastname']");
        this.phoneNumberTF=page.locator("//div[@id='customerModal']//input[@name='phonenumber']")
        this.saveButton=page.getByRole("button",{name:"Save"})
        this.resetButton=page.getByRole("button",{name:"Reset"})
        this.cancelButton=page.getByRole("button",{name:"Cancel"})
    }
}
export default Customer
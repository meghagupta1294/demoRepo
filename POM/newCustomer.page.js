class NewCustomer{
    constructor(page3){
        this.firstNameTF=page3.locator('input[name="firstname"]');
        this.lastNameTF=page3.locator('input[name="lastname"]')
        this.phoneNoTF=page3.locator('input[name="phonenumber"]')
        this.saveButton=page3.getByRole("button",{name:'Save'})
    }
}
export default NewCustomer
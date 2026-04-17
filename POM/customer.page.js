class Customer{
    constructor(page2){
        this.addCustomerButton=page2.locator('i[class="fas fa-fw fa-plus"]')
        this.firstNameTF=page2.locator('#customerModal input[name="firstname"]');
        this.lastNameTF=page2.locator('#customerModal input[name="lastname"]')
        this.phoneNoTF=page2.locator('#customerModal input[name="phonenumber"]')
        this.saveButton=page2.getByRole("button",{name:'Save'})
    }
}
export default Customer
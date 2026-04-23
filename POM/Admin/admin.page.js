class Admin{
    constructor(page){
        this.customerLink=page.locator('//span[text()="Customer"]');
        this.employeeLink=page.locator("//span[text()='Employee']");
        this.productLink=page.locator("//span[text()='Product']");
        this.inventoryLink=page.locator("//span[text()='Inventory']");
    }
}
export default Admin
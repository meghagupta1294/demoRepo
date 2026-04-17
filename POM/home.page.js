class Home{
    constructor(page2){
        this.customerLink=page2.getByRole("link",{name:'Customer'})
    }
}
export default Home
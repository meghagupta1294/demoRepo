class Login{
    constructor(page){
        this.userNameTF= page.getByPlaceholder("Username");
        this.passwordTF=page.getByPlaceholder("Password");
        this.loginButton=page.getByRole("button",{name:"login"})
    }
}
export default Login
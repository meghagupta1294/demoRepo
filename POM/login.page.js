class Login{
    constructor(page2){
        this.usernameTF=page2.getByPlaceholder('Username');
        this.passwordTF=page2.getByPlaceholder('Password');
        this.loginButton=page2.getByRole("button",{name:'Login'});
    }
}
export default Login
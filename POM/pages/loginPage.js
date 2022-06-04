import { Selector, t} from 'testcafe';

class LoginPage{
    constructor(){
        this.url = 'https://todoist.com/auth/login';
        this.email = Selector('#labeled-input-1');
        this.password = Selector('#labeled-input-3');
        this.loginBtn = Selector('button[type="submit"]');
        this.errorMsgEmail = this.email.parent().parent().nextSibling(0);
        this.errorMsgPassword = this.password.parent().parent().nextSibling(0);
        this.errorEmailOrPass = this.email.parent().parent().parent().parent().child(0);
    };

    async makeLogin(email, password){
        await this.inputEmail(email);
        await this.inputPassword(password);
        await this.clickLoginBtn();
    };

    async inputEmail(email){
        await t.typeText(this.email, email);
    };

    async inputPassword(password){
        await t.typeText(this.password, password);
    };

    async clickLoginBtn(){
        await t.click(this.loginBtn);
    };

};

export default new LoginPage();
import { ClientFunction, Selector } from 'testcafe';
import LoginPage from '../pages/loginPage';
import TodayPage from '../pages/todayPage';
import MainBars from '../pages/mainBars';
import { EMAIL, PASSWORD } from '../data/configVariables.js';

const windowLocation = ClientFunction(() => window.location);

fixture('Login test cases')
    .page('https://todoist.com/auth/login');

test.only('Login - Correct Credentials', async t => {
    await LoginPage.makeLogin(EMAIL, PASSWORD);
    //It seems that when we chain expects we are triggering them at the same time
    //to that why Ive call them separatly. ASK THIS, MAYBE IS NOT THE CORRECT WAY
    await t.expect(MainBars.inboxBtn.exists).ok({timeout:10000});
    await t.expect((await windowLocation()).href).eql(TodayPage.url);
});

test('Login - Wrong email', async t => {
    await LoginPage.inputEmail('nonexistingemail@gmail.com');
    await LoginPage.inputPassword(PASSWORD);
    await LoginPage.clickLoginBtn();

    await t.expect(LoginPage.errorEmailOrPass.innerText).contains('Wrong email or password.');
    await t.expect((await windowLocation()).href).eql(LoginPage.url);
});

test('Login - Wrong password', async t => {
    await LoginPage.inputEmail(EMAIL);
    await LoginPage.inputPassword('wrongpass');
    await LoginPage.clickLoginBtn();

    await t.expect(LoginPage.errorEmailOrPass.innerText).contains('Wrong email or password.');
    await t.expect((await windowLocation()).href).eql(LoginPage.url);
});

test('Login - Empty email', async t => {
    await LoginPage.inputPassword(PASSWORD);
    await LoginPage.clickLoginBtn();

    await t.expect(LoginPage.errorMsgEmail.innerText).contains('Please enter a valid email address.');
    await t.expect((await windowLocation()).href).eql(LoginPage.url);

});

test('Login - Empty password', async t => {
    await LoginPage.inputEmail(EMAIL);
    await LoginPage.clickLoginBtn();

    await t.expect(LoginPage.errorMsgPassword.innerText).contains('Passwords must be at least 8 characters long.');
    await t.expect((await windowLocation()).href).eql(LoginPage.url);

});

import { ClientFunction, Selector } from 'testcafe';
import LoginPage from '../pages/loginPage';
import CreateTaskPage from '../pages/createTaskPage';
import MainBars from '../pages/mainBars';
import { EMAIL, PASSWORD } from '../data/configVariables.js';

const windowLocation = ClientFunction(() => window.location);

fixture('User can login')
    .page(LoginPage.url);

test('A user can login with correct credentials', async t => {
    await LoginPage.makeLogin(EMAIL, PASSWORD);
    //It seems that when we chain expects we are triggering them at the same time
    //to that why Ive call them separatly. ASK THIS, MAYBE IS NOT THE CORRECT WAY
    await t.expect(MainBars.inboxBtn.exists).ok({timeout:10000});
    await t.expect((await windowLocation()).href).eql('https://todoist.com/app/today');
});

test('A user cant login with wrong email', async t => {
    await LoginPage.inputEmail('nonexistingemail@gmail.com');
    await LoginPage.inputPassword(PASSWORD);
    await LoginPage.clickLoginBtn();

    await t.expect(LoginPage.errorEmailOrPass.innerText).contains('Wrong email or password.');
    await t.expect((await windowLocation()).href).eql(LoginPage.url);
});

test('A user cant login with a wrong password', async t => {
    await LoginPage.inputEmail(EMAIL);
    await LoginPage.inputPassword('wrongpass');
    await LoginPage.clickLoginBtn();

    await t.expect(LoginPage.errorEmailOrPass.innerText).contains('Wrong email or password.');
    await t.expect((await windowLocation()).href).eql(LoginPage.url);
});

test('A user cant login with an empty email', async t => {
    await LoginPage.inputPassword(PASSWORD);
    await LoginPage.clickLoginBtn();

    await t.expect(LoginPage.errorMsgEmail.innerText).contains('Please enter a valid email address.');
    await t.expect((await windowLocation()).href).eql(LoginPage.url);

});

test('A user cant login with an empty password', async t => {
    await LoginPage.inputEmail(EMAIL);
    await LoginPage.clickLoginBtn();

    await t.expect(LoginPage.errorMsgPassword.innerText).contains('Passwords must be at least 8 characters long.');
    await t.expect((await windowLocation()).href).eql(LoginPage.url);

});

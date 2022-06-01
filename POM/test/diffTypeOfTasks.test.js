import LoginPage from '../pages/loginPage';
import TodayPage from '../pages/todayPage';
import MainBars from '../pages/mainBars';
import InboxPage from '../pages/inboxPage';
import { EMAIL, PASSWORD } from '../data/configVariables.js';
const dataTask = require('../data/taskData.json');

fixture('Create new tasks')
    .page('https://todoist.com/auth/login')

    .beforeEach(async t => {
        await LoginPage.makeLogin(EMAIL, PASSWORD);
        await t.expect(MainBars.inboxBtn.exists).ok({timeout:10000});
    });

    //Testing git with 2 accounts
dataTask.forEach( (data, index) => {
    test(`Create task with title - ${data.title}`, async t => {

        if(data.dateOption == 'future'){
            await TodayPage.createTaskWithGivenDate(data.title, data.descripion, data.date);
        }else{
            await TodayPage.createTaskForAFixeddOption(data.title, data.descripion, data.dateOption);
        }
        await MainBars.goToInbox();
        await InboxPage.validateTaskTitle(data.title);
        if(data.dateOption != 'no date'){
            await InboxPage.validateTaskDateType(data.title, data.dateOption);
        }else{
            await InboxPage.validateTaskHasNoDate('Pintar5');
        }
    });
} );




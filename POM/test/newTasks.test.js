import LoginPage from '../pages/loginPage';
import TodayPage from '../pages/todayPage';
import MainBars from '../pages/mainBars';
import InboxPage from '../pages/inboxPage';
import { EMAIL, PASSWORD } from '../data/configVariables.js';
const dataTask = require('../data/taskData.json');

fixture('User can create new tasks')
    .page('https://todoist.com/auth/login')

    .beforeEach(async t => {
        await LoginPage.makeLogin(EMAIL, PASSWORD);
        await t.expect(MainBars.inboxBtn.exists).ok({timeout:10000});
    })
    //test teardown to clean environment
    .afterEach(async ctx => {
        await MainBars.goToInbox();
        await InboxPage.deleteAllTasks();
    });

test('A user can create one task with a Given date', async () => {
    await TodayPage.createTaskWithGivenDate('Pintar', 'Pintar un paisaje', 'Dec 20');
    await MainBars.goToInbox();
    await InboxPage.assertTaskTitleAndDateType('Pintar', 'future');
});

test('A user can create one task for today', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar1', 'Pintar un paisaje1', 'today');
    await MainBars.goToInbox();
    await InboxPage.assertTaskTitleAndDateType('Pintar1', 'today');
});

test('A user can create one task for tomorrow', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar2', 'Pintar un paisaje2', 'tomorrow');
    await MainBars.goToInbox();
    await InboxPage.assertTaskTitleAndDateType('Pintar2', 'tom');
});

test('A user can create one task for next weekend', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar3', 'Pintar un paisaje3', 'next_weekend');
    await MainBars.goToInbox();
    await InboxPage.assertTaskTitleAndDateType('Pintar3', 'next_week');
});

test('A user can create one task for next week', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar4', 'Pintar un paisaje4', 'next_week');
    await MainBars.goToInbox();
    await InboxPage.assertTaskTitleAndDateType('Pintar4', 'next_week');
});

test('A user can create one task with no date', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar5', 'Pintar un paisaje5', 'no date');
    await MainBars.goToInbox();
    await InboxPage.assertTaskTitle('Pintar5');
    await InboxPage.assertTaskHasNoDate('Pintar5');
});
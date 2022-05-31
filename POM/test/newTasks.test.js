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

test.only('Create one task with a Given date', async () => {
    await TodayPage.createTaskWithGivenDate('Pintar', 'Pintar un paisaje', 'Dec 20');
    await MainBars.goToInbox();
    await InboxPage.validateTaskTitle('Pintar');
    await InboxPage.validateTaskDateType('Pintar', 'future');
});

test('Create one task for today', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar1', 'Pintar un paisaje1', 'today');
    await MainBars.goToInbox();
    await InboxPage.validateTaskTitle('Pintar1');
    await InboxPage.validateTaskDateType('Pintar1', 'today');
});

test('Create one task for tomorrow', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar2', 'Pintar un paisaje2', 'tomorrow');
    await MainBars.goToInbox();
    await InboxPage.validateTaskTitle('Pintar2');
    await InboxPage.validateTaskDateType('Pintar2', 'tom');
});

test('Create one task for next weekend', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar3', 'Pintar un paisaje3', 'next weekend');
    await MainBars.goToInbox();
    await InboxPage.validateTaskTitle('Pintar3');
    await InboxPage.validateTaskDateType('Pintar3', 'next_week');
});

test('Create one task for next week', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar4', 'Pintar un paisaje4', 'next week');
    await MainBars.goToInbox();
    await InboxPage.validateTaskTitle('Pintar4');
    await InboxPage.validateTaskDateType('Pintar4', 'next_week');
});

test('Create one task with no date', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar5', 'Pintar un paisaje5', 'no date');
    await MainBars.goToInbox();
    await InboxPage.validateTaskTitle('Pintar5');
    await InboxPage.validateTaskHasNoDate('Pintar5');
});
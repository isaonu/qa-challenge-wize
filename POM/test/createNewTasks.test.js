import LoginPage from '../pages/loginPage';
import TodayPage from '../pages/todayPage';
import MainBars from '../pages/mainBars';
import ProjectPage from '../pages/projectPage';
import { EMAIL, PASSWORD } from '../data/configVariables.js';

fixture('User can create new tasks')
    .page('https://todoist.com/auth/login')

    .beforeEach(async t => {
        await LoginPage.makeLogin(EMAIL, PASSWORD);
        await t.expect(MainBars.inboxBtn.exists).ok({timeout:10000});
    })
    //test teardown to clean environment
    .afterEach(async () => {
        await MainBars.goToInbox();
        await ProjectPage.deleteAllTasks();
    });

test('A user can create one task with a Given date', async () => {
    await TodayPage.createTaskWithGivenDate('Pintar', 'Pintar un paisaje', 'Dec 20');
    await MainBars.goToInbox();
    await ProjectPage.assertTaskTitleAndDate('Pintar', 'Dec 20');
});

test('A user can create one task for today', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar1', 'Pintar un paisaje1', 'Today');
    await MainBars.goToInbox();
    await ProjectPage.assertTaskTitleAndDate('Pintar1', 'Today');
});

test('A user can create one task for tomorrow', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar2', 'Pintar un paisaje2', 'Tomorrow');
    await MainBars.goToInbox();
    await ProjectPage.assertTaskTitleAndDate('Pintar2', 'Tomorrow');
});

test('A user can create one task for next weekend', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar3', 'Pintar un paisaje3', 'Next weekend');
    await MainBars.goToInbox();
    await ProjectPage.assertTaskTitleAndDate('Pintar3', 'Saturday');
});

test('A user can create one task for next week', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar4', 'Pintar un paisaje4', 'Next week');
    await MainBars.goToInbox();
    await ProjectPage.assertTaskTitleAndDate('Pintar4', 'Monday');
});

test('A user can create one task with no date', async () => {
    await TodayPage.createTaskForAFixeddOption('Pintar5', 'Pintar un paisaje5', 'No date');
    await MainBars.goToInbox();
    await ProjectPage.assertTaskTitle('Pintar5');
    await ProjectPage.assertTaskHasNoDate('Pintar5');
});
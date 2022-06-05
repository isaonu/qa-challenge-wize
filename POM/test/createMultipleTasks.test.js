import LoginPage from '../pages/loginPage';
import TodayPage from '../pages/todayPage';
import MainBars from '../pages/mainBars';
import ProjectPage from '../pages/projectPage';
import { EMAIL, PASSWORD } from '../data/configVariables.js';
import dataTask from '../data/taskData.json';

fixture('Multiple tasks')
    .page('https://todoist.com/auth/login')

    .beforeEach(async t => {
        await LoginPage.makeLogin(EMAIL, PASSWORD);
        await t.expect(MainBars.inboxBtn.exists).ok({timeout:10000});
    })
    //test teardown to clean environment
    .afterEach(async ctx => {
        await MainBars.goToInbox();
        await ProjectPage.deleteAllTasks();
    });

test('A user can create multiple task within a session', async t => {
    await TodayPage.createMultipleTask(10, dataTask);
    await MainBars.goToInbox();
    await ProjectPage.assertTitleAndDateMultipleTasks(dataTask);
} );



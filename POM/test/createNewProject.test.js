import LoginPage from '../pages/loginPage';
import CreateTaskPage from '../pages/createTaskPage';
import MainBars from '../pages/mainBars';
import ProjectPage from '../pages/projectPage';
import CreateProjectPage from '../pages/createProjectPage';
import { EMAIL, PASSWORD } from '../data/configVariables.js';

fixture('User can create a new project and task on it')
    .page('https://todoist.com/auth/login')

    .beforeEach(async t => {
        await LoginPage.makeLogin(EMAIL, PASSWORD);
        await t.expect(MainBars.inboxBtn.exists).ok({timeout:10000});
    });

test('User can create a new project', async () => {
    await CreateProjectPage.creteNewProject('test20', 'Yellow');
});

test('User can add task to an empty custom project', async () => {
    await MainBars.goToProject('test20');
    await CreateTaskPage.createTaskForAFixeddOption('Pintar4', 'Pintar un paisaje4', 'Next week');
    await ProjectPage.assertTaskTitleAndDate('Pintar4', 'Monday');
    await ProjectPage.deleteProject('test20');
});

test('User can create a project and inmidiately add a task', async ()=> {
    await CreateProjectPage.creteNewProject('test30', 'Grape');
    await CreateTaskPage.createTaskForAFixeddOption('Pintar4', 'Pintar un paisaje4', 'Next weekend');
    await ProjectPage.assertTaskTitleAndDate('Pintar4', 'Saturday');
    await ProjectPage.deleteProject('test30');
});

test('User can delete a project', async () => {
    await CreateProjectPage.creteNewProject('test40', 'Teal');
    await MainBars.goToProject('test40');
    await ProjectPage.deleteProject('test40');
    await MainBars.assertProjectDoesntExits('test40');
});

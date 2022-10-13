import LoginPage from '../pages/loginPage';
import MainBars from '../pages/mainBars';
import { EMAIL, PASSWORD } from '../data/configVariables.js';
import TaskPage from '../pages/taskPage';
import CreateTaskPage from '../pages/createTaskPage';
import ProjectPage from '../pages/projectPage';


fixture('User can edit tasks')
    .page(LoginPage.url)
    .beforeEach(async t => {
        await LoginPage.makeLogin(EMAIL, PASSWORD);
        await t.expect(MainBars.inboxBtn.exists).ok({timeout:10000});
    })
    //test teardown to clean environment
    .afterEach(async () => {
        await MainBars.goToInbox();
        await ProjectPage.deleteAllTasks();
    });

test('A user can add subtask to existing task', async () => {
    await CreateTaskPage.createTaskWithGivenDate('Pintar', 'Pintar un paisaje', 'Dec 20');
    await MainBars.goToInbox();
    await TaskPage.createSubtaskWithGivenDate('Pintar', 'Pintar el cielo', 'Usar acuarela', 'Dec 10');
    TaskPage.assertSubtaskExist('Pintar el cielo');
});

test('A user can update the priority of a subtask', async () => {
    await CreateTaskPage.createTaskWithGivenDate('Entrenar', 'Entreamiento para 10k', 'Jan 13');
    await MainBars.goToInbox();
    await TaskPage.createSubtaskWithGivenDate('Entrenar', 'Piernas', '5 repeticiones de 10', 'Jan 2');
    await TaskPage.openTaskWindow('Entrenar');
    await TaskPage.openSubtask('Piernas');
    await TaskPage.updateTaskPriority(2);
    TaskPage.assertPriority('P2');
    await TaskPage.closeTaskWindow();
});

test('A user can update de date of an existing task', async () =>{
    await CreateTaskPage.createTaskWithGivenDate('Entrenar', 'Entreamiento para 10k', 'Jan 13');
    await MainBars.goToInbox();
    //await TaskPage.openTaskWindow('Entrenar');
    await TaskPage.updateTaskDueDateToGivenDate('Entrenar', 'Feb 20');
    await TaskPage.closeTaskWindow();
    await ProjectPage.assertTaskDate('Entrenar', 'Feb 20');
});
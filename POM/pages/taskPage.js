import { Selector, t } from 'testcafe';
import CreateTaskPage from './createTaskPage';
import ProjectPage from './projectPage';

class TaskPage{
    constructor(){
        this.addSubtaskBtn = Selector('span').withText('Add sub-task');
        //Selector('.richtextinput').child('[role="texbox"]') doesnt work, child to be used for direct no child of child
        this.subtaskTitle = Selector('div.richtextinput>div>div').child('[role="textbox"]');
        this.dueDate = Selector('[aria-label="Due date"]').find('button');
        this.schedulerInput = Selector('.scheduler-input').child('input');
        this.subtaskDescription = Selector('[placeholder="Description"]');
        this.priorityBlock = Selector('[aria-label="Priority"]');
        this.priorityPicker = this.priorityBlock.find('button');
        //Use the following select with withText()
        this.priority = Selector('.priority_picker_item_name');
        this.closeTaskWindowBtn = Selector('[aria-label="Close modal"]');
        //Use this with withText()
        this.subTask = Selector('#task-detail-subtasks-panel');
    };

    async createSubtaskWithGivenDate(mainTask, title, description, givenDate){
        await this.openTaskWindow(mainTask);
        //await t.hover(this.addSubtaskBtn);
        await t.click(this.addSubtaskBtn);
        await t
            .typeText(this.subtaskTitle, title)
            .typeText(this.subtaskDescription, description);
        await CreateTaskPage.addGivenDateToNewTask(givenDate);
        await this.closeTaskWindow();
    };

    async updateTaskPriority(priority){
        if(priority == 1)
            priority = 'Priority 1';
        else if(priority == 2)
            priority = 'Priority 2';
        else if(priority == 3)
            priority = 'Priority 3';
        else
            priority = 'Priority 4';
        await t
            .click(this.priorityPicker)
            .click(this.priority.withText(priority))
            .wait(1000);
    };

    async updateTaskDueDateToGivenDate(taskTitle, newDate){
        await this.openTaskWindow(taskTitle);
        await t
            .click(this.dueDate)
            .typeText(this.schedulerInput, newDate)
            .pressKey('enter');
    };

    async closeTaskWindow(){
        await t.click(this.closeTaskWindowBtn);
    };

    async openTaskWindow(taskTitle){
        await t.click(ProjectPage.taskBody.withText(taskTitle));
    };
    
    async openSubtask(title){
        await t.click(this.subTask(title));
    };

    assertSubtaskExist(title){
        t.expect(this.subTask(title).exists).ok;
    };

    assertPriority(priority){
        t.expect(this.priorityBlock.withText(priority).exists);
    };
};

export default new TaskPage();
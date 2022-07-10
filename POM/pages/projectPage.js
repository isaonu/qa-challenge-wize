import { Selector, t } from 'testcafe';

class ProjectPage{
    #validationFixedDates = ['Today', 'Tomorrow', 'Monday', 'Saturday'];
    #fixedDates = ['Today', 'Tomorrow', 'Next week', 'Next weekend'];
    constructor(){
        this.taskBody = Selector('.task_list_item__body');
        this.taskItemClass = '.task_list_item__content';
        this.divTaskDateClass = '.task_list_item__info_tags';
        this.btnDeleteTaskPopUp = Selector('button').withText('Delete');
        this.dueDateTaskWindow = Selector('div').find('[aria-label="Due date"] span');
        this.closeTaskWindowBtn = Selector('button[aria-label="Close modal"]');
        this.projectMenuBtn = Selector('[aria-label="Project options menu"]');
        this.projectMenuDeleteBtn = Selector('[role="menu"]').child('li').nth(-1);
        this.submitBtn = Selector('button[type="submit"]');
    };

    /*
     * Asserts that title is the expected one
     * @param {string} title - The expected title of the task
     */
    async assertTaskTitle(title){
        await t.expect(this.taskBody.withText(title).exists)
            .ok(`There isnt any task with '${title}' as title`);
    };
    
    /*
     * Asserts the due fate of the task
     * @param {string} title - The expected title of the task
     * @param {string} date - The expected due date of the task
     */
    async assertTaskDate(title, date){
        await this.openTaskWindow(title);
        const currentTaskDate = await this.dueDateTaskWindow.innerText;
        await this.closeTaskWindow()
        await t.expect(currentTaskDate).eql(date);  
    };

    /*
     * Asserts both title and the type of date in the task
     * @param {string} title - The expected title of the task
     * @param {string} type - The type of date , i.e today, tomorrow, next week
     */
    //async assertTaskTitleAndDateType(title, type){
    async assertTaskTitleAndDate(title, date){
        title = title.replace(/\s/g,'\u00a0');
        await this.assertTaskTitle(title);
        await this.assertTaskDate(title, date);
    };

    /*
     * Asserts that a task with the given title doesnt have a specific date
     * @param {string} title - The expected title of the task
     */
    async assertTaskHasNoDate(title){
        await this.openTaskWindow(title);
        const dueDateExist = await this.dueDateTaskWindow.exists;
        await this.closeTaskWindow();
        await t.expect(dueDateExist).notOk('Task date shouldnt be present in a no date task', {timeout:100});
    };

    /*
     * Asserts that a group of task were create with the correct date type and title
     * @param {object} dataTask - An array of object with the task data to be validated
     */
    async assertTitleAndDateMultipleTasks(dataTask){
        let title = '';
        for(let data of dataTask) {
            //Replacing white spaces with unicode representation of $nbsp;
            title = data.title.replace(/\s/g,'\u00a0');
            await this.assertTaskTitle(title);
            if(data.dateOption != 'no date' && data.dateOption != 'future'){
                await this.assertTaskDate(title, data.dateOption);
            }else if(data.dateOption == 'future'){
                await this.assertTaskDate(title, data.date);
            }
            else{
                await this.assertTaskHasNoDate(title);
            }
        };
    };

    async openTaskWindow(title){
        await t.click(this.taskBody.withText(title));
    };
    async closeTaskWindow(){
        await t.click(this.closeTaskWindowBtn);
    };
    /*
     * delete a task
     * @param {object} givenTask - One testcafe selector as type this.taskBody
     */
    async deleteTask(givenTask){
        await t
            .hover(givenTask)
            .click(givenTask.child('.task_list_item__actions').child('button').withAttribute('data-testid','more_menu'))
            //for example this doesnt work neither
            //.click(Selector('.item_menu_list').child('div').withText('Delete task'))
            //but the following well...
            .click(Selector('.item_menu_list').child('li').withText('Delete task'))
            .click(this.btnDeleteTaskPopUp)
            .wait(1000);
    };

    /*
     * delete a task base on its title
     * @param {string} title - The title of the task to be deleted
     */
    async deleteTaskWithTitle(title){
        const cleanTitle = title.replace(/\s/g,'\u00a0');
        const taskWithTitle = this.taskBody.withText(cleanTitle);
        
       await this.deleteTask(taskWithTitle);
    };

    /*
     * delete a all existing task in a project
     */
    async deleteAllTasks(){
        const existingTasks = await this.taskBody.count;
        for(let i=0; i < existingTasks; i++){
            await this.deleteTask(this.taskBody.nth(0));
        }
    };

    async deleteProject(name){
        await t
            .click(this.projectMenuBtn)
            .click(this.projectMenuDeleteBtn)
            .click(this.submitBtn)
            .wait(1000);
    };
}

export default new ProjectPage();
import { Selector, t } from 'testcafe';

class InboxPage{
    constructor(){
        this.taskBody = Selector('.task_list_item__body');
        this.taskItemClass = '.task_list_item__content';
        this.divTaskDateClass = '.task_list_item__info_tags';
        this.btnDeleteTaskPopUp = Selector('button').withText('Delete');
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
     * Asserts that a task with the given title has the given type of date, i.e today, tomorrow, next week
     * @param {string} title - The expected title of the task
     * @param {string} type - The type of date , i.e today, tomorrow, next week
     */
    async assertTaskDateType(title, type){
        //Algo como lo sig no me funciono... pareciera que child fuera directo..
        //let taskDate = this.taskBody.withText(title).child('.task_list_item__content').child().withAttribute('class', /date/);
        //let taskDate = this.taskBody.withText(title).child().withAttribute('class', /date/);
        let taskDate = this.taskBody.withText(title).child(this.taskItemClass).child(1).child(0).child(0).withAttribute('class', /date/);
        await t.expect(taskDate.getAttribute('class')).contains(type, `The task due date for task '${title}' is not the expected '${type}'`);

    };
    
    /*
     * Asserts both title and the type of date in the task
     * @param {string} title - The expected title of the task
     * @param {string} type - The type of date , i.e today, tomorrow, next week
     */
    async assertTaskTitleAndDateType(title, type){
        title = title.replace(/\s/g,'\u00a0');
        this.assertTaskTitle(title);
        this.assertTaskDateType(title, type);
    };

    /*
     * Asserts that a task with the given title doesnt have a specific date
     * @param {string} title - The expected title of the task
     */
    async assertTaskHasNoDate(title){
        const taskDate = this.taskBody.withText(title).child(this.taskItemClass).child(this.divTaskDateClass).child('button').exists;
        await t.expect(taskDate).notOk('Task date should be present in a no date task');
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
            if(data.dateOption != 'no date'){
                await this.assertTaskDateType(title, data.dateOption);
            }else{
                await this.assertTaskHasNoDate(title);
            }
        };
    };

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

    async deleteTaskWithTitle(title){
        const cleanTitle = title.replace(/\s/g,'\u00a0');
        const taskWithTitle = this.taskBody.withText(cleanTitle);
        
       await this.deleteTask(taskWithTitle);
    };

    async deleteAllTasks(){
        const existingTasks = await this.taskBody.count;
        for(let i=0; i < existingTasks; i++){
            await this.deleteTask(this.taskBody.nth(0));
        }
    };
}

export default new InboxPage();
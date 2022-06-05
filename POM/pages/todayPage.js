import { Selector, t } from 'testcafe';

class TodayPage{
    constructor(){
        this.url = 'https://todoist.com/app/today';
        this.newTaskBtn = Selector('button.plus_add_button');
        this.taskTitleInput = Selector('div').withAttribute('role','textbox');
        this.taskDescriptionInput = Selector('textarea').withAttribute('placeholder', 'Description');
        this.createTaskBtn = Selector('button[type="submit"]');
        this.dueDateBtn = Selector('button.item_due_selector');
        this.dateInput = Selector('.scheduler-input>input');
        //Regex expression in withAttribute
        this.dueTodayBtn = Selector('button').withAttribute('data-action-hint', /today/);
        this.dueTomorrowBtn = Selector('button').withAttribute('data-action-hint', /tomorrow/);
        //Check this not sure if it may change to thisWeekend depending on the day
        this.dueNextWeekendBtn = Selector('button').withAttribute('data-action-hint', /nextWeekend/);
        this.dueNextWeekBtn = Selector('button').withAttribute('data-action-hint', /nextWeek/);
        this.dueNoDateBtn = Selector('button').withAttribute('data-action-hint', /noDate/);
    };

     /*
     * Create a task with a given title, description and exact date
     * @param {string} title - The title of the task
     * @param {string} description - The description of the task
     * @param {string} exactDate - Is a string containing a month and date, i.e Dec 20
     */
    async createTaskWithGivenDate(title, description, exactDate){
        await t.click(this.newTaskBtn);
        await this.fillTaskInfo(title, description);
        await this.addGivenDateToNewTask(exactDate);
    };

    /*
     * Add a specific date to a task being created
     * @param {string} exactDate - Is a string containing a month and date, i.e Dec 20
     */
    async addGivenDateToNewTask(exactDate){
        await t
            .click(this.dueDateBtn)
            .typeText(this.dateInput, exactDate)
            .pressKey('enter')
            .click(this.createTaskBtn)
            .wait(1000);
    };

    /*
     * Creates a task with a title, description and a given string date
     * @param {string} title - The title of the task
     * @param {string} description - The description of the task
     * @param {string} time - Is a string for a existing string option, i.e today, tomorrow
     */
    async createTaskForAFixeddOption(title, description, time){
        await t.click(this.newTaskBtn)
        await this.fillTaskInfo(title, description);
        await this.addFixedOptioneDateForNewTask(time);
    };

    /*
     * Add the string date for a task being created
     * @param {string} time - Is a string for a existing string option, i.e today, tomorrow
     */
    async addFixedOptioneDateForNewTask(time){
        await t.click(this.dueDateBtn);
        switch(time){
            case 'today':
                await t.pressKey('esc')
                break;
            case 'tomorrow':
                await t.click(this.dueTomorrowBtn);
                break;
            case 'next_weekend':
                await t.click(this.dueNextWeekendBtn);
                break;
            case 'next_week':
                await t.click(this.dueNextWeekBtn);
                break;
            case 'no date':
                await t.click(this.dueNoDateBtn);
                break;
            default:
                console.log(`Wrong fixed options ${time}`);
                //Failing test if we get here
                await t.expect(false).ok()
                break;
        }
        await t.click(this.createTaskBtn);
        await t.wait(1000);
    };

     /*
     * Add the title and the description to a task being created
     * @param {string} title - The title of the task
     * @param {string} description - The description of the task
     */
    async fillTaskInfo(title, description){
        await t
            .typeText(this.taskTitleInput, title)
            .typeText(this.taskDescriptionInput, description);
    }

     /*
     * Create many task in a project
     * @param {number} numberOfTask - The number of tasks to be created, which shouldnt be greater than the data in dataTask
     * @param {string} dataTask - An object with the data of n tasks
     */
    async createMultipleTask(numberOfTask, dataTask){
        if(numberOfTask > dataTask.length){
            console.log(`NumberOfTask must be equal or less than ${dataTask.length}`);
            return
        };

        await t.click(this.newTaskBtn)
        for(let data of dataTask){
            await this.fillTaskInfo(data.title, data.description);
            if(data.dateOption == 'future'){
                await this.addGivenDateToNewTask(data.date);
            }else{
                await this.addFixedOptioneDateForNewTask(data.dateOption);
            }   
        };
    };
};

export default new TodayPage();
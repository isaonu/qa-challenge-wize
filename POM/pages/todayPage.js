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

    async createTaskWithGivenDate(title, description, exactDate){
        await t.click(this.newTaskBtn);
        await this.fillTaskInfo(title, description);
        await this.addGivenDateToNewTask(exactDate);
    };

    async addGivenDateToNewTask(exactDate){
        await t
            .click(this.dueDateBtn)
            .typeText(this.dateInput, exactDate)
            .pressKey('enter')
            .click(this.createTaskBtn)
            .wait(1000);
    };

    async createTaskForAFixeddOption(title, description, time){
        await t.click(this.newTaskBtn)
        await this.fillTaskInfo(title, description);
        await this.addFixedOptioneDateForNewTask(time);
    };

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

    async fillTaskInfo(title, description){
        await t
            .typeText(this.taskTitleInput, title)
            .typeText(this.taskDescriptionInput, description);
    }

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
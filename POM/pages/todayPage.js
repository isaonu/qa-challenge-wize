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
        this.dueNextWeekendBtn = Selector('button').withAttribute('data-action-hint', /thisWeekend/);
        this.dueNextWeekBtn = Selector('button').withAttribute('data-action-hint', /nextWeek/);
        this.dueNoDateBtn = Selector('button').withAttribute('data-action-hint', /noDate/);
    };

    async createTaskWithGivenDate(title, description, exactDate){
        await this.fillTaskInfo(title, description);
        await t.click(this.dueDateBtn)
                .typeText(this.dateInput, exactDate)
                .pressKey('enter')
                .click(this.createTaskBtn)
                .wait(1000);
    };

    async createTaskForAFixeddOption(title, description, time){
        await this.fillTaskInfo(title, description);
        await t.click(this.dueDateBtn);
        switch(time){
            case 'today':
                await t.click(this.dueDateBtn);
                break;
            case 'tomorrow':
                await t.click(this.dueTomorrowBtn);
                break;
            case 'next weekend':
                await t.click(this.dueNextWeekendBtn);
                break;
            case 'next week':
                await t.click(this.dueNextWeekBtn);
                break;
            case 'no date':
                await t.click(this.dueNoDateBtn);
                break;
            default:
                console.log(`Wrong fixed options ${time}`);
                break;
        }
        await t.click(this.createTaskBtn);
        await t.wait(1000);
    };

    async fillTaskInfo(title, description){
        await t
            .click(this.newTaskBtn)
            .typeText(this.taskTitleInput, title)
            .typeText(this.taskDescriptionInput, description);
    }
};

export default new TodayPage();
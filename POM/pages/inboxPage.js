import { Selector, t } from 'testcafe';

class InboxPage{
    constructor(){
        this.taskBody = Selector('.task_list_item__body');
        this.taskItemClass = '.task_list_item__content';
        this.divTaskDateClass = '.task_list_item__info_tags';
    };

    async validateTaskTitle(title){
        console.log(await this.taskBody.withText(title).innerText);
        await t.expect(this.taskBody.withText(title).exists).ok();
    };

    async validateTaskDateType(title, type){
        //Algo como lo sig no me funciono... pareciera que child fuera directo..
        //let taskDate = this.taskBody.withText(title).child('.task_list_item__content').child().withAttribute('class', /date/);
        //let taskDate = this.taskBody.withText(title).child().withAttribute('class', /date/);
        let taskDate = this.taskBody.withText(title).child(this.taskItemClass).child(1).child(0).child(0).withAttribute('class', /date/);
        console.log(await taskDate.getAttribute('class'));
        await t.expect(taskDate.getAttribute('class')).contains(type, `The task due date is not the expected '${type}'`);

    };
    
    async validateTaskHasNoDate(title){
        const taskDate = this.taskBody.withText(title).child(this.taskItemClass).child(this.divTaskDateClass).child('button').exists;
        await t.expect(taskDate).notOk();
    };
}

export default new InboxPage();
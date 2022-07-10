import { Selector, t } from 'testcafe';

/*
* MainBars class is a PO for the left and top bar of the website which will be present in 
* most if not all the pages.
*/
class MainBars{
    constructor(){
        this.houseBtn = Selector('button.top_bar_btn.home_btn');
        this.leftMenuOption = Selector('#left_menu a>span:nth-child(2)');
        this.inboxBtn = Selector('#left_menu a>span:nth-child(2)').withText('Inbox');
        this.addProjectBtn = Selector('[aria-label="Add Project"]');
    };

    async goToInbox(email){
        await t.click(this.inboxBtn);
    };

    async goToProject(name){
        await t.click(this.leftMenuOption.withText(name));
    };

    async openNewProjectWindow(){
        await t
            .hover(this.addProjectBtn)
            .click(this.addProjectBtn)
    };

    async assertProjectDoesntExits(name){
        await t.expect(this.leftMenuOption.withText(name).exists).notOk(`The project ${name} shouldnt exist`,{timeout:10})
    }
};

export default new MainBars();
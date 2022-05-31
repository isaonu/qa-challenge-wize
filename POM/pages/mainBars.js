import { Selector, t } from 'testcafe';

class MainBars{
    constructor(){
        this.houseBtn = Selector('button.top_bar_btn.home_btn');
        this.inboxBtn = Selector('a[href="/app/project/2290178915"]');
    };

    async goToInbox(email){
        await t.click(this.inboxBtn);
    };
};

export default new MainBars();
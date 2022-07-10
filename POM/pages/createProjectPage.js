import {Selector, t} from 'testcafe';
import MainBars from '../pages/mainBars';

class CreateProjectPage{
    constructor(){
        this.nameInput = Selector('#edit_project_modal_field_name');
        this.colorMenu = Selector(".color_dropdown_select__name");
        this.colorDropWDownOption = Selector('.dropdown_select--popup').find('span');
        this.addBtn = Selector('button[type="submit"]');
    };

    async creteNewProject(name, color){
        await MainBars.openNewProjectWindow();
        await t
            .typeText(this.nameInput, name)
            .click(this.colorMenu)
            .click(this.colorDropWDownOption.withText(color))
            .click(this.addBtn)
            .wait(1000);
    };
}

export default new CreateProjectPage();

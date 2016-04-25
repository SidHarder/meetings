import {inject} from 'aurelia-framework';
import {appData} from './appdata';

@inject(appData)
export class memberlist {

    heading = 'Member List Page';

    constructor(appData) {
        this.appData = appData;
    }

    insert() {
        this.appData.insertMember();
    }
}
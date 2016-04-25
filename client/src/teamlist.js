import {inject} from 'aurelia-framework';
import {appData} from './appdata';

@inject(appData)
export class teamlist {
    
    heading = 'Team List Page';

    constructor(appData) {
        this.appData = appData;
    }

    insert() {
        this.appData.insertTeam();
    }
}
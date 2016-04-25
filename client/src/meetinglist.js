import {inject} from 'aurelia-framework';
import {appData} from './appdata';

@inject(appData)
export class meetinglist {
    
    heading = 'Meeting List';

    constructor(appData) {
        this.appData = appData;
    }

    insert() {
        this.appData.insertMeeting();
    }
}
import {inject} from 'aurelia-framework';
import {appData} from './appdata';
import {Router} from 'aurelia-router'

@inject(Router, appData)
export class meetingsetup {
    
    heading = 'Meeting Setup Page';

    constructor(router, appData) {
        this.router = router;
        this.appData = appData;
    }

    activate(params) {
        this.meeting = this.appData.getMeeting(params._id);
    }

    submit() {
        this.appData.saveDocument(this.meeting, 'meeting', this.meeting._id);
        this.router.navigate('meetinglist');
    }

    delete() {
        this.appData.deleteTeam(this.meeting, 'meeting', this.meeting._id);
        this.router.navigate('meetinglist');
    }
}
import {inject} from 'aurelia-framework';
import {appData} from './appdata';
import {Router} from 'aurelia-router'

import 'fetch';

@inject(Router, appData)
export class meeting {
    
    constructor(router, appData) {
        this.router = router;
        this.appData = appData;
    }
    
    activate(params) {
        this.meeting = this.appData.getMeeting(params._id);
        this.motionList = this.appData.getMotionList();
    }

    startMeeting() {
        var today = new Date();
        this.meeting.startDate = today.toLocaleDateString() + ' ' + today.toLocaleTimeString();
    }
    
    endMeeting() {
        var today = new Date();
        this.meeting.endDate = today.toLocaleDateString() + ' ' + today.toLocaleTimeString();
    }
    
    submit() {
        this.appData.saveDocument(this.meeting, 'meeting', this.meeting._id);
        this.router.navigate('meetinglist');
    }
    
    addMotion() {
        
    }
    
    postToSlack() {
        this.appData.postToSlack();
    }
}
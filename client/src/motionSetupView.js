import {inject} from 'aurelia-framework';
import {appData} from './appdata';
import {Router} from 'aurelia-router'

@inject(Router, appData)
export class meetingsetup {
    
    constructor(router, appData) {
        this.router = router;
        this.appData = appData;
    }

    activate(params) {
        this.motion = this.appData.getMotion(params._id);
    }

    submit() {
        this.appData.saveDocument(this.motion, 'motion', this.motion._id);
        this.router.navigate('motionListView');
    }

    delete() {
        this.appData.deleteTeam(this.motion, 'motion', this.motion._id);
        this.router.navigate('motionListView');
    }
}
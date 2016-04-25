import {inject} from 'aurelia-framework';
import {appData} from './appdata';
import {Router} from 'aurelia-router'
    
@inject(appData, Router)
export class membersetup {
    
    heading = 'Member Setup Page';

    constructor(appData, router) {
        this.appData = appData;
        this.router = router;
    }

    activate(params) {
        this.member = this.appData.getMember(params._id);
    }

    submit() {
        this.appData.saveDocument(this.member, 'member', this.member._id);
        this.router.navigate('memberlist');
    }

    delete() {
        this.appData.deleteMember(this.member, 'member', this.member._id);
        this.router.navigate('memberlist');
    }
}
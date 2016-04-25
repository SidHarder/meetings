import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {appData} from './appdata';


@inject(Router, appData)
export class teamsetup {
    
    heading = 'Team Setup Page';

    constructor(router, appData) {
        this.router = router;
        this.appData = appData;
    }

    activate(params) {
        this.team = this.appData.getTeam(params._id, 'team');
    }

    submit() {
        this.appData.saveDocument(this.team, 'team', this.team._id);
        this.router.navigate('teamlist');
    }

    delete() {
        this.appData.deleteTeam(this.team, 'team', this.team._id);
        this.router.navigate('teamlist');
    }
}
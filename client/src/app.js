export class App {
    
    configureRouter(config, router) {
        
        config.title = 'Meetings';
        config.map([
            { route: ['','welcome'],  name: 'welcome',  moduleId: './welcome',  nav: true, title:'Welcome' },
            { route: 'meetinglist',  name: 'meetinglist',  moduleId: './meetinglist',  nav: true, title:'Meeting List' },
            { route: 'meetingsetup/:_id',  name: 'meetingsetup',  moduleId: './meetingsetup',  nav: false, title:'Meeting Setup' },
            { route: 'meeting',  name: 'meeting',  moduleId: './meeting',  nav: false, title:'Meeting' },
            { route: 'teamlist',  name: 'teamlist',  moduleId: './teamlist',  nav: false, title:'Team List' },
            { route: 'teamsetup/:_id',  name: 'teamsetup',  moduleId: './teamsetup',  nav: false, title:'Team Setup' },
            { route: 'memberlist',  name: 'memberlist',  moduleId: './memberlist',  nav: false, title:'Member List' },
            { route: 'membersetup/:_id',  name: 'membersetup',  moduleId: './membersetup',  nav: false, title:'Member Setup' },
            { route: 'motionListView',  name: 'motionListView',  moduleId: './motionListView',  nav: false, title:'Motion List' },
            { route: 'motionSetupView/:_id',  name: 'motionSetupView',  moduleId: './motionSetupView',  nav: false, title:'Motion Setup' }
        ]);

        this.router = router;
    }
    
}
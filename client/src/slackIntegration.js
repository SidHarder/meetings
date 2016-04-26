import {inject} from 'aurelia-framework';
import {json} from 'aurelia-fetch-client';

export class slackIntegration {

    constructor() {
        //this.baseURL = 'https://hooks.slack.com/services/';
    }
    
    doIt = function() {
        console.log("hello world");
    }
    
    postToSlack() {
        
    }
    
    /*
    postToSlack = () => {
        var doc = {
            "channel": "#general", 
            "username": "sid.harder", 
            "text": "This is posted from MajorityRule.it, good day.", 
            "icon_emoji": ":ghost:"
        }

        this.http.fetch(this.baseURL + 'T13FG0XG8/B13PP8VNX/ME2oyam5oiFkGWRp9uHQK8HO', {
            method: 'post',
            body: json(doc),
            headers : {
                'Access-Control-Allow-Headers' : '*'
            }
        });
    }
    */

}
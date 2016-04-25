import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {json} from 'aurelia-fetch-client';
import {bsonObjectId} from './bsonobjectid';


import 'fetch';

@inject(HttpClient, bsonObjectId)
export class appData {

    constructor(http, bsonObjectId) {
        
        this.organizationId = "YPI";
        
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://162.243.144.71:3000/');
        });
        
        this.http = http;
        this.bsonObjectId = bsonObjectId;
        
        this.http.fetch('list/member')
                .then(response => response.json())
                .then(list => this.memberList = list)
        
        this.http.fetch('list/meeting')
                .then(response => response.json())
                .then(list => this.meetingList = list.sort(function compare(a, b) {
                    return new Date(a.scheduledStartDate) - new Date(b.scheduledStartDate);
                }))
        
        this.http.fetch('list/team')
                .then(response => response.json())
                .then(list => this.teamList = list)
        
        this.http.fetch('list/motion')
                .then(response => response.json())
                .then(list => this.motionList = list)
    }
    
    deleteMember = (document, collectionName, _id) => {
        this.deleteDocument(document, collectionName, _id);
        var index = this.memberList.map(function(e) { return e._id; }).indexOf(_id);
        this.memberList.splice(index, 1);
    }
    
    deleteTeam = (document, collectionName, _id) => {
        this.deleteDocument(document, collectionName, _id);
        var index = this.teamList.map(function(e) { return e._id; }).indexOf(_id);
        this.teamList.splice(index, 1);
    }
    
    deleteMeeting = (document, collectionName, _id) => {
        this.deleteDocument(document, collectionName, _id);
        var index = this.meetingList.map(function(e) { return e._id; }).indexOf(_id);
        this.meetingList.splice(index, 1);
    }
    
    deleteMotion = (document, collectionName, _id) => {
        this.deleteDocument(document, collectionName, _id);
        var index = this.motionList.map(function(e) { return e._id; }).indexOf(_id);
        this.motionList.splice(index, 1);
    }
    
    deleteDocument = (document, collection, _id) => {
        this.http.fetch('delete/' + collection + '/' + _id, {
            method: 'post',
            body: json(document)
        });        
    }
    
    insertMeeting = () => {
        var meeting = {
            _id : this.bsonObjectId.getObjectId(),
            organization : this.organizationId,
            name : "meeting name"
        }
        
        this.meetingList.push(meeting);
        this.insertDocument('meeting', meeting);
    }
    
    insertMember = () => {
        var member = {
            _id : this.bsonObjectId.getObjectId(),
            organization : this.organizationId,
            emailAddress : "email@email.com"
        }
        
        console.log(member);
        this.memberList.push(member);
        this.insertDocument('member', member);
    }
    
    insertTeam = () => {
        var team = {
            _id : this.bsonObjectId.getObjectId(),
            organization : this.organizationId,
            name : "Team Name"
        }
        
        this.teamList.push(team);
        this.insertDocument('team', team);
    }
    
    insertMotion
    
    insertMotion = () => {
        var motion = {
            _id : this.bsonObjectId.getObjectId(),
            organization : this.organizationId,
            text : "Motion Text"
        }
        
        this.motionList.push(motion);
        this.insertDocument('motion', motion);
        return motion;
    }
    
    insertDocument = (collectionName, document) => {
        this.http.fetch('insert/' + collectionName, {
            method: 'post',
            body: json(document)
        });
    }
    
    saveDocument = (document, collection, _id) => {
        this.http.fetch('save/' + collection + '/' + _id, {
            method: 'post',
            body: json(document)
        });        
    }
    
    getDocument = (list, _id) => {
        for (var i = 0; i < list.length; i++) {
            if(list[i]._id == _id) {
                return list[i];
            }
        }
    }
    
    getMember = (_id) => {
        return this.getDocument(this.memberList, _id);
    }
    
    getTeam = (_id) => {
        return this.getDocument(this.teamList, _id);
    }
    
    getMeeting = (_id) => {
        return this.getDocument(this.meetingList, _id);
    }
    
    getMotion = (_id) => {
        return this.getDocument(this.motionList, _id);
    }
    
    getMotionList = () => {
        return this.motionList;
    }
    
}
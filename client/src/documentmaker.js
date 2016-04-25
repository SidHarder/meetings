import {inject} from 'aurelia-framework';
import {bsonObjectId} from './bsonobjectid';

@inject(bsonObjectId)
export class documentMaker {

    constructor(bsonObjectId) {
        this.bsonObjectId = bsonObjectId;    
    }
    
    makeTeam() {
        return { _id: this.bsonObjectId.getObjectId(), name: "none" };
    }
   
}
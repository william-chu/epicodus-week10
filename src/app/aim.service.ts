import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { UserData } from './models/user-data.model';

@Injectable()
export class AimService {
  messages: FirebaseListObservable<any[]>;
  buddy: FirebaseObjectObservable<any>;
  user: FirebaseObjectObservable<any>;
  buddyId;

  constructor(private database: AngularFireDatabase){

  }

  getMessagesByUserId(userId: string) {
    this.messages = this.database.list(`users/${userId}/chatList/0/messages`);
    return this.messages;
  }

  getBuddyByUserId(userId: string) {
    this.buddy = this.database.object(`users/${userId}/chatList/0/buddy`);
    return this.buddy;
  }

  getUserById(userId: string){
    this.user = this.database.object(`users/${userId}/name`);
    return this.user;
  }

  getBuddyId(userId: string) {
    this.buddyId = this.database.object(`users/${userId}/chatList/0/buddyId`);
    return this.buddyId;
  }

  appendUserChatList(newMessage: string, userId: string) {
    this.database.list(`users/${userId}/chatList/0/messages`).push(newMessage);
  }


  //this is for the buddylist to get all the buddies
  getBuddiesByUserId(userId: string) {
    let chatList = this.database.list(`users/${userId}/chatList/`);
    return chatList;
  }


  appendBuddyChatList(newMessage: string, buddyId: string) {
    this.database.list(`users/${buddyId}/chatList/0/messages`).push(newMessage);
  }

}

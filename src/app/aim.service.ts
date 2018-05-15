import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { UserData } from './models/user-data.model';
var firebase = require('firebase');

@Injectable()
export class AimService {
  messages: FirebaseListObservable<any[]>;
  buddy: FirebaseObjectObservable<any>;
  user: FirebaseObjectObservable<any>;
  buddyId: FirebaseObjectObservable<any>;
  chatList: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase){}

  getMessagesByUserId(chatUserId: string, buddyKey: string) {
    this.chatList = this.database.list(`users/${chatUserId}/chatList/${buddyKey}/messages`);
    return this.chatList;
  }

  getBuddyByUserId(userId: string, buddyKey: string) {
    this.buddy = this.database.object(`users/${userId}/chatList/${buddyKey}/buddy`);
    return this.buddy;
  }

  getUserById(userId: string){
    this.user = this.database.object(`users/${userId}/name`);
    return this.user;
  }

  getBuddyId(userId: string, buddyKey: string) {
    this.buddyId =  this.database.object(`users/${userId}/chatList/${buddyKey}/buddyId`);
    return this.buddyId;
  }

  appendUserChatList(newMessage: string, userId: string, buddyKey: string) {
    this.database.list(`users/${userId}/chatList/${buddyKey}/messages`).push(newMessage);
  }

  appendBuddyChatList(newMessage: string, userId: string, buddyId: string, userKey: string) {
    this.database.list(`users/${buddyId}/chatList/${userKey}/messages`).push(newMessage);
  }

  getUserKey(userId: string, buddyId: string) {
    let userKey;
    var ref = firebase.database().ref(`users/${buddyId}/chatList/`).orderByChild("buddyId").equalTo(userId).on('value', function (snapshot) {
      userKey = Object.keys(snapshot.val())[0];
    });
    return userKey;
  }

  getBuddiesByUserId(userId: string) {
    let chatList = this.database.list(`users/${userId}/chatList/`);
    return chatList;
  }
}

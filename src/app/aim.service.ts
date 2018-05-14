import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserData } from './models/user-data.model';

@Injectable()
export class AimService {
  messages: FirebaseListObservable<any[]>;
  name: FirebaseObjectObservable<any[]>;

  constructor(private database: AngularFireDatabase){

  }

  getBuddyByUserId(userId: string) {
    this.name = this.database.object(`users/${userId}/chatList/0/buddy`);
    return this.name;
  }

  getMessagesByUserId(userId: string) {
    this.messages = this.database.list(`users/${userId}/chatList/0/messages`);
    return this.messages;
  }

  appendMessage(newMessage: string, userId: string) {
    this.database.list(`users/${userId}/chatList/0/messages`).push(newMessage);
  }

}

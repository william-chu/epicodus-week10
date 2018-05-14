import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserData } from './models/user-data.model';


@Injectable()
export class AimService {

  constructor(private database: AngularFireDatabase){
  }

  getMessagesByUserId(userId: string) {
    return this.database.list(`users/${userId}/chatList`);
  }

  appendMessage(newMessage: string, userId: string) {
    this.database.list(`users/${userId}/chatList/0/messages`).push(newMessage);
  }

}

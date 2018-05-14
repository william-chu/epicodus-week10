import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserData } from './models/user-data.model';


@Injectable()
export class AimService {
  // currentUser: string = "0";
  Will_I_Am: FirebaseListObservable<any[]>;
  xxKeWLGuRLxx: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase){
    // this.Will_I_Am = database.list(`users/${this.currentUser}/chatList`);
    // this.xxKeWLGuRLxx = database.list('users[0].chatList');
  }

  // getMessages(){
  //   console.log(this.currentUser);
  //   return this.Will_I_Am;
  //   // return this.Will_I_Am;
  // }

  // setUser(currentUser: string) {
  //   this.currentUser = currentUser;
  //   this.Will_I_Am = this.database.list(`users/${this.currentUser}/chatList`);
  // }

  getMessagesByUserId(userId: string) {
    return this.database.list(`users/${userId}/chatList`);
  }

}

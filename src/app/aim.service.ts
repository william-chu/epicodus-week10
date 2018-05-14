import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserData } from './models/user-data.model';


@Injectable()
export class AimService {

  Will_I_Am: FirebaseListObservable<any[]>;
  xxKeWLGuRLxx: FirebaseListObservable<any[]>;
  constructor(private database: AngularFireDatabase){
    this.Will_I_Am = database.list('users[1].chatList')
    this.xxKeWLGuRLxx = database.list('users[0].chatList');
  }

  // getMessages(){
  //   return this.Will_I_Am
  // }

}

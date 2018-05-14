import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BuddyListComponent } from './buddy-list/buddy-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ComposeComponent } from './compose/compose.component';
import { ChatDisplayComponent } from './chat-display/chat-display.component';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};


@NgModule({
  declarations: [
    AppComponent,
    BuddyListComponent,
    WelcomeComponent,
    ConversationComponent,
    ComposeComponent,
    ChatDisplayComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

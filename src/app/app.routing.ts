import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BuddyListComponent } from './buddy-list/buddy-list.component';
import { ChatDisplayComponent } from './chat-display/chat-display.component';

const appRoutes: Routes = [
  {
	   path: '',
	   component: WelcomeComponent
	},
  {
	   path: 'buddy-list/:userId',
	   component: BuddyListComponent
	},
  {
    path: 'chat-display/:userId/:buddyId',
    component: ChatDisplayComponent
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

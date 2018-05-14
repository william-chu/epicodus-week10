import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChatDisplayComponent } from './chat-display/chat-display.component';

const appRoutes: Routes = [
  {
	   path: '',
	   component: WelcomeComponent
	},
  {
	   path: 'chat-display',
	   component: ChatDisplayComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

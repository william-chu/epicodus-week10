import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BuddyListComponent } from './buddy-list/buddy-list.component';

const appRoutes: Routes = [
  {
	   path: '',
	   component: WelcomeComponent
	},
  {
	   path: 'buddy-list/:id',
	   component: BuddyListComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

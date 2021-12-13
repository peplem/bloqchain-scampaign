import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignSpawnComponent } from './campaign-spawn/campaign-spawn.component';
import { CampaignDescComponent } from './campaign-desc/campaign-desc.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EasterEggComponent } from './easter-egg/easter-egg.component';

const routes: Routes = [
  { path: 'spawn', component: CampaignSpawnComponent },
  { path: 'desc', component: CampaignDescComponent },
  { path: '', component: CampaignListComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'egg', component: EasterEggComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

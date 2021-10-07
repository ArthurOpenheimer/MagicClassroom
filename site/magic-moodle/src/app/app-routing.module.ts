import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { GameComponent } from './game/game.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { MatComponent } from './mat/mat.component';
import { PortComponent } from './port/port.component';
import { RedComponent } from './red/red.component';
import { SdComponent } from './sd/sd.component';
import { SocComponent } from './soc/soc.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'play', component: GameComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'mat', component: MatComponent },
  { path: 'port', component: PortComponent },
  { path: 'red', component: RedComponent },
  { path: 'sd', component: SdComponent },
  { path: 'soc', component: SocComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
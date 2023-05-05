import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsComponent } from './components/songs/songs.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';

const routes: Routes = [
  {path: 'songs', component: SongsComponent},
  {path: 'playlists', component: PlaylistsComponent},
  {path: 'home', component: HomeComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'add-song', component: AddSongComponent},
  {path: 'add-playlist', component: AddPlaylistComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

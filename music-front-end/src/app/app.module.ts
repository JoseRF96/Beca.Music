import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactoComponent } from './components/contacto/contacto.component';
import { SongsComponent } from './components/songs/songs.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportModule } from './material-imports/material-imports.module';
import { AddSongComponent } from './components/add-song/add-song.component';
import { AddPlaylistComponent } from './components/add-playlist/add-playlist.component';
import { EditSongComponent } from './components/edit-song/edit-song.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AddSongToPlaylistComponent } from './components/add-song-to-playlist/add-song-to-playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactoComponent,
    SongsComponent,
    PlaylistsComponent,
    AddSongComponent,
    AddPlaylistComponent,
    EditSongComponent,
    DeleteDialogComponent,
    AddSongToPlaylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialImportModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

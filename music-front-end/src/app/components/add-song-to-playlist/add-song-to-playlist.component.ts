import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Playlist, Song } from 'src/app/interfaces/playlist.interface';

@Component({
  selector: 'app-add-song-to-playlist',
  templateUrl: './add-song-to-playlist.component.html',
  styleUrls: ['./add-song-to-playlist.component.css']
})
export class AddSongToPlaylistComponent {
  
  playlists: Playlist[] = [];
  song: Song;
  playlistForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSongToPlaylistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder
  ){
    this.playlistForm = this.fb.group({
      playlistId: ['', Validators.required]
    });
    this.playlists = data.playlists;
    this.song = data.song
  }

  onCancel(): void{
    this.dialogRef.close();
  }

  onSave(): void{
    const playlistId = this.playlistForm.value.playlistId;
    if(playlistId){
      this.song.playlistId = playlistId;
      this.dialogRef.close(this.data);
    }
  }
}

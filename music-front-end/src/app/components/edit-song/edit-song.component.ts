import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Song } from 'src/app/interfaces/playlist.interface';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit{

  songForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    artist: new FormControl('', Validators.required),
    playlistId: new FormControl('', Validators.required),
  });
  

  constructor(
    private dialogRef: MatDialogRef<EditSongComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { song: Song }
  ){
    this.songForm.patchValue(data.song);
  }

  ngOnInit(): void {
    // this.songForm.patchValue({
    //   title: this.data.song.title,
    //   artist: this.data.song.artist
    // });
    // this.songForm = new FormGroup({
    //   title: new FormControl(this.data.song.title),
    //   artist: new FormControl(this.data.song.artist)
    // })
  }

  save(): void{
    const editSong: Song = {
      id: this.data.song.id,
      title: this.songForm.value.title,
      artist: this.songForm.value.artist,
      playlistId: this.data.song.playlistId,
    }
    this.dialogRef.close(editSong);
    console.log(editSong);
  }

  cancel(): void{
    this.dialogRef.close();
  }

}

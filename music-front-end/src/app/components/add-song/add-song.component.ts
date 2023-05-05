import { Component } from '@angular/core';
import { Song } from 'src/app/interfaces/playlist.interface';
import { SongService } from 'src/app/services/song.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent {
  newSong: Song = { title: '', artist: ''};

  constructor(private songService: SongService){}

  onSubmit(){
    this.songService.postSong(this.newSong).subscribe((song) => {
      this.newSong = { title: '', artist: ''};
    })
  }
}

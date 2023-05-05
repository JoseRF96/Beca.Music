import { Component } from '@angular/core';
import { Playlist } from 'src/app/interfaces/playlist.interface';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css']
})
export class AddPlaylistComponent {
  newPlaylist: Playlist = { name: '', description: ''};

  constructor(private playlistService: PlaylistService){}

  onSubmit(){
    this.playlistService.postSong(this.newPlaylist).subscribe((playlist) => {
      this.newPlaylist = { name: '', description: ''};
    })
  }
}

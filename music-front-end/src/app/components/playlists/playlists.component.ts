import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/interfaces/playlist.interface';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit{
  playlists: Playlist[] = [];

  constructor(private playlistServive: PlaylistService){}

  ngOnInit(): void {
    this.playlistServive.getPlaylists().subscribe((resp) => {
      this.playlists = resp;
    });
    console.log(this.playlists);
  }

  deletePlaylist(id: number | undefined): void{
    if(!id){
      return;
    }
    this.playlistServive.deletePlaylist(id).subscribe(() => {
      this.playlists = this.playlists.filter((playlist) => playlist.id !== id);
    });
  }
}

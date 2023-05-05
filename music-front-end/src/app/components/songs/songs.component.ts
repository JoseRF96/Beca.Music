import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Playlist, Song } from 'src/app/interfaces/playlist.interface';
import { SongService } from 'src/app/services/song.service';
import { EditSongComponent } from '../edit-song/edit-song.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { PlaylistService } from 'src/app/services/playlist.service';
import { AddSongToPlaylistComponent } from '../add-song-to-playlist/add-song-to-playlist.component';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit{
  songsList: Song[] = [];
  song!: Song;
  playlists: Playlist[] = [];

  constructor(private songService: SongService,private playlistService: PlaylistService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(): void{
    this.songService.getSongs().subscribe((resp) => {
      this.songsList = resp;
    });
    this.playlistService.getPlaylists().subscribe((resp) =>{
      this.playlists = resp;
    })
    console.log(this.songsList);
  }

  editSong(id: number | undefined, song: Song): void{
    if(!id){
      return;
    }
    this.songService.putSong(id, song).subscribe(()=>{
      const index = this.songsList.findIndex(s => s.id === id);
      if (index >= 0){
        this.songsList[index] = song;
      }
      this.getSongs();
    });
  }

  openEditDialog(id: number | undefined, song:Song): void{
    if(!id){
      return;
    }
    const dialogRef = this.dialog.open(EditSongComponent, {
      width: '500px',
      data: { song }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.song){
        this.editSong(id, song);
      }
    })
  }

  deleteSong(id: number | undefined): void{
    if(!id){
      return;
    }
    this.songService.deleteSong(id).subscribe(() => {
      this.songsList = this.songsList.filter((song) => song.id !== id);
      this.getSongs();
    });
  }

  openDialog(id: number | undefined): void{
    if(!id){
      return;
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width:'250px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteSong(result);
      }
    })
  }

  addToPlaylist(song: Song): void{
      const dialogRef = this.dialog.open(AddSongToPlaylistComponent, {
        width: '400px',
        data: { song: song, playlists: this.playlists }
      });
      dialogRef.afterClosed().subscribe(result =>{
        if(result){
          this.songService.addSongToPlaylist(song.id!, result.playlistId);
        }
      })

    // this.playlistService.getPlaylists().subscribe((playlists: Playlist[])=>{
    //   const dialogRef = this.dialog.open(AddSongToPlaylistComponent, {
    //     data: { playlists }
    //   });

    //   dialogRef.afterClosed().subscribe((playlistId: number)=>{
    //     if(playlistId){
    //       this.songService.addSongToPlaylist(songId, playlistId);
    //     }
    //   })
    // })
  }
}

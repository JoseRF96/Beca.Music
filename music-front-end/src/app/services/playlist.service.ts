import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../interfaces/playlist.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

  getPlaylists(): Observable<Playlist[]>{
    return this.http.get<Playlist[]>('https://localhost:44329/api/Playlists');
  }

  getPlaylistById(id: number): Observable<Playlist>{
    return this.http.get<Playlist>(`https://localhost:44329/api/Playlists/${id}`);
  }

  postSong(playlist: Playlist): Observable<Playlist>{
    return this.http.post<Playlist>(`https://localhost:44329/api/Playlists`, playlist);
  }

  deletePlaylist(id: number): Observable<void>{
    return this.http.delete<void>(`https://localhost:44329/api/Playlists/${id}`);
  }
}

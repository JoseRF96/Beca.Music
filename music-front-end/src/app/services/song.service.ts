import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, tap, throwError } from 'rxjs';
import { Playlist, Song } from '../interfaces/playlist.interface';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json' 
    })
  };

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error ocurred: ', error.error.message);
    }else{
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`)
    }

    return throwError(
      'Something bad happened.'
    )
  }

  getSongs(): Observable<Song[]>{
    return this.http.get<Song[]>(`https://localhost:44329/api/Songs`).pipe(delay(0));
  }

  getSongById(id: number): Observable<Song>{
    return this.http.get<Song>(`https://localhost:44329/api/Songs/${id}`);
  }

  postSong(song: Song): Observable<Song>{
    return this.http.post<Song>(`https://localhost:44329/api/Songs`, song);
  }

  putSong(id: number, song: Song): Observable<Song>{
    return this.http.put<Song>(`https://localhost:44329/api/Songs/${id}`, song, this.httpOptions).pipe(
      tap((song: Song) => console.log(`${song.id}`)),
      catchError(this.handleError)
    );
  }

  deleteSong(id: number): Observable<void>{
    return this.http.delete<void>(`https://localhost:44329/api/Songs/${id}`);
  }

  addSongToPlaylist(songId: number, playlistId: number): Observable<Playlist>{
    const body = { songId, playlistId };
    return this.http.post<Playlist>(`https://localhost:44329/api/Songs/${songId}/Playlists/${playlistId}`, body);
  }
}

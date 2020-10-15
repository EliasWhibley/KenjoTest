import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from './album';
import { Artist } from './artist';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL: string;
  constructor(private httpClient: HttpClient) {
    this.baseURL = 'http://localhost:3000/'
  }

  getAlbum(idAlbum: number) {
    return this.httpClient.get<Album>(`${this.baseURL}album/${idAlbum}`).toPromise();
  };

  putAlbum(albumInfo, idAlbum: number) {
    return this.httpClient.put<Album>(`${this.baseURL}album/${idAlbum}`, albumInfo).toPromise();
  };

  deleteAlbum(idAlbum) {
    return this.httpClient.delete(`${this.baseURL}album/${idAlbum}`).toPromise();
  };

  getAllAlbums() {
    return this.httpClient.get<Album[]>(`${this.baseURL}albums/all`).toPromise();
  };

  postAlbum(albumInfo) {
    return this.httpClient.post<Album>(`${this.baseURL}album`, albumInfo).toPromise();
  };

  postAlbums(albums: Array<Album>) {
    return this.httpClient.post<Album[]>(`${this.baseURL}album`, albums).toPromise();
  };

  getArtist(artistId: number) {
    return this.httpClient.get<Artist>(`${this.baseURL}artist/${artistId}`).toPromise();
  };

  putArtist(artistInfo, artistId: number) {
    return this.httpClient.put<Artist>(`${this.baseURL}artist/${artistId}`, artistInfo).toPromise();
  };

  deleteArtist(artistId: number) {
    return this.httpClient.delete<Artist>(`${this.baseURL}artist/${artistId}`).toPromise();
  };

  getAllArtist() {
    return this.httpClient.get<Artist[]>(`${this.baseURL}artists/all`).toPromise();
  };

  postArtist(artist) {
    return this.httpClient.post<Artist>(`${this.baseURL}album`, artist).toPromise();
  };

  postArtists(artists: Array<Artist>) {
    return this.httpClient.post<Artist[]>(`${this.baseURL}album`, artists).toPromise();
  };

}

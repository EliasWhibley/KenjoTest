import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    baseURL: string;
  constructor(private httpClient: HttpClient) {
    this.baseURL = 'http://localhost:3000/'
  }

  getAlbum(idAlbum: number): Promise<any> {
    return this.httpClient.get(`${this.baseURL}album/${idAlbum}`).toPromise();
  };

  putAlbum(albumInfo, idAlbum: number) {
    return this.httpClient.put(`${this.baseURL}album/${idAlbum}`, albumInfo).toPromise();
  };

  deleteAlbum(idAlbum: number) {
    return this.httpClient.delete(`${this.baseURL}album/${idAlbum}`).toPromise();
  };

  getAllAlbums() {
    return this.httpClient.get(`${this.baseURL}albums/all`).toPromise();
  };

  postAlbum(albumInfo) {
    return this.httpClient.put(`${this.baseURL}album`, albumInfo).toPromise();
  };

  postAlbums(albums: Array<any>) {
    return this.httpClient.put(`${this.baseURL}album`, albums).toPromise();
  };

  getArtist(artistId: number) {
    return this.httpClient.get(`${this.baseURL}artist/${artistId}`).toPromise();
  };

  putArtist(artistInfo, artistId: number) {
    return this.httpClient.put(`${this.baseURL}artist/${artistId}`, artistInfo).toPromise();
  };

  deleteArtist(artistId: number) {
    return this.httpClient.delete(`${this.baseURL}artist/${artistId}`).toPromise();
  };

  getAllArtist() {
    return this.httpClient.get(`${this.baseURL}artists/all`).toPromise();
  };

  postArtist(artist) {
    return this.httpClient.put(`${this.baseURL}album`, artist).toPromise();
  };

  postArtists(artists: Array<any>) {
    return this.httpClient.put(`${this.baseURL}album`, artists).toPromise();
  };

}

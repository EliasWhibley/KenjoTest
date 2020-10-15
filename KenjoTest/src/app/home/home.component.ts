import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewAlbumComponent } from '../new-album/new-album.component';
import { UpdateAlbumComponent } from '../update-album/update-album.component';
import { DeleteAlbumComponent } from '../delete-album/delete-album.component';
import { Album } from '../album';
import { Artist } from '../artist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allAlbums: Album[];
  albumsNotToShow: Album[];
  allArtist: any;
  searchedAlbum: string;
  searchAlbum = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;


  constructor(private dataService: DataService, private dialog: MatDialog) {
    this.albumsNotToShow = [];

  }

  async ngOnInit() {
    this.allAlbums = await this.dataService.getAllAlbums();
    this.allArtist = await this.dataService.getAllArtist();
    this.options = this.allAlbums.map(option => option.title);
    this.filteredOptions = this.searchAlbum.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  };

  revealArtistName(idArtist) {
    const result = this.allArtist.find(artist => artist.artistId = idArtist);

    return result.name
  }

  openDialogCreateAlbum() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(NewAlbumComponent, dialogConfig);
  };

  /*  updateResults() {
     this.searchedAlbum = this.searchAlbum.value.toLowerCase();
     for (let album of this.allAlbums) {
       if (!album.title.toLowerCase().includes(this.searchedAlbum) || this.searchedAlbum == '') {
         
       };
     }
 
   }; */

  openDialogUpdateAlbum(albumInfo) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = albumInfo;

    this.dialog.open(UpdateAlbumComponent, dialogConfig);
  };

  openDialogDeleteAlbum(albumInfo) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = albumInfo;

    this.dialog.open(DeleteAlbumComponent, dialogConfig);
  }



}

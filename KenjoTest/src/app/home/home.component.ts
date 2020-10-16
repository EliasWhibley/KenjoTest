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
import { CreateArtistComponent } from '../create-artist/create-artist.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allAlbums: Album[];
  allArtist: any[] = [];
  searchAlbum = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;


  constructor(private dataService: DataService, private dialog: MatDialog) {


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
  /* Para el filtrado de albumes, muestra el autocompletar */
  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  };
  /* Muestra los nombres de artistas según su ID */
  revealArtistName(idArtist) {
    const result = this.allArtist.find(artist => artist.artistId = idArtist);

    return result.name
  }
  /* Abre el dialogo de crecaion de album */
  openDialogCreateAlbum() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '60%';

    this.dialog.open(NewAlbumComponent, dialogConfig);
  };
  /* Actualiza los resultados */
  async updateResults() {

    if (this.searchAlbum.value.toLowerCase() == '') {
      this.allAlbums = await this.dataService.getAllAlbums();
    } else {

      this.allAlbums.filter(album => {
        if (album.title.toLowerCase().includes(this.searchAlbum.value.toLowerCase())) {
          this.allAlbums = [];
          this.allAlbums.push(album);
          console.log(album);
        }
      })
    }
  };
  /* Abre el dialogo de actualizar album */
  openDialogUpdateAlbum(albumInfo) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = albumInfo;
    dialogConfig.height = '60%';

    this.dialog.open(UpdateAlbumComponent, dialogConfig);
  };
  /* Abre el dialogo de borrar album */
  openDialogDeleteAlbum(albumInfo) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = albumInfo;
    dialogConfig.height = '60%';

    this.dialog.open(DeleteAlbumComponent, dialogConfig);
  };
  /* Abre el dialogo de crear artista */
  openDialogNewArtist() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '60%';

    this.dialog.open(CreateArtistComponent, dialogConfig);
  }



}

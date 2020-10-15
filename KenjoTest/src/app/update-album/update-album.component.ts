import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Album } from '../album';
import { Artist } from '../artist';
import { DataService } from '../data.service';

@Component({
  selector: 'app-update-album',
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.css']
})
export class UpdateAlbumComponent implements OnInit {
  album: Album;
  updateAlbum: FormGroup;
  allArtist: Artist[];
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dataService: DataService) {
    this.album = data;
    this.updateAlbum = new FormGroup({
      title: new FormControl('', [Validators.required]),
      artistId: new FormControl('', [Validators.required]),
      coverUrl: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required)

    })
  };

  async ngOnInit() {
    this.allArtist = await this.dataService.getAllArtist();
    console.log(this.allArtist);
  };

  async saveAlbum(albumId) {
    const result = await this.dataService.putAlbum(this.updateAlbum.value, albumId);
    console.log(result);
    window.location.reload()
  }

}

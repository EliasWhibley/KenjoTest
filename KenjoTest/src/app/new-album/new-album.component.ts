import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.css']
})
export class NewAlbumComponent implements OnInit {
  newAlbum: FormGroup;
  allArtist: any;
  constructor(private dataService: DataService) {
    this.newAlbum = new FormGroup({
      title: new FormControl('', [Validators.required]),
      artistId: new FormControl('', [Validators.required]),
      coverUrl: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required)

    })
  }

  async ngOnInit() {
    this.allArtist = await this.dataService.getAllArtist();
    console.log(this.allArtist);
  }
  async saveAlbum() {
    const result = await this.dataService.postAlbum(this.newAlbum.value);
    console.log(result);

  }





}

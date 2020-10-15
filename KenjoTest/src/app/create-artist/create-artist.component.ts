import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Artist } from '../artist';
import { DataService } from '../data.service';

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.css']
})
export class CreateArtistComponent implements OnInit {
  newArtist: FormGroup;
  constructor(private data: DataService) {
    this.newArtist = new FormGroup({
      name: new FormControl('', [Validators.required]),
      photoUrl: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', Validators.required),
      deathDate: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  async saveArtist() {
    const result = await this.data.postArtist(this.newArtist.value);
    console.log(result);
    window.location.reload();

  }

}

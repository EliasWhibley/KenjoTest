import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-delete-album',
  templateUrl: './delete-album.component.html',
  styleUrls: ['./delete-album.component.css']
})
export class DeleteAlbumComponent implements OnInit {
  album: any;
  constructor(private dialogRef: MatDialogRef<DeleteAlbumComponent>, @Inject(MAT_DIALOG_DATA) data, private dataService: DataService) {
    this.album = data;
  }

  ngOnInit(): void {
  }

  async deleteAlbum() {
    const result = await this.dataService.deleteAlbum(this.album._id);
    console.log(result);


  }

}

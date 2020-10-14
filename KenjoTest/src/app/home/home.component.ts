import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allAlbums: any;
  searchAlbum = new FormControl();
  options: string[];
  filteredOptions: Observable<string[]>;

  constructor(private dataService: DataService) {

  }

  async ngOnInit() {
    this.allAlbums = await this.dataService.getAllAlbums();
    this.options = this.allAlbums.map(option => option.title);
    console.log(this.options);
    this.filteredOptions = this.searchAlbum.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}

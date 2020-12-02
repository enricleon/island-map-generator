import { Tile } from '../models/map/Tile';
import { TileGenerator } from './interfaces/tile-generator';

import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

export class ExcelTileGenerator implements TileGenerator {
  public filename: string;

  constructor({
    filename
  }) {
    this.filename = filename;

    fs.readFile(path.join(__dirname, 'filename'), 'utf8', (error, data) => {
      console.log(data);
    })
  }

  generateTile(tile: Tile) {
    // console.log(tile);
    // let workBook = null;
    // let jsonData = null;
    // const reader = new FileReader();
    // const file = ev.target.files[0];
    // reader.onload = (event) => {
    //   const data = reader.result;
    //   workBook = XLSX.read(data, { type: 'binary' });
    //   jsonData = workBook.SheetNames.reduce((initial, name) => {
    //     const sheet = workBook.Sheets[name];
    //     initial[name] = XLSX.utils.sheet_to_json(sheet);
    //     return initial;
    //   }, {});
    //   const dataString = JSON.stringify(jsonData);
    //   document.getElementById('output').innerHTML = dataString.slice(0, 300).concat("...");
    //   this.setDownload(dataString);
    // }
    // reader.readAsBinaryString(file);
  }
};
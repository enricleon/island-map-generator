import SelectionHelper from '../helpers/selection-helper';
import { TileRandomizer } from './tile-randomizer';

export class MapGenerator {
  private _basePath: string;
  private _height: number;
  private _width: number;
  private _ppi: number;
  private _gridSize: number;
  private _gapSize: number;

  constructor (options) {
    this._init(options);
  }

  _init({
    width,
    height,
    gridSize,
    gapSize,
    ppi
  }) {
    this._basePath = (new File($.fileName)).path;

    this._width = width;
    this._height = height;
    this._ppi = ppi;
    this._gridSize = gridSize;
    this._gapSize = gapSize;
  }

  generateTile(name: string, tile: []) {
    app.documents.add(this._width, this._height, this._ppi, name, NewDocumentMode.RGB);
    const document = app.activeDocument;

    const width = document.width as number;
    const size = width - (this._gapSize * (this._gridSize - 1));

    const squareSize = size / this._gridSize;

    for (var x = 0; x < this._gridSize; x = x + 1) {
      for (var y = 0; y < this._gridSize; y = y + 1) {
        const tileType = tile[y * this._gridSize + x];
        // Add a new layer
        document.artLayers.add();

        var startX = x * squareSize;
        var startY = y * squareSize;

        if (x > 0) {
          startX = startX + x * this._gapSize;
        }

        if (y > 0) {
          startY = startY + y * this._gapSize;
        }

        SelectionHelper.makeSelection(startX, startY, squareSize, squareSize)

        document.selection.fill(tileType)
      }
    }

    // Saving the file

    this._saveAndClose(document, `${this._basePath}/${name}.jpg`)
  }

  _saveAndClose(document, saveFile, jpegQuality = 7) {
    saveFile = (saveFile instanceof File) ? saveFile : new File(saveFile);
    
    const jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.embedColorProfile = true;
    jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    jpgSaveOptions.matte = MatteType.NONE;
    jpgSaveOptions.quality = jpegQuality;

    app.displayDialogs = DialogModes.NO;
    document.saveAs(saveFile, jpgSaveOptions, true, Extension.LOWERCASE);
    document.close(SaveOptions.DONOTSAVECHANGES);
  }
}
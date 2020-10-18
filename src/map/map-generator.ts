import SelectionHelper from '../helpers/selection-helper';

export class MapGenerator {
  private _basePath: string;
  private _document: Document;

  constructor (options) {
    this._basePath = (new File($.fileName)).path;

    this._init(options);
  }

  _init({
    width,
    height,
    ppi,
    docName
  }) {
    app.documents.add(width, height, ppi, docName, NewDocumentMode.RGB);
    this._document = app.activeDocument;
  }

  drawGrid(gridSize: number, gapSize: number) {
    const width = this._document.width as number;
    const size = width - (gapSize * (gridSize - 1));

    const squareSize = size / gridSize;

    for (var x = 0; x < gridSize; x = x + 1) {
      for (var y = 0; y < gridSize; y = y + 1) {
        // Add a new layer
        this._document.artLayers.add();

        var startX = x * squareSize;
        var startY = y * squareSize;

        if (x > 0) {
          startX = startX + x * gapSize;
        }

        if (y > 0) {
          startY = startY + y * gapSize;
        }

        SelectionHelper.makeSelection(startX, startY, squareSize, squareSize)

        var fillColor = new RGBColor()
        fillColor.red = 44
        fillColor.green = 118
        fillColor.blue = 255

        this._document.selection.fill(fillColor)
      }
    }

    // Saving the file
    const file = File(this._basePath + '/result.psd')
    this._document.saveAs(file)
  }
}
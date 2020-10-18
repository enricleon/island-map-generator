// /// <reference types="types-for-adobe/Photoshop/2015.5" />

export default class SelectionHelper {
  static makeSelection(x, y, sw, sh) {
    var ysh = new UnitValue(y + sh)
    var xsw = new UnitValue(x + sw)

    app.activeDocument.selection.select([
      [x, y],
      [x, ysh],
      [xsw, ysh],
      [xsw, y],
    ])
  }
}

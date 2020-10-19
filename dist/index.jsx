(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(this,
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 774:
/***/ (function(__unused_webpack_module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _objectDefineProperty = function _objectDefineProperty(object, property, descriptor) {
  if (descriptor) {
    delete descriptor.configurable;
    delete descriptor.enumerable;
    delete descriptor.writable;

    if (descriptor.value != undefined) {
      object[property] = descriptor.value;
    }
  }

  return object;
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _objectDefineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ArrayHelper = /*#__PURE__*/function () {
  function ArrayHelper() {
    _classCallCheck(this, ArrayHelper);
  }

  _createClass(ArrayHelper, null, [{
    key: "shuffleArray",

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    value: function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  }]);

  return ArrayHelper;
}();

exports.default = ArrayHelper;

/***/ }),

/***/ 422:
/***/ (function(__unused_webpack_module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _objectDefineProperty = function _objectDefineProperty(object, property, descriptor) {
  if (descriptor) {
    delete descriptor.configurable;
    delete descriptor.enumerable;
    delete descriptor.writable;

    if (descriptor.value != undefined) {
      object[property] = descriptor.value;
    }
  }

  return object;
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _objectDefineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// /// <reference types="types-for-adobe/Photoshop/2015.5" />
var SelectionHelper = /*#__PURE__*/function () {
  function SelectionHelper() {
    _classCallCheck(this, SelectionHelper);
  }

  _createClass(SelectionHelper, null, [{
    key: "makeSelection",
    value: function makeSelection(x, y, sw, sh) {
      var ysh = new UnitValue(y + sh);
      var xsw = new UnitValue(x + sw);
      app.activeDocument.selection.select([[x, y], [x, ysh], [xsw, ysh], [xsw, y]]);
    }
  }]);

  return SelectionHelper;
}();

exports.default = SelectionHelper;

/***/ }),

/***/ 973:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {



var _mapGenerator = __webpack_require__(44);

/// <reference types="types-for-adobe/Photoshop/2015.5" />
function main() {
  var generator = new _mapGenerator.MapGenerator({
    width: 710,
    height: 710,
    ppi: 300,
    gridSize: 3,
    gapSize: 1
  });

  for (var i = 0; i < 48; i++) {
    generator.generateTile("map-tile-".concat(i + 1));
  }
}

main();

/***/ }),

/***/ 44:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



exports.__esModule = true;
exports.MapGenerator = void 0;

var _selectionHelper = _interopRequireDefault(__webpack_require__(422));

var _tileRandomizer = __webpack_require__(469);

var _objectDefineProperty = function _objectDefineProperty(object, property, descriptor) {
  if (descriptor) {
    delete descriptor.configurable;
    delete descriptor.enumerable;
    delete descriptor.writable;

    if (descriptor.value != undefined) {
      object[property] = descriptor.value;
    }
  }

  return object;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _objectDefineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { _objectDefineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MapGenerator = /*#__PURE__*/function () {
  function MapGenerator(options) {
    _classCallCheck(this, MapGenerator);

    _defineProperty(this, "_basePath", void 0);

    _defineProperty(this, "_height", void 0);

    _defineProperty(this, "_width", void 0);

    _defineProperty(this, "_ppi", void 0);

    _defineProperty(this, "_gridSize", void 0);

    _defineProperty(this, "_gapSize", void 0);

    _defineProperty(this, "_tileRandomizer", void 0);

    this._init(options);
  }

  _createClass(MapGenerator, [{
    key: "_init",
    value: function _init(_ref) {
      var width = _ref.width,
          height = _ref.height,
          gridSize = _ref.gridSize,
          gapSize = _ref.gapSize,
          ppi = _ref.ppi;
      this._basePath = new File($.fileName).path;
      this._width = width;
      this._height = height;
      this._ppi = ppi;
      this._gridSize = gridSize;
      this._gapSize = gapSize;
      this._tileRandomizer = new _tileRandomizer.TileRandomizer(this._gridSize);
    }
  }, {
    key: "generateTile",
    value: function generateTile(name) {
      var result = this._tileRandomizer.getRandomTile();

      app.documents.add(this._width, this._height, this._ppi, name, NewDocumentMode.RGB);
      var document = app.activeDocument;
      var width = document.width;
      var size = width - this._gapSize * (this._gridSize - 1);
      var squareSize = size / this._gridSize;

      for (var x = 0; x < this._gridSize; x = x + 1) {
        for (var y = 0; y < this._gridSize; y = y + 1) {
          var tileType = result[y * this._gridSize + x]; // Add a new layer

          document.artLayers.add();
          var startX = x * squareSize;
          var startY = y * squareSize;

          if (x > 0) {
            startX = startX + x * this._gapSize;
          }

          if (y > 0) {
            startY = startY + y * this._gapSize;
          }

          _selectionHelper["default"].makeSelection(startX, startY, squareSize, squareSize);

          document.selection.fill(tileType);
        }
      } // Saving the file


      this._saveAndClose(document, "".concat(this._basePath, "/").concat(name, ".jpg"));
    }
  }, {
    key: "_saveAndClose",
    value: function _saveAndClose(document, saveFile) {
      var jpegQuality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;
      saveFile = saveFile instanceof File ? saveFile : new File(saveFile);
      var jpgSaveOptions = new JPEGSaveOptions();
      jpgSaveOptions.embedColorProfile = true;
      jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
      jpgSaveOptions.matte = MatteType.NONE;
      jpgSaveOptions.quality = jpegQuality;
      app.displayDialogs = DialogModes.NO;
      document.saveAs(saveFile, jpgSaveOptions, true, Extension.LOWERCASE);
      document.close(SaveOptions.DONOTSAVECHANGES);
    }
  }]);

  return MapGenerator;
}();

exports.MapGenerator = MapGenerator;

/***/ }),

/***/ 469:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



exports.__esModule = true;
exports.TileRandomizer = void 0;

var _arrayHelper = _interopRequireDefault(__webpack_require__(774));

var _objectDefineProperty = function _objectDefineProperty(object, property, descriptor) {
  if (descriptor) {
    delete descriptor.configurable;
    delete descriptor.enumerable;
    delete descriptor.writable;

    if (descriptor.value != undefined) {
      object[property] = descriptor.value;
    }
  }

  return object;
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; _objectDefineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { _objectDefineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RATES = {
  terrain: {
    rate: 0.3,
    spread: 0.75
  },
  bonus: {
    rate: 0.6,
    spread: 1,
    min: 1
  },
  treaseures: {
    rate: 0.5,
    spread: 1
  }
};

var TileRandomizer = /*#__PURE__*/function () {
  function TileRandomizer(gridSize) {
    _classCallCheck(this, TileRandomizer);

    _defineProperty(this, "_gridSize", void 0);

    this._gridSize = gridSize;
  }

  _createClass(TileRandomizer, [{
    key: "getRandomTile",
    value: function getRandomTile() {
      var totalSpaces = this._gridSize * this._gridSize;

      var terrainSpaces = this._getNumOfTerrainSpaces(totalSpaces);

      var bonusSpaces = this._getNumOfBonusTiles(terrainSpaces);

      var treasureSpaces = this._getNumOfTreasures(bonusSpaces);

      var villageSpaces = this._getNumOfVillages(bonusSpaces, treasureSpaces);

      var water = totalSpaces - terrainSpaces;
      var result = [];

      for (var i = 0; i < terrainSpaces - bonusSpaces; i++) {
        var fillColor = new RGBColor();
        fillColor.red = 249;
        fillColor.green = 236;
        fillColor.blue = 195;
        result.push(fillColor);
      }

      for (var i = 0; i < treasureSpaces; i++) {
        var fillColor = new RGBColor();
        fillColor.red = 163;
        fillColor.green = 78;
        fillColor.blue = 24;
        result.push(fillColor);
      }

      for (var i = 0; i < villageSpaces; i++) {
        var fillColor = new RGBColor();
        fillColor.red = 229;
        fillColor.green = 205;
        fillColor.blue = 165;
        result.push(fillColor);
      }

      for (var i = 0; i < water; i++) {
        var fillColor = new RGBColor();
        fillColor.red = 34;
        fillColor.green = 108;
        fillColor.blue = 168;
        result.push(fillColor);
      }

      _arrayHelper["default"].shuffleArray(result);

      return result;
    }
  }, {
    key: "_getNumOfTerrainSpaces",
    value: function _getNumOfTerrainSpaces(tileSpaces) {
      var terrainRate = RATES.terrain.rate;
      var spread = RATES.terrain.spread;
      var modifier = terrainRate * spread;
      var max = terrainRate + modifier;
      var min = terrainRate - modifier;
      return Math.floor(tileSpaces * (Math.random() * (max - min) + min));
    }
  }, {
    key: "_getNumOfBonusTiles",
    value: function _getNumOfBonusTiles(terrainSpaces) {
      var bonusSpaces = RATES.bonus.rate;
      var spread = RATES.bonus.spread;
      var modifier = bonusSpaces * spread;
      var terrainMin = Math.min(RATES.bonus.min, terrainSpaces);
      var max = bonusSpaces + modifier;
      var min = bonusSpaces - modifier;
      var bonus = Math.floor(terrainSpaces * (Math.random() * (max - min) + min));
      return bonus < terrainMin ? terrainMin : bonus;
    }
  }, {
    key: "_getNumOfTreasures",
    value: function _getNumOfTreasures(bonusSpaces) {
      var treasureSpaces = RATES.treaseures.rate;
      var spread = RATES.treaseures.spread;
      var modifier = treasureSpaces * spread;
      var max = treasureSpaces + modifier;
      var min = treasureSpaces - modifier;
      return Math.floor(bonusSpaces * (Math.random() * (max - min) + min));
    }
  }, {
    key: "_getNumOfVillages",
    value: function _getNumOfVillages(bonusSpaces, treasureSpaces) {
      return bonusSpaces - treasureSpaces;
    }
  }]);

  return TileRandomizer;
}();

exports.TileRandomizer = TileRandomizer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(973);
/******/ })()

));
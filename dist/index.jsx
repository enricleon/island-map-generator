(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(this,
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    name: 'map-tile'
  });
  generator.drawGrid(3, 1);
}

main();

/***/ }),

/***/ 44:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



exports.__esModule = true;
exports.MapGenerator = void 0;

var _selectionHelper = _interopRequireDefault(__webpack_require__(422));

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

    _defineProperty(this, "_document", void 0);

    this._basePath = new File($.fileName).path;

    this._init(options);
  }

  _createClass(MapGenerator, [{
    key: "_init",
    value: function _init(_ref) {
      var width = _ref.width,
          height = _ref.height,
          ppi = _ref.ppi,
          docName = _ref.docName;
      app.documents.add(width, height, ppi, docName, NewDocumentMode.RGB);
      this._document = app.activeDocument;
    }
  }, {
    key: "drawGrid",
    value: function drawGrid(gridSize, gapSize) {
      var width = this._document.width;
      var size = width - gapSize * (gridSize - 1);
      var squareSize = size / gridSize;

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

          _selectionHelper["default"].makeSelection(startX, startY, squareSize, squareSize);

          var fillColor = new RGBColor();
          fillColor.red = 44;
          fillColor.green = 118;
          fillColor.blue = 255;

          this._document.selection.fill(fillColor);
        }
      } // Saving the file


      var file = File(this._basePath + '/result.psd');

      this._document.saveAs(file);
    }
  }]);

  return MapGenerator;
}();

exports.MapGenerator = MapGenerator;

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
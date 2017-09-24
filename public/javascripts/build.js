/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_editor__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_editor__);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var editor = ace.edit("editor");

editor.commands.on("exec", function(e) { 
  var rowCol = editor.selection.getCursor();
  if ((rowCol.row == 0) || ((rowCol.row + 1) == editor.session.getLength())) {
    e.preventDefault();
    e.stopPropagation();
  }
});


window.marker = {};
marker.cursors = []
marker.update = function(html, markerLayer, session, config) {
    var start = config.firstRow, end = config.lastRow;
    var cursors = this.cursors
    for (var i = 0; i < cursors.length; i++) {
        var pos = this.cursors[i];
        if (pos.row < start) {
            continue
        } else if (pos.row > end) {
            break
        } else {
            // compute cursor position on screen
            // this code is based on ace/layer/marker.js
            var screenPos = session.documentToScreenPosition(pos)

            var height = config.lineHeight;
            var width = config.characterWidth;
            var top = markerLayer.$getTop(screenPos.row, config);
            var left = markerLayer.$padding + screenPos.column * width;
            html.push(
                "<div class='cursor' style='",
                "height:", height, "px;",
                "top:", top, "px;",
                "left:", left, "px; width:", width, "px'></div>"
            );
        }
    }
}
marker.redraw = function() {
   this.session._signal("changeFrontMarker");
}
marker.addCursor = function(row, column) {
    this.cursors.push({row: row, column: column})
    marker.redraw()
}
marker.session = editor.session;
marker.session.addDynamicMarker(marker, true)
// call marker.session.removeMarker(marker.id) to remove it
// call marker.redraw after changing one of cursors

/***/ })
/******/ ]);
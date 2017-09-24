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
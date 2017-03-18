var PAGE = 20;
var ROW_PER_PAGE = 18;
var COL_PER_ROW = 4;
var FONT_SIZE = 18;

// Add a custom menu to the active document, including a separator and a sub-menu.
function onOpen(e) {
  DocumentApp.getUi()
    .createMenu('カスタムメニュー')
    .addItem('九九の作成', 'makeKukuPages')
    .addToUi();
}


function makeKukuPages(){    
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  body.clear();
  for(var page=0;page<PAGE;page++){
    appendKukuPage(body);
  }
}


function appendKukuPage(body){
  var kukuTable = [];
  for(var row=0;row<ROW_PER_PAGE;row++){
    var kukuLine = [];
    for(var col=0;col<COL_PER_ROW;col++){
      kukuLine.push(makeKuku());
    }
    kukuTable.push(kukuLine);
  }
  
  var style = {};
  style[DocumentApp.Attribute.FONT_SIZE] = FONT_SIZE;
  
  var table = body.appendTable(kukuTable);
  table.setAttributes(style);
  body.appendPageBreak();
}

function makeKuku() {
  var left = Math.floor(Math.random()*9)+1;
  var right = Math.floor(Math.random()*9)+1;
  return left+" x "+right+" =";
}

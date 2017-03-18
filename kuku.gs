var FONT_SIZE = 18;

var ROW_PER_PAGE = 18;
var COL_PER_ROW = 4;

function onOpen(e) {
  var html = HtmlService
               .createTemplateFromFile('sidebar')
               .evaluate()
               .setSandboxMode(HtmlService.SandboxMode.IFRAME)
               .setTitle('九九の生成');
  DocumentApp.getUi().showSidebar(html);
}

function makeKukuPages(pages){
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  body.clear();
  for(var page=0;page<pages;page++){
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
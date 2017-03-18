var FONT_SIZE = 18;

var ROW_PER_PAGE = 18;
var COL_PER_ROW = 4;






var CALC_TYPE_ADD = "add";
var CALC_TYPE_SUB = "sub";
var CALC_TYPE_MUL = "mul";
var CALC_TYPE_DIV = "div";

var CALC_TYPE_SIGN = {
  "add" : "+",
  "sub" : "-",
  "mul" : "×",
  "div" : "÷",
}

function onOpen(e) {
  var html = HtmlService
               .createTemplateFromFile('sidebar')
               .evaluate()
               .setSandboxMode(HtmlService.SandboxMode.IFRAME)
               .setTitle('計算ドリルの生成');
  DocumentApp.getUi().showSidebar(html);
}

function makeCalcDrillPages(mode, pages){
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();

  var modeParams = mode.split(":");
  var calcType = modeParams[0];
  var leftMaxNum = Math.pow(10, parseInt(modeParams[1])) - 1;
  var rightMaxNum = Math.pow(10, parseInt(modeParams[2])) - 1;

  body.clear();

  for(var page=0;page<pages;page++){
    appendCalcDrillPage(body, calcType, leftMaxNum, rightMaxNum);
  }
}

function appendCalcDrillPage(body, calcType, leftMaxNum, rightMaxNum){
  var calcDrillTable = [];
  for(var row=0;row<ROW_PER_PAGE;row++){
    var calcDrillLine = [];
    for(var col=0;col<COL_PER_ROW;col++){
      calcDrillLine.push(makeCalcDrill(calcType, leftMaxNum, rightMaxNum));
    }
    calcDrillTable.push(calcDrillLine);
  }

  var style = {};
  style[DocumentApp.Attribute.FONT_SIZE] = FONT_SIZE;

  var table = body.appendTable(calcDrillTable);
  table.setAttributes(style);
  body.appendPageBreak();
}

function makeCalcDrill(calcType, leftMaxNum, rightMaxNum) {
  var calcSign = CALC_TYPE_SIGN[calcType];
  var left,right;
  if (calcType == CALC_TYPE_SUB) {
    left = getRandom(leftMaxNum-1)+1;//2以上
    var tmp = Math.min(rightMaxNum, left-1);
    right = getRandom(Math.min(rightMaxNum, left-1));//left未満
  } else if (calcType == CALC_TYPE_DIV) {
    right = getRandom(rightMaxNum);
    var answer = getRandom(Math.floor(leftMaxNum/right));//割り切れるように答えを先に算出
    left = right * answer;
  } else {
    left = getRandom(leftMaxNum);
    right = getRandom(rightMaxNum);
  }

  return left+" "+calcSign+" "+right+" =";
}

function getRandom(maxNum) {
  return Math.floor(Math.random()*maxNum)+1;
}
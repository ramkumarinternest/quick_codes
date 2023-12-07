const spreadSheet = SpreadsheetApp.getActive();
const sheets = spreadSheet.getSheets();
let isNewSheet = false;

function getSheet(name){
  var sheetName = spreadSheet.getSheetByName(name);
  if(sheetName == null){
    var newSheet =spreadSheet.insertSheet();
    newSheet.setName(name);
    isNewSheet = true;
    sheetName = spreadSheet.getSheetByName(name).activate();
  }
  return spreadSheet.getActiveSheet();
}

function getHeaders( sheet, keys ) {
	var headers = [];
  
  if(!isNewSheet){
    var lastColumn = sheet.getLastColumn() < 1 ? 0 : sheet.getLastColumn();
    if(lastColumn >= 1){
      headers = sheet.getRange(1,1,1,lastColumn).getValues()[0];  
    }
  }

  var newHeaders = [];
  newHeaders = keys.filter((key)=> {
    if(!headers.includes(key)){
      return key;
    }
  });

  newHeaders.forEach(item => {
    headers.push(item);
  });
	return headers;
}

function getValues(headers, mainData){
  var values = [];
  headers.forEach(item =>{
    values.push(mainData[item]);
  });

  return values;
}

function setHeader(sheet, values){
  var headerRow = sheet.getRange(1,1,1,values.length);
  headerRow.setValues([values]);
  headerRow.setFontWeight( "bold" ).setHorizontalAlignment( "center" );
}

function setValues(sheet, values){
  var lastRow = Math.max(sheet.getLastRow(), 1);
  sheet.insertRowAfter(lastRow);
  sheet.getRange( lastRow + 1, 1, 1, values.length ).setValues( [ values ] ).setFontWeight( "normal" ).setHorizontalAlignment( "center" );
}

function doPost(e){
  var receiveData = JSON.parse(e.postData.contents);
  var activeSheet = getSheet(receiveData.name);
  var mainData = receiveData.data;
  var keys = Object.keys(mainData);
  const headers = getHeaders(activeSheet, keys);
  var values = getValues(headers, mainData);
  setHeader(activeSheet, headers);
  setValues(activeSheet, values);
  Logger.log("Successfully Posted");
}

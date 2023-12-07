/* 
The following data can take from JSON.parse(e.postData.contents);
{
  "_date":"September 20, 2023",
  "_time":"5:33 am",
  "_post_title":"Contacts",
  "_url":"https:\/\/eliora.internest.in\/contacts\/",
  "your-name":"test",
  "phone":"1234567890",
  "your-email":"test@gmail.com",
  "subject":"test",
  "your-message":"test"
}
*/

const errors_url = "https://docs.google.com/spreadsheets/d/1CB4f-O7JYIVOXJfnxx4pkT5JYxNd27uGfWbwt1LaVhk/edit?usp=sharing";
const errors_sheet = "Errors";
const error = SpreadsheetApp.openByUrl(errors_url).getSheetByName(errors_sheet);

function doPost(e){
  const received_data = JSON.parse(e.postData.contents);
  const pageURL = received_data['_url'];
  const sheet_name = received_data['_post_title'];
  if(pageURL.includes("eliora.internest.in")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1cVr1sgnOzT2ceqLtsEyBnSmsCpzLBbYdrxYGYAA_Jks/edit?usp=sharing";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    const labels = {
      "Date": "_date",
      "Time": "_time",
      "Name": "your-name",
      "Phone": "phone",
      "Email": "your-email",
      "Subject": "subject",
      "Message": "your-message",
      "Page URL": "_url"
    }
    storeData(sheet, received_data, labels);
  }
  else if(pageURL.includes("ammantry.com")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1h_fbb5f6oq5aeVxsnqGw6dLZnJEhNvtrzhMmx-aqxSs/edit?usp=sharing";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    const labels = {
      "Date": "_date",
      "Time": "_time",
      "Name": "your-name",
      "Email": "your-email",
      "Mobile": "your-mobile",
      "Address": "your-address",
      "Requirements": "your-message"
    }
    storeData(sheet, received_data, labels);
  }
  else if(pageURL.includes("arawealth.in")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1WHk45AVpvM9vgFDXM5Y_G7C2M-AObAaEiIm3vyOuSHo/edit#gid=0";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    const labels = {
      "Date": "_date",
      "Time": "_time",
      "Name": "your-name",
      "Email": "your-email",
      "Mobile": "your-mobile",
      "Client Code": "clientcode",
      "Event Source": "event-source"
    }
    storeData(sheet, received_data, labels);
  }
}

function storeData(sheet, received_data, labels){
  try{
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    const sheetTitle = sheet.getRange(1,1,1,lastCol).getValues().flat();
    const new_data = [];
    sheetTitle.forEach(item => {
      if(item == "S. No"){
        new_data.push(lastRow);
      }else{
        new_data.push(received_data[labels[item]]);
      }
    });

    // Set Values
    sheet.getRange(lastRow+1, 1, 1, lastCol).setValues([new_data]);
  }catch(err){
    const lastRow = error.getLastRow();
    error.getRange(lastRow+1,1,1,1).setValue(JSON.stringify(err+"Error is Third"));
  }  
}

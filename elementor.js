/* 
The following data can take from e.parameter
{
    "form_id": "90ad4c1",
    "User Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.81",
    "Page URL": "https://wisteria.internest.in/contact/",
    "Phone": "1234567890",
    "form_name": "Contact Us",
    "Name": "Test",
    "Message": "test",
    "Email ": "test@gmail.com",
    "Time": "8:25 am",
    "Date": "September 17, 2023",
    "Powered by": "Elementor",
    "Remote IP": "2409:4072:640d:dcfe:84ca:21b9:8a2a:f21b"
}
*/

const errors_url = "https://docs.google.com/spreadsheets/d/1CB4f-O7JYIVOXJfnxx4pkT5JYxNd27uGfWbwt1LaVhk/edit?usp=sharing";
const errors_sheet = "Errors";
const error = SpreadsheetApp.openByUrl(errors_url).getSheetByName(errors_sheet);

function doPost(e){
  const received_data = e.parameter;
  const pageURL = received_data['Page URL'];
  const sheet_name = received_data['form_name'];
  if(pageURL.includes("wisteriadevelopers.com")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1TtuOlJHrB4Mu4Nk4xkHTvCfUH5hkKvYR_hYk1UDdthY/edit?usp=sharing";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    storeData(sheet, received_data);
  }
  else if(pageURL.includes("eliora.internest.in")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1cVr1sgnOzT2ceqLtsEyBnSmsCpzLBbYdrxYGYAA_Jks/edit?usp=sharing";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    storeData(sheet, received_data);
  }
  else if(pageURL.includes("avpinfra.com")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1gH6NN2XLlMmERlaoLbB6pnk-YE8tkLJucXeGbZkW1j4/edit?usp=sharing";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    storeData(sheet, received_data);
  }
  else if(pageURL.includes("nihalinternational.sg")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1X2z6BSXcP_udBUU7I32g4239RRynBpbcKgfx9xjjAvY/edit?usp=sharing";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    storeData(sheet, received_data);
  }
  else if(pageURL.includes("goldengatesvidhyashram.com")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1HQlVPY9cADnV89Dj_Ag1o3Ne-qNrUYTZPcafJcr4-vs/edit?usp=sharing";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    storeData(sheet, received_data);
  }
  else if(pageURL.includes("jjcon.ac.in")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1rMTveRzasp9JlbmQCTCFu7VNv2ts6QzyOYIJkV_bhIk/edit?usp=sharing";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    storeData(sheet, received_data);
  }
  else if(pageURL.includes("vanakkamdigital.in")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1izocbjHFlSIOKV6cbjikbildrWscjZ_CyT5IEZ6p6jw/edit?usp=sharing";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    storeData(sheet, received_data);
  }
  else if(pageURL.includes("thillaidentalcare.com")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1YYEv2gybtWw5qVHOubVwY_qjLEdasmcwx5TtXyDUK5s/edit?usp=sharing";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    storeData(sheet, received_data);
  }
  else if(pageURL.includes("https://internest.agency/")){
    const sheet_url = "https://docs.google.com/spreadsheets/d/1RSg1bI1QrIE5KRFUTav-TlSwfjJIdtf431LMfd2eFf0/edit?usp=sharing";
    const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
    storeData(sheet, received_data);
  }
}

function storeData(sheet, received_data){
  try{
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();

    const sheetTitle = sheet.getRange(1,1,1,lastCol).getValues().flat();
    const new_data = [];
    sheetTitle.forEach(item => {
      if(item == "S. No"){
        new_data.push(lastRow);
      }else{
        new_data.push(received_data[item]);
      }
    });

    // Set Values
    sheet.getRange(lastRow+1, 1, 1, lastCol).setValues([new_data]);
  }catch(err){
    error.getRange(error.getLastRow()+1,1,1,1).setValues(JSON.stringify(err));
  }
}

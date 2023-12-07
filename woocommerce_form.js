const sheet_url = "https://docs.google.com/spreadsheets/d/1XcjG6y1UchtrC2byVwwhnjFJvsfgPS4VCifFfy5nXL0/edit?usp=sharing";
const sheet_name = "Event Registrations"

function doPost(e){
  const received_data = JSON.parse(e.postData.contents);
  const date_value = new Date(received_data.date_created);
  const formated_data = {
    "Date": `${date_value.toLocaleDateString()}`,
    "Time": `${date_value.toLocaleTimeString()}`,
    "First Name": `${received_data.billing.first_name}`,
    "Last Name" : `${received_data.billing.last_name}`,
    "Email Address": `${received_data.billing.email}`,
    "Phone": `${received_data.billing.phone}`,
    "Company Name": `${received_data.billing.company}`,
    "Designation": `${received_data.meta_data.find(item => item.key === "billing_designation").value}`,
    "Address": `${received_data.billing.address_1}, ${received_data.billing.address_2}`,
    "Town / City": `${received_data.billing.city}`,
    "State": `${received_data.billing.state}`,
    "Country": `${received_data.billing.country}`,
    "Postcode": `${received_data.billing.postcode}`,
    "Amount Paid": `${received_data.total}`
  }
  const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);
  storeData(sheet, formated_data);
}

function storeData(sheet, formated_data){
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  const sheetTitle = sheet.getRange(1,1,1,lastCol).getValues().flat();
  const new_data = [];
  sheetTitle.forEach(item => {
    new_data.push(formated_data[item]);
  });

  // Set Values
  sheet.getRange(lastRow+1, 1, 1, lastCol).setValues([new_data]);
}

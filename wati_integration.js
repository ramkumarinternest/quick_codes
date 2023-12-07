const sheet_url = "https://docs.google.com/spreadsheets/d/1a5sMyFf3aK8-MwS_ediaLElr2CjeDVK9gAh0UEsgxoI/edit#gid=1057302907";
const sheet_name = 'Test Form';

const api_endpoint = "https://live-server-114066.wati.io";
const access_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiYTg0ODU1Yi1iODc3LTQ0MjgtODJiMC0yYjgwNmM4ODBhYmEiLCJ1bmlxdWVfbmFtZSI6InJhamVzaEBpbnRlcm5lc3QuYWdlbmN5IiwibmFtZWlkIjoicmFqZXNoQGludGVybmVzdC5hZ2VuY3kiLCJlbWFpbCI6InJhamVzaEBpbnRlcm5lc3QuYWdlbmN5IiwiYXV0aF90aW1lIjoiMDkvMDkvMjAyMyAxMTozNTowMiIsImRiX25hbWUiOiIxMTQwNjYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBRE1JTklTVFJBVE9SIiwiZXhwIjoyNTM0MDIzMDA4MDAsImlzcyI6IkNsYXJlX0FJIiwiYXVkIjoiQ2xhcmVfQUkifQ.pE9bFfwkK6p51-3BcjiGD8LRwEyCqS8UcI1fHN5zXII";

const sender_number = "+919629340340";


async function doPost(e){
  const reserved_data = e.parameters;
  const sheet = SpreadsheetApp.openByUrl(sheet_url).getSheetByName(sheet_name);

  const guest_count = await reserved_data['Guests'][0];
  const customer_name = await reserved_data['Name'][0];
  const occasion = await reserved_data['Occasion'][0];
  const customer_email = await reserved_data['Email'][0];
  const reserved_date = await reserved_data['Reservation date'][0];
  const reserved_time = await reserved_data['Reservation Time'][0];
  const customer_phone = await reserved_data['Phone'][0];

let headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)",
 "Content-Type": "application/json",
 "Authorization": access_token
}
let bodyContent = JSON.stringify({
    "broadcast_name": "dsd_reservation",
    "template_name": "dsd_reservation",
    "parameters": [
      {"name": "customer_name", "value": customer_name},
      {"name": "guest_count", "value": guest_count},
      {"name": "reserved_date", "value": reserved_date},
      {"name": "reserved_time", "value": reserved_time},
      {"name": "occasion", "value": occasion},
      {"name": "customer_email", "value": customer_email},
      {"name": "customer_phone", "value": customer_phone}
    ]
});

let response = await UrlFetchApp.fetch(`${api_endpoint}/api/v1/sendTemplateMessage?whatsappNumber=${encodeURIComponent(sender_number)}`, { 
  'method': "POST",
  'payload': bodyContent,
  'headers': headersList
});

const lastRow = sheet.getLastRow();
sheet.getRange(lastRow+1,1,1,1).setValue(JSON.stringify(response.getContentText()));

}

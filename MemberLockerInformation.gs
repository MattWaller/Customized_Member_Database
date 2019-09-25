// grab data from Processing Variables.gs

function MemberLockerInformation(thisRow, SheetName, StaffName) {
  //set temp values
  var FormName = {
    
    "NewMembers" : "Member Registration",
    "AddonMembers" : "Add-on Membership",
    "MemberDatabaseEdits" : "Member Database Edits",
    "LockerRegistration-Renewal" : "Locker Renewal & Registration",
    "MemberNotes" : "Enter Notes",
    "MemberTact" : "Tactical Certification",
    "MemberRenewal-Upgrade" : "Member Renewal & Upgrade",
    "MemberWaivers" : "Member Waivers",
    
  }
  FormName = FormName[SheetName];

  // defining month dictionary
  var months = {
    "Jan":1,
    "Feb":2,
    "Mar":3,
    "Apr":4,
    "May":5,
    "Jun":6,
    "Jul":7,
    "Aug":8,
    "Sep":9,
    "Oct":10,
    "Nov":11,
    "Dec":12
  }
  
  // defining reverse dictionary 
  var months_reverse = {
    
    1:"Jan",
    2:"Feb",
    3:"Mar",
    4:"Apr",
    5:"May",
    6:"Jun",
    7:"Jul",
    8:"Aug",
    9:"Sep",
    10:"Oct",
    11:"Nov",
    12:"Dec"
    
    
    
  }
  Logger.log(months_reverse)
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName);
  var ss_cols = ss.getLastColumn();
  var ss_headers = ss.getRange(1, 1, 1, ss_cols).getValues();
  ss_headers = ss_headers[0]
  var timestamp = ss.getRange(thisRow,ss_headers.indexOf("Timestamp")+1).getValue();
  var Rental_len = ss.getRange(thisRow,ss_headers.indexOf("Length of Rental") +1).getValues();
  var purpose = ss.getRange(thisRow,ss_headers.indexOf("Purpose") +1).getValues();

  var existingLocker = ss.getRange(thisRow,ss_headers.indexOf("Existing Locker Number") +1).getValue();

  
  var mli = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MemberLockerInformation");
  
  var mli_cols = mli.getLastColumn();
  var mli_rows = mli.getLastRow();
  
  var mli_headers = mli.getRange(1,1,1,mli_cols).getValues();
  mli_headers = mli_headers[0];
  var lockers = mli.getRange(1,mli_headers.indexOf("Locker Number") +1,mli_rows,1).getValues();
  lockers = flatten(lockers);
  
  // find row number of existing locker in lockers
  var locker_row_loc = lockers.indexOf(existingLocker);
  
  Logger.log(Rental_len);
  
  var MemberNumber_col = mli_headers.indexOf("Member Number") +1; 
  
  
  
  var lockerCount = mli.getRange(1,MemberNumber_col,mli_rows,1).getValues();
  
  
  // calculating expiry date of rental agreement.
  
  Logger.log(String(Rental_len).substring(0,1))
  Logger.log(String(timestamp))
  var month = String(timestamp).substring(4,7)
  var N_year = parseInt(String(timestamp).substring(11,15))
  var N_month = months[month]
  
  Logger.log(N_month);
  
  var expiry_month = N_month + parseInt(String(Rental_len).substring(0,1))
  
  Logger.log(expiry_month);
  
  if (expiry_month >12){
    
    expiry_month = expiry_month - 12
    
    N_year = N_year + 1;
    
  }
  
  Logger.log(months_reverse[expiry_month])
  Logger.log(N_year);
  
  // converting mm to mmm
  expiry_month = months_reverse[expiry_month]
  
  var ss1_timestamp = String(timestamp).substring(0,4)
  var ss2_timestamp = String(timestamp).substring(7,11)
  var ss3_timestamp = String(timestamp).substring(15)
  Logger.log(timestamp);
  Logger.log(ss1_timestamp + expiry_month + ss2_timestamp + N_year + ss3_timestamp)
  
  var tempDate = String(ss1_timestamp + expiry_month + ss2_timestamp + N_year + ss3_timestamp);
  Logger.log(tempDate);
  
  var expiryDate = tempDate.substring(4,15)
  Logger.log(expiryDate);
  if( purpose == "Locker Registration"){
    var i = 0;
    
    var count = 0;
    if ( i < mli_rows){
      while ( i < mli_rows){
        
        if ( String(lockerCount[i]).length!=0){
          count = count +1;
        }
        i = i + 1;
      }
    }
  }
  if( purpose != "Locker Registration"){
    
    var count = locker_row_loc;
    
  }
  Logger.log(lockers.length);
  if ( count > lockers.length){
    // error, there are not enough lockers remaining.
    var MemberNo = ss.getRange(thisRow,ss_headers[ss_headers.indexOf("Member Number")+1])
    //send email to info
    no_lockers_email(StaffName,FormName,MemberNo);
    
    // add error log to spreadsheet
    var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
    var ovf_rows = ovf.getLastRow()+1;
    var ovf_cols = ovf.getLastColumn();
    var ovf_headers = ovf.getRange(1,1,1,ovf_cols).getValues();
    ovf_headers = ovf_headers[0]
    
    // setting bad data rows
    ovf.getRange(ovf_rows,ovf_headers[ovf_headers.indexOf("Timestamp")]+1).setValue(timestamp);
    ovf.getRange(ovf_rows,ovf_headers[ovf_headers.indexOf("Form Name")]+1).setValue(FormName);
    ovf.getRange(ovf_rows,ovf_headers[ovf_headers.indexOf("Staff Name")]+1).setValue(StaffName);
    ovf.getRange(ovf_rows,ovf_headers[ovf_headers.indexOf("Error Fault")]+1).setValue("Maximum lockers reached.");
    // delete bad data
    
    ss.deleteRow(thisRow)
    
    
  }
  // validation test to ensure enough lockers exist.
  if ( count <= lockers.length){
    // validation test passed --> enough lockers available
    
    
    //grab data from locker form sheet and add to MemberLockerInformation sheet
    
    
    
    Logger.log(ss_headers)
    var i = 0
    var j = 0
    
    if ( i< mli_headers.length){
      while ( i< mli_headers.length){
        j = 0;
        if ( j < ss_headers.length){
          while ( j < ss_headers.length){ 
            
            if( ss_headers[j] == mli_headers[i]){
              
              var temp = ss.getRange(thisRow,  ss_headers.indexOf(ss_headers[j])+1).getValue();
              
              mli.getRange(count+1,mli_headers.indexOf(mli_headers[i])+1).setValue(temp);
            }
            j = j + 1;
          }
        }
        i = i + 1;
      }
    }
    // set Registration Date & expiry Date
    mli.getRange(count+1,mli_headers.indexOf("Registration Date")+1).setValue(timestamp).setNumberFormat("mm/dd/yyyy")
    mli.getRange(count+1,mli_headers.indexOf("Expiry Date")+1).setValue(expiryDate).setNumberFormat("mm/dd/yyyy")
    
    
    
    
  }
  //Logger.log(count);
  //Logger.log(mli_rows);
}

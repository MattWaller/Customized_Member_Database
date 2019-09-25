// data passed from FormNameDict.gs
function StaffMemberValidation(SheetName, thisRow, ss, FormName, LockerNo) {
  

  
  var ss_cols = ss.getLastColumn();
  var ss_headers = ss.getRange(1,1,1,ss_cols).getValues();
  ss_headers = ss_headers[0]
  
  var ss_headerIndexSN = ss_headers.indexOf("Staff Name")+1;
  Logger.log(ss_headerIndexSN);
  var ss_headerIndexPC = ss_headers.indexOf("Passcode")+1;
  Logger.log(ss_headerIndexPC);

  
  
  
  // get staff name and passcode of submitted form
  var form_staff_member = ss.getRange(thisRow,ss_headerIndexSN).getValue();
  var form_passcode = ss.getRange(thisRow,ss_headerIndexPC).getValue();
  
  Logger.log(form_staff_member);
  Logger.log(form_passcode);
  
  var sm = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("StaffMembers");
  var sm_cols = sm.getLastColumn();
  var sm_rows = sm.getLastRow();
  var sm_headers = sm.getRange(1,1,1,sm_cols).getValues();
  sm_headers = sm_headers[0]
  
  var sm_headerIndexSN = sm_headers.indexOf("Staff Name")+1;
  
  Logger.log(sm_headerIndexSN);
  var sm_headerIndexPC = sm_headers.indexOf("Passcode")+1;
  Logger.log(sm_headerIndexPC);
  
  
  // locate member name in staffmembers array
  
  var staffNames = sm.getRange(2,sm_headerIndexSN,sm_rows, 1).getValues();
  Logger.log(staffNames);
  
  
  
  var SN_len = staffNames.length
  
  
  Logger.log(SN_len);
  var i = 0;
  
  if ( i < SN_len) {
    while ( i < SN_len){
      
      if (  form_staff_member == staffNames[i]){
        
        var staffLocation = i + 2;
        
        var SM_passcode = sm.getRange(staffLocation,sm_headerIndexPC).getValue();
        Logger.log(staffLocation);
        Logger.log(SM_passcode);
      }
      i = i + 1;
    }
    
  }
  
  
  if (SM_passcode == form_passcode){
    
    Logger.log("passcode MATCH! -- validation confirmed");
    
    // continue with validation tests
    //ValidationVariables(SheetName, thisRow, FormName);
    MemberId_Validation(SheetName, thisRow, FormName, form_staff_member)
    
    
    
  }
  
  if (SM_passcode != form_passcode){
    
    Logger.log("passcode Failed! -- validation denied");
    // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
    
    // pass variables to email
    invalidPasscode (form_staff_member,FormName)
    
    
    // get timestamp for spreadsheet
    
    var timestamp = ss.getRange(thisRow,1).getValue();
    Logger.log(timestamp);
    
    // pass variables to spreadsheet
    
    var fsv = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("FailedStaffValidation");
    
    var fsv_rows = fsv.getLastRow();
    
    fsv.getRange(fsv_rows+1,1).setValue(timestamp);
    fsv.getRange(fsv_rows+1,2).setValue(FormName);
    fsv.getRange(fsv_rows+1,3).setValue(form_staff_member);
    
    
    // delete bad form data
    ss.deleteRow(thisRow);
    
  }
  
  
}

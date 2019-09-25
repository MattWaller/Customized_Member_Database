// data from staffMemberValidation

function MemberId_Validation(SheetName, thisRow, FormName, StaffName) {


  
  var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
  var t_rows = t.getLastRow();
  var t_cols = t.getLastColumn();
  var t_headers = t.getRange(1,1,1,t_cols).getValues();
  t_headers = t_headers[0];
  Logger.log(t_headers);
  

  
  var members = t.getRange(1,(t_headers.indexOf("Member Number")+1),t_rows,1).getValues();
  
  members = flatten(members);
  
  // creating dummy validation number for new member
  if(SheetName == "NewMembers"){
    
    // validate firearms license is validity
    
  }
  
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName);
  var ss_rows = ss.getLastRow();
  var ss_cols = ss.getLastColumn();
  var ss_headers = ss.getRange(1,1,1,ss_cols).getValues();
  ss_headers = ss_headers[0];
  
  // defining forms refering primary members
  var primaryMembers = ["AddonMembers","MemberWaivers"]
  
  // check if SheetName is in primary member range
  Logger.log(primaryMembers.indexOf(SheetName) >= 0)
  // normalization of data if primary member if reference --> Add-on Members
  if ( primaryMembers.indexOf(SheetName) >= 0){
    var memberNo = ss.getRange(thisRow,ss_headers.indexOf("Primary Member Number")+1).getValue()
    var birthdate = ss.getRange(thisRow,ss_headers.indexOf("Primary Member DOB")+1).getValue()
    }
  
  // setting non add-on references to normalized data
  if ( primaryMembers.indexOf(SheetName) < 0){
    var memberNo = ss.getRange(thisRow,ss_headers.indexOf("Member Number")+1).getValue()
    var birthdate = ss.getRange(thisRow,ss_headers.indexOf("Birthdate")+1).getValue() 
    }
  
  
  
  
  Logger.log(memberNo)
  // check if member exists in the range
  if(memberNo < 0 ){
    // send email to info
    
    
    
    // add bad record to spreadsheet
    
    
    
    
    // delete bad record
    
    
    
    
  }
  
  
  // member exists, continue with validation tests ------------------------------------------------------ START OF TEST 2 -------------------------------------------
  if ( memberNo >= 0){
    
    // proceed to test two [Memberid == Member Birthdate]
    //MemberBirthdateCheck(SheetName, thisRow, FormName, StaffName, memberNo, birthdate,t, ss, t_rows, t_headers, ss_headers,primaryMembers);
    
    // determining members row in database
    var member_row_loc = members.indexOf(memberNo) + 1;
    
    Logger.log(member_row_loc);
    var db_birthdate = t.getRange(member_row_loc,t_headers.indexOf("Birthdate")+1).getValue();
    Logger.log(db_birthdate);
    Logger.log(birthdate);
    
    
    // determine if birthdates are the same to pass validation test 
    if(String(db_birthdate) == String(birthdate)){
    Logger.log("YES");
      
      
      // 
      
      
      
    }
    
    
    
    
    
  }
  
  
  
}

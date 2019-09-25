// data from ProcessingVariables.gs
function memberRenewal_Upgrade(SheetName,thisRow) {

  var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
  
  var t_cols = t.getLastColumn();
  var t_rows = t.getLastRow();
  var t_headers = t.getRange(1,1,1,t_cols).getValues();
  t_headers = t_headers[0];
  
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName);
  
  var ss_cols = ss.getLastColumn();
  var ss_rows = ss.getLastRow();
  var ss_headers = ss.getRange(1,1,1,ss_cols).getValues();
  ss_headers = ss_headers[0];
  
  
  var memberNumbers_col = t_headers.indexOf("Member Number") +1
  
  var memberNumbers = t.getRange(1,memberNumbers_col,t_rows,1).getValues();
  
  memberNumbers = flatten(memberNumbers);
  
  Logger.log(memberNumbers);
  
  var desired = getAllIndexes(ss_headers,"Desired Membership Level")
  var current = getAllIndexes(ss_headers,"Current Membership Level")
  
  
  var formSelection_col = ss_headers.indexOf("Form selection") +1
  var memberNumber = ss.getRange(thisRow,ss_headers.indexOf("Member Number")+1).getValue();
  var newMemberType = ss.getRange(thisRow,ss_headers.indexOf("Membership Type")+1).getValue();
  var timestamp = ss.getRange(thisRow,ss_headers.indexOf("Timestamp")+1).getValue();
  var newExpiryDate = '=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")'
  
  var member_row_loc = memberNumbers.indexOf(memberNumber) +1;
  
  Logger.log(member_row_loc);
  Logger.log(newMemberType);
  var formSelection = ss.getRange(thisRow,formSelection_col).getValue();
  Logger.log(formSelection);
  
  
  if(formSelection == "Renewal"){
    // set new membership type
    t.getRange(member_row_loc,t_headers.indexOf("Membership Type") +1).setValue(newMemberType);
    t.getRange(member_row_loc,t_headers.indexOf("Range Start Date") +1).setValue(timestamp).setNumberFormat("mm/dd/yyyy");
    t.getRange(member_row_loc,t_headers.indexOf("Range Expiry Date") +1).setValue(newExpiryDate).setNumberFormat("mm/dd/yyyy");
    var temp = t.getRange(member_row_loc,t_headers.indexOf("Range Expiry Date") +1).getValue();
    t.getRange(member_row_loc,t_headers.indexOf("Range Expiry Date") +1).setValue(temp).setNumberFormat("mm/dd/yyyy");
    var temp_fled = ss.getRange(thisRow,ss_headers.indexOf("Firearms License Expiry Date") +1).getValue();
    t.getRange(member_row_loc,t_headers.indexOf("Firearms License Expiry Date") +1).setValue(temp_fled).setNumberFormat("mm/dd/yyyy");
  
    var non_addon = ["MBR","PRM"] 
    
    // remove associatation with primary membership
    if(non_addon.indexOf(newMemberType) >= 0){
      t.getRange(member_row_loc,t_headers.indexOf("Primary Member Number") +1).clearContent();
    }
    
    
  }
  // doing processing for upgrades
  if(formSelection =="Upgrade"){
    
    // find out current member type (database)
    var current_MemberType = t.getRange(member_row_loc,t_headers.indexOf("Membership Type") +1).getValue();
    var desired_level = ss.getRange(thisRow,desired[desired.length-1]+1).getValue();
    if(current_MemberType != "ATT"){
     // run script if non-att member --> auto upgrade. 
      
      t.getRange(member_row_loc,t_headers.indexOf("Membership Type") +1).setValue(desired_level);
      
    
    }
  }
  
}

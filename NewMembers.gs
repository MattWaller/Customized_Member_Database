function NewMembers(thisRow, SheetName, StaffName, ss) {
  
  
  
  
  
  var secSS = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PendingMembers");
  var secSS_LR = secSS.getLastRow()+1;
  var secSS_cols = secSS.getLastColumn();
  var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
  var t_cols = t.getLastColumn();
  var LR = t.getLastRow() + 1;
  var ss_cols = ss.getLastColumn();
  var val = ss.getRange(thisRow,1,1,ss_cols).getValues();
  
  var PalT = val[0][23]
  
  // Member Type located in 9th column.
  var MemType = ss.getRange(thisRow,9).getValue();
  
  
  
  
  
  
  if (MemType == "MBR"){
    
    // Adding info to MemberDatabase as temp placeholder
    var MemberNo = t.getRange(LR,1).setValue('=IF(indirect("r[-1]c[0]",false)="Member Number",0,indirect("r[-1]c[0]",false)+1)')
    var PrefN = t.getRange(LR,2).setValue(val[0][21])
    var Fname = t.getRange(LR,3).setValue(val[0][1])
    var Mname = t.getRange(LR,4).setValue(val[0][2])
    var Lname = t.getRange(LR,5).setValue(val[0][3])
    var BD = t.getRange(LR,6).setValue(val[0][4])
    var age = t.getRange(LR,7).setValue('=rounddown((today()-indirect("r[0]c[-1]",False))/365)')
    var sex = t.getRange(LR,8).setValue(val[0][20])
    var email = t.getRange(LR,9).setValue(val[0][5])
    var postal = t.getRange(LR,10).setValue(val[0][6])
    var phone = t.getRange(LR,11).setValue(val[0][7])
    var MembType = t.getRange(LR,12).setValue("PEN")
    t.getRange(LR,13).setValue(PalT)
    var ServNo = t.getRange(LR,14).setValue(val[0][26])
    var agency = t.getRange(LR,15).setValue(val[0][27])
    var PalNo = t.getRange(LR,16).setValue(val[0][24])
    var FLED = t.getRange(LR,17).setValue(val[0][25])
    //var MemSince = t.getRange(LR,18).setValue(val[0][0])
    //var RSD = t.getRange(LR,19).setValue(val[0][0])
    var RED = t.getRange(LR,20).setValue('=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")')
    
    var tempvalues = t.getRange(LR, 1,1,t_cols).getValues();
    
    
    
    
    // Adding info to PendingMembers for Reviewal and final confirmation
    secSS.getRange(secSS_LR, 1, 1, secSS_cols).setValues(tempvalues);      
    secSS.getRange(secSS_LR,23).setValue(StaffName);
    secSS.getRange(secSS_LR,12).setValue(val[0][8])
  }
  // indexing starts at 0 (val is an array)
  if (MemType == "LEO"){
    var MemberNo = t.getRange(LR,1).setValue('=IF(indirect("r[-1]c[0]",false)="Member Number",0,indirect("r[-1]c[0]",false)+1)')
    var PrefN = t.getRange(LR,2).setValue(val[0][21])
    var Fname = t.getRange(LR,3).setValue(val[0][1])
    var Mname = t.getRange(LR,4).setValue(val[0][2])
    var Lname = t.getRange(LR,5).setValue(val[0][3])
    var BD = t.getRange(LR,6).setValue(val[0][4])
    var age = t.getRange(LR,7).setValue('=rounddown((today()-indirect("r[0]c[-1]",False))/365)')
    var sex = t.getRange(LR,8).setValue(val[0][20])
    var email = t.getRange(LR,9).setValue(val[0][5])
    var postal = t.getRange(LR,10).setValue(val[0][6])
    var phone = t.getRange(LR,11).setValue(val[0][7])
    var MembType = t.getRange(LR,12).setValue(val[0][8])
    t.getRange(LR,13).setValue(PalT)
    var ServNo = t.getRange(LR,14).setValue(val[0][26])
    var agency = t.getRange(LR,15).setValue(val[0][27])
    var PalNo = t.getRange(LR,16).setValue(val[0][24])
    var FLED = t.getRange(LR,17).setValue(val[0][25])
    var MemSince = t.getRange(LR,18).setValue(val[0][0])
    var RSD = t.getRange(LR,19).setValue(val[0][0])
    var RED = t.getRange(LR,20).setValue('=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")')
    
    }
  
  // indexing starts at 0 (val is an array)
  if (MemType == "ATT"){
    var MemberNo = t.getRange(LR,1).setValue('=IF(indirect("r[-1]c[0]",false)="Member Number",0,indirect("r[-1]c[0]",false)+1)')
    var PrefN = t.getRange(LR,2).setValue(val[0][21])
    var Fname = t.getRange(LR,3).setValue(val[0][1])
    var Mname = t.getRange(LR,4).setValue(val[0][2])
    var Lname = t.getRange(LR,5).setValue(val[0][3])
    var BD = t.getRange(LR,6).setValue(val[0][4])
    var age = t.getRange(LR,7).setValue('=rounddown((today()-indirect("r[0]c[-1]",False))/365)')
    var sex = t.getRange(LR,8).setValue(val[0][20])
    var email = t.getRange(LR,9).setValue(val[0][5])
    var postal = t.getRange(LR,10).setValue(val[0][6])
    var phone = t.getRange(LR,11).setValue(val[0][7])
    var MembType = t.getRange(LR,12).setValue(val[0][8])
    t.getRange(LR,13).setValue(PalT)
    var ServNo = t.getRange(LR,14).setValue(val[0][26])
    var agency = t.getRange(LR,15).setValue(val[0][27])
    var PalNo = t.getRange(LR,16).setValue(val[0][24])
    var FLED = t.getRange(LR,17).setValue(val[0][25])
    var MemSince = t.getRange(LR,18).setValue(val[0][0])
    var RSD = t.getRange(LR,19).setValue(val[0][0])
    var RED = t.getRange(LR,20).setValue('=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")')
    }
  
  if (MemType == "PRM"){
    
    // Adding info to MemberDatabase as temp placeholder
    var MemberNo = t.getRange(LR,1).setValue('=IF(indirect("r[-1]c[0]",false)="Member Number",0,indirect("r[-1]c[0]",false)+1)')
    var PrefN = t.getRange(LR,2).setValue(val[0][21])
    var Fname = t.getRange(LR,3).setValue(val[0][1])
    var Mname = t.getRange(LR,4).setValue(val[0][2])
    var Lname = t.getRange(LR,5).setValue(val[0][3])
    var BD = t.getRange(LR,6).setValue(val[0][4])
    var age = t.getRange(LR,7).setValue('=rounddown((today()-indirect("r[0]c[-1]",False))/365)')
    var sex = t.getRange(LR,8).setValue(val[0][20])
    var email = t.getRange(LR,9).setValue(val[0][5])
    var postal = t.getRange(LR,10).setValue(val[0][6])
    var phone = t.getRange(LR,11).setValue(val[0][7])
    var MembType = t.getRange(LR,12).setValue("PEN")
    t.getRange(LR,13).setValue(PalT)
    var ServNo = t.getRange(LR,14).setValue(val[0][26])
    var agency = t.getRange(LR,15).setValue(val[0][27])
    var PalNo = t.getRange(LR,16).setValue(val[0][24])
    var FLED = t.getRange(LR,17).setValue(val[0][25])
    //var MemSince = t.getRange(LR,18).setValue(val[0][0])
    //var RSD = t.getRange(LR,19).setValue(val[0][0])
    var RED = t.getRange(LR,20).setValue('=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")')
    
    var tempvalues = t.getRange("A"+LR+":V"+LR).getValues();
    // Adding info to PendingMembers for Reviewal and final confirmation
    secSS.getRange("A"+secSS_LR+":V"+secSS_LR).setValues(tempvalues);      
    secSS.getRange(secSS_LR,23).setValue(StaffName);
    secSS.getRange(secSS_LR,12).setValue(val[0][8])
  }
    if (MemType == "MIL"){
    
    // Adding info to MemberDatabase as temp placeholder
    var MemberNo = t.getRange(LR,1).setValue('=IF(indirect("r[-1]c[0]",false)="Member Number",0,indirect("r[-1]c[0]",false)+1)')
    var PrefN = t.getRange(LR,2).setValue(val[0][21])
    var Fname = t.getRange(LR,3).setValue(val[0][1])
    var Mname = t.getRange(LR,4).setValue(val[0][2])
    var Lname = t.getRange(LR,5).setValue(val[0][3])
    var BD = t.getRange(LR,6).setValue(val[0][4])
    var age = t.getRange(LR,7).setValue('=rounddown((today()-indirect("r[0]c[-1]",False))/365)')
    var sex = t.getRange(LR,8).setValue(val[0][20])
    var email = t.getRange(LR,9).setValue(val[0][5])
    var postal = t.getRange(LR,10).setValue(val[0][6])
    var phone = t.getRange(LR,11).setValue(val[0][7])
    var MembType = t.getRange(LR,12).setValue("PEN")
    t.getRange(LR,13).setValue(PalT)
    var ServNo = t.getRange(LR,14).setValue(val[0][26])
    var agency = t.getRange(LR,15).setValue(val[0][27])
    var PalNo = t.getRange(LR,16).setValue(val[0][24])
    var FLED = t.getRange(LR,17).setValue(val[0][25])
    //var MemSince = t.getRange(LR,18).setValue(val[0][0])
    //var RSD = t.getRange(LR,19).setValue(val[0][0])
    var RED = t.getRange(LR,20).setValue('=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")')
    
    var tempvalues = t.getRange(LR, 1,1,t_cols).getValues();
    
    
    
    
    // Adding info to PendingMembers for Reviewal and final confirmation
    secSS.getRange(secSS_LR, 1, 1, secSS_cols).setValues(tempvalues);      
    secSS.getRange(secSS_LR,23).setValue(StaffName);
    secSS.getRange(secSS_LR,12).setValue(val[0][8])
  }
  
  
  
}

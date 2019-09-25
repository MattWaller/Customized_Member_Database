// data from --> ValidationTests.gs
function ProcessingVariables(SheetName, Row, StaffName) {
  
  
  Logger.log("ProcessingVariables");
  
  // defining active spreadsheets
  var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database")
  var z = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName)
  
  // defining spreadsheet variables
  var cols = t.getLastColumn();
  var rows = t.getLastRow();
  var zrows = z.getLastRow();
  var zcols = z.getLastColumn();
  
  
  
  // defining arrays
  var DatabaseCategories = t.getRange(1,1,1,cols).getValues();
  var fields = z.getRange(1,1,1,zcols).getValues();
  var values = z.getRange(Row,1,1,zcols).getValues();
  var PendingMembers = ["MBR","MIL","SPO","PRM"]
  var ActiveHeaders = fields[0].reverse()
  
  
  // defining array length
  var DataCat_len = DatabaseCategories[0].length;
  var AH_len = ActiveHeaders.length;
  var PM_len = PendingMembers.length;
  
  
  // defining counter variables
  var i =0
  var j = 0
  var k = 0
  var l = 0
  
  // ADD SHEET NAME IF STATEMENTS HERE ---->
  
  if( SheetName == "AddonMembers"){
    addon(SheetName, Row, StaffName, t, z, cols, rows , zrows, zcols, DatabaseCategories, fields, values, PendingMembers, ActiveHeaders, DataCat_len, AH_len, PM_len, i, j, k, l);
  }
  //running New members script
  if( SheetName == "NewMembers"){
    register(SheetName, Row, StaffName, t, z, cols, rows , zrows, zcols, DatabaseCategories, fields, values, PendingMembers, ActiveHeaders, DataCat_len, AH_len, PM_len, i, j, k, l) 
    
    
  }
  
  if ( SheetName == "MemberTact"){
    
    MemberTact(SheetName, Row, z, zcols, t) 
  }
  
  
  
  if (SheetName == "MemberNotes"){
    Logger.log(Row);
  // z.getRange( 
    
  }
  
  
  if ( SheetName == "LockerRegistration-Renewal"){
  MemberLockerInformation(Row, SheetName, StaffName);
    
    
  }
  
  
  if( SheetName == "MemberRenewal-Upgrade"){
     memberRenewal_Upgrade(SheetName,Row)
  
  
     }
}

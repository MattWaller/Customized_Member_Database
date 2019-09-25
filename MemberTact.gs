// data from ProcessingVariables.gs

function MemberTact(SheetName, Row, z, zcols, t) {
  
  
  z = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName)
  zcols = z.getLastColumn();
  
  t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database")
  
  var ColumnHead = z.getRange(1,1,1,zcols).getValues();
  ColumnHead = ColumnHead[0]
  var MemberHeader = ColumnHead.indexOf("Member Number")+1;
  var TactNoHeader = ColumnHead.indexOf("Tactical Certification Number")+1;
  
  var memberNo = z.getRange(Row,MemberHeader).getValue();
  var TactNo = z.getRange(Row,TactNoHeader).getValue();
  Logger.log(memberNo);
  Logger.log(TactNo);
  
  var cols = t.getLastColumn();
  var rows = t.getLastRow();
  var dmem = t.getRange(1,1,1,cols).getValues();
  
  dmem = dmem[0];
  
  var DBmembers_header = dmem.indexOf("Member Number")+1;
  Logger.log(DBmembers_header);
  
  var db_tact_header = dmem.indexOf("Tactical Certification Number")+1;
  
  var DB_mem_array = t.getRange(DBmembers_header,1,rows,1).getValues();
  Logger.log(DB_mem_array);
  //DB_mem_array = DB_mem_array;


  
  var i = 0
  
  if ( i < DB_mem_array.length){
    while ( i <  DB_mem_array.length){
      
      if ( DB_mem_array[i] == memberNo){
        var dbRow = i + 1
        i = DB_mem_array.length
      }
      i = i + 1
    }
  }
  
  t.getRange(dbRow, db_tact_header).setValue(TactNo);
  Logger.log(Row);
  //z.deleteRow(Row)
  Logger.log(dbRow + " " +  db_tact_header)
}

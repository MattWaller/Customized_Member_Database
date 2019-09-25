function onEdit(e) {
  var ssVars = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Variables");
  var ss = e.range.getSheet();
  var SheetName = ss.getName();
  var thisCol = e.range.getColumn();
  var thisRow = e.range.getRow();
  var User_Email = Session.getActiveUser().getEmail();
  var ss_cols = ss.getLastColumn();
  var ss_headers = ss.getRange(1,1,1,ss_cols).getValues();
  ss_headers = ss_headers[0];
  
  var ss_rows = ss.getLastRow();
  
  var ColumnHead = ss.getRange(1,thisCol).getValue();
  
  var D_Val = ssVars.getRange(2,5).getValue();
  var D_R_Val = ssVars.getRange(2,6).getValue();
  
  var cell = ss.getRange(thisRow,thisCol).getValue();
  
  var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
  
  var t_cols = t.getLastColumn();
  var t_rows = t.getLastRow();
  
  var t_headers = t.getRange(1,1,1,t_cols).getValues();
  t_headers = t_headers[0];
  
  if (SheetName == "MemberDatabaseEdits"){
    
    if (ColumnHead == "Approval (Y/N)"){
      if(cell.charAt(0).toUpperCase() == "Y"){
        DatabaseEdits(thisRow,User_Email, ss)
        
      }
      if(cell.charAt(0).toUpperCase() == "N"){
        ss.deleteRow(thisRow)
      }
    }
  }
  
  
  
  if(SheetName == "PendingMembers"){
    
    if (thisCol == 26){
      
      var cols = ss.getLastColumn();
      var headers = ss.getRange(1,1,1,cols).getValues();
      
      headers = headers[0];
      Logger.log(headers);
      var mt = headers.indexOf("Membership Type");
      
      var fs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName);
      var Status = fs.getRange(thisRow,thisCol).getValue();
      var Note = fs.getRange(thisRow,25).getValue();
      var S_Note = fs.getRange(thisRow,24).getValue();
      var ssNotes = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ApprovedNotes");
      
      var mt_Val = ss.getRange(thisRow,mt+1).getValue();
      var manager_array = ["PRM","IND","CRP"]
      
      
      var managerVariable = manager_array.indexOf(mt_Val);
      Logger.log(managerVariable);
      Logger.log(mt_Val);
      Logger.log(managerVariable>= 0 )
      if(Status.charAt(0).toUpperCase() == "Y"){
        // validation if Keith or andrew approve higher memberships 
        if (managerVariable>= 0 ){
          
          if ( User_Email == "andrew@therangelangley.com" | User_Email == "keith@therangelangley.com" | User_Email == "accounting@therangelangley.com"){
            var MemberInfo = fs.getRange("B"+thisRow+":Q"+thisRow).getValues();
            
            var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
            var LR = t.getLastRow();
            
            var MN = t.getRange('A2:A'+LR).getValues();
            //Member number located in 1st column.
            var v = ss.getRange(thisRow,1).getValue();
            
            var i = 0
            var j = 0;
            if (i < LR){
              while (i < LR) {
                if (v == MN[i]){
                  j = i + 2;
                  i = LR;
                }
                i = i +1;
                
              }
            }
            
            if (i == LR + 1){
              
              if (j <= LR){
                t.getRange("B"+j+":Q"+j).setValues(MemberInfo);
                t.getRange("R"+j+":t"+j).setValues([[D_Val,D_Val,D_R_Val]])              
                t.getRange("T"+j).setValue('=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")')
                t.getRange("w"+j).setValue(D_Val)
                j = 1;
              }
            }
            if ( j == 0){
              //EMAIL IF ERROR
            } 
            
            // copying notes to approved notes page if there are notes available.
            if (Note.length > 0) {
              var ssNotesLR = ssNotes.getLastRow()+1;
              
              //setting Notes for Approved Members
              ssNotes.getRange("a"+ssNotesLR).setValue(D_Val);
              ssNotes.getRange("b"+ssNotesLR).setValue(D_Val);
              ssNotes.getRange("c"+ssNotesLR).setValue(v);
              ssNotes.getRange("d"+ssNotesLR).setValue("Neutral");
              ssNotes.getRange("e"+ssNotesLR).setValue(S_Note);
              ssNotes.getRange("f"+ssNotesLR).setValue(Note);
              ssNotes.getRange("g"+ssNotesLR).setValue(fs.getRange("W"+thisRow).getValue());
              ssNotes.getRange("H"+ssNotesLR).setValue('=IF(indirect("r[0]c[-3]",false)="High",2,IF(indirect("r[0]c[-3]",false)="PERMANENT",3,IF(indirect("r[0]c[-3]",false)="low",1)))');
            }
            
            var Delete = fs.deleteRow(thisRow)
            
            
            }
          
          
        }
        
        
        Logger.log(mt_Val);
        if (managerVariable< 0 ){
          
          Logger.log(mt_Val);
          var MemberInfo = fs.getRange("B"+thisRow+":Q"+thisRow).getValues();
          
          var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
          var LR = t.getLastRow();
          
          var MN = t.getRange('A2:A'+LR).getValues();
          //Member number located in 1st column.
          var v = ss.getRange(thisRow,1).getValue();
          
          var i = 0
          var j = 0;
          if (i < LR){
            while (i < LR) {
              if (v == MN[i]){
                j = i + 2;
                i = LR;
              }
              i = i +1;
              
            }
          }
          
          if (i == LR + 1){
            
            if (j <= LR){
              t.getRange("B"+j+":Q"+j).setValues(MemberInfo);
              t.getRange("R"+j+":t"+j).setValues([[D_Val,D_Val,D_R_Val]])
              t.getRange("T"+j).setValue('=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")')
              t.getRange("w"+j).setValue(D_Val)
              j = 1;
            }
          }
          if ( j == 0){
            //EMAIL IF ERROR
          } 
          
          // copying notes to approved notes page if there are notes available.
          if (Note.length > 0) {
            var ssNotesLR = ssNotes.getLastRow()+1;
            
            //setting Notes for Approved Members
            ssNotes.getRange("a"+ssNotesLR).setValue(D_Val);
            ssNotes.getRange("b"+ssNotesLR).setValue(D_Val);
            ssNotes.getRange("c"+ssNotesLR).setValue(v);
            ssNotes.getRange("d"+ssNotesLR).setValue("Neutral");
            ssNotes.getRange("e"+ssNotesLR).setValue(S_Note);
            ssNotes.getRange("f"+ssNotesLR).setValue(Note);
            ssNotes.getRange("g"+ssNotesLR).setValue(fs.getRange("W"+thisRow).getValue());
          }
          
          var Delete = fs.deleteRow(thisRow)
          
          
          }
        
        
        
        
      }
      
      if(Status.charAt(0).toUpperCase() == "N"){
        var MemberInfoA = fs.getRange("B"+thisRow+":K"+thisRow).getValues();
        var MemberInfoB = fs.getRange("M"+thisRow+":Q"+thisRow).getValues();
        
        var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
        var LR = t.getLastRow();
        
        var MN = t.getRange('A2:A'+LR).getValues();
        //Member number located in 1st column.
        var v = ss.getRange(thisRow,1).getValue();
        
        var i = 0
        var j = 0;
        if (i < LR){
          while (i < LR) {
            if (v == MN[i]){
              j = i+2;
              i = LR;
            }
            i = i +1;
            
          }
        }
        
        if (i == LR + 1){
          
          if (j <= LR){
            t.getRange("B"+j+":K"+j).setValues(MemberInfoA);
            t.getRange("M"+j+":Q"+j).setValues(MemberInfoB);
            
            t.getRange("l"+j).setValue("BAN")
            j = 1;
          }
        }
        if ( j == 0){
          //Email if error
        } 
        
        // copying notes to approved notes page if there are notes available.
        if (Note.length > 0) {
          var ssNotesLR = ssNotes.getLastRow() + 1;
          
          //setting Notes for Approved Members
          ssNotes.getRange("a"+ssNotesLR).setValue(D_Val);
          ssNotes.getRange("b"+ssNotesLR).setValue(D_Val);
          ssNotes.getRange("c"+ssNotesLR).setValue(v);
          ssNotes.getRange("d"+ssNotesLR).setValue("Neutral");
          ssNotes.getRange("e"+ssNotesLR).setValue(S_Note);
          ssNotes.getRange("f"+ssNotesLR).setValue(Note);
          ssNotes.getRange("g"+ssNotesLR).setValue(fs.getRange("W"+thisRow).getValue());
        }
        var Delete = fs.deleteRow(thisRow)
        }
    }
    
    // to remove transactions from database
    if(Status.charAt(0).toUpperCase() == "D"){
      var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
      var LR = t.getLastRow();
      
      var MN = t.getRange('A2:A'+LR).getValues();
      //Member number located in 1st column.
      var v = ss.getRange(thisRow,1).getValue();
      
      var i = 0
      var j = 0;
      if (i < LR){
        while (i < LR) {
          if (v == MN[i]){
            j = i+2;
            i = LR;
          }
          i = i +1;
          
        }
      }
      // clear Database member content for deleted member -- withdrawn
      t.getRange("B"+j+":V"+j).clearContent();       
      
      // delete member record from database
      var Delete = fs.deleteRow(thisRow);
    }
  }
  
  
  var ss = e.range.getSheet();
  var SheetName = ss.getName();
  var thisCol = e.range.getColumn();
  var thisRow = e.range.getRow();
  Logger.log(SheetName);
  if(SheetName == "MemberNotes"){
    Logger.log(thisCol);
    if (thisCol == 8){
      var fs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName);
      var Status = fs.getRange(thisRow,thisCol).getValue();
      if(Status.charAt(0).toUpperCase() == "Y"){
        var Note = fs.getRange("A"+thisRow+":G"+thisRow).getValues();
        var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ApprovedNotes");
        var tLR = t.getLastRow() +1;
        t.getRange("A"+tLR+":G"+tLR).setValues(Note);
        var Delete = fs.deleteRow(thisRow)
        }
      if(Status.charAt(0).toUpperCase() == "N"){
        var Delete = fs.deleteRow(thisRow);
      }
    }
  }
  
  // background check processing to master DB
  if (SheetName == "BackgroundChecks"){
    
    var process_cell = ss_headers.indexOf("BACKGROUND CHECK PASSED Y / N") +1;
    Logger.log(thisCol);
    Logger.log(process_cell);
    if(thisCol == process_cell){
      
      var members = t.getRange(1,t_headers.indexOf("Member Number")+1,t_rows,1).getValues();
      members = flatten(members);
      
      
      Logger.log(members);
      Logger.log("YES cell matches");
      
      var member = ss.getRange(thisRow,ss_headers.indexOf("Member Number")+1).getValue();
      
      var member_loc = members.indexOf(member)+1;
      Logger.log(member_loc);
      
      
      var background_date = ss.getRange(thisRow,ss_headers.indexOf("New Background Check Date (MM/DD/YYYY)")+1).getValue();
      var background_date_len = String(background_date).length
      
      Logger.log(background_date_len);
      
      if(cell.charAt(0).toUpperCase() == "Y"){
        
        
        // if date not entered take todays date
        if(background_date_len<1){
          
          Logger.log(new Date());
          
          t.getRange(member_loc,t_headers.indexOf("Background Check Date")+1).setValue(new Date());
          ss.getRange(2,ss_headers.indexOf("BACKGROUND CHECK PASSED Y / N")+1,ss_rows,1).clearContent();
        }
        // if date entered take entered date
        if(background_date_len>=1){
          
          Logger.log(background_date)
          t.getRange(member_loc,t_headers.indexOf("Background Check Date")+1).setValue(background_date);
          ss.getRange(2,ss_headers.indexOf("BACKGROUND CHECK PASSED Y / N")+1,ss_rows,1).clearContent();
        }
        
      }
      if(cell.charAt(0).toUpperCase() == "N"){
        
        t.getRange(member_loc,t_headers.indexOf("Background Check Date")+1).setValue("Failed background check");
        ss.getRange(2,ss_headers.indexOf("BACKGROUND CHECK PASSED Y / N")+1,ss_rows,1).clearContent();
      }
    }
  }
  t.getRange("F:F").setNumberFormat("mm/dd/yyyy")
  t.getRange("q:t").setNumberFormat("mm/dd/yyyy")
  t.getRange("w:w").setNumberFormat("mm/dd/yyyy")
  
  
  
  
}





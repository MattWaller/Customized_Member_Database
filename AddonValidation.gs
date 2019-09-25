// data comes from --> Details.gs
function AddonValidation(MemberID, MemberBD, StaffName, SheetName, Row, FormName) {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName);
  var Timestamp = ss.getRange(Row,1).getValue();
  
  var fault_ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
  var f_ss_LR = fault_ss.getLastRow()+1;
  
  var complete_ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CompletedRequest");
  var c_ss_LR = complete_ss.getLastRow()+1; 
  
  Logger.log("AddonValidation");
  
  var x = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AddonMembers");
  
  
  var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
  
  //Temporary variables -- testing
  /* MemberID = t.getRange("A19").getValue();
  MemberBD = t.getRange("F19").getValue();
  StaffName = "l"
  SheetName = "AddonMembers"
  Row = 78
  */
  var i = 0;
  var j = 0;
  
  
  
  
  
  // Determine if the Member ID and Member Birthdate match Form Entry
  var MemberList = t.getRange("A:A").getValues();
  var arrayLen = MemberList.length;
  
  var First_test = false;
  if (i < arrayLen){
    while ( i < arrayLen){
      
      
      if(MemberList[i] == MemberID == true){
        
        // find location of member match
        j = i + 1
        
        
        // grab BirthDate record
        var DatabaseBD = t.getRange(j,6).getValue();
        
        // grab member type
        var PriMT = t.getRange(j,12).getValue();
        
        // grab primary MemberID
        var PriAccount = t.getRange(j,21).getValue();
        
        // set i to arrayLen to exit while loop
        i = arrayLen; 
        
      }
      i = i + 1 
      // First Validation Test --> ensure that primary member number exists
      if ( i == arrayLen){
        var First_test = true;
      }
    }
  }
  Logger.log(PriAccount);
  Logger.log(PriMT);
  
  // run addon version of validation --------------------------------------------------------------------------------
  if (SheetName == "AddonMembers"){
    if (First_test != true){
      
      // Second Validation Test
      if(String(DatabaseBD) == String(MemberBD)){
        
        Logger.log("YES, there is a Match");
        
        // Third validation test -- ensure primary account holds proper member type
        // defining primary member types
        
        var primaryMT = ["MBR","LEO","MIL","PRM", "PEN"]
        var arrayLenTwo = primaryMT.length;
        Logger.log(primaryMT);
        Logger.log(arrayLenTwo);   
        
        
        var iii = 0;
        var jjj;
        var flagX = false;
        
        if (iii < arrayLenTwo){
          while ( iii < arrayLenTwo){
            jjj = primaryMT.indexOf(PriMT);
            Logger.log("INDEX OF MEMBERTYPE " +jjj);
            if(jjj >= 0){ 
              iii = arrayLenTwo;
              flagX = true;
              
            }
            
            iii = iii + 1;
            
          }
          
          
        }
        Logger.log(jjj);
        
        if (flagX == true){
          // Fourth validation test -- ensure primary member does not have a addon (LEO) could trip this.
          
          if(PriAccount.length == 0){
            //RUN SCRIPT HERE!!
            // process non locker information here
            if( SheetName != "LockerRegistration-Renewal"){
            ProcessingVariables(SheetName, Row, StaffName)
            }
            
            // process locker information here
            if( SheetName == "LockerRegistration-Renewal"){
              // verify lockers have enough remaining
              MemberLockerInformation(Row, SheetName, StaffName)
              ProcessingVariables(SheetName, Row, StaffName)
            }  
            
          }
          Logger.log(PriAccount.length);
          if(PriAccount.length != 0){
            ValidationTestFourEmail(StaffName, MemberID, PriAccount, FormName);
            Logger.log("SEND INFO EMAIL -- This account is an addon account of " + PriAccount)
            
            // Add error to Error log sheet 
            fault_ss.getRange(f_ss_LR,1).setValue(Timestamp)
            fault_ss.getRange(f_ss_LR,2).setValue(FormName)
            fault_ss.getRange(f_ss_LR,3).setValue(StaffName)
            fault_ss.getRange(f_ss_LR,4).setValue("Account not eligible for an add-on as it is an add-on account")
            // delte row of bad data 
            
            ss.deleteRow(Row)     
           
            
            
            
          }
          
        }
        if(flagX != true){
          ValidationTestThreeEmail(StaffName, MemberID, PriMT, FormName);

         
          // Add error to Error log sheet 
          fault_ss.getRange(f_ss_LR,1).setValue(Timestamp)
          fault_ss.getRange(f_ss_LR,2).setValue(FormName)
          fault_ss.getRange(f_ss_LR,3).setValue(StaffName)
          fault_ss.getRange(f_ss_LR,4).setValue("Primary Membership Does not qualify for add-on Membership")
          // delte row of bad data 
          
          ss.deleteRow(Row)     
          
          
          
          
        }
        
        
      }
      // run Email script on validation vault.
      if(String(DatabaseBD) != String(MemberBD)){
        
        ValidationTestTwoEmail(StaffName,MemberBD, MemberID, FormName);
  
        // Add error to Error log sheet 
        fault_ss.getRange(f_ss_LR,1).setValue(Timestamp)
        fault_ss.getRange(f_ss_LR,2).setValue(FormName)
        fault_ss.getRange(f_ss_LR,3).setValue(StaffName)
        fault_ss.getRange(f_ss_LR,4).setValue("Database birthdate & entered birthdate do not match")
        // delte row of bad data 
        
        ss.deleteRow(Row)
        
        
        
        
      } 
    }
    if (First_test == true){
      ValidationTestOneEmail(StaffName, MemberID, FormName);
      Logger.log("SEND INFO EMAIL")
     
      // Add error to Error log sheet 
      fault_ss.getRange(f_ss_LR,1).setValue(Timestamp)
      fault_ss.getRange(f_ss_LR,2).setValue(FormName)
      fault_ss.getRange(f_ss_LR,3).setValue(StaffName)
      fault_ss.getRange(f_ss_LR,4).setValue("Member number does not exist")        
      
      // delte row of bad data
      ss.deleteRow(Row)    
      
      
      
      
    }
  }
  
  // run Member Waivers version of validation -----------------------------------------------------------------
  if (SheetName == "MemberWaivers"){
    
    
    
    if (First_test != true){
      
      // Second Validation Test
      if(String(DatabaseBD) == String(MemberBD)){
        
        Logger.log("YES, there is a Match");
        
        
        
        
        
        if(PriAccount.length != 0){
          //RUN SCRIPT HERE!!
          
          ProcessingVariables(SheetName, Row, StaffName)
          // Add to completion log sheet 
          complete_ss.getRange(c_ss_LR,1).setValue(Timestamp)
          complete_ss.getRange(c_ss_LR,2).setValue(FormName)
          complete_ss.getRange(c_ss_LR,3).setValue(StaffName)
          
          
          // delte row of good data
          //ss.deleteRow(Row)  
        }
        
        
      }
      
      
      
      
      // run Email script on validation vault.
      if(String(DatabaseBD) != String(MemberBD)){
        
        ValidationTestTwoEmail(StaffName,MemberBD, MemberID, FormName);
        
        // Add error to Error log sheet 
        fault_ss.getRange(f_ss_LR,1).setValue(Timestamp)
        fault_ss.getRange(f_ss_LR,2).setValue(FormName)
        fault_ss.getRange(f_ss_LR,3).setValue(StaffName)
        fault_ss.getRange(f_ss_LR,4).setValue("Database birthdate & entered birthdate do not match")
        // delte row of bad data 
        
        ss.deleteRow(Row)
        
        
      } 
    }
    if (First_test == true){
      ValidationTestOneEmail(StaffName, MemberID, FormName);
      
      // Add error to Error log sheet 
      fault_ss.getRange(f_ss_LR,1).setValue(Timestamp)
      fault_ss.getRange(f_ss_LR,2).setValue(FormName)
      fault_ss.getRange(f_ss_LR,3).setValue(StaffName)
      fault_ss.getRange(f_ss_LR,4).setValue("Member number does not exist")        
      
      // delte row of bad data
      ss.deleteRow(Row)    
      
      
      
    }
    
    
    
    
    
    
  }
}

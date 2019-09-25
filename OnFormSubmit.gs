function onFormSubmit(e) {
  
  var values = e.range.getValues();
  var thisRow = e.range.getRow();
  var thisCol = e.range.getColumn();
  var ss = e.range.getSheet();  
  var val = ss.getRange("A"+thisRow+":AB"+thisRow).getValues();
  
  var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
  // get spreadsheet name
  var SheetName = ss.getName();
  var ss_cols = ss.getLastColumn();
  var ss_headers = ss.getRange(1,1,1,ss_cols).getValues();
  ss_headers = ss_headers[0];
  
  var StaffName = ss.getRange(thisRow,ss_headers.indexOf("Staff Name")+1).getValue();
  
  // New Membership
  if (SheetName == "NewMembers"){
    NewMembers();
  }  
  
  // Addon Membership
  if (SheetName == "AddonMembers"){
    AddonMembers();
  }  
  
  
  // MemberRenewal_Upgrade
  if (SheetName == "MemberRenewal-Upgrade"){
    MemberRenewal_Upgrade();
  }  
  
  // LockerRegistration_Renewal
  if (SheetName == "LockerRegistration-Renewal"){
    LockerRegistration_Renewal();
  }  
  
  // Member Database Edits
  if (SheetName == "MemberDatabaseEdits"){
    MemberDatabaseEdits();
  }    
  
  
  // Tact Verification
  if (SheetName == "MemberTact"){
    Tact();
  }
  
  // MemberNotes
  if (SheetName == "MemberNotes"){
    MemberNotes();
  } 
  
  // MemberWaivers
  if (SheetName == "MemberWaivers"){
    MemberWaivers(); 
  }
  
  /* THESE ARE THE FUNCTIONS USED IN AUTOMATION */
  
  // New Membership function
  function NewMembers(){
 

    

    var y = ss.getRange(thisRow,25).setValue('=concatenate(INDIRECT("r[0]c[-15]",false),INDIRECT("r[0]c[-12]",false))')
    var z = ss.getRange(thisRow,26).setValue('=concatenate(INDIRECT("r[0]c[-15]",false),INDIRECT("r[0]c[-10]",false))')
    var aa = ss.getRange(thisRow,27).setValue('=int(concatenate(INDIRECT("r[0]c[-15]",false),INDIRECT("r[0]c[-10]",false)))').setNumberFormat("mm/dd/yyyy")
    var ab = ss.getRange(thisRow,28).setValue('=concatenate(INDIRECT("r[0]c[-14]",false),INDIRECT("r[0]c[-10]",false))')
    var ac = ss.getRange(thisRow,29).setValue('=concatenate(INDIRECT("r[0]c[-14]",false),INDIRECT("r[0]c[-10]",false))')
    
    
    RuleDictionary(SheetName, thisRow, StaffName)
  
    
  }
  
  // addon member function
  function AddonMembers(){
    
    
  var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database")
  var LR = t.getLastRow()+1;
  var t_cols = t.getLastColumn();
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AddonMembers");
  
  var ss_rows = ss.getLastRow();
  var ss_cols = ss.getLastColumn();
  var thisRow = ss_rows
  var ss_headers = ss.getRange(1,1,1,ss_cols).getValues();
  
  ss_headers = ss_headers[0];
  Logger.log(ss_headers);
  var ss_head_len = ss_headers.length
  
  var db_headers = t.getRange(1,1,1,t_cols).getValues();
  db_headers = db_headers[0];
  Logger.log(db_headers);
  
  
  
  
  var array_start = ss_headers.reverse().indexOf("First Name")+1;
  
  var  array_col= ss_head_len - array_start+1;
  Logger.log(array_start);
  Logger.log(array_col);
  
  // entered variables headers
  var sv_Headers_splice = ss_headers.splice(array_start).reverse();
  Logger.log(sv_Headers_splice);
  
  // filtered headers
  var d_Headers_other_splice = ss_headers.splice(-array_start).reverse();
  Logger.log(d_Headers_other_splice);
  
  
  
  // loop to auto add addon requirements
  var i = 0;
  var j = 0; 
  var xx = sv_Headers_splice.length + 1;;
  Logger.log(xx + " starting Column");
  Logger.log("SV length = " + sv_Headers_splice.length)
  Logger.log(i <= sv_Headers_splice.length);
  
    
  

  j = 0;
  

    // convert POL number from Data Entry into Pal Number for value lookup and database appending.
  sv_Headers_splice = sv_Headers_splice.map(function(item) { return item == "POL Number" ? "PAL Number" : item; });
  
  sv_Headers_splice.forEach(function(item, i) { if (item == "POL Number") a[i] = "PAL Number"; });
  

    // create a loop through headers of consolidated data
  if (j < d_Headers_other_splice.length){
    while ( j < d_Headers_other_splice.length){
      var value = d_Headers_other_splice[j].trim()
    
      
      /* MIGHT NOT BE NECESSARY!
      if ( value == "POL Number"){
        value = "PAL Number"
      } */
      
      
      var indexes = getAllIndexes(sv_Headers_splice, value);

      i = 0 ;
      var temp_array = []
      if( i < indexes.length){
        while ( i < indexes.length){ 

          
          var temp = ss.getRange(thisRow, indexes[i] + 1 ).getValue();

          temp_array.push(temp);

          if ( String(temp).length != 0 ){
            ss.getRange(thisRow, xx).setValue(temp);

            
          }
          
          i = i + 1;
          // increment column after max number of interations have been reached -- ensures data entered into proper columns.
          if ( i == indexes.length){

            xx = xx + 1; 
          }
          
        }
      }
      j = j + 1;
    } 
  }
  
      // ensure proper data in cells
    ss.getRange(thisRow,d_Headers_other_splice.indexOf("Birthdate") + 1 + sv_Headers_splice.length).setNumberFormat("mm/dd/yyyy")
    ss.getRange(thisRow,d_Headers_other_splice.indexOf("Firearms License Expiry Date") + 1 + sv_Headers_splice.length).setNumberFormat("mm/dd/yyyy")
    ss.getRange(thisRow,d_Headers_other_splice.indexOf("Primary Member DOB") + 1 + sv_Headers_splice.length).setNumberFormat("mm/dd/yyyy")
  
    
    
    // start validation test to ensure accurate data entry.
    RuleDictionary(SheetName, thisRow, StaffName)
    
    
  }
  
  
  // Locker Registration and Renewal function
  function LockerRegistration_Renewal(){
    
    //var LockerNo = val[0][8]
    
    // pass variables to validator.
    RuleDictionary(SheetName, thisRow, StaffName)
    
    
  }
  
  
  
  // member renewals and upgrades
  
  function MemberRenewal_Upgrade(){
    // pass variables to validator.
    RuleDictionary(SheetName, thisRow, StaffName)
  }
  
  // Member Database Edits automation
  function MemberDatabaseEdits(){
    // pass variables to validator.
    RuleDictionary(SheetName, thisRow, StaffName)
    
    
    
  }
  
  
  // Defining auto Tact Range error & validation
  function Tact(){
    // pass variables to validator.
    RuleDictionary(SheetName, thisRow, StaffName)

    
  } 
  
  // Automation of MemberNotes
  function MemberNotes(){
    
    // pass variables to validator.
    RuleDictionary(SheetName, thisRow, StaffName)
    
    
    
  }
  
  
  function MemberWaivers(){
    
    var fs = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName);
    var fsLR = fs.getLastRow();
    
    fs.getRange(fsLR,16).setValue('=if(indirect("r[0]c[-7]",false)<>"",indirect("r[0]c[-7]",false),IF(indirect("r[0]c[-5]",false)="Other",indirect("r[0]c[-4]",false),indirect("r[0]c[-5]",false)))');
    fs.getRange(fsLR,17).setValue('=IF(indirect("r[0]c[-8]",false)<>"",indirect("r[0]c[-7]",false),indirect("r[0]c[-10]",false))');
   
    
    // pass variables to validator.
    RuleDictionary(SheetName, thisRow, StaffName)
    
    
  }
  
  t.getRange("F:F").setNumberFormat("mm/dd/yyyy")
  t.getRange("q:t").setNumberFormat("mm/dd/yyyy")
  t.getRange("w:w").setNumberFormat("mm/dd/yyyy")
  
}




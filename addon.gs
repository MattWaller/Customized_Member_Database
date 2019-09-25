// data from ProcessingVariables

function addon(SheetName, Row, StaffName, t, z, cols, rows , zrows, zcols, DatabaseCategories, fields, values, PendingMembers, ActiveHeaders, DataCat_len, AH_len, PM_len, i, j, k, l) {
  
  
  Logger.log("addon");
  
  
  //defining Add-on Members dictionary
  if ( SheetName == "AddonMembers"){
    var Formulas = {
      "Member Number" : '=IF(indirect("r[-1]c[0]",false)="Member Number",0,indirect("r[-1]c[0]",false)+1)',
      "Age" : '=rounddown((today()-indirect("r[0]c[-1]",False))/365)',
      "Range Expiry Date" : '=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")',
      "Tactical Certification Number" : "",
      "Range Start Date" : "",
      "Member Since" : ""
      
    }
    }
  
  
  
  var x = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PendingMembers");
  var xrows = x.getLastRow();
  
  var MemberTypeV; 
  var MemberType = "Membership Type"
  
  
  var tempArray_len = [];
  var tempArray = []
  var PendArray = [];
  var N_array = Object.keys(Formulas)
  var N_array_len = N_array.length;
  
  if ( j < DataCat_len){
    while ( j < DataCat_len){
      i = 0
      k = 0
      l = 0
      
      
      // if member type in member range
      if( MemberTypeV == "PEN"){
        var Formulas = {
          "Member Number" : '=IF(indirect("r[-1]c[0]",false)="Member Number",0,indirect("r[-1]c[0]",false)+1)',
          "Age" : '=rounddown((today()-indirect("r[0]c[-1]",False))/365)',
          "Range Expiry Date" : '=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")',
          "Tactical Certification Number" : "",
          "Range Start Date" : "",
          "Member Since" : "",
          
        } 
        
        
        }
      if ( DatabaseCategories[0][j] == "Birthdate"){
        var BD_col_loc = j; 
        
      }
      
      if ( DatabaseCategories[0][j] == "Firearms License Expiry Date"){
        var FLED_col_loc = j; 
        
      }
      if ( DatabaseCategories[0][j] == "Member Since"){
        var MS_col_loc = j; 
        
      } 
      if ( DatabaseCategories[0][j] == "Range Start Date"){
        var RSD_col_loc = j; 
        
      } 
      if ( DatabaseCategories[0][j] == "Range Expiry Date"){
        var RED_col_loc = j; 
        
      }       
      
      if ( k < N_array_len){
        while ( k < N_array_len){
          if (DatabaseCategories[0][j] == N_array[k]){
            
            
            tempArray.push(Formulas[Object.keys(Formulas)[k]]);
            k = N_array_len;
            i = AH_len;
            
          }
          k = k + 1;
        }
      }
      if(i<AH_len){
        while (i < AH_len) {
          
          
          
          
          if(DatabaseCategories[0][j] == ActiveHeaders[i]){
            
            if( ActiveHeaders[i] == MemberType){
              if( l < PM_len){
                while  ( l < PM_len){
                  var var_col = i;
                  var Location_col = zcols - var_col;
                  MemberTypeV = z.getRange(Row,Location_col).getValue();
                  if(PendingMembers[l] == MemberTypeV){
                    
                    
                    var MemberTypeP = MemberTypeV 
                    MemberTypeV = "PEN";
                    
                    tempArray.push(MemberTypeV)
                    l = PM_len;
                    
                    
                  }
                  
                  l = l + 1;
                  if( l == PM_len){
                    var MemberTypeP = MemberTypeV 
                    tempArray.push(MemberTypeV)
                  }
                }
              }      
            }
            
            if( ActiveHeaders[i] != MemberType){
              var var_col = i 
              var Location_col = zcols - var_col
              tempArray.push(z.getRange(Row,Location_col,1,1).getValue());
              
              i = AH_len;
            }
          }
          i = i + 1;
        }
        
        
      }
      
      j = j + 1;
      
      if (tempArray.length != j){
        tempArray.push("ERROR") 
      }
    }
  }
  
  
  
  Logger.log(MemberTypeP);
  
  
  t.getRange(rows+1,1,1,cols).setValues([tempArray]);
  
  
  
  
  // defining member addons minor --> auto setting fields
  if ( MemberTypeP == "MIR"){
    
    // setting member since records
    t.getRange(rows+1,MS_col_loc+1).setValue("=today()");
    var tempVal = t.getRange(rows+1,MS_col_loc+1).getValue();
    t.getRange(rows+1,MS_col_loc+1).setValue(tempVal);
    
    // setting range start date
    t.getRange(rows+1,RSD_col_loc+1).setValue("=today()");
    var tempVal = t.getRange(rows+1,RSD_col_loc+1).getValue();
    t.getRange(rows+1,RSD_col_loc+1).setValue(tempVal);
    
    
    var pal_col = DatabaseCategories[0].indexOf("PAL Type") +1 
    var pal_t = t.getRange(rows+1,pal_col).getValue()
    // setting POL expiry & range Membership expiry
    if ( pal_t == "J"){
    var bd = t.getRange(rows+1,DatabaseCategories[0].indexOf("Birthdate") +1 ).getValue();
    Logger.log(bd);
    var string_bd = String(bd).substring(11,15);
    Logger.log(parseInt(string_bd)+18);
    
    var t2 = String(parseInt(string_bd)+18);
    var t1 = String(bd).substring(4,11);
    
 

    
    t.getRange(rows+1,DatabaseCategories[0].indexOf("Firearms License Expiry Date") +1).setValue(t1+t2).setNumberFormat("mm/dd/yyyy")
    t.getRange(rows+1,DatabaseCategories[0].indexOf("Range Expiry Date") +1).setValue(t1+t2).setNumberFormat("mm/dd/yyyy")

  }
    
    // checking if minor has a junior pal
    if (pal_t == "J"){
      
      var string_yr = String(tempVal).substring(11,15);
      Logger.log(parseInt(string_yr)+1);
      var t2 = String(parseInt(string_yr)+1);
      var t1 = String(tempVal).substring(4,11);
      
      t.getRange(rows+1,DatabaseCategories[0].indexOf("Range Expiry Date") +1).setValue(t1+t2).setNumberFormat("mm/dd/yyyy")
      
    }
    var bcd_col = DatabaseCategories[0].indexOf("Background Check Date") +1 
    t.getRange(rows+1,bcd_col).setValue(tempVal).setNumberFormat("mm/dd/yyyy");
    
  }
  // checking if Member is law enforcement
  if ( MemberTypeP == "LEO"){
    
    // setting member since records
    t.getRange(rows+1,MS_col_loc+1).setValue("=today()");
    var tempVal = t.getRange(rows+1,MS_col_loc+1).getValue();
    t.getRange(rows+1,MS_col_loc+1).setValue(tempVal);
    
    // setting range start date
    t.getRange(rows+1,RSD_col_loc+1).setValue("=today()");
    var tempVal = t.getRange(rows+1,RSD_col_loc+1).getValue();
    t.getRange(rows+1,RSD_col_loc+1).setValue(tempVal);
    
    
    var pal_col = DatabaseCategories[0].indexOf("PAL Type") +1 
    var pal_t = t.getRange(rows+1,pal_col).getValue()
    
    // setting Non PAL Law enforcement Range Membership expiry
    if (pal_t != "X"){
      
      var string_yr = String(tempVal).substring(11,15);
      Logger.log(parseInt(string_yr)+1);
      var t2 = String(parseInt(string_yr)+1);
      var t1 = String(tempVal).substring(4,11);
      
      t.getRange(rows+1,DatabaseCategories[0].indexOf("Range Expiry Date") +1).setValue(t1+t2).setNumberFormat("mm/dd/yyyy")
      
    }
    var bcd_col = DatabaseCategories[0].indexOf("Background Check Date") +1 
    t.getRange(rows+1,bcd_col).setValue(tempVal).setNumberFormat("mm/dd/yyyy");
    
    
    

  }
  
  t.getRange(rows+1,BD_col_loc+1).setNumberFormat("mm/dd/yyyy")
  t.getRange(rows+1,FLED_col_loc+1).setNumberFormat("mm/dd/yyyy")
  t.getRange(rows+1,MS_col_loc+1).setNumberFormat("mm/dd/yyyy")
  t.getRange(rows+1,RSD_col_loc+1).setNumberFormat("mm/dd/yyyy")
  t.getRange(rows+1,RED_col_loc+1).setNumberFormat("mm/dd/yyyy")
  
  

  
  PendArray = t.getRange(rows+1,1,1,cols).getValues();
  
  x.getRange(xrows+1,1,1,cols).setValues([PendArray[0]]);
  x.getRange(xrows+1,12).setValue(MemberTypeP);
  x.getRange(xrows+1,cols+1).setValue(StaffName);
  
  
  // stating formName variable
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
  
  //SheetName = "LockerRegistration-Renewal"
  
  // defining FormName of sheet 
  FormName = FormName[SheetName];
  
  
  // defining active sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName);
  var ss_cols = ss.getLastColumn();
  var ss_headers = ss.getRange(1,1,1,ss_cols).getValues();
  var timestamp = ss.getRange(Row,ss_headers[0].indexOf("Timestamp")+1).getValue();
  
  // defining variables for completed requests sheet
  var cr = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CompletedRequest");
  var cr_rows = cr.getLastRow();
  var cr_cols = cr.getLastColumn();
  var cr_headers = cr.getRange(1,1,1,cr_cols).getValues();
  
  cr_headers = cr_headers[0];
  
  // set values in completed requests sheet
  cr.getRange(cr_rows+1,cr_headers.indexOf("Timestamp")+1).setValue(timestamp);
  cr.getRange(cr_rows+1, cr_headers.indexOf("Form Name")+1).setValue(FormName);
  cr.getRange(cr_rows+1,cr_headers.indexOf("Staff Name")+1).setValue(StaffName);
  
  
  ss.deleteRow(Row);
  
}

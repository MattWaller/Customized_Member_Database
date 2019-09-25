function register(SheetName, Row, StaffName, t, z, cols, rows , zrows, zcols, DatabaseCategories, fields, values, PendingMembers, ActiveHeaders, DataCat_len, AH_len, PM_len, i, j, k, l) {
  
  // run script here
  
  
  
  
  
  
  
  


// defining addon members dictionary
  if ( SheetName == "NewMembers"){
    var Formulas = {
      "Member Number" : '=IF(indirect("r[-1]c[0]",false)="Member Number",0,indirect("r[-1]c[0]",false)+1)',
      "Age" : '=rounddown((today()-indirect("r[0]c[-1]",False))/365)',
      "Range Expiry Date" : '=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")',
      "Tactical Certification Number" : "",
      "Range Start Date" : "",
      "Member Since" : "",
      "Primary Member Number" : "",
      "Background Check Date": '=indirect("r[0]c[-5]",false)',
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
        "Background Check Date":"",
      } 
      }
      if(MemberTypeV == "ATT"){
        var Formulas = {
          "Member Number" : '=IF(indirect("r[-1]c[0]",false)="Member Number",0,indirect("r[-1]c[0]",false)+1)',
          "Age" : '=rounddown((today()-indirect("r[0]c[-1]",False))/365)',
          "Range Expiry Date" : '=if(indirect("r[0]c[-1]",false)<>"",concatenate(Month(INDIRECT("r[0]c[-1]",false)),"/",day(INDIRECT("r[0]c[-1]",false)),"/",(YEAR(INDIRECT("r[0]c[-1]",false))+1)),"")',
          "Tactical Certification Number" : "",
          "Range Start Date" : "",
          "Member Since" : "",
          "Primary Member Number" : "",
          "Background Check Date":"",
        }
    }
        if ( DatabaseCategories[0][j] == "Background Check Date"){
      var BCD_col_loc = j; 
      
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
  t.getRange(rows+1,RSD_col_loc+1).setValue("=today()");
  var tempVal = t.getRange(rows+1,RSD_col_loc+1).getValue();
  

  t.getRange(rows+1,1,1,cols).setValues([tempArray]);
  t.getRange(rows+1,BD_col_loc+1).setNumberFormat("mm/dd/yyyy")
  t.getRange(rows+1,FLED_col_loc+1).setNumberFormat("mm/dd/yyyy")
  t.getRange(rows+1,MS_col_loc+1).setValue(tempVal).setNumberFormat("mm/dd/yyyy")
  t.getRange(rows+1,RSD_col_loc+1).setValue(tempVal).setNumberFormat("mm/dd/yyyy")
  t.getRange(rows+1,RED_col_loc+1).setNumberFormat("mm/dd/yyyy")
  
  
  if(MemberTypeV == "ATT"){
  t.getRange(rows+1,BCD_col_loc+1).setValue("").setNumberFormat("mm/dd/yyyy")
  }
  
  if(MemberTypeV != "ATT"){
    t.getRange(rows+1,BCD_col_loc+1).setValue(tempVal).setNumberFormat("mm/dd/yyyy")
  }
  PendArray = t.getRange(rows+1,1,1,cols).getValues();
  
  var temp_red = t.getRange(rows+1,RED_col_loc+1).getValue();
  t.getRange(rows+1,RED_col_loc+1).setValue(temp_red);
  
  x.getRange(xrows+1,1,1,cols).setValues([PendArray[0]]);
  x.getRange(xrows+1,12).setValue(MemberTypeP);
  x.getRange(xrows+1,cols+1).setValue(StaffName);

  




}

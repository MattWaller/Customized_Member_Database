// get data from OnEdit

function DatabaseEdits(thisRow,User_Email, ss) {
  var cols = ss.getLastColumn();
  var headers = ss.getRange(1,1,1,cols).getValues();
  
  headers = headers[0];
  Logger.log(headers);
  var mt = headers.indexOf("Membership Type");
  
  var mt_Val = ss.getRange(thisRow,mt+1).getValue();
  var manager_array = ["PRM","IND","CRP"]
  
  
  var managerVariable = manager_array.indexOf(mt_Val);
  Logger.log(managerVariable);
  if (managerVariable>= 0 ){
    
    if ( User_Email == "EMAIL1" | User_Email == "EMAIL2" | User_Email == "EMAIL3"){
      Logger.log("USER EMAIL");
      
      var PendArray = []
      var DB_Array = []
      var Edits_Array = []
      var Active_Array = []
      var Variables_Array = []
      var var_Array = []
      var db_cols_Array = []
      
      
      var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database")
      var z = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MemberDatabaseEdits")
      var t_rows = t.getLastRow();
      
      var Members = t.getRange("A1:A"+t_rows).getValues();
      
      var M_Len = Members.length
      
      
      
      var t_cols = t.getLastColumn();
      var z_cols = z.getLastColumn();
      
      Edits_Array = z.getRange(1,1,1,z_cols).getValues();
      Logger.log(Edits_Array);
      var EA_Len = Edits_Array[0].length
      
      DB_Array = t.getRange(1,1,1,t_cols).getValues();
      Logger.log(DB_Array);
      var DBA_Len = DB_Array[0].length
      
      PendArray = z.getRange(thisRow,1,1,z_cols).getValues();
      Logger.log(PendArray);
      var PA_Len = PendArray[0].length
      
      Logger.log(PA_Len);
      
      // Logger.log(String(PendArray[0][0]).length);
      
      var i = 0;
      if( i < PA_Len ) {
        while ( i < PA_Len) {
          
          if ( String(PendArray[0][i]).length > 0){
            
            Active_Array.push(i)
            var_Array.push(String(PendArray[0][i]))
          }
          i = i + 1;
        }
        
      }
      
      
      var AA_Len = Active_Array.length
      i = 0;
      var j = 0;
      if ( i < AA_Len) {
        while ( i < AA_Len){
          
          Variables_Array.push(Edits_Array[0][Active_Array[i]])
          
          i = i + 1;
        }
        
      }
      // creating 2D array to convert to dictionary
      var test_array = [Variables_Array,var_Array]
      var VA_Len = Variables_Array.length;
      // creating dictionary
      var keys = test_array.shift();
      var var_dict = test_array.map(function(values) {
        return keys.reduce(function(o, k, i) {
          o[k] = String(values[i]);
          return o;
        }, {});
      });
      
      Logger.log("MEMBER Number = " + var_dict[0][String(Members[0])]);
      Logger.log(var_dict[0][String(Variables_Array[1])]);
      
      
      
      i = 0;
      // finding member row
      if( i < M_Len){
        while ( i < M_Len){
          
          if(Members[i] == var_dict[0][String(Members[0])]){
            
            var Row = i + 1; 
            i = M_Len;
          }
          i = i + 1
          
        }
        
      }
      
      
      
      
      
      
      
      
      
      
      // Finding columns where variables exist --> null returned for no result
      i = 0;
      j = 0;
      
      if ( j < VA_Len) {
        while (  j < VA_Len){
          
          i = 0;
          if( i < DBA_Len){
            while ( i < DBA_Len){
              
              
              if( DB_Array[0][i] == Variables_Array[j]){
                
                db_cols_Array.push(i);
                i = DBA_Len +1;
              }
              
              i = i + 1  
              if ( i == DBA_Len){
                db_cols_Array.push(null) 
                
              }
            }
            
          }
          
          
          j = j + 1;
        }
        
      }
      
      var test_array_two = [Variables_Array,db_cols_Array]
      
      // creating dictionary
      var keys = test_array_two.shift();
      var var_dict_two = test_array_two.map(function(values) {
        return keys.reduce(function(o, k, i) {
          o[k] = String(values[i]);
          return o;
        }, {});
      });
      
      
      
      Logger.log(Variables_Array);
      Logger.log(db_cols_Array);
      Logger.log(var_dict_two);
      
      
      Logger.log(var_dict_two[0]['Timestamp']=="null")
      Logger.log(parseInt(var_dict_two[0][Variables_Array[3]])+1)
      Logger.log(var_Array[3])
      
      Logger.log(Variables_Array[3]);
      
      Logger.log(Variables_Array.length);
      i = 0;
      var testARRRAY = []
      if (i < VA_Len){
        while ( i < VA_Len){
          if (Variables_Array[i]!="Member Number"){
            
            
            if( var_dict_two[0][Variables_Array[i]]=="null"){
              
            }
            if( var_dict_two[0][Variables_Array[i]]!="null"){ 
              
              t.getRange(Row,parseInt(var_dict_two[0][Variables_Array[i]])+1).setValue(var_dict[0][Variables_Array[i]])
              Logger.log(Row)
              Logger.log(parseInt(var_dict_two[0][Variables_Array[i]])+1)
              Logger.log(var_dict[0][Variables_Array[i]])
              Logger.log(i);
              testARRRAY.push(i);
              
            }
          }
          i = i + 1
        }
        
        
      }
      Logger.log(testARRRAY);
      ss.deleteRow(thisRow)
    }
  }
 
  
  
  if (managerVariable< 0 ){
    Logger.log("NO Email");
    var PendArray = []
    var DB_Array = []
    var Edits_Array = []
    var Active_Array = []
    var Variables_Array = []
    var var_Array = []
    var db_cols_Array = []
    
    
    var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database")
    var z = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MemberDatabaseEdits")
    var t_rows = t.getLastRow();
    
    var Members = t.getRange("A1:A"+t_rows).getValues();
    
    var M_Len = Members.length
    
    
    
    var t_cols = t.getLastColumn();
    var z_cols = z.getLastColumn();
    
    Edits_Array = z.getRange(1,1,1,z_cols).getValues();
    Logger.log(Edits_Array);
    var EA_Len = Edits_Array[0].length
    
    DB_Array = t.getRange(1,1,1,t_cols).getValues();
    Logger.log(DB_Array);
    var DBA_Len = DB_Array[0].length
    
    PendArray = z.getRange(thisRow,1,1,z_cols).getValues();
    Logger.log(PendArray);
    var PA_Len = PendArray[0].length
    
    Logger.log(PA_Len);
    
    // Logger.log(String(PendArray[0][0]).length);
    
    var i = 0;
    if( i < PA_Len ) {
      while ( i < PA_Len) {
        
        if ( String(PendArray[0][i]).length > 0){
          
          Active_Array.push(i)
          var_Array.push(String(PendArray[0][i]))
        }
        i = i + 1;
      }
      
    }
    
    
    var AA_Len = Active_Array.length
    i = 0;
    var j = 0;
    if ( i < AA_Len) {
      while ( i < AA_Len){
        
        Variables_Array.push(Edits_Array[0][Active_Array[i]])
        
        i = i + 1;
      }
      
    }
    // creating 2D array to convert to dictionary
    var test_array = [Variables_Array,var_Array]
    var VA_Len = Variables_Array.length;
    // creating dictionary
    var keys = test_array.shift();
    var var_dict = test_array.map(function(values) {
      return keys.reduce(function(o, k, i) {
        o[k] = String(values[i]);
        return o;
      }, {});
    });
    
    Logger.log("MEMBER Number = " + var_dict[0][String(Members[0])]);
    Logger.log(var_dict[0][String(Variables_Array[1])]);
    
    
    
    i = 0;
    // finding member row
    if( i < M_Len){
      while ( i < M_Len){
        
        if(Members[i] == var_dict[0][String(Members[0])]){
          
          var Row = i + 1; 
          i = M_Len;
        }
        i = i + 1
        
      }
      
    }
    
    
    
    
    
    
    
    
    
    
    // Finding columns where variables exist --> null returned for no result
    i = 0;
    j = 0;
    
    if ( j < VA_Len) {
      while (  j < VA_Len){
        
        i = 0;
        if( i < DBA_Len){
          while ( i < DBA_Len){
            
            
            if( DB_Array[0][i] == Variables_Array[j]){
              
              db_cols_Array.push(i);
              i = DBA_Len +1;
            }
            
            i = i + 1  
            if ( i == DBA_Len){
              db_cols_Array.push(null) 
              
            }
          }
          
        }
        
        
        j = j + 1;
      }
      
    }
    
    var test_array_two = [Variables_Array,db_cols_Array]
    
    // creating dictionary
    var keys = test_array_two.shift();
    var var_dict_two = test_array_two.map(function(values) {
      return keys.reduce(function(o, k, i) {
        o[k] = String(values[i]);
        return o;
      }, {});
    });
    
    
    
    Logger.log(Variables_Array);
    Logger.log(db_cols_Array);
    Logger.log(var_dict_two);
    
    
    Logger.log(var_dict_two[0]['Timestamp']=="null")
    Logger.log(parseInt(var_dict_two[0][Variables_Array[3]])+1)
    Logger.log(var_Array[3])
    
    Logger.log(Variables_Array[3]);
    
    Logger.log(Variables_Array.length);
    i = 0;
    var testARRRAY = []
    if (i < VA_Len){
      while ( i < VA_Len){
        if (Variables_Array[i]!="Member Number"){
          
          
          if( var_dict_two[0][Variables_Array[i]]=="null"){
            
          }
          if( var_dict_two[0][Variables_Array[i]]!="null"){ 
            
            t.getRange(Row,parseInt(var_dict_two[0][Variables_Array[i]])+1).setValue(var_dict[0][Variables_Array[i]])
            Logger.log(Row)
            Logger.log(parseInt(var_dict_two[0][Variables_Array[i]])+1)
            Logger.log(var_dict[0][Variables_Array[i]])
            Logger.log(i);
            testARRRAY.push(i);
            
          }
        }
        i = i + 1
      }
      
      
    }
    Logger.log(testARRRAY);
    ss.deleteRow(thisRow)
  }
  
  
  
  
  
  
  
  
  

}



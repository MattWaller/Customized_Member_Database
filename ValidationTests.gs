// comes from RuleDictonary.gs
function ValidationTests(SheetName, thisRow, FormName, StaffName, vts) {
  
  var t = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Database");
  var t_rows = t.getLastRow();
  var t_cols = t.getLastColumn();
  var t_headers = t.getRange(1,1,1,t_cols).getValues();
  t_headers = t_headers[0];
  Logger.log(t_headers);
  
  
  
  var members = t.getRange(1,(t_headers.indexOf("Member Number")+1),t_rows,1).getValues();
  
  members = flatten(members);   
  
  
  
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SheetName);
  var ss_rows = ss.getLastRow();
  var ss_cols = ss.getLastColumn();
  var ss_headers = ss.getRange(1,1,1,ss_cols).getValues();
  ss_headers = ss_headers[0];
  
  
  
  // defining forms refering primary members
  var primaryMembers = ["AddonMembers","MemberWaivers"]
  
  // check if SheetName is in primary member range
  Logger.log(primaryMembers.indexOf(SheetName) >= 0)
  if( SheetName != "NewMembers"){
    // normalization of data if primary member if reference --> Add-on Members
    if ( primaryMembers.indexOf(SheetName) >= 0){
      var memberNo = ss.getRange(thisRow,ss_headers.indexOf("Primary Member Number")+1).getValue()
      var birthdate = ss.getRange(thisRow,ss_headers.indexOf("Primary Member DOB")+1).getValue()
      }
    
    // setting non add-on references to normalized data
    if ( primaryMembers.indexOf(SheetName) < 0){
      var memberNo = ss.getRange(thisRow,ss_headers.indexOf("Member Number")+1).getValue()
      var birthdate = ss.getRange(thisRow,ss_headers.indexOf("Birthdate")+1).getValue() 
      }
  }
  
  if( SheetName == "NewMembers"){
    var birthdate = ss.getRange(thisRow,ss_headers.indexOf("Birthdate")+1).getValue() 
    }
  
  // test ONE --> Staff Validation ----------------------------------------------------------------------------------------
  
  if(vts.indexOf(1) >= 0){
    Logger.log("YES test 1")
    
    var ss_headerIndexSN = ss_headers.indexOf("Staff Name")+1;
    Logger.log(ss_headerIndexSN);
    var ss_headerIndexPC = ss_headers.indexOf("Passcode")+1;
    Logger.log(ss_headerIndexPC);
    
    
    
    
    // get staff name and passcode of submitted form
    var form_staff_member = ss.getRange(thisRow,ss_headerIndexSN).getValue();
    var form_passcode = ss.getRange(thisRow,ss_headerIndexPC).getValue();
    
    Logger.log(form_staff_member);
    Logger.log(form_passcode);
    
    var sm = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("StaffMembers");
    var sm_cols = sm.getLastColumn();
    var sm_rows = sm.getLastRow();
    var sm_headers = sm.getRange(1,1,1,sm_cols).getValues();
    sm_headers = sm_headers[0]
    
    var sm_headerIndexSN = sm_headers.indexOf("Staff Name")+1;
    
    Logger.log(sm_headerIndexSN);
    var sm_headerIndexPC = sm_headers.indexOf("Passcode")+1;
    Logger.log(sm_headerIndexPC);
    
    
    // locate member name in staffmembers array
    
    var staffNames = sm.getRange(1,sm_headerIndexSN,sm_rows, 1).getValues();
    Logger.log(staffNames);
    staffNames = flatten(staffNames);
    Logger.log(staffNames)
    
    var staffLocation = staffNames.indexOf(StaffName)+1;
    
    
    
    var SM_passcode = sm.getRange(staffLocation,sm_headerIndexPC).getValue();
    
    Logger.log(SM_passcode);
    
    
    if (SM_passcode == form_passcode){
      
      Logger.log("passcode MATCH! -- validation confirmed");
      
      // continue with validation tests
      
    }
    
    if (SM_passcode != form_passcode){
      
      Logger.log("passcode Failed! -- validation denied");
      // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
      
      // pass variables to email
      ValidationTestOne (StaffName,FormName)
      
      
      // get timestamp for spreadsheet
      
      var timestamp = ss.getRange(thisRow,1).getValue();
      Logger.log(timestamp);
      
      // pass variables to spreadsheet
      
      var fsv = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("FailedStaffValidation");
      
      var fsv_rows = fsv.getLastRow();
      
      fsv.getRange(fsv_rows+1,1).setValue(timestamp);
      fsv.getRange(fsv_rows+1,2).setValue(FormName);
      fsv.getRange(fsv_rows+1,3).setValue(form_staff_member);
      
      
      // delete bad form data
      //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
      
      
      // set validation tests variable array to empty to stop proceeding on further verification tests
      vts = [];
      
    }
    
  }
  
  
  // test TWO --> Member Id exists ---------------------------------------------------------------------------------------
  if(vts.indexOf(2) >= 0){
    Logger.log("YES test 2")
    
    
    
    // logic if test passed
    if (members.indexOf(memberNo) >= 0 ){
      Logger.log("Succeed")
      Logger.log(memberNo)
      Logger.log(birthdate)
    }
    
    // logic if test fails
    if (members.indexOf(memberNo) < 0 ){
      
      Logger.log("passcode Failed! -- validation denied");
      // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
      
      // pass variables to email
      
      // if primary member is looked up
      if ( primaryMembers.indexOf(SheetName) >= 0){
        ValidationTestTwoEmail (StaffName, memberNo, FormName)
      }
      
      // if regular member is looked up
      if ( primaryMembers.indexOf(SheetName) < 0){
        ValidationTestTwoEmail_B (StaffName, memberNo, FormName)
        
      }
      
      // get timestamp for spreadsheet
      
      var timestamp = ss.getRange(thisRow,1).getValue();
      Logger.log(timestamp);
      
      // pass variables to spreadsheet
      
      var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
      
      var ovf_rows = ovf.getLastRow();
      
      ovf.getRange(ovf_rows+1,1).setValue(timestamp);
      ovf.getRange(ovf_rows+1,2).setValue(FormName);
      ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
      ovf.getRange(ovf_rows+1,4).setValue("Primary member number does not exist");
      
      
      // delete bad form data
      //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
      
      
      // set validation tests variable array to empty to stop proceeding on further verification tests
      vts = [];
    }  
    
  }
  
  
  // test Three --> Member ID == Member Birthdate ---------------------------------------------------------------------------------------
  if(vts.indexOf(3) >= 0){
    Logger.log("YES test 3")
    
    
    // determining members row in database
    var member_row_loc = members.indexOf(memberNo) + 1;
    
    Logger.log(member_row_loc);
    var db_birthdate = t.getRange(member_row_loc,t_headers.indexOf("Birthdate")+1).getValue();
    var memberType = t.getRange(member_row_loc,t_headers.indexOf("Membership Type")+1).getValue();
    Logger.log(db_birthdate);
    Logger.log(birthdate);
    Logger.log(memberType);
    
    // determine if birthdates are the same to pass validation test 
    if(String(db_birthdate) == String(birthdate)){
      Logger.log("YES");
      
      
    }
    // determine if birthdates match
    if(String(db_birthdate) != String(birthdate)){
      
      Logger.log("passcode Failed! -- validation denied");
      // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
      
      // pass variables to email
      
      // if primary member is looked up
      if ( primaryMembers.indexOf(SheetName) >= 0){
        ValidationTestThreeEmail(StaffName, memberNo, memberType, FormName)
      }
      
      // if regular member is looked up
      if ( primaryMembers.indexOf(SheetName) < 0){
        ValidationTestThreeEmail_B(StaffName, memberNo, memberType, FormName)
        
      }
      
      // get timestamp for spreadsheet
      
      var timestamp = ss.getRange(thisRow,1).getValue();
      Logger.log(timestamp);
      
      // pass variables to spreadsheet
      
      
      var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
      
      var ovf_rows = ovf.getLastRow();
      
      ovf.getRange(ovf_rows+1,1).setValue(timestamp);
      ovf.getRange(ovf_rows+1,2).setValue(FormName);
      ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
      ovf.getRange(ovf_rows+1,4).setValue("Entered birthdate of primary member does not match database record");
      
      
      
      // delete bad form data
      //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
      
      
      // set validation tests variable array to empty to stop proceeding on further verification tests
      vts = [];
    }
    
    
  }
  
  
  
  
  // test Four -->invalid membership level ---------------------------------------------------------------------------------------
  if(vts.indexOf(4) >= 0){
    Logger.log("YES test 4")
    
    // defining valid Membership levels for Add-ons & validate Pending members eligibility.
    
    var approvedMTs = ["MBR","MIL","LEO","PRM"]
    
    
    // member is not eligible for having an add-on
    if (approvedMTs.indexOf(memberType) < 0){
      
      
      
      
      // if the database record of the primary member is Pending --> check their eligiblity to have an add-on from pending page.
      if(memberType == "PEN"){
        
        // define sheet name variable (pending members)
        
        var pm = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PendingMembers");
        
        // pending members last columns
        var pm_cols = pm.getLastColumn();
        
        // define headers of pending members
        
        var pm_headers = pm.getRange(1,1,1,pm_cols).getValues();
        pm_headers = pm_headers[0];
        
        // find primary members row number
        
        var pm_member_loc = pm_headers.indexOf(memberNo) + 1;
        
        // get the member type of the primary member
        
        var pm_memberType = pm.getRange(pm_member_loc,pm_headers.indexOf("Membership Type")).getValue();
        
        Logger.log(pm_memberType);
        
        
        if (approvedMTs.indexOf(pm_memberType) < 0){ 
          
          // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
          
          // pass variables to email
          
          ValidationTestFourEmail_B(StaffName, memberNo, pm_memberType, FormName)
          
          // get timestamp for spreadsheet
          
          var timestamp = ss.getRange(thisRow,1).getValue();
          Logger.log(timestamp);
          
          // pass variables to spreadsheet
          
          
          var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
          
          var ovf_rows = ovf.getLastRow();
          
          ovf.getRange(ovf_rows+1,1).setValue(timestamp);
          ovf.getRange(ovf_rows+1,2).setValue(FormName);
          ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
          ovf.getRange(ovf_rows+1,4).setValue("Referenced primary member is not eligible for an add-on");
          
          
          
          // delete bad form data
          //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
          
          
          // set validation tests variable array to empty to stop proceeding on further verification tests
          vts = [];
          
          
          
          
        }
      }
      // Member type falls outside Pending and approved member types --> therefore is ineligible for add-on
      if(memberType != "PEN"){
      // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
      
      // pass variables to email
      ValidationTestFourEmail(StaffName, memberNo, memberType, FormName)
      
      
      // get timestamp for spreadsheet
      
      var timestamp = ss.getRange(thisRow,1).getValue();
      Logger.log(timestamp);
      
      // pass variables to spreadsheet
      
      var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
      
      var ovf_rows = ovf.getLastRow();
      
      ovf.getRange(ovf_rows+1,1).setValue(timestamp);
      ovf.getRange(ovf_rows+1,2).setValue(FormName);
      ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
      ovf.getRange(ovf_rows+1,4).setValue("Referenced primary member is not eligible for an add-on");
      
      // delete bad form data
      //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
      
      
      // set validation tests variable array to empty to stop proceeding on further verification tests
      vts = [];
      
      
      
      } 
    }
    
    
    
  }
  
  
  
  
  
  // test Five --> Referenced primary member is an add-on account ---------------------------------------------------------------------------------------
  
  if(vts.indexOf(5) >= 0){
    Logger.log("YES test 5")
    
    
    var primaryMemberNo = t.getRange(member_row_loc,t_headers.indexOf("Primary Member Number")+1).getValue();
    
    
    if (primaryMemberNo.length == 0){
      
      // member is an add-on account --> email info
      
      // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
      
      // pass variables to email
      
      ValidationTestFiveEmail(StaffName, memberNo, primaryMemberNo, FormName);
      
      // get timestamp for spreadsheet
      
      var timestamp = ss.getRange(thisRow,1).getValue();
      Logger.log(timestamp);
      
      // pass variables to spreadsheet
      
      var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
      
      var ovf_rows = ovf.getLastRow();
      
      ovf.getRange(ovf_rows+1,1).setValue(timestamp);
      ovf.getRange(ovf_rows+1,2).setValue(FormName);
      ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
      ovf.getRange(ovf_rows+1,4).setValue("Referenced primary member is an add-on account");
      
      
      // delete bad form data
      //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
      
      
      // set validation tests variable array to empty to stop proceeding on further verification tests
      vts = [];
      
      
      
      
    }
    
    
    
    
    
    
    
    
  }
  
  
  
  
  // test Six Locker Number != Member ID ---------------------------------------------------------------------------------------
  // Locker Renewal test to validate if the renewal locker is currently registered to that user.
  if(vts.indexOf(6) >= 0){
    Logger.log("YES test 6")
    
    var LockerNo = ss.getRange(thisRow,ss_headers.indexOf("Existing Locker Number")+1).getValue();
    var purpose = ss.getRange(thisRow,ss_headers.indexOf("Purpose")+1).getValue();
    
    var al = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MemberLockerInformation");
    
    var al_cols = al.getLastColumn();
    var al_rows = al.getLastRow();
    
    var al_headers = al.getRange(1,1,1,al_cols).getValues();
    al_headers = al_headers[0];
    
    var al_lockerNos = al.getRange(1,al_headers.indexOf("Locker Number")+1,al_rows,1).getValues();
    al_lockerNos = flatten(al_lockerNos);
    var al_MemberNos = al.getRange(1,al_headers.indexOf("Member Number")+1,al_rows,1).getValues();
    al_MemberNos = flatten(al_MemberNos);
    
    
    var renewal_locker = al.getRange(al_lockerNos.indexOf(LockerNo)+1,al_headers.indexOf("Locker Number")+1).getValue();
    var member_locker = al.getRange(al_lockerNos.indexOf(LockerNo)+1,al_headers.indexOf("Member Number")+1).getValue();
    
    
    
    // validation for locker renewals
    Logger.log("PURPOSE " + purpose);
    if (purpose == "Locker Renewal"){
      var al_row_loc = al_MemberNos.indexOf(memberNo) +1;
      var al_purpose = al.getRange(al_row_loc,al_lockerNos.indexOf(LockerNo)+1).getValue();
      
      if(al_MemberNos.indexOf(memberNo) < 0 ){
        // member number does not own any locker
        
        
        // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
        
        // pass variables to email
        ValidationTestSixEmail(StaffName, memberNo, FormName, LockerNo);
        
        
        // get timestamp for spreadsheet
        
        var timestamp = ss.getRange(thisRow,1).getValue();
        Logger.log(timestamp);
        
        // pass variables to spreadsheet
        
        var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
        
        var ovf_rows = ovf.getLastRow();
        
        ovf.getRange(ovf_rows+1,1).setValue(timestamp);
        ovf.getRange(ovf_rows+1,2).setValue(FormName);
        ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
        ovf.getRange(ovf_rows+1,4).setValue("Member doesn't own a locker");
        
        
        // delete bad form data
        //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
        
        
        // set validation tests variable array to empty to stop proceeding on further verification tests
        vts = [];
        
        
        
      }
      
      
      
      
      if(al_MemberNos.indexOf(memberNo) >= 0 ){
        
        
        
        var ss_locker = ss.getRange(thisRow,ss_headers.indexOf("Existing Locker Number")+1).getValue();
        
        
        var al_row_loc = al_lockerNos.indexOf(ss_locker) +1;
        
        
        
        var al_locker = al.getRange(al_row_loc,al_headers.indexOf("Locker Number")+1).getValue();
        
        var al_member = al.getRange(al_row_loc,al_headers.indexOf("Member Number")+1).getValue();
        
        
        
        Logger.log(al_member);
        Logger.log(memberNo);
        
        
        if(member_locker != memberNo){
          
          // form locker number doesn't match database locker number.
          
          
          // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
          
          // pass variables to email
          ValidationTestSixEmail(StaffName, memberNo, FormName, LockerNo);
          
          
          // get timestamp for spreadsheet
          
          var timestamp = ss.getRange(thisRow,1).getValue();
          Logger.log(timestamp);
          
          // pass variables to spreadsheet
          
          var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
          
          var ovf_rows = ovf.getLastRow();
          
          ovf.getRange(ovf_rows+1,1).setValue(timestamp);
          ovf.getRange(ovf_rows+1,2).setValue(FormName);
          ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
          ovf.getRange(ovf_rows+1,4).setValue("Member does not own this locker");
          
          
          // delete bad form data
          //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
          
          
          // set validation tests variable array to empty to stop proceeding on further verification tests
          vts = [];
          
          
          
          
          
          
        }
        
        
      }
    }
  }
  
  // test Seven No lockers remaining [maxed out locker rentals] ---------------------------------------------------------------------------------------
  if(vts.indexOf(7) >= 0){
    Logger.log("YES test 7")
    
    
    al_MemberNos = al_MemberNos.filter(Boolean);
    
    if ( al_lockerNos.length <=al_MemberNos.length){
      
      // there are no lockers available for rental
      // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
      
      // pass variables to email
      ValidationTestSevenEmail(StaffName, FormName);
      
      
      // get timestamp for spreadsheet
      
      var timestamp = ss.getRange(thisRow,1).getValue();
      Logger.log(timestamp);
      
      // pass variables to spreadsheet
      
      var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
      
      var ovf_rows = ovf.getLastRow();
      
      ovf.getRange(ovf_rows+1,1).setValue(timestamp);
      ovf.getRange(ovf_rows+1,2).setValue(FormName);
      ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
      ovf.getRange(ovf_rows+1,4).setValue("No more lockers availble to be rented");
      
      // delete bad form data
      //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
      
      
      // set validation tests variable array to empty to stop proceeding on further verification tests
      vts = [];
      
      
      
      
      
    }
    
    
  }
  
  // defining the age of majority ==> 18 years from date of birth.
  var majority = birthdate
  var b_year = majority.getFullYear()+18;
  var b_month = majority.getMonth()+1;
  var b_day = majority.getDate();
  
  var today = new Date();
  var t_year = today.getFullYear();
  var t_month = today.getMonth()+1;
  var t_day = today.getDate(); 
  if(t_month < 10){
    t_month = "0" + String(t_month)
  }
  if(t_day < 10){
    t_day = "0" + String(t_day)
  }
  if(b_month < 10){
    b_month = "0" + String(b_month)
  }
  
  
  if(b_day < 10){
    b_day = "0" + String(b_day)
  }
  
  
  majority = parseInt(String(b_year) + String(b_month) + String(b_day))
  today = parseInt(String(t_year) + String(t_month) + String(t_day))
  
  Logger.log(birthdate);
  Logger.log(today);
  
  // test Eight Firearm License is expired [ATTs & LEO don't do this test] ---------------------------------------------------------------------------------------
  
  
  
  if(vts.indexOf(8) >= 0){
    Logger.log("YES test 8")
    var MemberType = ss.getRange(thisRow, ss_headers.indexOf("Membership Type")+1).getValue();
    
    
    var FLED_Members = ["ATT","LEO"];
    
    
    var ss_head_len = ss_headers.length
    
    Logger.log(MemberType);
    
    
    
    
    var array_start = ss_headers.reverse().indexOf("PAL Type")+1;
    
    var  array_col= ss_head_len - array_start+1;
    Logger.log(array_start);
    Logger.log(array_col);
    
    // entered variables headers
    var sv_Headers_splice = ss_headers.splice(array_start).reverse();
    Logger.log(sv_Headers_splice);
    
    // filtered headers
    var d_Headers_other_splice = ss_headers.splice(-array_start).reverse();
    Logger.log(d_Headers_other_splice);
    
    if ( FLED_Members.indexOf(MemberType)<0){
      
      var PAL_expiry = ss.getRange(thisRow,sv_Headers_splice.length + d_Headers_other_splice.indexOf("Firearms License Expiry Date")+1).getValue();
      Logger.log(String(PAL_expiry));
      
      if(SheetName == "MemberRenewal-Upgrade"){
        var ss_headers = ss.getRange(1,1,1,ss_cols).getValues();
        ss_headers = ss_headers[0];
        PAL_expiry = ss.getRange(thisRow,ss_headers.indexOf("Firearms License Expiry Date")+1).getValue();
      }
      var pe_year = PAL_expiry.getFullYear();
      var pe_month = PAL_expiry.getMonth()+1;
      var pe_day = PAL_expiry.getDate();
      
      if(pe_month < 10){
        pe_month = "0" + String(pe_month)
      }
      
      
      if(pe_day < 10){
        pe_day = "0" + String(pe_day)
      }
      
      PAL_expiry = parseInt(String(pe_year) + String(pe_month) + String(pe_day))
      
      // check if Pal expiry is expired
      if(PAL_expiry < today){
        
        
        // there are no lockers available for rental
        // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
        
        // pass variables to email
        ValidationTestEightEmail(StaffName, memberNo, FormName, PAL_expiry);
        
        
        // get timestamp for spreadsheet
        
        var timestamp = ss.getRange(thisRow,1).getValue();
        Logger.log(timestamp);
        
        // pass variables to spreadsheet
        
        var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
        
        var ovf_rows = ovf.getLastRow();
        
        ovf.getRange(ovf_rows+1,1).setValue(timestamp);
        ovf.getRange(ovf_rows+1,2).setValue(FormName);
        ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
        ovf.getRange(ovf_rows+1,4).setValue("Member has an expired Firearms license");
        
        
        // delete bad form data
        //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
        
        
        // set validation tests variable array to empty to stop proceeding on further verification tests
        vts = [];
        
        
        
        
        
        
      }
    }
    
    
  }
  
  // test Nine Member under 18 therefore cannot have a primary membership ---------------------------------------------------------------------------------------
  
  if(vts.indexOf(9) >= 0){
    Logger.log("YES test 9")
    ss_headers = ss.getRange(1,1,1,ss_cols).getValues();
    ss_headers = ss_headers[0];
    
    var MemberType = ss.getRange(thisRow, ss_headers.indexOf("Membership Type")+1).getValue();
    
    Logger.log(today)
    Logger.log(majority)
    Logger.log(MemberType);
    
    var Non_minor_MTs = ["MBR","MIL","LEO","SPO","IND","CRP","PRM"]
    
    
    
    
    if (Non_minor_MTs.indexOf(MemberType)>=0){
      
      
      
      if (today < majority){
        
        
        // Age is below 18 --> therefore cannot have a primary membership or adult add-on account
        // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
        
        // pass variables to email
        ValidationTestNineEmail(StaffName, memberNo, majority, FormName);
        
        
        // get timestamp for spreadsheet
        
        var timestamp = ss.getRange(thisRow,1).getValue();
        Logger.log(timestamp);
        
        // pass variables to spreadsheet
        
        var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
        
        var ovf_rows = ovf.getLastRow();
        
        ovf.getRange(ovf_rows+1,1).setValue(timestamp);
        ovf.getRange(ovf_rows+1,2).setValue(FormName);
        ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
        ovf.getRange(ovf_rows+1,4).setValue("Member is not old enough to have a Primary Membership");
        
        // delete bad form data
        //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
        
        
        // set validation tests variable array to empty to stop proceeding on further verification tests
        vts = [];
        
        
        
        
      }
      
      
      
      
      
    }    
  }
  
  
  
  
  // test Ten Member is over the age of 18 therefore cannot have a MIR membership ---------------------------------------------------------------------------------------
  
  
  if(vts.indexOf(10) >= 0){
    Logger.log("YES test 10")
    var MemberType = ss.getRange(thisRow, ss_headers.indexOf("Membership Type")+1).getValue();
    
    
    var minor_MTs = ["MIR"]
    
    
    
    
    if (minor_MTs.indexOf(MemberType)>=0){
      
      
      
      if (today < majority){
        
        
        // Age is below 18 --> therefore cannot have a primary membership or adult add-on account
        // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
        
        // pass variables to email
        ValidationTestTenEmail(StaffName, memberNo, majority, FormName);
        
        
        // get timestamp for spreadsheet
        
        var timestamp = ss.getRange(thisRow,1).getValue();
        Logger.log(timestamp);
        
        // pass variables to spreadsheet
        
        var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
        
        var ovf_rows = ovf.getLastRow();
        
        ovf.getRange(ovf_rows+1,1).setValue(timestamp);
        ovf.getRange(ovf_rows+1,2).setValue(FormName);
        ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
        ovf.getRange(ovf_rows+1,4).setValue("Member is too old to have a minor membership");
        
        // delete bad form data
        //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
        
        
        // set validation tests variable array to empty to stop proceeding on further verification tests
        vts = [];
        
        
        
        
      }
      
      
      
      
      
    }    
    
    
    
  }
  
  
  
  
  
  // test Eleven Primary members range membership is expired --> cannot renew as an addon. ---------------------------------------------------------------------------------------
  
  if(vts.indexOf(11) >= 0){
    Logger.log("YES test 11")
    
    var MemberType = ss.getRange(thisRow, ss_headers.indexOf("Membership Type")+1).getValue();
    
    var primaryMember = t.getRange(member_row_loc,t_headers.indexOf("Primary Member Number")+1).getValue();
    
    var primary_member_row_loc = members.indexOf(primaryMember) + 1;
    
    var primaryRangeExp = t.getRange(primary_member_row_loc, t_headers.indexOf("Range Expiry Date")+1).getValue();
    
    var addons = ["MIR","SPO"]
    // defining the age of majority ==> 18 years from date of birth.
    if(addons.indexOf(MemberType)>=0){
      var pre_year = primaryRangeExp.getFullYear();
      var pre_month = primaryRangeExp.getMonth()+1;
      var pre_day = primaryRangeExp.getDate();
      
      var today = new Date();
      var t_year = today.getFullYear();
      var t_month = today.getMonth()+1;
      var t_day = today.getDate(); 
      if(t_month < 10){
        t_month = "0" + String(t_month)
      }
      if(t_day < 10){
        t_day = "0" + String(t_day)
      }
      if(pre_month < 10){
        pre_month = "0" + String(pre_month)
      }
      
      
      if(pre_day < 10){
        pre_day = "0" + String(pre_day)
      }
      
      
      primaryRangeExp = parseInt(String(pre_year) + String(pre_month) + String(pre_day))
      today = parseInt(String(t_year) + String(t_month) + String(t_day))
      
      if (today > primaryRangeExp){
        // primary membership is expired --> validation fault tripped.
        // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
        
        // pass variables to email
        ValidationTestElevenEmail(StaffName, memberNo, primaryMember, FormName);
        
        
        // get timestamp for spreadsheet
        
        var timestamp = ss.getRange(thisRow,1).getValue();
        Logger.log(timestamp);
        
        // pass variables to spreadsheet
        
        var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
        
        var ovf_rows = ovf.getLastRow();
        
        ovf.getRange(ovf_rows+1,1).setValue(timestamp);
        ovf.getRange(ovf_rows+1,2).setValue(FormName);
        ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
        ovf.getRange(ovf_rows+1,4).setValue("Primary members accounts expired.");
        
        
        // delete bad form data
        //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
        
        
        // set validation tests variable array to empty to stop proceeding on further verification tests
        vts = []; 
        
        
      } 
    }
  }
  // test Twelve Tactical membership already exists with member ---------------------------------------------------------------------------------------
  if(vts.indexOf(12) >= 0){
    Logger.log("YES test 12") 
    
    
    var MemberTact = t.getRange(member_row_loc,t_headers.indexOf("Tactical Certification Number")+1).getValue();
    Logger.log(MemberTact);
    if(String(MemberTact).length > 0){
      // validation tripped --> member already has an existing tactical certification number
      
      // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
      
      // pass variables to email
      ValidationTestTwelveEmail(StaffName, memberNo, FormName);
      
      
      // get timestamp for spreadsheet
      
      var timestamp = ss.getRange(thisRow,1).getValue();
      Logger.log(timestamp);
      
      // pass variables to spreadsheet
      
      var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
      
      var ovf_rows = ovf.getLastRow();
      
      ovf.getRange(ovf_rows+1,1).setValue(timestamp);
      ovf.getRange(ovf_rows+1,2).setValue(FormName);
      ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
      ovf.getRange(ovf_rows+1,4).setValue("Member already has a Tactical Cerification.");
      
      
      // delete bad form data
      //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
      
      
      // set validation tests variable array to empty to stop proceeding on further verification tests
      vts = []; 
      
 
      
    }
    
    
    
    
  }
  
  
  // test Thirteen Member is not eligible to renew as a IND ---------------------------------------------------------------------------------------
  if(vts.indexOf(13) >= 0){
    Logger.log("YES test 13") 
    
    var formSelection = ss.getRange(thisRow, ss_headers.indexOf("Form selection")+1).getValue();
    var memberNo = ss.getRange(thisRow, ss_headers.indexOf("Member Number")+1).getValue();
    var renewalType = ss.getRange(thisRow, ss_headers.indexOf("Membership Type")+1).getValue()
    
    if(formSelection == "Renewal"){
      
      if(renewalType == "IND"){
        
        var db_memberType = t.getRange(members.indexOf(memberNo)+1,t_headers.indexOf("Membership Type")+1).getValue();
        
        if(db_memberType != "IND"){
          
          // validation test fails member cannot renew as an IND member.
          
          // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
          
          // pass variables to email
          ValidationTestThirteenEmail(StaffName, memberNo, FormName);
          
          
          // get timestamp for spreadsheet
          
          var timestamp = ss.getRange(thisRow,1).getValue();
          Logger.log(timestamp);
          
          // pass variables to spreadsheet
          
          var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
          
          var ovf_rows = ovf.getLastRow();
          
          ovf.getRange(ovf_rows+1,1).setValue(timestamp);
          ovf.getRange(ovf_rows+1,2).setValue(FormName);
          ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
          ovf.getRange(ovf_rows+1,4).setValue("Member not eligible to renew as IND.");
          
          
          // delete bad form data
          //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
          
          
          // set validation tests variable array to empty to stop proceeding on further verification tests
          vts = []; 
          
          
          
          
          
          
          
          
        }
        
        
      }
      
    } 
    
    
    
    
    
    
    
    
    
    
    
  }
  
  
  // test Fourteen primary members account is exipired therefore cannot be renewed as an addon
  if(vts.indexOf(14) >= 0){
    Logger.log("YES test 14") 
    var addons = ["SPO","MIR"];
    
    var memberNo = ss.getRange(thisRow, ss_headers.indexOf("Member Number")+1).getValue();
    var renewalType = ss.getRange(thisRow, ss_headers.indexOf("Membership Type")+1).getValue()
    
    if(formSelection == "Renewal"){
      
      if(addons.indexOf(renewalType) >= 0){
        
        var primaryMemberID = t.getRange(members.indexOf(memberNo)+1,t_headers.indexOf("Primary Member Number")+1).getValue();
        
        var primaryRangeExpiry = t.getRange(members.indexOf(primaryMemberID)+1,t_headers.indexOf("Range Expiry Date")+1).getValue();
        
        
        var primaryRangeExpiry = new Date(primaryRangeExpiry).valueOf();
        //Logger.log(primaryRangeExpiry.valueOf());
        
        
        var today = new Date().valueOf();
        //Logger.log(today.valueOf());
        Logger.log(primaryRangeExpiry);
        
        
        
        
        
        Logger.log(today);
        Logger.log(primaryRangeExpiry);
        
        
        if( primaryRangeExpiry < today){
          // range membership expired 
          // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
          
          // pass variables to email
          //invalidPasscode (form_staff_member,FormName)
          
          
          // get timestamp for spreadsheet
          
          var timestamp = ss.getRange(thisRow,1).getValue();
          Logger.log(timestamp);
          
          // pass variables to spreadsheet
          
          var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
          
          var ovf_rows = ovf.getLastRow();
          
          ovf.getRange(ovf_rows+1,1).setValue(timestamp);
          ovf.getRange(ovf_rows+1,2).setValue(FormName);
          ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
          ovf.getRange(ovf_rows+1,4).setValue("Member already has a Tactical Cerification.");
          
          
          // delete bad form data
          //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
          
          
          // set validation tests variable array to empty to stop proceeding on further verification tests
          vts = []; 
          
          
        }
        
        
        
      }
      
    }
  }
  
  
  // test Fifteen member is too old to renew as a minor.
  if(vts.indexOf(15) >= 0){
    Logger.log("YES test 15") 
    
    var minorMembership = ["MIR"];
    
    var memberNo = ss.getRange(thisRow, ss_headers.indexOf("Member Number")+1).getValue();
    var renewalType = ss.getRange(thisRow, ss_headers.indexOf("Membership Type")+1).getValue()
    
    if(formSelection == "Renewal"){
      
      if(minorMembership.indexOf(renewalType) >= 0){
        
        var minorBirthdate = t.getRange(members.indexOf(memberNo)+1,t_headers.indexOf("Birthdate")+1).getValue();
        
        
        
        
        
        //Logger.log(primaryRangeExpiry.valueOf());
        var year = minorBirthdate.getFullYear()+18;
        var month = minorBirthdate.getMonth()+1;
        var date = minorBirthdate.getDate();
        
        minorBirthdate =   month + "/" + date + "/" + year ;
        
        Logger.log(minorBirthdate);
        var minorBirthdate = new Date(minorBirthdate).valueOf();
        var today = new Date().valueOf();
        //Logger.log(today.valueOf());
        Logger.log(minorBirthdate);
        
        
        
        
        
        Logger.log(today);
        Logger.log(minorBirthdate);
        
        
        if( minorBirthdate < today){
          // member is not a minor
          // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
          
          // pass variables to email
          ValidationTestNineEmail(StaffName, memberNo, majority, FormName);
          
          
          // get timestamp for spreadsheet
          
          var timestamp = ss.getRange(thisRow,1).getValue();
          Logger.log(timestamp);
          
          // pass variables to spreadsheet
          
          var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
          
          var ovf_rows = ovf.getLastRow();
          
          ovf.getRange(ovf_rows+1,1).setValue(timestamp);
          ovf.getRange(ovf_rows+1,2).setValue(FormName);
          ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
          ovf.getRange(ovf_rows+1,4).setValue("Member too old to renew as minor.");
          
          
          // delete bad form data
          //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
          
          
          // set validation tests variable array to empty to stop proceeding on further verification tests
          vts = []; 
          
          
        }
        
        
        
      }
    }
    
  }
  
  // test Sixteen member is too young to renew as a non - minor
  if(vts.indexOf(16) >= 0){
    Logger.log("YES test 16") 
    
    
    var minorMembership = ["MIR"];
    
    var memberNo = ss.getRange(thisRow, ss_headers.indexOf("Member Number")+1).getValue();
    var renewalType = ss.getRange(thisRow, ss_headers.indexOf("Membership Type")+1).getValue()
    
    if(formSelection == "Renewal"){
      // if member registers as non-minor but is a minor check
      if(minorMembership.indexOf(renewalType) < 0){
        
        var minorBirthdate = t.getRange(members.indexOf(memberNo)+1,t_headers.indexOf("Birthdate")+1).getValue();
        
        
        
        var year = minorBirthdate.getFullYear()+18;
        var month = minorBirthdate.getMonth()+1;
        var date = minorBirthdate.getDate();
        
        minorBirthdate =   month + "/" + date + "/" + year ;
        
        
        var minorBirthdate = new Date(minorBirthdate).valueOf();
        var today = new Date().valueOf();
        
        
        
        
        if( minorBirthdate > today){
          // range membership expired 
          // validation fails --> email sent to info@therangelangley.com & row added to FailedStaffValidation spreadsheet
          
          // pass variables to email
          ValidationTestElevenEmail(StaffName, memberNo, primaryMember, FormName);
          
          
          // get timestamp for spreadsheet
          
          var timestamp = ss.getRange(thisRow,1).getValue();
          Logger.log(timestamp);
          
          // pass variables to spreadsheet
          
          var ovf = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("OtherValidationFaults");
          
          var ovf_rows = ovf.getLastRow();
          
          ovf.getRange(ovf_rows+1,1).setValue(timestamp);
          ovf.getRange(ovf_rows+1,2).setValue(FormName);
          ovf.getRange(ovf_rows+1,3).setValue(form_staff_member);
          ovf.getRange(ovf_rows+1,4).setValue("Member too young to renew as non-minor.");
          
          
          // delete bad form data
          //ss.deleteRow(thisRow);          --------------------------------------------------------------enable this when ready
          
          
          // set validation tests variable array to empty to stop proceeding on further verification tests
          vts = []; 
          
          
        }
        
        
        
      }
    }
    
    
  }
  
  
  if( vts.length > 0){
    
    // run Processing variables 
    ProcessingVariables(SheetName, thisRow, StaffName)
    
    var timestamp = ss.getRange(thisRow,1).getValue();
    // add successful entry to sheet
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
    
    
    var NonDeleteForms = ["MemberWaivers","MemberDatabaseEdits","MemberNotes"]
    
    // only delete Form sheets not requiring further action by users [on edit forms]
    if(NonDeleteForms.indexOf(SheetName) < 0){
      
      ss.deleteRow(thisRow);
      
      
    } 
    
  }
  
  
  
}

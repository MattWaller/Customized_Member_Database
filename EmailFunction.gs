// data comes from --> ValidationTests.gs
// This module will send emails to ensure database integrity



// staff member passcode failure email
function ValidationTestOneEmail (StaffName,FormName, msg){
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, incorrect passcode entered on " + FormName; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission. The passcode entered does not match your passcode. Please double check your entry and try again. If this error persists please send this email to <a href="mailto:accounting@therangelangley.com?Subject=passcode%20not%20working" target="_top"> accounting@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
}





// Validation test two failed, primary member id does not exist
function ValidationTestTwoEmail(StaffName, PriNo, FormName, to, subject, msg){
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, primary member id does not exist"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission. The Database record of Member Id ' + PriNo + ' does not exist. Please double check your entry and try again. If the entered member id is correct, please send this email to <a href="mailto:csr@therangelangley.com?Subject=Member%20exists%20'+PriNo+'" target="_top"> csr@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
}   

// Validation test two failed, member id does not exist
function ValidationTestTwoEmail_B(StaffName, UserID, FormName, to, subject, msg){
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, member id does not exist"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission. The Database record of Member Id ' + UserID + ' does not exist. Please double check your entry and try again. If the entered member id is correct, please send this email to <a href="mailto:csr@therangelangley.com?Subject=Member%20exists%20'+UserID+'" target="_top"> csr@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
}   

// Validation test three failed, primary member id does not match primary member birthdate 
function ValidationTestThreeEmail(StaffName,PrimBD, PriNo, FormName, to, subject, msg) {
  
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Primary member Id does not match their Birthdate"; 
  
  var PrimBD = String(PrimBD).substring(4,15);
  PrimBD = PrimBD.replace(/ /g, "/")
  
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission. The Database record of Member Id ' + PriNo + ' does not have the birthdate '  +  PrimBD + '. Please double check your entry and try again. If the entered birthdate and id is correct, please use the <a href="https://docs.google.com/forms/d/e/1FAIpQLSc9ocWYIztP6XQhh28lfO6KufJRdUT9-IDPXZ7fq5v1EuxcEA/viewform"> member edit form </a> to correct the probLEO.   <\/p>'
  
  
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
}



// Validation test three failed, member id does not match member birthdate 
function ValidationTestThreeEmail_B(StaffName,Birthdate, UserID, FormName, to, subject, msg) {
  
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, member Id does not match their Birthdate"; 
  
  var PrimBD = String(Birthdate).substring(4,15);
  PrimBD = PrimBD.replace(/ /g, "/")
  
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission. The Database record of Member Id ' + UserID + ' does not have the birthdate '  +  PrimBD + '. Please double check your entry and try again. If the entered birthdate and id is correct, please use the <a href="https://docs.google.com/forms/d/e/1FAIpQLSc9ocWYIztP6XQhh28lfO6KufJRdUT9-IDPXZ7fq5v1EuxcEA/viewform"> member edit form </a> to correct the probLEO.   <\/p>'
  
  
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
}





// Validation test Four failed, Primary member does not have the proper membership level to have an addon
function ValidationTestFourEmail(StaffName, memberNo, memberType, FormName, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Primary member Id is not eligible to have an addon"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission on form ' + FormName + '. The database record of member id ' + memberNo + ' is a ' + memberType + ' which means they are not eligible to have an addon. Please double check your entry and try again. If the entered member type is incorrect, please use the <a href="https://docs.google.com/forms/d/e/1FAIpQLSc9ocWYIztP6XQhh28lfO6KufJRdUT9-IDPXZ7fq5v1EuxcEA/viewform"> member edit form </a> to correct the probLEO.<\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })  
  
  
}

// Validation test Four failed, Primary member does not have the proper membership level to have an addon
function ValidationTestFourEmail_B(StaffName, memberNo, memberType, FormName, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Primary member Id is not eligible to have an addon"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission on form ' + FormName + '. The database record of member id ' + memberNo + ' is a ' + memberType + ' which means they are not eligible to have an addon. Please double check your entry and try again. If the entered member type is incorrect, please use the <a href="https://docs.google.com/forms/d/e/1FAIpQLSc9ocWYIztP6XQhh28lfO6KufJRdUT9-IDPXZ7fq5v1EuxcEA/viewform"> member edit form </a> to correct the probLEO.<\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })  
  
  
}


// Validation test five failed, Primary member is an addon account -- [LEO]
function ValidationTestFiveEmail(StaffName, memberNo, primaryMemberNo, FormName, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Primary member Id is an addon account"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission on form ' + FormName + '. This account ' + memberNo + ' is an addon account of member ' + primaryMemberNo + '. Please double check your entry and try again. If the entered member id is not an add-on account, please send this email to <a href="mailto:csr@therangelangley.com?Subject=Not%20a%20addon%20account%20of%20'+primaryMemberNo+'" target="_top">csr@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
  
}



// Validation test Six failed, Member does not own that locker.
function ValidationTestSixEmail(StaffName, memberNo, FormName, LockerNo, to, subject, msg) {
  
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, member does not own locker "+LockerNo; 
  
  //var PrimBD = String(Birthdate).substring(4,15);
  //PrimBD = PrimBD.replace(/ /g, "/")
  
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission on form ' + FormName + '. The database record of member Id ' + memberNo + ' does not have the locker '  +  LockerNo + '. Please double check your entry and try again. If both the entered locker number and id are correct, please send this email to <a href="mailto:csr@therangelangley.com?Subject=Wrong%20Locker%20'+memberNo+'" target="_top"> csr@therangelangley.com </a> to correct the probLEO.   <\/p>'
  
  
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
}
  
  // validation test seven -- No lockers remaining
  function ValidationTestSevenEmail(StaffName, FormName, to, subject, msg){
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, no lockers available to rent" 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission on form ' + FormName + '. There appears to be no lockers availble for rental. Please double check the database to ensure this is accurate. If this is an error please send this email to <a href="mailto:accounting@therangelangley.com?Subject=lockers%20not%20working" target="_top"> accounting@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })


  
  
 
  
}


  // validation test eight -- Firearm license expired
  function ValidationTestEightEmail(StaffName, memberNo, FormName, PAL_expiry, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Members PAL Exipired"; 
  var PAL = String(PAL_expiry).substring(4,15);
  PAL = PAL.replace(/ /g, "/")
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission on form ' + FormName + '. The entered PAL date is expired ' + PAL + '. Please double check your entry and try again. If this is an error please send this email to <a href="mailto:accounting@therangelangley.com?Subject=PAL%20Expiry%20not%20working" target="_top"> accounting@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
  
  
 
  
}



  // validation test nine -- underaged, cannot hold primary membership
  function ValidationTestNineEmail(StaffName, memberNo, majority, FormName, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Member is not the age of majority"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission on form ' + FormName + '. Member is below the age of majority ' + majority + '. Please double check your entry and try again. If this is an error please send this email to <a href="mailto:accounting@therangelangley.com?Subject=majority%20form%20not%20working" target="_top"> accounting@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
  
  
 
  
}



  // validation test ten -- Overaged, cannot be a minor
  function ValidationTestTenEmail(StaffName, memberNo, majority, FormName, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Member is over the age of majority"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission on form ' + FormName + '. Member is above the age of majority ' + majority + '. Please double check your entry and try again. If this is an error please send this email to <a href="mailto:accounting@therangelangley.com?Subject=majority%20form%20not%20working" target="_top"> accounting@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
  
  
 
  
}

  // validation test eleven -- primary membership expired --> cannot renew as an addon
  function ValidationTestElevenEmail(StaffName, memberNo, primaryMember, FormName, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, primary member does not have a current range membership"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission on form ' + FormName + '. Primary member  ' + primaryMember + ' has an expired Range membership. Please double check your entry and try again. If this is an error please send this email to <a href="mailto:accounting@therangelangley.com?Subject=primary%20member%20not%20expired" target="_top"> accounting@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
  
  
 
  
}


  // validation test twelve -- Member already has a tactical number
  function ValidationTestTwelveEmail(StaffName, memberNo, FormName, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Member already has a Tactical Cerification"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission on form ' + FormName + '. Member  ' + memberNo + ' already has a tactical certification. Please double check your entry and try again. If this is an error, please use the <a href="https://docs.google.com/forms/d/e/1FAIpQLSc9ocWYIztP6XQhh28lfO6KufJRdUT9-IDPXZ7fq5v1EuxcEA/viewform"> member edit form </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
  
  
 
  
}


  // validation test thirteen -- Not eligible to renew as IND
  function ValidationTestThirteenEmail(StaffName, memberNo, FormName, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Member not eligible to renew as IND"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission on form ' + FormName + '. Member ' + memberNo + ' is not a IND member, therefore cannot be renewed as IND. Please double check your entry and try again. If this is an error, please use the <a href="https://docs.google.com/forms/d/e/1FAIpQLSc9ocWYIztP6XQhh28lfO6KufJRdUT9-IDPXZ7fq5v1EuxcEA/viewform"> member edit form </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
  
  
 
  
}



  // validation test fourteen -- SAME AS 11
  /*function ValidationTestFourteenEmail(StaffName, PriNo, PriAccount, FormName, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Member id does not match locker"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission. This account is an addon account of member ' + PriAccount + '. Please double check your entry and try again. If the entered member id is correct, please send this email to <a href="mailto:csr@therangelangley.com?Subject=Not%20a%20addon%20account%20of%20'+PriNo+'" target="_top">csr@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
  
  
 
  
}
*/

  // validation test Fifteen -- Too old to renew as minor
  function ValidationTestFifteenEmail(StaffName, PriNo, PriAccount, FormName, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Member too old to renew as minor"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission. This account is an addon account of member ' + PriAccount + '. Please double check your entry and try again. If the entered member id is correct, please send this email to <a href="mailto:csr@therangelangley.com?Subject=Not%20a%20addon%20account%20of%20'+PriNo+'" target="_top">csr@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
  
  
 
  
}

  // validation test sixteen -- Too young to renew as non-minor
  function ValidationTestSixteenEmail(StaffName, PriNo, PriAccount, FormName, to, subject, msg){
  
  var email = "matthew_waller@live.com"; 
  
  var subj = "Validation Error, Member too young to renew as non-minor"; 
  
  
  var payload = '<html>\r\n<body>\r\n\r\n<h2>Hey '+ StaffName + ',<\/h2>\r\n<br>\r\n\r\n<p> There was an error with your submission. This account is an addon account of member ' + PriAccount + '. Please double check your entry and try again. If the entered member id is correct, please send this email to <a href="mailto:csr@therangelangley.com?Subject=Not%20a%20addon%20account%20of%20'+PriNo+'" target="_top">csr@therangelangley.com </a> to correct the probLEO.   <\/p>'
  GmailApp.sendEmail(email, subj, msg,{
    htmlBody: payload
  })
  
  
 
  
}



















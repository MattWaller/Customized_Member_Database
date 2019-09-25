// get data from OnFormSubmit.gs

function FormNameDict(SheetName, thisRow, ss, LockerNo) {
  
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
  
  StaffMemberValidation(SheetName, thisRow, ss, FormName, LockerNo)
  
  
}

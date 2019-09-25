function RuleDictionary(SheetName, thisRow, StaffName){

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
  
  
  
  // defining FormName of sheet 
  FormName = FormName[SheetName];
  
  
  
  
  // defining validation tests variable
  var vts = []
  
  // New Membership
  if (SheetName == "NewMembers"){
    vts = [1,8,9]
  }  
  
  // Addon Membership
  if (SheetName == "AddonMembers"){
    vts = [1,2,3,4,5,8,10,11]
  }  
  
  
  // MemberRenewal_Upgrade
  if (SheetName == "MemberRenewal-Upgrade"){
    vts = [1,2,3,8,9,10,11,13,14,15,16]
  }  
  
  // LockerRegistration_Renewal
  if (SheetName == "LockerRegistration-Renewal"){
    vts = [1,2,3,6,7]
  }  
  
  // Member Database Edits
  if (SheetName == "MemberDatabaseEdits"){
    vts = [1]
  }    
  
  
  // Tact Verification
  if (SheetName == "MemberTact"){
    vts = [1,2,3,12]
  }
  
  // MemberNotes
  if (SheetName == "MemberNotes"){
    vts = [1,2,3]
  } 
  
  // MemberWaivers
  if (SheetName == "MemberWaivers"){
    vts = [1,2,3]
  }
  
  ValidationTests(SheetName, thisRow, FormName, StaffName, vts)
}





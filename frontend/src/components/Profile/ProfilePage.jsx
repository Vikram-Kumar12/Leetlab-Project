import React from "react";
import SideNavbar from "./SideNavbar";
const ProfilePage = () => {
  return (
    <div className="bg-slate-900  px-4 pt-5 relative z-10">

      {/* Background elements */}
      <div className="fixed top-16 left-0 w-1/3 h-1/3 bg-primary opacity-30 blur-3xl rounded-md -z-50"></div>
      <div className="fixed top-1/3 right-0 w-1/4 h-1/4 bg-purple-500 opacity-20 blur-3xl rounded-full -z-50"></div>

      <SideNavbar />
      
    </div>
  );
};

export default ProfilePage;

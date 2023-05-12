import React from "react";
import GroupList from "../../components/group/grouplist/GroupList";
import GroupNav from "../../components/group/groupnav/GroupNav";

export default function GroupPage() {
  return (
    <div className="overflow-hidden">
      <GroupNav />
      <GroupList />
    </div>
  ); 
}

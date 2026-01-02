import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'


const Sidebar = () => {
  return (
    <div className="flex flex-col h-full border-r border-white/20">
      <SearchInput />

      <div className="divider px-3"></div>

      <div className="flex-1 overflow-y-auto px-1">
        <Conversations />
      </div>

      <LogoutButton />
    </div>
  );
};
export default Sidebar;
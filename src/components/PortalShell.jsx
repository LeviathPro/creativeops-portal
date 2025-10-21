import React from "react";
import Sidebar from "./Sidebar";
import TabContent from "./TabContent";

const PortalShell = ({ user, tabs, activeTab, onSelectTab, onLogout }) => {
  return (
    <div className="portal-shell">
      <header className="portal-header glass">
        <div className="portal-branding">
          <img src="/logo.png" alt="Creative Ops" className="portal-logo" />
          <div>
            <h2 className="portal-name">CreativeOps Command</h2>
            <p className="portal-subtitle">Innovative Software for the Intelligent Minds of Creative Deck &amp; Fence, LLC.</p>
          </div>
        </div>
        <div className="portal-user">
          <div className="portal-user-meta">
            <span className="portal-user-name">{user.name}</span>
            <span className="portal-user-role">{user.displayRole}</span>
            <span className="portal-user-email">{user.email}</span>
          </div>
          <button className="portal-logout" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </header>
      <div className="portal-body glass">
        <Sidebar items={tabs} active={activeTab} onSelect={onSelectTab} />
        <main className="portal-content">
          <TabContent tab={activeTab} role={user.role} />
        </main>
      </div>
    </div>
  );
};

export default PortalShell;

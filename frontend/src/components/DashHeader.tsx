import React from "react";

import { Link } from "react-router-dom";

const DashHeader = () => {
  const content = (
    <header className="dash-header">
      <div className="dash-header-container">
        <Link to="/dash/notes">
          <h1 className="dash-header-title">techNotes</h1>
        </Link>
        <nav className="dash-header-nav"></nav>
      </div>
    </header>
  );
  return content;
};

export default DashHeader;

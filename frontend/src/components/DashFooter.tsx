import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import { useNavigate, useLocation } from "react-router-dom";

const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  const goHomeButton =
    pathname !== "/dash" ? (
      <button
        className="dash-footer-button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    ) : null;

  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current user:</p>
      <p>Status:</p>
    </footer>
  );
  return content;
};

export default DashFooter;

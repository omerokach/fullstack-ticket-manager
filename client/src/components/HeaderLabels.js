import React from "react";

function HeaderLabels(props) {
  return (
    <div className="header-label" onClick={(e) => props.clickHandler(e)}>
      {props.labelName}
    </div>
  );
}

export default HeaderLabels;

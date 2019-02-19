import React from "react";

const FloatButton = ({ floatBtnClicked }) => {
  return (
    <div
      style={{ position: "fixed", bottom: 40, right: 40, cursor: "pointer" }}
    >
      <div
        style={{
          borderRadius: 50,
          width: 60,
          height: 60,
          background: "#e74c3c",
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          color: "#FFFFFF",
          boxShadow: "2px 2px 3px #999"
        }}
        onClick={floatBtnClicked}
      >
        <i className="fa fa-plus" />
      </div>
    </div>
  );
};
export { FloatButton };

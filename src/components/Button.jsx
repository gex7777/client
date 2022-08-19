import React from "react";

const Button = ({ ...props }) => {
  return (
    <>
      <button className="btn" onClick={props.onClick || (() => null)}>
        {props.title}
      </button>
    </>
  );
};

export default Button;

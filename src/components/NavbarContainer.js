import React from "react";

function NavbarContainer(props) {
  const { color, spaced, className, ...otherProps } = props;

  return (
    <nav
      className={
        "navbar" +
        (color ? ` is-${color}` : "") +
        (spaced ? " is-spaced" : "") +
        (className ? ` ${className}` : "")
      }
      {...otherProps}
    >
      {props.children}
    </nav>
  );
}

export default NavbarContainer;

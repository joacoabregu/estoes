/** @jsxImportSource @emotion/react */
import { jsx } from "@emotion/react";
import React from "react";
import logo from "../assets/logo.png";

export default function Nav() {
  return (
    <nav css={styles.nav}>
      <img src={logo} alt="logo" css={styles.img} />
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    marginBottom: "3em",
  },

  img: {
    width: "100",
    maxHeight: "110px",
  },
};

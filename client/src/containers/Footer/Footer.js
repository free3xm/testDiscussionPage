import React from "react";
import cls from "./Footer.module.css";

function Footer(props) {
  return (
    <footer className={cls.Footer}>
      <time>{new Date().getFullYear()}</time>
      <address className={cls.Author}>Vadim Kolomiets</address>
      <nav className={cls.Navbar}>
        <a
          href="https://www.linkedin.com/in/vadim-kolomiets-704b2718b/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="https://github.com/free3xm"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i className="fab fa-github"></i>
        </a>
      </nav>
    </footer>
  );
}

export default Footer;

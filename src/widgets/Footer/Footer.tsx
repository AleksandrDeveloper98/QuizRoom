import type { TFooterProps } from "./types";

import "./Footer.scss";

const Footer = (props: TFooterProps) => {
  const { children } = props;

  return (
    <footer className="footer">
      <div className="footer__inner container">{children}</div>
    </footer>
  );
};

export default Footer;

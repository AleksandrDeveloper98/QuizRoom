import ButtonLogout from "@/features/guest-session/ui/ButtonLogout";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <ButtonLogout />
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom"; // Ensure the CSS file is imported

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLinks: React.FC<Props> = ({ to, bg, text, textColor, onClick }) => {
  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
  };

  // Assign specific classes based on the background color
  const linkClass = 
    bg === "#39424E" ? "login" :
    bg === "#1B2A35" ? "signup" :
    bg === "#630303" ? "logout" :
    bg === "#39424E" ? "chat" :
    "";

  return (
    <Link
      onClick={handleClick}
      className={`nav-link ${linkClass}`}
      to={to}
      style={{ color: textColor }}
    >
      {text}
    </Link>
  );
};

export default NavigationLinks;

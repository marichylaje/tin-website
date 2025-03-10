import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const NavbarContainer = styled.nav`
  z-index: 10;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 800px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  background: transparent;
  overflow-x: auto; /* 🔹 Scroll horizontal en móviles */
  white-space: nowrap;
  padding: 10px;

  /* 🔹 Ocultar scrollbar en navegadores */
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    transform: none;
    justify-content: flex-start;
    padding: 10px 15px;
    font-size: 16px;
  }
`;

const NavItem = styled(motion(NavLink))`
  font-size: 22px;
  font-weight: 700;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease-in-out;
  cursor: pointer;

  /* 🔹 Sombra en el texto para mejorar visibilidad */

  &.active {
    color: #01045a;
    -webkit-text-stroke: 1px #01045a;
  }

  &:not(.active) {
    color: #2e42a9;
  }

  &:hover {
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.9); /* 🔥 Más intenso en hover */
  }

  &:last-child {
    margin-right: 3rem;
  }
`;

const links = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Photos", path: "/photos" },
];

export default function NavBar() {
  return (
    <NavbarContainer>
      {links.map((link) => (
        <NavItem
          key={link.path}
          to={link.path}
          whileHover={{
            y: [-3, 3, -3, 2, -2, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {link.name}
        </NavItem>
      ))}
    </NavbarContainer>
  );
}

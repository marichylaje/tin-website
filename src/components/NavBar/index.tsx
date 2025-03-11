import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarContainer = styled.nav`
  z-index: 50;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  padding: 10px;

  @media (max-width: 768px) {
    justify-content: space-between;
    left: 0;
    transform: none;
    width: 100%;
    padding: 10px 20px;
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 24px;
  color: #2e42a9;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinksWrapper = styled(motion.div)`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    align-items: flex-start;
  }
`;

const NavItem = styled(motion(NavLink))`
  font-size: 22px;
  font-weight: 700;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease-in-out;
  cursor: pointer;

  &.active {
    color: #01045a;
    -webkit-text-stroke: 1px #01045a;
  }

  &:not(.active) {
    color: #2e42a9;
  }

  &:hover {
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.9);
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 10px 0;
    width: 100%;
  }
`;

// Links de navegación
const links = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <NavbarContainer>
      <MenuIcon onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </MenuIcon>

      <AnimatePresence>
        {(isMenuOpen || window.innerWidth > 768) && (
          <NavLinksWrapper
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {links.map((link) => (
              <NavItem
                key={link.path}
                to={link.path}
                onClick={closeMenu}
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
          </NavLinksWrapper>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
}

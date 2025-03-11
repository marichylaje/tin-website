import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import loadingGif from "/assets/loading/loading1.gif";

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px; /* 🟢 Más adaptable para distintos tamaños */
  max-width: 80vw; /* ✅ Responsivo */
  height: 300px;
  max-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.85); /* ✅ Fondo semitransparente para enfoque */
  backdrop-filter: blur(10px); /* ✅ Efecto glassmorphism */
  border-radius: 20px; /* Bordes suaves */
  z-index: 9999;
`;

const LoaderImage = styled.img`
  width: 80%;
  height: auto;
  object-fit: contain;
`;

// ✅ Props para controlarlo desde el padre si quieres usar AnimatePresence
export default function Loading({ isVisible = true }: { isVisible?: boolean }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <LoaderContainer
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <LoaderImage src={loadingGif} alt="Cargando contenido..." />
        </LoaderContainer>
      )}
    </AnimatePresence>
  );
}

import styled from "styled-components";
import { motion } from "framer-motion";
import loadingGif from "/assets/loading/loading1.gif"; 

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px; /* Ajusta según tamaño deseado */
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Se mantiene por encima del resto */
`;

const LoaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default function Loading() {
  return (
    <LoaderContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LoaderImage src={loadingGif} alt="Loading..." />
    </LoaderContainer>
  );
}

import { useState, useEffect } from "react";
import styled from "styled-components";
import Gallery from "../../components/Gallery";

const ProjectsContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

export default function Projects({ setIsReload }: { setIsReload: (value: boolean) => void }) {
  const [mediaArray, setMediaArray] = useState<string[]>([]);

  useEffect(() => {
    setIsReload(false);
  }, []);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch("/assets/main/files.json"); // ✅ Ruta corregida
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        if (Array.isArray(data.files)) {
          const multipliedMedia = Array(6).fill(data.files).flat(); // 🔥 Duplica x6
          setMediaArray(multipliedMedia);
          console.log("Media Loaded:", multipliedMedia);
        } else {
          console.error("Unexpected JSON structure:", data);
        }
      } catch (error) {
        console.error("Error loading media JSON:", error);
      }
    };

    fetchMedia();
  }, []);

  return (
    <ProjectsContainer>
      <h1>Galería de Proyectos</h1>
      <Gallery mediaArray={mediaArray} />
    </ProjectsContainer>
  );
}

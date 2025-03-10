import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const timeOptions = [5, 15, 25, 35, 50, 55];

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3vw;
  justify-content: center;
  align-items: center;
  width: 90vw;
  margin: auto;
  padding-top: 50px;
`;

const VideoWrapper = styled.div`
  width: 35vw;
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const StyledMedia = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export default function Gallery({ mediaArray }: { mediaArray: string[] }) {
  const navigate = useNavigate();

  return (
    <GalleryContainer>
      {mediaArray.length === 0 ? (
        <p>No se encontraron archivos.</p>
      ) : (
        mediaArray.map((src, index) => {
          const fileName = src.split("/").pop()?.split(".")[0] || `project-${index}`;
          const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");

          // 🎯 Seleccionar un segundo aleatorio para comenzar el video
          const startTime = timeOptions[Math.floor(Math.random() * timeOptions.length)];
          const posterTime = startTime + 3;

          return (
            <VideoWrapper key={index} onClick={() => navigate(`/projects/${fileName}`)}>
              {isVideo ? (
                <StyledMedia
                  src={`${src}#t=${startTime}`} // ⏩ Empieza en `startTime` segundos
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  controls={false}
                  poster={`${src}#t=${posterTime}`} // 📌 Placeholder con imagen de `startTime + 3`
                  onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
              ) : (
                <img src={src} alt={fileName} style={{ width: "100%", height: "100%", borderRadius: "10px" }} />
              )}
            </VideoWrapper>
          );
        })
      )}
    </GalleryContainer>
  );
}

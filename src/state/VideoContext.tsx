import { createContext, useContext, useState, useCallback } from "react";

// Importamos dinámicamente todos los GIFs dentro de "assets/gifs/"
const videoFiles = import.meta.glob("../assets/gifs/*.gif", { eager: true }) as Record<string, { default: string }>;

// Extraemos solo las rutas de los archivos importados
const videos = Object.values(videoFiles).map((file) => file.default);

type VideoContextType = {
  currentVideo: string;
  setRandomVideo: () => void;
  isLoading: boolean;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentVideo, setCurrentVideo] = useState(videos[0] || "");
  const [isLoading, setIsLoading] = useState(false);

  const setRandomVideo = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const randomVideo = videos[Math.floor(Math.random() * videos.length)];
      setCurrentVideo(randomVideo);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <VideoContext.Provider value={{ currentVideo, setRandomVideo, isLoading }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideo debe usarse dentro de un VideoProvider");
  }
  return context;
};

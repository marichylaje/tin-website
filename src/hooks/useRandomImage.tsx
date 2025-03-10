import { useState, useCallback, useEffect } from "react";
import { useVideo } from "../state/VideoContext";

// 📂 Ubicaciones de los archivos JSON
const JSON_PATHS = {
  floating: "/assets/floating/files.json",
  background: "/assets/background/files.json",
  character: "/assets/characters/files.json",
  gif: "/assets/gifs/files.json",
};

type ImageType = "floating" | "background" | "character" | "gif";

export function useRandomImage() {
  const { setRandomVideo } = useVideo();
  const [isLoading, setIsLoading] = useState(true);

  // 📌 Estados para almacenar las listas de imágenes
  const [floatingImages, setFloatingImages] = useState<string[]>([]);
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
  const [characterImages, setCharacterImages] = useState<string[]>([]);
  const [gifImages, setGifImages] = useState<string[]>([]);

  // 📌 Estados para almacenar las imágenes seleccionadas
  const [floatingImage, setFloatingImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [characterImage, setCharacterImage] = useState<string | null>(null);
  const [gifImage, setGifImage] = useState<string | null>(null);

  // 🔥 Cargar archivos JSON dinámicamente
  useEffect(() => {
    const loadImages = async (type: ImageType, setImages: (images: string[]) => void) => {
      try {
        const response = await fetch(JSON_PATHS[type]);
        const data = await response.json();

        // 🔹 Busca la propiedad correcta en el JSON
        if (data.files) {
          setImages(data.files);
        } else if (data.floatingImages) {
          setImages(data.floatingImages);
        } else if (data.backgroundImages) {
          setImages(data.backgroundImages);
        } else if (data.characterImages) {
          setImages(data.characterImages);
        } else if (data.gifImages) {
          setImages(data.gifImages);
        } else {
          console.error(`⚠ Formato inesperado en JSON para ${type}:`, data);
        }
      } catch (error) {
        console.error(`❌ Error cargando imágenes de ${type}:`, error);
      }
    };

    // 🔥 Carga todas las imágenes antes de salir de `loading`
    Promise.all([
      loadImages("floating", setFloatingImages),
      loadImages("background", setBackgroundImages),
      loadImages("character", setCharacterImages),
      loadImages("gif", setGifImages),
    ]).then(() => {
      changeImage(); // 🔥 Seleccionamos las imágenes una vez que han cargado los JSON
      setIsLoading(false);
    });
  }, []);

  // 🔄 Obtiene una imagen aleatoria
  const getRandomImage = (imageArray: string[]) =>
    imageArray.length > 0 ? imageArray[Math.floor(Math.random() * imageArray.length)] : null;

  // 🖼️ Cambia imágenes aleatoriamente
  const changeImage = useCallback((type?: ImageType) => {
    if (!type) {
      setRandomVideo();
      setFloatingImage(getRandomImage(floatingImages));
      setBackgroundImage(getRandomImage(backgroundImages));
      setCharacterImage(getRandomImage(characterImages));
      setGifImage(getRandomImage(gifImages));
    } else {
      switch (type) {
        case "floating":
          setFloatingImage(getRandomImage(floatingImages));
          break;
        case "background":
          setBackgroundImage(getRandomImage(backgroundImages));
          break;
        case "character":
          setCharacterImage(getRandomImage(characterImages));
          break;
        case "gif":
          setGifImage(getRandomImage(gifImages));
          break;
        default:
          console.warn(`⚠ Tipo de imagen no válido: ${type}`);
      }
    }
  }, [setRandomVideo, floatingImages, backgroundImages, characterImages, gifImages]);

  return {
    floatingImage,
    backgroundImage,
    characterImage,
    gifImage,
    changeImage,
    isLoading,
  };
}

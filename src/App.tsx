import { useEffect, useState } from "react";
import { NavBar } from "./components";
import { Routes, Route } from "react-router-dom";
import { Home, Projects, Contact } from "./pages";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function App() {
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  
    if (navigationEntries.length > 0 && navigationEntries[0].type === "reload") {
      setIsReload(true);
    } else {
      setIsReload(false);
    }
  }, []);
  

  return (
    <>
      {!isReload && <NavBar />}
      <Routes>
        <Route path="/" element={<Home isReload={isReload} setIsReload={setIsReload} />} />
        <Route path="/projects" element={<Projects setIsReload={setIsReload} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Homepage from "./pages/Homepage";
import Build from "./pages/Build";
import ThemeManager from "./pages/ThemeManager";
import Marketplace from "./pages/Marketplace";
import PromptLibrary from "./pages/PromptLibrary";
import MyProjects from "./pages/MyProjects";
import PublishedProjects from "./pages/PublishedProjects";
import SharedProjects from "./pages/SharedProjects";
import Usage from "./pages/Usage";
import MyAccount from "./pages/MyAccount";
import Consultant from "./pages/Consultant";
import Resources from "./pages/Resources";
import Help from "./pages/Help";
import ProtectedRoute from "./components/ProtectedRoute";

function protected_(element) {
  return <ProtectedRoute>{element}</ProtectedRoute>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={protected_(<Homepage />)} />
      <Route path="/build" element={protected_(<Build />)} />
      <Route path="/theme" element={protected_(<ThemeManager />)} />
      <Route path="/marketplace" element={protected_(<Marketplace />)} />
      <Route path="/prompts" element={protected_(<PromptLibrary />)} />
      <Route path="/projects" element={protected_(<MyProjects />)} />
      <Route path="/published" element={protected_(<PublishedProjects />)} />
      <Route path="/shared" element={protected_(<SharedProjects />)} />
      <Route path="/usage" element={protected_(<Usage />)} />
      <Route path="/account" element={protected_(<MyAccount />)} />
      <Route path="/consultant" element={protected_(<Consultant />)} />
      <Route path="/resources" element={protected_(<Resources />)} />
      <Route path="/help" element={protected_(<Help />)} />
    </Routes>
  );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider";
import "@fontsource/overpass/400.css";
import "@fontsource/overpass/700.css";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext"; // Sesuaikan path
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Provider>
      <App />
    </Provider>
  </AuthProvider>
);

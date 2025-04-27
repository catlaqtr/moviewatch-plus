import { MovieProvider } from "./features/context/MovieProvider";
import AppContent from "./features/app/AppContent";

export default function App() {
  return (
    <MovieProvider>
      <AppContent />
    </MovieProvider>
  );
}

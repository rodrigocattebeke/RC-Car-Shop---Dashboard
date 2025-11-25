import { NavBar } from "./components/layout/navBar/NavBar";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="container-xxl">
        <AppRoutes />
      </main>
    </>
  );
}

export default App;

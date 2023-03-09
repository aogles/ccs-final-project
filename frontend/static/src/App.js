import "./App.css";
import NavigationMap from "./components/Navigation/maps";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ConvoyInfo from "./components/Information/checklist";
import ConvoyChat from "./components/Communications/chatapp";
import LoginForm from "./components/Auth/Login";
import RegistrationForm from "./components/Auth/Registration";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import AuthenticatedHeader from "./components/Header/AuthenticatedHeader";
import UnauthenticatedHeader from "./components/Header/UnauthenticatedHeader";
import Homepage from "./components/Home/home";

function App() {
  const { isAuth } = useContext(AuthContext);

  return (
    <div>
      {isAuth ? <AuthenticatedHeader /> : <UnauthenticatedHeader />}

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="nav" element={<NavigationMap />} />
          <Route path="/" element={<Homepage />} />
          <Route path="info" element={<ConvoyInfo />} />
          <Route path="comms" element={<ConvoyChat />} />
        </Route>

        {/* <Route path="/InformationForm" element={<InformationForm />} /> */}

        <Route
          path="*"
          element={
            <main>
              <p>
                Build 404 page and render here, same as you did for other form
              </p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

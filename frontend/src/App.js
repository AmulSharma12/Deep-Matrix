import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Shared/Navbar/Navbar";
import "./App.css";
import Home from "./pages/Home/Home";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import Room from "./pages/Room/Room";
import { useSelector } from "react-redux";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/Shared/Loader/Loader";

// const isAuth = false;
// const user = {
//   activated: false,
// };

function App() {
  //call refresh endpoint -using custom hooks
  //Auto login - loading state and making refresh request
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    <Loader message="Loading, please wait!" />
  ) : (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} exact></Route>

          {/* /authenticate protected route */}
          <Route
            path="/authenticate"
            element={
              <GuestRoute redirectTo="/activate">
                <Authenticate />
              </GuestRoute>
            }
          />

          {/* /activate semiprotected route */}
          <Route
            path="/activate"
            element={
              <SemiProtectedRoute redirectTo="/" roomsRoute="/rooms">
                <Activate />
              </SemiProtectedRoute>
            }
          ></Route>

          {/* /rooms protected route */}
          <Route
            path="/rooms"
            element={
              <ProtectedRoute redirectTo="/" activateRoute="/activate">
                <Rooms />
              </ProtectedRoute>
            }
          ></Route>

          {/* registring  single room route /room/jslkdjflklkjsdfjlk */}
          <Route
            path="/room/:id"
            element={
              <ProtectedRoute redirectTo="/" activateRoute="/activate">
                <Room />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

const GuestRoute = ({ children, redirectTo }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  // all check can be made here and render the corresponding component
  return isAuth ? <Navigate to={redirectTo} /> : children;
};

const SemiProtectedRoute = ({ children, redirectTo, roomsRoute }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  // all check can be made here and render the corresponding component
  return !isAuth ? (
    <Navigate to={redirectTo} />
  ) : isAuth && !user.activated ? (
    children
  ) : (
    <Navigate to={roomsRoute} />
  );
};

const ProtectedRoute = ({ children, redirectTo, activateRoute }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  // all check can be made here and render the corresponding component
  return !isAuth ? (
    <Navigate to={redirectTo} />
  ) : isAuth && !user.activated ? (
    <Navigate to={`/activate`} />
  ) : (
    children
  );
};

export default App;

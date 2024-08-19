import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { PartyMode } from './pages/PartyMode';
import { PartyModeLayout } from './layouts/PartyModeLayout';
import PrivateRoutes from './utils/PrivateRoutes';
import { Login } from './pages/Login';
import { PartyModeSearch } from './pages/PartyModeSearch';
import { SpotifyPlayerProvider } from './context/SpotifyPlayerContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />

          <Route path="party-mode" element={<PartyModeLayout />}>
            <Route index element={<PartyMode />} />
            <Route path="search" element={<PartyModeSearch />} />
          </Route>
        </Route>
      </Route>
    </>,
  ),
);

function App() {
  return (
    <AuthProvider>
      <SpotifyPlayerProvider>
        <RouterProvider router={router} />
      </SpotifyPlayerProvider>
    </AuthProvider>
  );
}

export default App;

import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RootLayout } from './layouts/RootLayout';
import { Playlists } from './pages/Playlists';
import { PartyMode } from './pages/PartyMode';
import { PartyModeLayout } from './layouts/PartyModeLayout';
import PrivateRoutes from './utils/PrivateRoutes';
import { Login } from './pages/Login';
import { PartyModeSearch } from './pages/PartyModeSearch';
import { SpotifyPlayerProvider } from './context/SpotifyPlayerContext';
import { QueueProvider } from './context/QueueContext';
import { PlaybackProvider } from './context/PlaybackContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Playlists />} />

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
        <QueueProvider>
          <PlaybackProvider>
            <RouterProvider router={router} />
          </PlaybackProvider>
        </QueueProvider>
      </SpotifyPlayerProvider>
    </AuthProvider>
  );
}

export default App;

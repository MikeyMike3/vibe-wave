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
import { SpotifyPlayerProvider } from './context/SpotifyPlayerContext';
import { QueueProvider } from './context/QueueContext';
import { PlaybackProvider } from './context/PlaybackContext';
import { Home } from './pages/Home';
import { LikedSongs } from './pages/LikedSongs';
import { FollowedArtists } from './pages/FollowedArtists';
import { Search } from './pages/Search';
import { SearchProvider } from './context/SearchContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="liked-songs" element={<LikedSongs />} />
          <Route path="followed-artists" element={<FollowedArtists />} />
          <Route path="search" element={<Search />} />

          <Route path="party-mode" element={<PartyModeLayout />}>
            <Route index element={<PartyMode />} />
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
            <SearchProvider>
              <RouterProvider router={router} />
            </SearchProvider>
          </PlaybackProvider>
        </QueueProvider>
      </SpotifyPlayerProvider>
    </AuthProvider>
  );
}

export default App;

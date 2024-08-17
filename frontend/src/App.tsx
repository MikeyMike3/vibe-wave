import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RootLayout } from './layouts/RootLayout';
import { Home } from './pages/Home';
import { PartyMode } from './pages/PartyMode';
import { PartyModeLayout } from './layouts/PartyModeLayout';
import PrivateRoutes from './utils/PrivateRoutes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<PrivateRoutes />}>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>

        <Route path="party-mode" element={<PartyModeLayout />}>
          <Route index element={<Navigate to="party-mode-main" replace />}></Route>
          <Route path="party-mode-main" element={<PartyMode />}></Route>
        </Route>
      </Route>
    </Route>,
  ),
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

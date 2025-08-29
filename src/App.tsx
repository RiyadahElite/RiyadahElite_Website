import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LoadingScreen from './components/ui/LoadingScreen';
import Toast from './components/ui/Toast';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/utils/ScrollToTop';
import ProtectedRoute from './components/utils/ProtectedRoute';
import ErrorBoundary from './components/ui/ErrorBoundary';

// Lazy load pages to improve initial load performance
const Home = lazy(() => import('./pages/Home'));
const Community = lazy(() => import('./pages/Community'));
const GameTest = lazy(() => import('./pages/GameTest'));
const Production = lazy(() => import('./pages/Production'));
const Arena = lazy(() => import('./pages/Arena'));
const Tournaments = lazy(() => import('./pages/Tournaments'));
const Rewards = lazy(() => import('./pages/Rewards'));
const Contact = lazy(() => import('./pages/Contact'));
const Faq = lazy(() => import('./pages/Faq'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const AdminLogin = lazy(() => import('./pages/auth/AdminLogin'));
const HostLogin = lazy(() => import('./pages/auth/HostLogin'));
const ModeratorLogin = lazy(() => import('./pages/auth/ModeratorLogin'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'));
const HostDashboard = lazy(() => import('./pages/dashboard/HostDashboard'));
const ModeratorDashboard = lazy(() => import('./pages/dashboard/ModeratorDashboard'));
const AdminPanel = lazy(() => import('./pages/admin/AdminPanel'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ScrollToTop />
        <Toast />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="community" element={<Community />} />
              <Route path="game-test" element={<GameTest />} />
              <Route path="production" element={<Production />} />
              <Route path="arena" element={<Arena />} />
              <Route path="tournaments" element={<Tournaments />} />
              <Route path="rewards" element={<Rewards />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<Faq />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="admin-login" element={<AdminLogin />} />
              <Route path="host-login" element={<HostLogin />} />
              <Route path="moderator-login" element={<ModeratorLogin />} />
              <Route
                path="dashboard/*"
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/dashboard"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="host/dashboard"
                element={
                  <ProtectedRoute hostOnly>
                    <HostDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="moderator/dashboard"
                element={
                  <ProtectedRoute moderatorOnly>
                    <ModeratorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin/*"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App
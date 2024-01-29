import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ArticlesPage from './pages/articles-page';
import AuthPage from './pages/auth-page';
import E404Page from './pages/e404-page';
import ProfilePage from './pages/profile-page';

import Logout from './components/logout';

import { updateAccountData } from './store';
import { getCookies } from './utils/cookies';
import { restorePageThemeFromStorage } from './utils/themes';

const App = () => {
  const dispatch = useDispatch();

  const stateToken = useSelector((state) => state.account.token);
  const { _id, email, token } = getCookies();

  if (!stateToken && token) {
    dispatch(updateAccountData({ _id, email, token }));
  }

  restorePageThemeFromStorage();

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/auth/register" element={<AuthPage type="register" />} />
        <Route path="/auth/login" element={<AuthPage type="login" />} />
        <Route path="/auth/logout" element={<Logout />} />

        {/* Private routes */}
        <Route path="/u/unreaded" element={<ArticlesPage page="unreaded" />} />
        <Route path="/u/saved" element={<ArticlesPage page="saved"/>} />
        <Route path="/u/profile" element={<ProfilePage />} />

        {/* Service routes */}
        <Route path="/error/404" element={<E404Page />} />
        <Route path="/" element={<Navigate replace to="/u/unreaded" />} />
        <Route path="*" element={<Navigate replace to="/error/404" />} />
      </Routes>
    </BrowserRouter>
  );
};




export default App;

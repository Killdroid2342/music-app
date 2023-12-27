import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Main from './Pages/Main';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Social from './Pages/Social';
import Following from './Pages/Following';
import Profile from './Pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/social',
    element: <Social />,
  },
  {
    path: '/following',
    element: <Following />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

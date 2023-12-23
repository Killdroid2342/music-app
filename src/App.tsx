import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Main from './Pages/Main';
import Navigation from './Pages/Navigation';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Social from './Pages/Social';

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
    path: '/nav',
    element: <Navigation />,
  },
  {
    path: '/social',
    element: <Social />,
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

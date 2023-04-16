import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Pages from './Pages/Pages';
import Login from './Pages/Login';
import Register from './Pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/main',
    element: <Pages />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Pages from './Pages/Pages';
import Login from './Pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/main',
    element: <Pages />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

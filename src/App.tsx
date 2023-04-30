import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Main from './Pages/Main';
import Login from './Pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/main',
    element: <Main />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

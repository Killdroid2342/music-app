import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Main from './Pages/Main';
import Home from './Pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './telas/Menu'
import Home from './telas/Home' 
import Pedido from './telas/Pedido' 
import Produto from './telas/Produto'
import Cliente from './telas/Cliente'
import Agendamento from './telas/Agendamento'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/pedido",
        element: <Pedido />,
      },
      {
        path: "/agendamento",
        element: <Agendamento />,
      },  
      {
        path: "/cliente",
        element: <Cliente />,
      },
      {
        path: "/produto",
        element: <Produto />,
      }       
    ]
  }

]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
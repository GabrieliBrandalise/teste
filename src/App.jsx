import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from './telas/Home' 
import Pedido from './telas/Pedido' 
import Produto from './telas/Produto'
import Cliente from './telas/Cliente'
import Agendamento from './telas/Agendamento'
import Login from './telas/login/Login'
import Logon from './telas/login/Logon'
import MenuPublico from './componentes/MenuPublico'
import MenuPrivado from "./componentes/MenuPrivado";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPublico />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path : "login",
        element :  <Login/>
      }
    ]
  }
  , 
  {
    path: '/privado',
    element: <MenuPrivado/>,
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
      },
      {
        path : "logon",
        element :  <Logon/>
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
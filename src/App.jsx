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
import MenuPublico from './componentes/MenuPublico'
import MenuPrivado from "./componentes/MenuPrivado";
import CreateAccount from "./telas/login/CreateAccount";
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
      },
      {
        path : "createaccount",
        element :  <CreateAccount />
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
        path: "pedido",
        element: <Pedido />,
      },
      {
        path: "agendamento",
        element: <Agendamento />,
      },  
      {
        path: "cliente",
        element: <Cliente />,
      },
      {
        path: "produto",
        element: <Produto />,
      },
      {
        path : "createaccount",
        element :  <CreateAccount />
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
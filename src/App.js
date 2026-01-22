import './App.css';
import Body from './components/Body';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieList from './components/MovieList';
import Moviedetails from './components/Moviedetails';
import Err from './components/Err';


 
function App() {

  const appRouter = createBrowserRouter([{
    path:"/",
    element: <Body/>,
    children:[
      {
        path:"/",
        element:<MovieList/>
      },
      {
        path:"/details",
        element:<Moviedetails/>
      },
      {
        path:"/notfound",
        element: <Err/>
      }
    ]
  }])

  return (
   
      <div>
        <RouterProvider router={appRouter}/>
      </div>
    
  );
}

export default App;

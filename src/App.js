import { useContext } from 'react';
import './App.css';
import AllRoutes from './components/Routes/AllRoutes';
import  ReactDOM  from 'react-dom';
import { NotificationContext } from './hooks/Contexts/NotificationContext';
import LoaderPage from './components/Layouts/LoaderPage/LoaderPage';
import Notifications from './components/Util/Notifications/Notfications';
import BackDropCardLayout from './components/Layouts/BackDropCardLayout/BackDropCardLayout';

function App() {
  
  const { isLoading, backDropCardVisible } = useContext(NotificationContext);
  

  return (
    <div className="App">
      {
        backDropCardVisible && <BackDropCardLayout />
      }
      {
        isLoading && <LoaderPage />
      }
      {
        ReactDOM.createPortal(<Notifications />,document.getElementById("toast-notification"))
      }
      
      <AllRoutes />
    </div>
  );
}

export default App;

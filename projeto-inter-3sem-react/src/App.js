import RoutesApp from "./routes";
import { ToastContainer } from 'react-toastify'; //Alerts customizados
import 'react-toastify/dist/ReactToastify.css'; //Alerts customizados

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      {/* Todas as rotas */}
      <RoutesApp /> 
    </div>
  );
}

export default App;
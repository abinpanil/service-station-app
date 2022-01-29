import './App.css';
import axios from 'axios';
import Router from './Router'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <Router />
  );
}

export default App;

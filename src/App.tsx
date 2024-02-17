import HomePage from './components/HomePage';
import EditPage from './components/EditPage';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/edit" element={<EditPage/>}></Route>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;

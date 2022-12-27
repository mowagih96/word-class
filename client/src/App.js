import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Practice from './routes/Practice';
import Rank from './routes/Rank';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/practice' element={<Practice />} />
        <Route path='/rank' element={<Rank />} />
      </Routes>
    </Router>
  );
}

export default App;

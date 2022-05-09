import { useContext, useEffect } from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { Nav } from './components/';
/*Pages*/
import Add from './pages/Add';
import Edit from './pages/Edit';
import Charts from './pages/Charts';
import Home from './pages/Home';
import Settings from './pages/Settings';

import './css/App.css';


const App = () => {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Nav />
      </Router>


    </div>
  );
}

export default App;

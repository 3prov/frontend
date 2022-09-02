import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Write from './components/pages/Write';
import './App.css'
import Exam from './components/pages/Exam';
import store from './store';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/write/:id' element={<Write />} />
          <Route path='/evaluate/:id' element={<Exam />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

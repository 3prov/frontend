import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import store from './store';
import { Provider } from 'react-redux';

import './App.css'

import Title from './components/head/title';
import Loader from './components/ui/Loader';
const Write = React.lazy(() => import('./components/pages/Write'));
const Exam = React.lazy(() => import('./components/pages/Exam'));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Title />
        <Routes>
          <Route path='/write/:id' element={<React.Suspense fallback={<Loader />}><Write /></React.Suspense>} />
          <Route path='/evaluate/:id' element={<React.Suspense fallback={<Loader />}><Exam /></React.Suspense>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

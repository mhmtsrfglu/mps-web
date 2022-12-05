import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Models from './pages/Models';
import reportWebVitals from './reportWebVitals';
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Header from './components/Header';
import Body from './components/Body';
import Welcome from './pages/Welcome';
import ModelView from './pages/ModelView';
import ModelChildrenView from './pages/ModelChildrenView';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <Header />
    <Body>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} exact></Route>
          <Route path='/models/:solutionName' element={<Models />} exact></Route>
          <Route path='/models/view/:uuid/:referenceName/:regularId' element={<ModelView />} exact></Route>
          <Route path='/models/view/:uuid/:referenceName/:regularId/:component' element={<ModelChildrenView />} exact></Route>
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </Body>
  </React.Fragment>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ScreenHome} />
        <Route path="/screensource" exact component={ScreenSource} />
        <Route path="/screenarticlesbysource/:id" exact component={ScreenArticlesBySource} />
        <Route path="/screenmyarticles" exact component={ScreenMyArticles} />
      </Switch>
    </Router>
  );
}

export default App;

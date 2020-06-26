import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import wishList from './reducers/articles';
import token from './reducers/token';
import selectedLang from './reducers/selectedLang';

const store = createStore(combineReducers({ wishList, token, selectedLang }));

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path="/" exact component={ScreenHome} />
					<Route path="/screensource" exact component={ScreenSource} />
					<Route
						path="/screenarticlesbysource/:id"
						exact
						component={ScreenArticlesBySource}
					/>
					<Route path="/screenmyarticles" exact component={ScreenMyArticles} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;

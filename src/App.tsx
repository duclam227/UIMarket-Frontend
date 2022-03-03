import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import NavBar from './components/common/navbar';
import Pricing from './components/pages/pricing';
import NotFound from './components/pages/notFound';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Home from './components/pages/home';

function App() {
	return (
		<div className="App">
			<NavBar></NavBar>
			<Routes>
				<Route path="/about" element={<About />}></Route>
				<Route path="/contact" element={<Contact />}></Route>
				<Route path="/pricing" element={<Pricing />}></Route>
				<Route path="/home" element={<Home />}></Route>
				<Route path="/" element={<Navigate replace to="/home" />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</div>
	);
}

export default App;

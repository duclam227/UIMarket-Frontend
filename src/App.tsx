import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import NavBar from './components/common/Navbar';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';

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

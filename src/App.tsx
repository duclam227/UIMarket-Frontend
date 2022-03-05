import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { Navbar } from './components';
import { AboutUsPage, ContactUsPage, Homepage, NotFoundPage, PricingPage } from './pages';

function App () {
	return (
		<div className='App'>
			<Navbar />
			<Routes>
				<Route path='/about' element={<AboutUsPage />} />
				<Route path='/contact' element={<ContactUsPage />} />
				<Route path='/pricing' element={<PricingPage />} />
				<Route path='/home' element={<Homepage />} />
				<Route path='/' element={<Navigate replace to='/home' />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}

export default App;

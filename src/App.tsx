import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import {
	AboutUsPage,
	ContactUsPage,
	QuestionListsPage,
	NotFoundPage,
	PricingPage,
	AuthenticationPage,
	AskAQuestionPage,
	ViewQuestionPage
} from './pages';
import { logInWithJWT } from './redux/index';

function App() {
	const dispatch = useDispatch()

	const initialGetUserFromBrowser = () => {
		const authToken = localStorage.getItem('authToken');
		if (authToken) {
			dispatch(logInWithJWT(authToken));
		}
	}

	useEffect(() => {
		initialGetUserFromBrowser();
	}, [])

	return (
		<div className='App'>
			<Routes>
				<Route path='/login' element={<AuthenticationPage destination='login' />} />
				<Route path='/signup' element={<AuthenticationPage destination='signup' />} />
				<Route path='/about' element={<AboutUsPage />} />
				<Route path='/contact' element={<ContactUsPage />} />
				<Route path='/pricing' element={<PricingPage />} />
				<Route path='/questions/new' element={<AskAQuestionPage />} />
				<Route path='/questions/*' element={<QuestionListsPage />} />
				<Route path="/question/:id" element={<ViewQuestionPage />} />
				<Route path='/' element={<Navigate replace to='/questions' />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}

export default App;

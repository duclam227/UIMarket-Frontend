import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import QuestionListsPageNavigator from './QuestionListsPageNavigator';
import { QuestionList, PageWithNavbar } from '../../components';

import style from './QuestionListsPage.module.css';

const QuestionListsPage: FC = () => {

	const tabList = [
		{
			path: 'all',
			label: 'All',
		},
		{
			path: 'bountied',
			label: 'Bountied',
		},
		{
			path: 'popular',
			label: 'Popular',
		},
	]

	return (
		<>
			<PageWithNavbar>
				<Container className={style.container} fluid='sm'>
					<Row>
						<Col></Col>
						<Col xs={10} className={style.mainContent}>
							<h1 className={style.title}>All Questions</h1>
							<QuestionListsPageNavigator tabList={tabList} />

							<Routes>
								<Route path="all" element={<QuestionList questionsList={[{ question: '1' }, { question: '2' }]} />} />
								<Route path="bountied" element={<p>bountied hey</p>} />
								<Route path="popular" element={<p>popular yo</p>} />
								<Route path="/*" element={<Navigate replace to='all' />} />
							</Routes>
						</Col>
						<Col></Col>
					</Row>
				</Container>
			</PageWithNavbar>

		</>
	);
};

export default QuestionListsPage;

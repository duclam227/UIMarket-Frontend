import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

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
				<div className={style.container}>
					<div className={style.mainContent}>
						<h1 className={style.title}>
							<FormattedMessage id="QuestionListsPage.title" defaultMessage="All Questions" />
						</h1>
						<QuestionListsPageNavigator tabList={tabList} />

						<div className={style.questionsList}>
							<Routes>
								<Route path="all" element={<QuestionList questionsList={[{ question: '1' }, { question: '2' }]} />} />
								<Route path="bountied" element={<p>bountied hey</p>} />
								<Route path="popular" element={<p>popular yo</p>} />
								<Route path="/*" element={<Navigate replace to='all' />} />
							</Routes>
						</div>
					</div>
				</div>
			</PageWithNavbar>

		</>
	);
};

export default QuestionListsPage;

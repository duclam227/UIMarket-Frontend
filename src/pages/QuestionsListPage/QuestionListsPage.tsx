import { FC, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import QuestionListsPageNavigator from './QuestionListsPageNavigator';
import { QuestionList, PageWithNavbar } from '../../components';

import questionAPI from '../../api/question/index';

import style from './QuestionListsPage.module.css';
import { NotFoundPage } from '..';

const QuestionListsPage: FC = () => {
	const [totalPages, setTotalPages] = useState(1);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		questionAPI.get.getQuestionByPageNumber(1, 10)
			.then((res: any) => {
				const { totalPages, page, questions } = res;
				setQuestions(questions);
			})
	}, [])

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
								<Route path="all" element={<QuestionList questionsList={questions} />} />
								<Route path="bountied" element={<p>bountied hey</p>} />
								<Route path="popular" element={<p>popular yo</p>} />
								<Route path="/:id" element={<NotFoundPage />} />
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

import { FC, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { getErrorMessage } from '../../app/util/index';

import QuestionListsPageNavigator from './QuestionListsPageNavigator';
import { QuestionList, PageWithNavbar, Paginator } from '../../components';

import questionAPI from '../../api/question/index';

import style from './QuestionListsPage.module.css';

const ITEMS_PER_PAGE = 10;

const QuestionListsPage: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [questions, setQuestions] = useState<Array<any>>([]);

	useEffect(() => {
		setIsLoading(true);
		questionAPI.getQuestionByPageNumber(1, ITEMS_PER_PAGE)
			.then((res: any) => {

				const { totalPages, questions, page } = res;
				setCurrentPage(page);
				setQuestions(questions);
				setTotalPages(totalPages);
				setIsLoading(false);
			})
			.catch(error => {
				const errorMsg = getErrorMessage(error);
				setError(errorMsg);
				setIsLoading(false);
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
	];

	const goToPage = (pageNumber: number) => {
		setIsLoading(true);
		questionAPI.getQuestionByPageNumber(pageNumber, ITEMS_PER_PAGE)
			.then((res: any) => {

				const { totalPages, questions, page } = res;
				setCurrentPage(page);
				setQuestions(questions);
				setTotalPages(totalPages);
				setIsLoading(false);
			})
			.catch(error => {
				const errorMsg = getErrorMessage(error);
				setError(errorMsg);
				setIsLoading(false);
			})
	}

	return (
		<PageWithNavbar>
			<div className={style.container}>
				<div className={style.mainContent}>
					<h1 className={style.title}>
						<FormattedMessage id="QuestionListsPage.title" defaultMessage="All Questions" />
					</h1>
					<QuestionListsPageNavigator tabList={tabList} />

					<div className={style.questionsList}>
						{isLoading
							? <p>loading...</p>
							:
							<Routes>
								<Route path="all" element={<QuestionList questionsList={questions} />} />
								<Route path="bountied" element={<p>bountied hey</p>} />
								<Route path="popular" element={<p>popular yo</p>} />
								<Route path="/*" element={<Navigate replace to='all' />} />
							</Routes>
						}

						<Paginator
							totalNumberOfPages={totalPages}
							currentPage={currentPage}
							handleClickGoToPage={(number: number) => goToPage(number)}
						/>
					</div>
				</div>
			</div>
		</PageWithNavbar>
	);

};

export default QuestionListsPage;

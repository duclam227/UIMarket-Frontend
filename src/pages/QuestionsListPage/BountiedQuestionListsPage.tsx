import { FC, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { getErrorMessage } from '../../app/util/index';

import QuestionListsPageNavigator from './QuestionListsPageNavigator';
import { QuestionList, PageWithNavbar, Paginator } from '../../components';

import questionAPI from '../../api/question/index';

import style from './QuestionListsPage.module.css';
import { tabList } from './QuestionListsPage';

const ITEMS_PER_PAGE = 10;

const BountiedQuestionListsPage: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [questions, setQuestions] = useState<Array<any>>([]);

	useEffect(() => {
		setIsLoading(true);
		questionAPI.getAllQuestionsByPageNumber(1, ITEMS_PER_PAGE)
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

	const goToPage = (pageNumber: number) => {
		setIsLoading(true);
		questionAPI.getBountiedQuestionsByPageNumber(pageNumber, ITEMS_PER_PAGE)
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
						<FormattedMessage id="QuestionListsPage.titleBountied" defaultMessage="Bountied Questions" />
					</h1>
					<QuestionListsPageNavigator tabList={tabList} active='Bountied' />

					<div className={style.questionsList}>
						{isLoading
							? <p>loading...</p>
							: <QuestionList questionsList={questions} />
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

export default BountiedQuestionListsPage;

import { FC, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { getErrorMessage } from '../../app/util/index';

import QuestionListsPageNavigator from './QuestionListsPageNavigator';
import { QuestionList, PageWithNavbar, Paginator } from '../../components';

import questionAPI from '../../api/question/index';

import style from './QuestionListsPage.module.css';
import { Button, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../redux/store';
import { navbarBranches } from '../../app/util/config';

const ITEMS_PER_PAGE = 10;

export const tabList = [
	{
		path: '/questions/all',
		label: 'All',
	},
	{
		path: '/questions/bountied',
		label: 'Bountied',
	},
	{
		path: '/questions/popular',
		label: 'Popular',
	},
];

const QuestionListsByTagPage: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [questions, setQuestions] = useState<Array<any>>([]);

	const currentUser = useSelector((state: State) => state.auth.user);
	const { id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		questionAPI
			.getQuestionsByTags([id], 1, ITEMS_PER_PAGE)
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
			});
	}, []);

	const goToPage = (pageNumber: number) => {
		setIsLoading(true);
		questionAPI
			.getQuestionsByTags([id], pageNumber, ITEMS_PER_PAGE)
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
			});
	};

	return (
		<PageWithNavbar branch={navbarBranches.question}>
			<div className={style.container}>
				<div className={style.mainContent}>
					<div className={style.header}>
						<h1 className={style.title}>
							<FormattedMessage
								id='QuestionListsByTagPage.title'
								defaultMessage='Questions'
							/>
						</h1>
						{currentUser && (
							<Link className={style.addQuestionButton} to='/questions/new'>
								<Button>
									<FormattedMessage
										id='QuestionListsByTagPage.addQuestionButton'
										defaultMessage='Ask a question'
									/>
								</Button>
							</Link>
						)}
					</div>

					<div className={style.questionsList}>
						{isLoading ? <Spinner animation='border' /> : <QuestionList questionsList={questions} />}

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

export default QuestionListsByTagPage;

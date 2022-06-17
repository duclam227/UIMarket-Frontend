import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const QUESTIONS_ENDPOINT = 'api/v1/questions';
const TAGS_ENDPOINT = 'api/v1/questionTags';


class Get {
	getAllQuestionsByPageNumber = (pageNumber: number | string, itemsPerPage: number) => {
		return axiosClient.get(`${QUESTIONS_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}`);
	};

	getPopularQuestionsByPageNumber = (pageNumber: number | string, itemsPerPage: number) => {
		return axiosClient.get(
			`${QUESTIONS_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}&selectWith=popular`,
		);
	};

	getBountiedQuestionsByPageNumber = (pageNumber: number | string, itemsPerPage: number) => {
		return axiosClient.get(
			`${QUESTIONS_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}&selectWith=bounty`,
		);
	};

	getQuestionById = (id: string) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		return axiosClient.get(`${QUESTIONS_ENDPOINT}/${id}`, config);
	};

	getQuestionsByTag = (
		tagNames: Array<string | undefined>,
		pageNumber: number | string,
		itemsPerPage: number,
	) => {
		const tags = tagNames.join(',');

		return axiosClient.get(
			`${QUESTIONS_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}&tag=${tags}`,
		);
	};

	getQuestionsByTitle = (title: string, pageNumber: number | string, itemsPerPage: number) => {
		return axiosClient.get(
			`${QUESTIONS_ENDPOINT}?title=${title}&page=${pageNumber}&limit=${itemsPerPage}`,
		);
	};

	getTagListByPage = (pageNumber: number | string, itemsPerPage: number) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};

		return axiosClient.get(`${TAGS_ENDPOINT}?page=${pageNumber}&limit=${itemsPerPage}`, config);
	};
}

export default new Get();

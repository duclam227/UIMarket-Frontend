import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';

const API_ENDPOINT = '/api/v1/questions';
export interface Question {
	title: string;
	body: string;
	tags: string[];
	bounty: number | null;
	bountyDueDate?: Date | null;
}
class Post {
	add = (question: Question) => {
		const jwt = getJwt();
		const config = {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		};
		const { title, body, tags, bounty, bountyDueDate } = question;
		const questionBounty = bounty ? +bounty : -1;
		const questionBountyDueDate = bountyDueDate || undefined;
		const data = {
			questionTitle: title,
			questionContent: body,
			questionTag: tags,
			questionBounty,
			bountyDueDate: questionBountyDueDate,
		};
		return axiosClient.post(API_ENDPOINT, data, config);
	};
}

export default new Post();

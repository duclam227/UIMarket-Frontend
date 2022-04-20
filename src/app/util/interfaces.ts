export interface question {
	title: string;
	body: string;
	tags: string[];
	bounty: number;
	question: string;
}

export interface navigatorTabItem {
	path: string;
	label: string;
}

export interface authCredentials {
	customerEmail: string;
	customerPassword: string;
	customerName?: string;
}

export interface PaginatorProps {
	totalNumberOfPages: number;
	currentPage: number;
	handleClickGoToPage: Function;
}

export interface voteStatus {
	upvote: boolean;
	downvote: boolean;
}

export interface PaginatorProps {
	totalNumberOfPages: number;
	currentPage: number;
	handleClickGoToPage: Function;
}

export interface customer {
	_id: string;
	customerName: string;
	customerEmail: string;
	customerPassword: string;
	customerPhone: string;
	customerDOB: string;
	authToken: {
		Google: string;
	};
	customerWallet: {
		coin: string;
		point: string;
	};
	customer_Status: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface product {
	productName: string;
	productPrice: number;
	productCategory: string;
	productDescription: string;
	productPicture: Array<string>;
}

export interface voteStatus {
	upvote: boolean;
	downvote: boolean;
}

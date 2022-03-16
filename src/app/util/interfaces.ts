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

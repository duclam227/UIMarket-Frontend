export interface question {
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

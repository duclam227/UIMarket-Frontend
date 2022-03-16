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

export interface customer {
  customerName: string;
  customerEmail: string;
  customerPassword: string;
  customerPhone: string;
  customerDOB: string;
  authenToken: {
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

export interface PaginatorProps {
	totalNumberOfPages: number | string;
	currentPage: number | string;
}

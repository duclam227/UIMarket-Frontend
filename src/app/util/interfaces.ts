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
  createdAt: Date;
  customerBio: string;
  customerDOB: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  customerStatus: boolean;
	authToken: {
		Google: string;
	};
  customerWallet: {
    coin: string;
    point: string;
  };

  refreshtoken: string;
  shopId: null;
  updatedAt: Date;
  _id: string;
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

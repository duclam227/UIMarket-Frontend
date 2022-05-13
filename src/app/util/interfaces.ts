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
  shopId: string;
  refreshtoken: string;
  customerAvatar: string;
}
export interface product {
  _id?: string;
  coverPicture?: string;
  productName: string;
  productPrice: number;
  productCategory: string;
  productDescription: string;
  productPictures?: Array<string>;
  productFile?: string;
  productStatus: number;
  totalSold: number;
  totalReview: number;
  productRating?: number;
}

export interface voteStatus {
  upvote: boolean;
  downvote: boolean;
}

import { any, string } from 'joi';
import { FormattedMessage } from 'react-intl';
export interface question {
  title: string;
  body: string;
  tags: string[];
  bounty: number;
  question: string;
  bountyDueDate?: Date;
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
  customerStatus: number;
  createdAt: Date;
  updatedAt: Date;
  shopId: string;
  refreshtoken: string;
  customerAvatar: string;
  isAdmin: boolean;
}
export interface product {
  _id?: string;
  coverPicture?: string;
  last30Days: {
    totalRevenue: number;
    totalSold: number;
  };
  isBanned: number;
  productName: string;
  productPrice: number;
  productCategory: any;
  productDescription: string;
  productPictures?: Array<string>;
  productFile?: string;
  productStatus?: number;
  productId?: string;
  totalSold?: number;
  totalReview?: number;
  productRating?: number;
  shopId?: any;
  shop?: any;
  license?: string;
  product?: string;
}

export interface shop {
  _id: string;
  shopBalance: number;
  shopDescription: string;
  shopEmail: string;
  shopName: string;
  shopPayPal: {
    paypalEmail: string;
    paypalId: string;
  };
  shopStatus: number;
  taxCode: string;
  userId: string;
}

export interface voteStatus {
  upvote: boolean;
  downvote: boolean;
}
export interface ReportObject {
  _id: string;
  userId: string;
  reportObject: string;
  reason: string;
  objectType: string;
  resolveFlag: number;
  createdAt: Date;
}
export interface DataColumn {
  path: string;
  label: string;
  width?: number;
  bold?: boolean;
}

export interface CustomColumn {
  key: string;
  label?: string;
  width?: number;
  content: Function;
}

export type Column = DataColumn | CustomColumn;

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
	email: string;
	password: string;
}

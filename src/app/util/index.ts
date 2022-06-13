import { toast } from 'react-toastify';
import { logOut, setUserToNull } from '../../redux';
import store from '../../redux/store';

const INVOICE_ID = 'invoiceId';
export const EXPIRED_TOKEN_MSG = 'expired-access-token';

export const getErrorMessage = (error: any) => {
	const { response, status } = error;

	if (!response || status >= 500) {
		return 'action-failed';
	}

	const { msg } = response.data;
	console.error(msg, error);

	if (msg === EXPIRED_TOKEN_MSG) {
		localStorage.clear();
		store.dispatch(setUserToNull());
		toast('Login session timed out. Please log in again!');
	}

	if (msg) return msg;
	if (error instanceof Error) return error.message;
	return String(error);
};

export const createCommonLicenseFile = (
	productName: string,
	authorName: string,
	licenseType: string,
) => {
	const licenseContent = (productName: string, author: string, licenseType: string) => {
		return `This is the common license for product ${productName}\nAuthor: ${author},\nLicense Type: ${licenseType},\nYou can view your license detail by download the custom license file!\nPlease download and keep it in a safe place!`;
	};

	return new File([ licenseContent(productName, authorName, licenseType) ], 'license.txt', {
		type: 'text/plain',
	});
};

export const saveMostRecentInvoiceId = (invoiceId: string) => {
	localStorage.setItem(INVOICE_ID, invoiceId);
};

export const getMostRecentInvoiceId = () => {
	return localStorage.getItem(INVOICE_ID) || null;
};

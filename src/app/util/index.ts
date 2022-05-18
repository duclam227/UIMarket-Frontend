const INVOICE_ID='invoiceId';

export function getErrorMessage (error: any) {
	const { msg } = error.response?.data;
	if (msg) return msg;
	if (error instanceof Error) return error.message;
	return String(error);
}

export const createCommonLicenseFile = (
  productName: string,
  authorName: string,
  licenseType: string,
) => {
  const licenseContent = (
    productName: string,
    author: string,
    licenseType: string,
  ) => {
    return `This is the common license for product ${productName}\nAuthor: ${author},\nLicense Type: ${licenseType},\nYou can view your license detail by download the custom license file!\nPlease download and keep it in a safe place!`;
  };

  return new File(
    [licenseContent(productName, authorName, licenseType)],
    'license.txt',
    {
      type: 'text/plain',
    },
  );
};

export const saveMostRecentInvoiceId = (invoiceId: string) => {
  localStorage.setItem(INVOICE_ID, invoiceId);
}

export const getMostRecentInvoiceId = () => {
  return localStorage.getItem(INVOICE_ID) || null;
}
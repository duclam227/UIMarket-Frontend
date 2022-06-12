import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { getJwt } from './authHelpers';

const sdk = new ChartsEmbedSDK({
	baseUrl: process.env.REACT_APP_MONGO_CHART_BASE_URL,
	getUserToken: () => getJwt()
});

export default sdk;

import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { getJwt } from './authHelpers';

const sdk = new ChartsEmbedSDK({
	baseUrl: 'https://charts.mongodb.com/charts-uim-ykccp',
	getUserToken: () => getJwt()
});

export default sdk;

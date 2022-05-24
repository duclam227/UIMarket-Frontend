import get from './get';
import put from './put';

const s3API = {
	downloadFile: get.downloadFile,
	getSignedUrl: get.getSignedUrl,
	uploadToS3Bucket: put.uploadToS3Bucket,
};

export default s3API;

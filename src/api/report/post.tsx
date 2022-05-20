import axiosClient from '..';
import { getJwt } from '../../app/util/authHelpers';
const REPORT_ENDPOINT = '/api/v1/reports';

class Post {
  submitReport = (reportObjectId: string, reason: string, reportObjectType: string) => {
    //Capitalize first letter
    const objectType: string =
      reportObjectType.charAt(0).toUpperCase() + reportObjectType.slice(1);

    const jwt = getJwt();
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
		
    const data = {
      reportObject: reportObjectId,
      reason,
      objectType,
    };
    return axiosClient.post(`${REPORT_ENDPOINT}`, data, config);
  };
}
export default new Post();

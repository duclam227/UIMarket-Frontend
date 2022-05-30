import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { BsDownload } from 'react-icons/bs';

import PageWithSideNav from '../../components/common/OneToFivePage/OneToFivePage';
import style from './ViewLicensePage.module.css';
import { LogoIcon } from '../../components';
import licenseAPI from '../../api/license';

interface LicenseInfo {
  shopName: string;
  customerEmail: string;
  productId: string;
  boughtTime: Date;
}
const ViewLicensePage = () => {
  const pageTitle = <FormattedMessage id="ViewLicensePage.pagetitle" />;
  const downloadButtonLabel = (
    <FormattedMessage id="PurchaseHistoryPage.downloadButtonLabel" />
  );
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null>(null);
  useEffect(() => {
    if (!params.id) navigate(`/bad-request`, { replace: true });

    const getLicense = async () => {
      try {
        const res: any = await licenseAPI.getLicenseById(params.id!);
        setLicenseInfo({
          shopName: res.shop.shopName,
          customerEmail: res.userId.customerEmail,
          productId: res.product._id,
          boughtTime: new Date(res.boughtTime),
        });
        setIsLoading(false);
      } catch (error: any) {
        setLicenseInfo(null);
        toast.error('An unknown error occured');
        setIsLoading(false);
      }
    };
    getLicense();
  }, []);

  const renderLicense = () => (
    <div
      className={`mt-3 d-flex justify-content-between align-items-start ${style.licenseWrapper}`}
    >
      <div className={`w-75`}>
        <div className={`${style.gradientTopBorder}`}></div>
        {/* Table */}
        <div className={`bg-white py-3 px-4`}>
          <LogoIcon className={style.logo} />
          <table>
            <tbody>
              <tr>
                <th className={`text-primary`}>Licensor: </th>
                <td>{licenseInfo?.shopName}</td>
              </tr>
              <tr>
                <th className={`text-primary`}>Licensee: </th>
                <td> {licenseInfo?.customerEmail} </td>
              </tr>
              <tr>
                <th className={`text-primary`}>Product ID: </th>
                <td>{licenseInfo?.productId}</td>
              </tr>
              <tr>
                <th className={`text-primary`}>Asset URL: </th>
                <td>
                  <Link
                    to={`${process.env.REACT_APP_BASE_CLIENT_URL}/product/${licenseInfo?.productId}`}
                  >
                    {`${process.env.REACT_APP_BASE_CLIENT_URL}/product/${licenseInfo?.productId}`}
                  </Link>
                </td>
              </tr>
              <tr>
                <th className={`text-primary`}>Purchase Date: </th>
                <td>
                  <FormattedDate
                    value={licenseInfo?.boughtTime}
                    year="numeric"
                    month="long"
                    day="2-digit"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {/* License description section */}
          <section className={`mt-2 px-1`}>
            <p>
              The DeeX License grants the user an ongoing, non-exclusive, worldwide
              license to utilize the digital work (“Licensed Asset”).
            </p>
            <p>
              You are licensed to use the “Asset” to create unlimited end projects for
              yourself or for your clients.
            </p>
            <strong>Can be used for</strong>
            <ul className={`${style.allowedUnorderedList}`}>
              <li className={`${style.allowedListItem}`}>
                Physical or digital end products for sale
              </li>
              <li className={`${style.allowedListItem}`}>
                Unlimited physical advertisements for local & global markets
              </li>
              <li className={`${style.allowedListItem}`}>
                Digital paid advertisements with unlimited impressions
              </li>
              <li className={`${style.allowedListItem}`}>Broadcast and streaming</li>
            </ul>
            <strong>What you cannot do</strong>
            <ul className={`${style.notAllowedUnorderedList}`}>
              <li className={`${style.notAllowedListItem}`}>
                Resell or sub-license the Asset in a way that is directly competitive with
                it
              </li>
              <li className={`${style.notAllowedListItem}`}>
                Resell any modification of the Asset on its own
              </li>
              <li className={`${style.notAllowedListItem}`}>
                Make the Asset public or share the Asset in any way that allows others to
                download, extract, or redistribute it as a standalone filet
              </li>
              <li className={`${style.notAllowedListItem}`}>
                Falsely represent authorship and/or ownership of the Asset
              </li>
            </ul>
          </section>
        </div>
      </div>
      {/* Download button */}
      <span>
        <Button className={`px-5 py-2 d-flex align-items-center`}>
          <span className={`me-2 text-nowrap`}>{downloadButtonLabel}</span>
          <BsDownload />
        </Button>
      </span>
    </div>
  );

  return (
    <PageWithSideNav>
      <div className={`${style.content}`}>
        <Container fluid className={`bg-white border py-4`}>
          <Row>
            <h2>{pageTitle}</h2>
          </Row>
        </Container>
        {isLoading ? (
          <div className={`d-flex mt-5 justify-content-center align-items-center`}>
            <Spinner animation="border" />
          </div>
        ) : licenseInfo ? (
          renderLicense()
        ) : null}
      </div>
    </PageWithSideNav>
  );
};

export default ViewLicensePage;

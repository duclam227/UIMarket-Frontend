import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import logo from './logo.png';

import { BsDownload, BsCheck, BsX } from 'react-icons/bs';

import PageWithSideNav from '../../components/common/OneToFivePage/OneToFivePage';
import style from './ViewLicensePage.module.css';
import { ProductLicense } from '../../components';
import licenseAPI from '../../api/license';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface LicenseInfo {
  _id: string;
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
          _id: res._id,
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
      className={`my-3 d-flex justify-content-evenly align-items-start ${style.licenseWrapper}`}
    >
      <ProductLicense licenseInfo={licenseInfo!} />

      {/* Download button */}
      <div>
        <Button
          className={`px-5 py-2 d-flex align-items-center`}
          onClick={() => createPDFFile()}
        >
          <span className={`me-2 text-nowrap`}>{downloadButtonLabel}</span>
          <BsDownload />
        </Button>
      </div>
    </div>
  );

  const createPDFFile = async () => {
    const license = document.getElementById('license');

    html2canvas(license!).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(logo, 'JPEG', 0, 0, 0, 0);
      pdf.addImage(imgData, 'JPEG', 0, 20, 210, 0);
      pdf.save(`${licenseInfo?.productId}_${licenseInfo?.customerEmail}.pdf`);
    });
  };

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

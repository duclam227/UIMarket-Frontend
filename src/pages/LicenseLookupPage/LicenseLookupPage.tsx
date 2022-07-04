import {
  useState,
  FC,
  ChangeEventHandler,
  ChangeEvent,
  FormEvent,
  useEffect,
} from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { BsSearch } from 'react-icons/bs';

import style from './LicenseLookupPage.module.css';
import { OneToFivePage, ProductLicense } from '../../components';
import { LicenseInfo } from '../ViewLicensePage/ViewLicensePage';
import licenseAPI from '../../api/license';
import { toast } from 'react-toastify';
import { AnyKindOfDictionary } from 'lodash';
interface Props {
  intl: IntlShape;
}

const LicenseLookupPage: FC<Props> = props => {
  const { intl } = props;

  const pageTitle = <FormattedMessage id="LicenseLookupPage.pageTitle" />;
  const pageSubtitle = <FormattedMessage id="LicenseLookupPage.pageSubtitle" />;
  const searchBarPlaceholder = intl.formatMessage({
    id: 'LicenseLookupPage.searchBarPlaceholder',
  });
  const notFoundToastMsg = intl.formatMessage({
    id: 'LicenseLookupPage.notFoundToastMsg',
  });
  const cannotGetDataErrorMsg = intl.formatMessage({
    id: 'ErrorMessage.cannotGetDataErrorMsg',
  });

  const [submittedLicenseId, setSubmittedLicenseId] = useState<string | null>(null);
  const [licenseIdQuery, setLicenseIdQuery] = useState<string>('');
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getLicenseById = async () => {
      if (!submittedLicenseId) return;
      setIsLoading(true);
      try {
        const res: any = await licenseAPI.getLicenseById(submittedLicenseId);
        setLicenseInfo({
          _id: res._id,
          shopName: res.shop.shopName,
          customerEmail: res.userId.customerEmail,
          productId: res.product._id,
          boughtTime: new Date(res.boughtTime),
        });
      } catch (e: any) {
        if (e.response && e.response.status === 404) toast.error(notFoundToastMsg);
        else toast.error(cannotGetDataErrorMsg);
        console.log(e);
      }
      setIsLoading(false);
    };
    getLicenseById();
  }, [submittedLicenseId]);
  const handleChange: ChangeEventHandler = ({
    target: input,
  }: ChangeEvent<HTMLInputElement>) => {
    setLicenseIdQuery(input.value);
  };
  const handleSubmitLicenseId = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmittedLicenseId(licenseIdQuery);
  };
  return (
    <OneToFivePage>
      <div className={`${style.content}`}>
        <Container fluid className={`bg-white border border-top-0 py-4`}>
          <Row className={`ps-4 pt-1`}>
            <h2>{pageTitle}</h2>
            <h6>{pageSubtitle}</h6>
          </Row>
        </Container>
        <Container fluid className={`bg-white border py-4 mt-3`}>
          <Form
            className={style.searchBarWrapper}
            onSubmit={e => handleSubmitLicenseId(e)}
          >
            <div className={style.searchBar}>
              <BsSearch className={style.searchIcon} />
              <Form.Control
                type="text"
                placeholder={searchBarPlaceholder}
                onChange={e => handleChange(e)}
              />
            </div>
          </Form>
        </Container>

        <div className={`d-flex justify-content-center my-4`}>
          {isLoading ? (
            <Spinner animation="border" />
          ) : licenseInfo ? (
            <ProductLicense licenseInfo={licenseInfo} />
          ) : null}
        </div>
      </div>
    </OneToFivePage>
  );
};

export default injectIntl(LicenseLookupPage);

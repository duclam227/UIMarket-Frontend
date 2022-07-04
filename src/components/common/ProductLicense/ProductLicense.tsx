import { FC } from 'react';
import { BsCheck, BsX } from 'react-icons/bs';
import { FormattedDate } from 'react-intl';
import { Link } from 'react-router-dom';
import { LogoIcon } from '../..';
import { LicenseInfo } from '../../../pages/ViewLicensePage/ViewLicensePage';

import style from './ProductLicense.module.css';
interface Props {
  licenseInfo: LicenseInfo;
}
const ProductLicense: FC<Props> = props => {
  const { licenseInfo } = props;
  return (
    <div className={`w-75`}>
      <div className={`${style.gradientTopBorder}`}></div>
      {/* Table */}
      <div className={`bg-white py-3 px-4`}>
        <LogoIcon className={style.logo} />
        <div id="license">
          <table className={`${style.table}`}>
            <tbody className={`${style.tbody}`}>
              <tr className={`${style.tr}`}>
                <th className={`text-primary ${style.th}`}>License ID: </th>
                <td className={`${style.td}`}>{licenseInfo?._id}</td>
              </tr>
              <tr className={`${style.tr}`}>
                <th className={`text-primary ${style.th}`}>Licensor: </th>
                <td className={`${style.td}`}>{licenseInfo?.shopName}</td>
              </tr>
              <tr className={`${style.tr}`}>
                <th className={`text-primary ${style.th}`}>Licensee: </th>
                <td className={`${style.td}`}> {licenseInfo?.customerEmail} </td>
              </tr>
              <tr className={`${style.tr}`}>
                <th className={`text-primary ${style.th}`}>Product ID: </th>
                <td className={`${style.td}`}>{licenseInfo?.productId}</td>
              </tr>
              <tr className={`${style.tr}`}>
                <th className={`text-primary ${style.th}`}>Asset URL: </th>
                <td className={`${style.td}`}>
                  <Link to={`/product/${licenseInfo?.productId}`}>
                    {`${process.env.REACT_APP_BASE_CLIENT_URL}/product/${licenseInfo?.productId}`}
                  </Link>
                </td>
              </tr>
              <tr className={`${style.tr}`}>
                <th className={`text-primary ${style.th}`}>Purchase Date: </th>
                <td className={`${style.td}`}>
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
              <li className={`${style.allowedListItem} d-flex align-items-center`}>
                <span>
                  <BsCheck size={30} />
                </span>
                Physical or digital end products for sale
              </li>
              <li className={`${style.allowedListItem} d-flex align-items-center`}>
                <span>
                  <BsCheck size={30} />
                </span>
                Unlimited physical advertisements for local & global markets
              </li>
              <li className={`${style.allowedListItem} d-flex align-items-center`}>
                <span>
                  <BsCheck size={30} />
                </span>
                Digital paid advertisements with unlimited impressions
              </li>
              <li className={`${style.allowedListItem} d-flex align-items-center`}>
                <span>
                  <BsCheck size={30} />
                </span>
                Broadcast and streaming
              </li>
            </ul>
            <strong>What you cannot do</strong>
            <ul className={`${style.notAllowedUnorderedList}`}>
              <li className={`${style.notAllowedListItem} d-flex align-items-center`}>
                <span>
                  <BsX size={30} />
                </span>
                Resell or sub-license the Asset in a way that is directly competitive with
                it
              </li>
              <li className={`${style.notAllowedListItem} d-flex align-items-center`}>
                <span>
                  <BsX size={30} />
                </span>
                Resell any modification of the Asset on its own
              </li>
              <li className={`${style.notAllowedListItem} d-flex align-items-center`}>
                <span>
                  <BsX size={30} />
                </span>
                Make the Asset public or share the Asset in any way that allows others to
                download, extract, or redistribute it as a standalone file
              </li>
              <li className={`${style.notAllowedListItem} d-flex align-items-center`}>
                <span>
                  <BsX size={30} />
                </span>
                Falsely represent authorship and/or ownership of the Asset
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductLicense;

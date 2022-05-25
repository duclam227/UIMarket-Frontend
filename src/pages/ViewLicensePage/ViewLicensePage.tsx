import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { BsDownload } from 'react-icons/bs';
import PageWithSideNav from '../../components/common/OneToFivePage/OneToFivePage';
import style from './ViewLicensePage.module.css';
import { LogoIcon } from '../../components';

const ViewLicensePage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <PageWithSideNav>
      <div className={`${style.content}`}>
        <Container fluid className={`bg-white border py-4`}>
          <Row>
            <h2>Your Digital License</h2>
          </Row>
        </Container>
        {isLoading ? (
          <div className={`d-flex mt-5 justify-content-center align-items-center`}>
            <Spinner animation="border" />
          </div>
        ) : (
          <Container fluid className={`mt-3 p-0`}>
            <Row>
              <Col md={9} xxl={10} className={``}>
                <div className={`${style.gradientTopBorder}`}></div>
                {/* Table */}
                <div className={`bg-white py-3 px-4`}>
                  <LogoIcon className={style.logo} />
                  <table>
                    <tr>
                      <th className={`text-primary`}>Licensor: </th>
                      <td>Store Name</td>
                    </tr>
                    <tr>
                      <th className={`text-primary`}>Licensee: </th>
                      <td>Buyer Email</td>
                    </tr>
                    <tr>
                      <th className={`text-primary`}>Product ID: </th>
                      <td>ID</td>
                    </tr>
                    <tr>
                      <th className={`text-primary`}>Asset URL: </th>
                      <td>Item URL</td>
                    </tr>
                    <tr>
                      <th className={`text-primary`}>Purchase Date: </th>
                      <td>08 Sep 2020</td>
                    </tr>
                  </table>

                  {/* License description section */}
                  <section className={`mt-2 px-1`}>
                    <p>
                      The DeeX License grants the user an ongoing, non-exclusive,
                      worldwide license to utilize the digital work (“Licensed Asset”).
                    </p>
                    <p>
                      You are licensed to use the “Asset” to create unlimited end projects
                      for yourself or for your clients.
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
                      <li className={`${style.allowedListItem}`}>
                        Broadcast and streaming
                      </li>
                    </ul>
                    <strong>What you cannot do</strong>
                    <ul className={`${style.notAllowedUnorderedList}`}>
                      <li className={`${style.notAllowedListItem}`}>
                        Resell or sub-license the Asset in a way that is directly
                        competitive with it
                      </li>
                      <li className={`${style.notAllowedListItem}`}>
                        Resell any modification of the Asset on its own
                      </li>
                      <li className={`${style.notAllowedListItem}`}>
                        Make the Asset public or share the Asset in any way that allows
                        others to download, extract, or redistribute it as a standalone
                        filet
                      </li>
                      <li className={`${style.notAllowedListItem}`}>
                        Falsely represent authorship and/or ownership of the Asset
                      </li>
                    </ul>
                  </section>
                </div>
              </Col>
              {/* Download button */}
              <Col md={3} xxl={2} className={`d-flex justify-content-end`}>
                <span>
                  <Button className={`px-5 py-2 d-flex align-items-center`}>
                    <span className={`me-2`}>Download</span>
                    <BsDownload />
                  </Button>
                </span>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </PageWithSideNav>
  );
};

export default ViewLicensePage;

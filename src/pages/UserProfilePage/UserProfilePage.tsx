import React, { useEffect, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';

import { BsPencil } from 'react-icons/bs';
import { Link, Routes, Route, useParams, Navigate, useNavigate } from 'react-router-dom';
import style from './UserProfilePage.module.css';
import { useSelector } from 'react-redux';

import { State } from '../../redux/store';
import { OneToFivePage, UserAvatar } from '../../components';
import UserActivityTab from './UserActivityTab/UserActivityTab';
import profileAPI from '../../api/profile';
import AllTopAnswers from './SeeAllTab/AllTopAnswers';
import AllTopQuestions from './SeeAllTab/AllTopQuestions';
import AllTags from './SeeAllTab/AllTags';
import { FormattedMessage } from 'react-intl';
import { genericAvatarUrl } from '../../app/util/const';

export interface ProfileStats {
  questions: number;
  upvote: number;
  answers: number;
  point: number;
}

export interface TagStat {
  numOfPosts: number;
  tagName: string;
  upvote: number;
  _id: string;
}

export interface GeneralQuestionInfo {
  questionTitle: string;
  totalDownvote: number;
  totalUpvote: number;
  questionBounty: number;
  _id: string;
}

export interface GeneralAnswerInfo {
  questionId: {
    questionTitle: string;
    _id: string;
  };
  totalUpvote: number;
  _id: string;
}

export interface UserProfileInfo {
  customerBio: string | null;
  customerDOB: string | null;
  customerEmail: string;
  customerName: string;
  customerPhone: string | null;
  customerStatus: boolean;
  customerAvatar: string;
  _id: string;
  shopId?: string;
}
const UserProfilePage = () => {
  const viewShopBtnLabel = (
    <FormattedMessage id="UserProfilePage.viewShopBtnLabel" defaultMessage="View shop" />
  );
  const editProfileBtnLabel = (
    <FormattedMessage
      id="UserProfilePage.editProfileBtnLabel"
      defaultMessage="Edit profile"
    />
  );
  const activityTabNavBtnLabel = (
    <FormattedMessage
      id="UserProfilePage.activityTabNavBtnLabel"
      defaultMessage="Activity"
    />
  );
  const productTabNavBtnLabel = (
    <FormattedMessage
      id="UserProfilePage.productTabNavBtnLabel"
      defaultMessage="Products"
    />
  );

  const params = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state: State) => state.auth.user);
  const [userProfileInfo, setUserProfileInfo] = useState<UserProfileInfo | null>(null);
  const [profileStats, setProfileStats] = useState<ProfileStats | null>(null);
  const [profileTagStats, setProfileTagStats] = useState<TagStat[] | null>(null);
  const [profileTopQuestions, setProfileTopQuestions] = useState<
    GeneralQuestionInfo[] | null
  >(null);
  const [profileBountiedQuestions, setProfileBountiedQuestions] = useState<
    GeneralQuestionInfo[] | null
  >(null);
  const [profileTopAnswers, setProfileTopAnswers] = useState<GeneralAnswerInfo[] | null>(
    null,
  );
  //Missing features: Paginate see all page
  //Missing features: Sort question by upvotes
  const urlParamsUserId = params.id;
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  useEffect(() => {
    const { id } = params;
    if (!id) {
      return;
    }

    const getUserProfile = async (id: string) => {
      try {
        setIsFetchingData(true);
        const res: any = await profileAPI.getUserActivityById(id);
        const { stat, tagStats, questions, questionBounty, answers } = res;
        const res2: any = await profileAPI.getUserProfileInfoById(id);
        const { user } = res2;
        setUserProfileInfo({ ...user });
        setProfileStats({ ...stat, ...user.customerWallet });
        setProfileTagStats([...tagStats]);
        setProfileTopQuestions([...questions]);
        setProfileBountiedQuestions([...questionBounty]);
        setProfileTopAnswers([...answers]);
        setIsFetchingData(false);
      } catch (error) {
        console.log('Get user profile error: ', error);
      }
    };

    getUserProfile(id);
  }, [urlParamsUserId]);

  //mt = margin top; gy = gutters Oy
  const generalInfoRowClassname = 'mt-5 gy-3';
  //fst = font-style
  const bioNotAvailableMessageClassname = 'text-muted fst-italic';
  const tabNavRowClassname = 'mt-5 p-0';
  const tabContentContainer = style.tabContainer + ' ' + 'p-3';
  return (
    <OneToFivePage>
      <Container>
        {/* General info */}
        <Row className={generalInfoRowClassname}>
          <Col lg={3} className="d-flex justify-content-center">
            <div className={style.profilePictureWrapper}>
              <img
                className={style.profilePicture}
                src={userProfileInfo?.customerAvatar || genericAvatarUrl}
              />
            </div>
          </Col>
          <Col lg={7} md={8}>
            <h1>{userProfileInfo?.customerName}</h1>
            {userProfileInfo?.customerBio ? (
              <p className={style.profileBio}>{userProfileInfo.customerBio}</p>
            ) : (
              <p className={bioNotAvailableMessageClassname}>
                <FormattedMessage
                  id="UserProfilePage.noBioMsg"
                  defaultMessage={'This user does not have a bio.'}
                />
              </p>
            )}
          </Col>

          {/* Render Edit button */}
          <Col lg={2} md={4} className="d-flex justify-content-center flex-column gap-1">
            <div className="d-flex justify-content-center align-items-stretch flex-column gap-1">
              {currentUser?._id === params.id && (
                <Button
                  className="d-flex align-items-center justify-content-center"
                  onClick={() => navigate(`/user/${currentUser?._id}/edit`)}
                >
                  <BsPencil className="me-1" />
                  <span className={`text-nowrap`}>{editProfileBtnLabel}</span>
                </Button>
              )}
              {userProfileInfo?.shopId ? (
                <Button
                  className="d-flex align-items-center justify-content-center"
                  onClick={() => navigate(`/shop/${currentUser?.shopId}`)}
                >
                  <span className={`text-nowrap`}>{viewShopBtnLabel}</span>
                </Button>
              ) : null}
            </div>
          </Col>
        </Row>

        {/* Tabbed Statistics */}

        {/* Tab Nav */}
        <Row className={tabNavRowClassname}>
          <Nav
            className="justify-content-center"
            variant="tabs"
            defaultActiveKey="activity"
          >
            <Nav.Item>
              <Nav.Link as={Link} to="./activity" eventKey="activity">
                {activityTabNavBtnLabel}
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link as={Link} to="./products" eventKey="products">
                {productTabNavBtnLabel}
              </Nav.Link>
            </Nav.Item> */}
          </Nav>
        </Row>

        {/* Tab Content */}
        <Row>
          <div className={tabContentContainer}>
            {isFetchingData ? (
              <Row className="justify-content-center">
                <Spinner animation="border" />
              </Row>
            ) : (
              <Routes>
                <Route
                  path="/activity"
                  element={
                    <UserActivityTab
                      profileStats={profileStats}
                      profileTagStats={profileTagStats}
                      profileTopQuestions={profileTopQuestions}
                      profileBountiedQuestions={profileBountiedQuestions}
                      profileTopAnswers={profileTopAnswers}
                    />
                  }
                />
                <Route
                  path="/activity/topanswers/all"
                  element={<AllTopAnswers profileTopAnswers={profileTopAnswers} />}
                />
                <Route
                  path="/activity/topquestions/all"
                  element={<AllTopQuestions profileTopQuestions={profileTopQuestions} />}
                />
                <Route
                  path="/activity/tags/all"
                  element={<AllTags profileTagStats={profileTagStats} />}
                />
                <Route path="/" element={<Navigate replace to="activity" />} />
              </Routes>
            )}
          </div>
        </Row>
      </Container>
    </OneToFivePage>
  );
};

export default UserProfilePage;

import { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';

import { InfoCardContainer } from '../../../components';
import { TagStat } from '../UserProfilePage';

interface Props {
  profileTagStats: TagStat[] | null;
}
const AllTags: FC<Props> = props => {
  const { profileTagStats } = props;

  return (
    <Container className="w-50">
      <Row className="justify-content-between">
        <Col>
          <h3>
            <FormattedMessage id="UserActivityTab.tagsLabel" defaultMessage="Tags" />
          </h3>
        </Col>
      </Row>
      <InfoCardContainer className="p-3" style={{ maxHeight: '200em' }}>
        <>
          {profileTagStats && profileTagStats.length > 0 ? (
            profileTagStats?.map(tagStat => (
              <Row className="mb-2 justify-content-between" key={tagStat._id}>
                <Col sm={6}>
                  <Badge bg="primary">{tagStat.tagName}</Badge>
                </Col>
                <Col sm={4} className="d-lg-flex justify-content-between">
                  <div className="text-nowrap">{tagStat.numOfPosts} post</div>
                  <div className="text-nowrap">{tagStat.upvote} upvotes</div>
                </Col>
              </Row>
            ))
          ) : (
            <div className={`p-2`}>
              <FormattedMessage id="UserActivityTab.noData" />
            </div>
          )}
        </>
      </InfoCardContainer>
    </Container>
  );
};

export default AllTags;

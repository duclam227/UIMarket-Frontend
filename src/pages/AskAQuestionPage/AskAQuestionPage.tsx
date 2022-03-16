import { ChangeEvent, SyntheticEvent, useState } from 'react';
import classNames from 'classnames';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { question } from '../../app/util/interfaces';
import { PageWithNavbar } from '../../components';
import { getErrorMessage } from '../../app/util';

import './AskAQuestionPage.css';
import style from './AskAQuestionPage.module.css';
import questionAPI from '../../api/question';

const AskAQuestionPage = ({ intl }: any) => {
  const formGroupClassName = 'mb-3';
  const cardClassName = 'mb-4';
  const containerClassName = classNames(style.pageContainer, 'w-75');
  const postQuestionButtonClassName = 'mb-3';
  const topUpButtonClassName = 'mb-3';
  const topUpGroupClassName =
    'd-flex flex-column align-items-end justify-content-evenly';

  const pageTitle = (
    <FormattedMessage
      id="AskAQuestionPage.pageTitle"
      defaultMessage="Ask a question"
    />
  );
  const questionTitle = (
    <FormattedMessage
      id="AskAQuestionPage.questionTitle"
      defaultMessage="Title"
    />
  );
  const questionTitlePlaceholder = intl.formatMessage({
    id: 'AskAQuestionPage.questionTitlePlaceholder',
    defaultMessage: 'e.g How do I...',
  });
  const questionBody = (
    <FormattedMessage
      id="AskAQuestionPage.questionBody"
      defaultMessage="Body"
    />
  );
  const questionTags = (
    <FormattedMessage
      id="AskAQuestionPage.questionTags"
      defaultMessage="Tags"
    />
  );
  const questionTagsPlaceholder = intl.formatMessage({
    id: 'AskAQuestionPage.questionTagsPlaceholder',
    defaultMessage: 'e.g UI, color, alignment, ...',
  });
  const addBountyLabel = (
    <FormattedMessage
      id="AskAQuestionPage.addBountyLabel"
      defaultMessage="Add a bounty"
    />
  );
  const addBountyDescription = (
    <FormattedMessage
      id="AskAQuestionPage.addBountyDescription"
      defaultMessage="Bountied questions will appear highlighted and can attract more answers. You need credit to add bounty to a question"
    />
  );
  const addBountyBalanceLabel = (
    <FormattedMessage
      id="AskAQuestionPage.addBountyBalanceLabel"
      defaultMessage="Balance: $"
    />
  );
  const addBountyTopUpBtnText = (
    <FormattedMessage
      id="AskAQuestionPage.addBountyTopUpBtnText"
      defaultMessage="Top up"
    />
  );
  const addBountyInputPlaceholder = intl.formatMessage({
    id: 'AskAQuestionPage.addBountyInputPlaceholder',
    defaultMessage: '$10',
  });
  const submitBtnText = (
    <FormattedMessage
      id="AskAQuestionPage.submitBtnText"
      defaultMessage="Post Question"
    />
  );

  const navigate = useNavigate();

  const [question, setQuestion] = useState<question>({
    title: '',
    body: '',
    tags: [],
    bounty: 0,
    question: '',
  });
  const [balance, setBalance] = useState<number>(0);
  const [postInProgress, setPostInProgress] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      [input.id]: input.value,
    });
  };

  const handleTagsChange = ({ currentTarget: input }: any) => {
    const tags = input.value.trim().split(',');
    setQuestion({ ...question, tags });
  };

  const handleSubmit = async () => {
    try {
      setPostInProgress(true);
      const response = await questionAPI.addNewQuestion(question);
      navigate('/', { replace: true });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setPostInProgress(false);
      setErrorMessage(errorMessage);
    }
  };
  return (
    <PageWithNavbar>
      <Container className={containerClassName}>
        <h1 className={style.pageTitle}>{pageTitle}</h1>

        <Card className={cardClassName}>
          <Card.Body>
            <Form>
              <Form.Group className={formGroupClassName} controlId="title">
                <Form.Label>
                  <h4>{questionTitle}</h4>
                </Form.Label>
                <Form.Control
                  placeholder={questionTitlePlaceholder}
                  type="text"
                  onChange={e => handleChange(e as any)}
                />
              </Form.Group>

              <Form.Group className={formGroupClassName}>
                <Form.Label htmlFor="body">
                  <h4>{questionBody}</h4>
                </Form.Label>
                <CKEditor
                  editor={Editor}
                  name="body"
                  onChange={(event: SyntheticEvent, editor: any): void => {
                    setQuestion({ ...question, body: editor.getData() });
                  }}
                ></CKEditor>
              </Form.Group>

              <Form.Group className={formGroupClassName}>
                <Form.Label>
                  <h4>{questionTags}</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={questionTagsPlaceholder}
                  onChange={e => handleTagsChange(e)}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>

        <Card className={cardClassName}>
          <Card.Body>
            <Row>
              <Col md={8}>
                <h4>{addBountyLabel}</h4>
                <p className="text-muted">{addBountyDescription}</p>
              </Col>
              <Col md={4} className={topUpGroupClassName}>
                <h4>
                  {addBountyBalanceLabel}
                  {balance}
                </h4>
                <Button variant="warning" className={topUpButtonClassName}>
                  {addBountyTopUpBtnText}
                </Button>
              </Col>
            </Row>

            <Row>
              <Form.Group controlId="bounty">
                <Form.Control
                  type="number"
                  placeholder={addBountyInputPlaceholder}
                  onChange={e => handleChange(e as any)}
                />
              </Form.Group>
            </Row>
          </Card.Body>
        </Card>

        <Alert
          variant="danger"
          onClose={() => setErrorMessage('')}
          show={errorMessage ? true : false}
          dismissible
        >
          <Alert.Heading>Something went wrong!</Alert.Heading>
          {errorMessage}
        </Alert>

        <Button
          variant="primary"
          className={postQuestionButtonClassName}
          onClick={handleSubmit}
          disabled={postInProgress}
        >
          {postInProgress ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            submitBtnText
          )}
        </Button>
      </Container>
    </PageWithNavbar>
  );
};

export default injectIntl(AskAQuestionPage);

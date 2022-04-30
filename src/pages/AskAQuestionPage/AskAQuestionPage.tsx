import { useState } from 'react';
import classNames from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { FormInput, PageWithNavbar } from '../../components';
import { getErrorMessage } from '../../app/util';

import './AskAQuestionPage.css';
import style from './AskAQuestionPage.module.css';
import questionAPI from '../../api/question';
import { RichTextEditor } from '../../components';

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
  const questionTitle = intl.formatMessage({
    id: "AskAQuestionPage.questionTitle",
    defaultMessage: "Title"
  });
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
  const questionTags = intl.formatMessage({
    id: "AskAQuestionPage.questionTags",
    defaultMessage: "Tags"
  });

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
  interface Question {
    title: string;
    body: string;
    tags: string;
    bounty: number;
  }
  const navigate = useNavigate();
  const schema = Joi.object({
    title: Joi.string().min(10).max(100).required().label('Title'),
    body: Joi.string().min(10).required().label('Body'),
    tags: Joi.string().label('Tags'),
    bounty: Joi.number().min(0).label('Bounty amount'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
  } = useForm<Question>({
    resolver: joiResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      title: '',
      body: '',
      tags: '',
      bounty: 0,
    },
  });
  const [balance, setBalance] = useState<number>(0);
  const [postInProgress, setPostInProgress] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const formatIntoArray = (input: string) =>
    input.replace(/\s+/g, '').split(',');

  const handlePostQuestion: SubmitHandler<Question> = async data => {
    const { tags } = data;
    const question = { ...data, tags: formatIntoArray(tags) };
    try {
      setPostInProgress(true);
      await questionAPI.addNewQuestion(question);
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

        <Form onSubmit={handleSubmit(handlePostQuestion)}>
          <Card className={cardClassName}>
            <Card.Body>
              <FormInput
                label={questionTitle}
                placeholder={questionTitlePlaceholder}
                name="title"
                control={control}
                className={formGroupClassName}
                labelClassName={style.label}
              />

              <Form.Group className={formGroupClassName}>
                <Form.Label htmlFor="body">
                  <h4>{questionBody}</h4>
                </Form.Label>
                <Controller
                  control={control}
                  name="body"
                  render={({ field: { onChange } }) => (
                    <RichTextEditor
                      onChange={onChange}
                    // initialValue={question.body}
                    />
                  )}
                />
                {errors.body && (
                  <Alert variant="danger" className="mt-2">
                    {errors.body.message}
                  </Alert>
                )}
              </Form.Group>

              <FormInput
                label={questionTags}
                placeholder={questionTagsPlaceholder}
                name="tags"
                control={control}
                className={formGroupClassName}
                labelClassName={style.label}
              />
              <Form.Text muted>
                Each tag should only be a word, multiple tags should be
                separated by a comma
              </Form.Text>
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
                <FormInput
                  placeholder={addBountyInputPlaceholder}
                  name="bounty"
                  control={control}
                  type='number'
                />
                {/* <Form.Group controlId="bounty">
                  <Form.Control
                    type="number"
                    placeholder={addBountyInputPlaceholder}
                    {...register('bounty')}
                    isInvalid={errors.bounty ? true : false}
                  />
                  {errors.bounty && (
                    <Alert variant="danger" className="mt-2">
                      {errors.bounty.message}
                    </Alert>
                  )}
                </Form.Group> */}
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
            type="submit"
            className={postQuestionButtonClassName}
            disabled={postInProgress || !isDirty || !isValid}
          >
            {postInProgress ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              submitBtnText
            )}
          </Button>
        </Form>
      </Container>
    </PageWithNavbar>
  );
};

export default injectIntl(AskAQuestionPage);

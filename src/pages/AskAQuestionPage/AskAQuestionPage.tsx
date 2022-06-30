import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { FormInput, PageWithNavbar, ValidationErrorMessage } from '../../components';
import { RichTextEditor } from '../../components';
import { getErrorMessage } from '../../app/util';
import { navbarBranches } from '../../app/util/config';
import { errors as errorCodes } from '../../app/util/errors';

import questionAPI from '../../api/question';
import profileAPI from '../../api/profile';
import { State } from '../../redux/store';

import './AskAQuestionPage.css';
import style from './AskAQuestionPage.module.css';

const AskAQuestionPage = ({ intl }: any) => {
  const [balance, setBalance] = useState<number>(0);
  const [isBountyOn, setIsBountyOn] = useState<boolean>(false);
  const [postInProgress, setPostInProgress] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const currentUser = useSelector((state: State) => state.auth.user);
  const formGroupClassName = 'mb-3';
  const cardClassName = 'mb-4 d-flex flex-column';
  const containerClassName = classNames(style.pageContainer, 'w-80');
  const postQuestionButtonClassName = 'mb-3';
  const topUpButtonClassName = 'mb-3';
  const topUpGroupClassName = 'd-flex flex-column align-items-end justify-content-evenly';

  const pageTitle = (
    <FormattedMessage id="AskAQuestionPage.pageTitle" defaultMessage="Ask a question" />
  );
  const questionTitle = intl.formatMessage({
    id: 'AskAQuestionPage.questionTitle',
    defaultMessage: 'Title',
  });
  const questionTitlePlaceholder = intl.formatMessage({
    id: 'AskAQuestionPage.questionTitlePlaceholder',
    defaultMessage: 'e.g How do I...',
  });
  const questionBody = (
    <FormattedMessage id="AskAQuestionPage.questionBody" defaultMessage="Body" />
  );
  const questionTags = intl.formatMessage({
    id: 'AskAQuestionPage.questionTags',
    defaultMessage: 'Tags',
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
    bounty: number | null;
    bountyDueDate: Date | null;
  }
  const navigate = useNavigate();
  const schema = Joi.object({
    title: Joi.string().min(10).max(100).required().label('Title'),
    body: Joi.string().min(20).required().label('Body'),
    tags: Joi.string().allow('', null).label('Tags'),
    bounty: Joi.number().allow(null).greater(0).max(balance).label('Bounty amount'),
    bountyDueDate: Joi.date().allow(null).greater(new Date()).label('Due date'),
  });

  const {
    setValue,
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
      bounty: null,
      bountyDueDate: null,
    },
  });

  const formatIntoArray = (input: string) => input.replace(/\s+/g, '').split(',');

  const handlePostQuestion: SubmitHandler<Question> = async data => {
    const { tags } = data;
    const question = {
      ...data,
      tags: formatIntoArray(tags),
      bounty: isBountyOn ? data.bounty : -1,
      bountyDueDate: isBountyOn ? data.bountyDueDate : undefined,
    };
    try {
      setPostInProgress(true);
      const request: any = await questionAPI.addNewQuestion(question);
      const questionId = request._id;
      navigate(`/question/${questionId}`, { replace: true });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setPostInProgress(false);
      setErrorMessage(errorMessage);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      profileAPI
        .getUserProfileInfoById(currentUser?._id!)
        .then((res: any) => {
          const { user } = res;
          setBalance(user.customerWallet.point);
        })
        .catch(error => {
          const errorMsg = getErrorMessage(error);
          const errorCode: any =
            errorCodes.profile[errorMsg as keyof typeof errorCodes.profile];
          toast.error(intl.formatMessage({ id: `Profile.${errorCode}` }));
        });
    }
  }, [currentUser]);

  const handleToggleSetBounty = () => {
    if (isBountyOn) {
      setValue('bounty', null, { shouldValidate: true });
      setValue('bountyDueDate', null, { shouldValidate: true });
    } else {
      setValue('bounty', 1, {
        shouldDirty: false,
        shouldValidate: true,
      });
      setValue('bountyDueDate', new Date(), {
        shouldDirty: false,
        shouldValidate: true,
      });
    }
    setIsBountyOn(!isBountyOn);
  };
  return (
    <PageWithNavbar branch={navbarBranches.question}>
      <Container className={containerClassName}>
        <h1 className={style.pageTitle}>{pageTitle}</h1>

        <Form onSubmit={handleSubmit(handlePostQuestion)} className="d-flex flex-column">
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
                  render={({ field: { onChange, onBlur } }) => (
                    <RichTextEditor
                      onChange={onChange}
                      onBlur={onBlur}
                      // initialValue={question.body}
                    />
                  )}
                />
                {errors.body && <ValidationErrorMessage message={errors.body.message!} />}
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
                Each tag should only be a word, multiple tags should be separated by a
                comma
              </Form.Text>
            </Card.Body>
          </Card>

          <Button
            id="checkBounty"
            variant={isBountyOn ? 'primary' : 'outline-primary'}
            onClick={() => handleToggleSetBounty()}
            className={style.checkBountyButton}
          >
            {isBountyOn ? (
              <FormattedMessage id="AskAQuestionPage.removeBountyLabel" />
            ) : (
              <FormattedMessage id="AskAQuestionPage.addBountyLabel" />
            )}
          </Button>

          {isBountyOn ? (
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
                  </Col>
                </Row>

                <Row>
                  <FormInput
                    placeholder={addBountyInputPlaceholder}
                    name="bounty"
                    control={control}
                    type="number"
                  />
                </Row>

                <Row>
                  <FormInput
                    label={intl.formatMessage({
                      id: 'AskAQuestionPage.bountyDueDateLabel',
                    })}
                    name="bountyDueDate"
                    control={control}
                    type="date"
                    labelClassName={style.label}
                  />
                </Row>
              </Card.Body>
            </Card>
          ) : null}

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

import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi, { number } from 'joi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { FormInput, PageWithNavbar } from '../../components';
import { RichTextEditor } from '../../components';
import { getErrorMessage } from '../../app/util';
import { navbarBranches } from '../../app/util/config';
import { errors as errorCodes } from '../../app/util/errors';

import questionAPI from '../../api/question';
import profileAPI from '../../api/profile';
import { State } from '../../redux/store';

import './EditQuestionPage.css';
import style from './EditQuestionPage.module.css';

const EditQuestionPage = ({ intl }: any) => {
  const formGroupClassName = 'mb-3';
  const cardClassName = 'mb-4 d-flex flex-column';
  const containerClassName = classNames(style.pageContainer, 'w-75');
  const postQuestionButtonClassName = 'mb-3';
  const topUpButtonClassName = 'mb-3';
  const topUpGroupClassName = 'd-flex flex-column align-items-end justify-content-evenly';

  const pageTitle = (
    <FormattedMessage id="EditQuestionPage.pageTitle" defaultMessage="Ask a question" />
  );
  const questionTitle = intl.formatMessage({
    id: 'EditQuestionPage.questionTitle',
    defaultMessage: 'Title',
  });
  const questionTitlePlaceholder = intl.formatMessage({
    id: 'EditQuestionPage.questionTitlePlaceholder',
    defaultMessage: 'e.g How do I...',
  });
  const questionBody = intl.formatMessage({
    id: 'EditQuestionPage.questionBody',
  });
  // const questionBody = (
  //   <FormattedMessage id="EditQuestionPage.questionBody" defaultMessage="Body" />
  // );
  const questionTags = intl.formatMessage({
    id: 'EditQuestionPage.questionTags',
    defaultMessage: 'Tags',
  });

  const questionTagsPlaceholder = intl.formatMessage({
    id: 'EditQuestionPage.questionTagsPlaceholder',
    defaultMessage: 'e.g UI, color, alignment, ...',
  });
  const addBountyLabel = (
    <FormattedMessage
      id="EditQuestionPage.addBountyLabel"
      defaultMessage="Add a bounty"
    />
  );
  const bountyLabel = intl.formatMessage({
    id: 'AskAQuestionPage.bountyLabel',
  });
  const addBountyDescription = (
    <FormattedMessage
      id="EditQuestionPage.addBountyDescription"
      defaultMessage="Bountied questions will appear highlighted and can attract more answers. You need credit to add bounty to a question"
    />
  );
  const addBountyBalanceLabel = (
    <FormattedMessage
      id="EditQuestionPage.addBountyBalanceLabel"
      defaultMessage="Balance: $"
    />
  );
  const bountyDueDateText = intl.formatMessage({
    id: 'AskAQuestionPage.bountyDueDateText',
  });
  const addBountyInputPlaceholder = intl.formatMessage({
    id: 'EditQuestionPage.addBountyInputPlaceholder',
    defaultMessage: '$10',
  });
  const submitBtnText = (
    <FormattedMessage
      id="EditQuestionPage.submitBtnText"
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

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [body, setBody] = useState<string>('');
  const [questionFromAPI, setQuestionFromAPI] = useState<any>(null);
  const [balance, setBalance] = useState<number>(0);
  const [currentBounty, setCurrentBounty] = useState<number>(0);
  const [currentDueDate, setCurrentDueDate] = useState<Date>(new Date());
  const [isBountyOn, setIsBountyOn] = useState<boolean>(false);
  const [postInProgress, setPostInProgress] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id = '' } = useParams();

  const currentUser = useSelector((state: State) => state.auth.user);
  const navigate = useNavigate();
  const schema = Joi.object({
    title: Joi.string()
      .min(10)
      .max(100)
      .required()
      .label(questionTitle)
      .messages({
        'string.base': intl.formatMessage({ id: 'FormValidation.stringBase' }),
        'string.empty': intl.formatMessage({ id: 'FormValidation.stringEmpty' }),
        'string.min': intl.formatMessage({ id: 'FormValidation.stringMin' }),
        'string.max': intl.formatMessage({ id: 'FormValidation.stringMax' }),
        'any.required': intl.formatMessage({ id: 'FormValidation.anyRequired' }),
      }),
    body: Joi.string()
      .min(20)
      .required()
      .label(questionBody)
      .messages({
        'string.base': intl.formatMessage({ id: 'FormValidation.stringBase' }),
        'string.empty': intl.formatMessage({ id: 'FormValidation.stringEmpty' }),
        'string.min': intl.formatMessage({ id: 'FormValidation.stringMin' }),
        'any.required': intl.formatMessage({ id: 'FormValidation.anyRequired' }),
      }),
    tags: Joi.string()
      .allow('', null)
      .max(40)
      .label(questionTags)
      .messages({
        'string.base': intl.formatMessage({ id: 'FormValidation.stringBase' }),
        'string.empty': intl.formatMessage({ id: 'FormValidation.stringEmpty' }),
        'string.max': intl.formatMessage({ id: 'FormValidation.stringMax' }),
        'any.required': intl.formatMessage({ id: 'FormValidation.anyRequired' }),
      }),
    bounty: Joi.number()
      .allow(null)
      .greater(currentBounty)
      .max(balance)
      .label(bountyLabel)
      .messages({
        'number.base': intl.formatMessage({ id: 'FormValidation.numberBase' }),
        'number.max': intl.formatMessage({ id: 'FormValidation.numberMax' }),
        'number.greater': intl.formatMessage({ id: 'FormValidation.numberGreater' }),
        'any.required': intl.formatMessage({ id: 'FormValidation.anyRequired' }),
      }),
    bountyDueDate: Joi.date()
      .allow(null)
      .greater(new Date())
      .label(bountyDueDateText)
      .messages({
        'date.base': intl.formatMessage({ id: 'FormValidation.dateBase' }),
        'date.greater': intl.formatMessage({ id: 'FormValidation.dateGreater' }),
        'any.required': intl.formatMessage({ id: 'FormValidation.anyRequired' }),
      }),
  });

  const {
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
    reset,
  } = useForm<Question>({
    resolver: joiResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      title: questionFromAPI?.title || '',
      body: body || '',
      tags: '',
      bounty: 0,
      bountyDueDate: null,
      // bounty: question?.bounty <= 0 ? 0 : question?.bounty,
      // bountyDueDate: question?.bountyDueDate || new Date(),
    },
  });

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

  // useEffect(() => {
  //   if (!isBountyOn) {
  //     unregister(['bounty', 'bountyDueDate']);
  //   } else {
  //     register('bounty', { min: question.bounty, max: balance });
  //     register('bountyDueDate');
  //   }
  // }, [isBountyOn])

  useEffect(() => {
    questionAPI
      .getQuestionById(id)
      .then((res: any) => {
        const { question } = res;
        const { questionContent } = question;
        const tags = question.questionTag.map((tag: any) => tag.tagName).join(', ');
        const questionFromAPI: any = {
          title: question.questionTitle,
          tags: tags,
          // bounty: question.questionBounty === -1 ? 0 : question.questionBounty,
          // bountyDueDate: new Date(question.bountyDueDate),
          body: questionContent,
        };
        setCurrentDueDate(
          question.bountyDueDate ? new Date(question.bountyDueDate) : new Date(),
        );
        setCurrentBounty(question.questionBounty === -1 ? 0 : question.questionBounty);
        setQuestionFromAPI(question);
        setBody(questionContent);
        reset({ ...questionFromAPI });
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any =
          errorCodes.question[errorMsg as keyof typeof errorCodes.question];
        toast.error(intl.formatMessage({ id: `Question.${errorCode}` }));
      });
  }, []);

  const handleToggleAdjustBounty = () => {
    if (isBountyOn) {
      setValue('bounty', null, { shouldValidate: true });
      setValue('bountyDueDate', null, { shouldValidate: true });
    } else {
      setValue('bounty', currentBounty <= 0 ? 1 : currentBounty + 1, {
        shouldDirty: false,
        shouldValidate: true,
      });
      setValue('bountyDueDate', currentDueDate, {
        shouldDirty: false,
        shouldValidate: true,
      });
    }

    setIsBountyOn(!isBountyOn);
  };

  const formatIntoArray = (input: string) =>
    input
      .replace(/\s+/g, '')
      .split(',')
      .filter(item => item !== '');
  const handlePostQuestion: SubmitHandler<Question> = async data => {
    const { tags } = data;
    const question = {
      ...data,
      tags: formatIntoArray(tags),
      // bounty: isBountyOn ? data.bounty : -1,
      // bountyDueDate: isBountyOn ? data.bountyDueDate : undefined
    };

    // console.log(question);

    try {
      setPostInProgress(true);
      console.log(questionFromAPI);
      await questionAPI.updateQuestion(question, questionFromAPI._id);
      toast.success('Question edited successfully');
      navigate(`/question/${questionFromAPI._id}`, { replace: true });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setPostInProgress(false);
      setErrorMessage(errorMessage);
    }
  };

  const dateToYYYYMMDD = (date: Date | null) => {
    if (date && isNaN(date.getTime())) {
      return '00-00-0000';
    }
    return date?.toISOString().split('T')[0];
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
                  <div className={`${style.label}`}>{questionBody}</div>
                </Form.Label>
                <Controller
                  control={control}
                  name="body"
                  render={({ field: { onChange, onBlur } }) => (
                    <RichTextEditor
                      onChange={onChange}
                      onBlur={onBlur}
                      initialValue={body}
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
                Each tag should only be a word, multiple tags should be separated by a
                comma
              </Form.Text>
            </Card.Body>
          </Card>

          <Button
            id="checkBounty"
            variant={isBountyOn ? 'secondary' : 'outline-primary'}
            onClick={() => handleToggleAdjustBounty()}
            className={style.checkBountyButton}
          >
            {isBountyOn ? (
              <FormattedMessage id="EditQuestionPage.removeBountyLabel" />
            ) : (
              <FormattedMessage id="EditQuestionPage.addBountyLabel" />
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
                  <Form.Group>
                    <Form.Label className={`${style.label}`}>Due date</Form.Label>
                    <Controller
                      control={control}
                      name="bountyDueDate"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Form.Control
                          value={dateToYYYYMMDD(value)}
                          type="date"
                          onChange={e => onChange(new Date(e.target.value))}
                          onBlur={onBlur}
                          ref={ref}
                        />
                      )}
                    />
                  </Form.Group>
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
            disabled={postInProgress || !isValid || !isDirty}
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

export default injectIntl(EditQuestionPage);

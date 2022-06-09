import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
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

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [body, setBody] = useState<string>('');
  const [question, setQuestion] = useState<any>(null);
  const [balance, setBalance] = useState<number>(0);
  const [isBountyOn, setIsBountyOn] = useState<boolean>(false);
  const [postInProgress, setPostInProgress] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { id = '' } = useParams();

  const currentUser = useSelector((state: State) => state.auth.user);
  const formGroupClassName = 'mb-3';
  const cardClassName = 'mb-4 d-flex flex-column';
  const containerClassName = classNames(style.pageContainer, 'w-75');
  const postQuestionButtonClassName = 'mb-3';
  const topUpButtonClassName = 'mb-3';
  const topUpGroupClassName =
    'd-flex flex-column align-items-end justify-content-evenly';

  const pageTitle = (
    <FormattedMessage
      id="EditQuestionPage.pageTitle"
      defaultMessage="Ask a question"
    />
  );
  const questionTitle = intl.formatMessage({
    id: 'EditQuestionPage.questionTitle',
    defaultMessage: 'Title',
  });
  const questionTitlePlaceholder = intl.formatMessage({
    id: 'EditQuestionPage.questionTitlePlaceholder',
    defaultMessage: 'e.g How do I...',
  });
  const questionBody = (
    <FormattedMessage
      id="EditQuestionPage.questionBody"
      defaultMessage="Body"
    />
  );
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
  const addBountyTopUpBtnText = (
    <FormattedMessage
      id="EditQuestionPage.addBountyTopUpBtnText"
      defaultMessage="Top up"
    />
  );
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
    bounty: number;
    bountyDueDate: Date;
  }
  const navigate = useNavigate();
  const schema = Joi.object({
    title: Joi.string().min(10).max(100).required().label('Title'),
    body: Joi.string().min(20).required().label('Body'),
    tags: Joi.string().allow('', null).label('Tags'),
    bounty: Joi.number().min(question?.bounty || 150).max(balance).label('Bounty amount'),
    bountyDueDate: Joi.date().min(question?.bountyDueDate || new Date()).label('Due date'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
    reset,
  } = useForm<Question>({
    resolver: joiResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      title: question?.title || '',
      body: body || '',
      tags: '',
      bounty: question?.bounty <= 0 ? 0 : question?.bounty,
      bountyDueDate: question?.bountyDueDate || new Date(),
    },
  });

  const formatIntoArray = (input: string) =>
    input.replace(/\s+/g, '').split(',');

  const handlePostQuestion: SubmitHandler<Question> = async data => {
    const { tags } = data;
    const question = {
      ...data,
      tags: formatIntoArray(tags),
      bounty: isBountyOn ? data.bounty : -1,
      bountyDueDate: isBountyOn ? data.bountyDueDate : undefined
    };
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

  useEffect(() => {
    if (currentUser?._id) {
      profileAPI.getUserProfileInfoById(currentUser?._id!)
        .then((res: any) => {
          const { user } = res;
          setBalance(user.customerWallet.point);
        })
        .catch(error => {
          const errorMsg = getErrorMessage(error);
          const errorCode: any = errorCodes.profile[errorMsg as keyof typeof errorCodes.profile];
          toast.error(intl.formatMessage({ id: `Profile.${errorCode}` }));
        })
    }
  }, [currentUser])

  useEffect(() => {
    questionAPI.getQuestionById(id)
      .then((res: any) => {
        const { question } = res;
        const { questionContent } = question;
        const questionFromAPI: any = {
          title: question.questionTitle,
          tags: [...question.questionTag],
          bounty: question.questionBounty === -1 ? 0 : question.questionBounty,
          bountyDueDate: question.bountyDueDate,
          body: questionContent,
        }
        setQuestion(questionFromAPI);
        setBody(questionContent);
        reset({ ...questionFromAPI });

        console.log(questionFromAPI)
        setIsLoading(false);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.question[errorMsg as keyof typeof errorCodes.question];
        toast.error(intl.formatMessage({ id: `Question.${errorCode}` }));
      })
  }, [])

  return (
    <PageWithNavbar branch={navbarBranches.question}>
      <Container className={containerClassName}>
        <h1 className={style.pageTitle}>{pageTitle}</h1>

        <Form onSubmit={handleSubmit(handlePostQuestion)} className='d-flex flex-column'>
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
                      initialValue={body}
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

          <Button
            id="checkBounty"
            variant={isBountyOn ? 'primary' : 'outline-primary'}
            onClick={() => setIsBountyOn(!isBountyOn)}
            className={style.checkBountyButton}
          >
            {isBountyOn
              ? <FormattedMessage id='EditQuestionPage.removeBountyLabel' />
              : <FormattedMessage id='EditQuestionPage.addBountyLabel' />
            }
          </Button>

          {isBountyOn
            ? <Card className={cardClassName}>
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
                    label={intl.formatMessage({ id: 'EditQuestionPage.bountyDueDateLabel' })}
                    name="bountyDueDate"
                    control={control}
                    type="date"
                    labelClassName={style.label}
                  />
                </Row>
              </Card.Body>
            </Card>
            : null
          }

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

export default injectIntl(EditQuestionPage);

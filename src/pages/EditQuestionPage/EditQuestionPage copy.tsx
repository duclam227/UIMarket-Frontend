import { ChangeEvent, FC, useEffect, useState } from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import classNames from 'classnames';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { question } from '../../app/util/interfaces';
import { FormInput, PageWithNavbar } from '../../components';
import { getErrorMessage } from '../../app/util';
import { errors as errorCodes } from '../../app/util/errors';

import './EditQuestionPage.css';
import questionAPI from '../../api/question';
import { RichTextEditor } from '../../components';
import { navbarBranches } from '../../app/util/config';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import style from './EditQuestionPage.module.css';

interface Props {
  intl: IntlShape,
}

const EditQuestionPage: FC<Props> = (props) => {
  const { intl } = props;

  const formGroupClassName = 'mb-3';
  const cardClassName = 'mb-4';
  const containerClassName = classNames(style.pageContainer, 'w-75');
  const postQuestionButtonClassName = 'mb-3';
  const topUpButtonClassName = 'mb-3';
  const topUpGroupClassName =
    'd-flex flex-column align-items-end justify-content-evenly';

  const pageTitle = (
    <FormattedMessage
      id="EditQuestionPage.pageTitle"
      defaultMessage="Edit question"
    />
  );
  const questionTitle = (
    <FormattedMessage
      id="EditQuestionPage.questionTitle"
      defaultMessage="Title"
    />
  );
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
  const questionTags = (
    <FormattedMessage
      id="EditQuestionPage.questionTags"
      defaultMessage="Tags"
    />
  );
  const questionTagsPlaceholder = intl.formatMessage({
    id: 'EditQuestionPage.questionTagsPlaceholder',
    defaultMessage: 'e.g UI, color, alignment, ...',
  });
  const addBountyLabel = (
    <FormattedMessage
      id="EditQuestionPage.addBountyLabel"
      defaultMessage="Adjust bounty"
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

  const navigate = useNavigate();
  const { id = '' } = useParams();

  const [question, setQuestion] = useState<any>({
    title: '',
    body: '',
    tags: [],
    bounty: 0,
    bountyDueDate: new Date(),
    question: '',
  });
  const [body, setBody] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [postInProgress, setPostInProgress] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  interface Question {
    title: string;
    body: string;
    tags: string;
    bounty: number;
    bountyDueDate: Date;
  }

  const schema = Joi.object({
    title: Joi.string().min(10).max(100).required().label('Title'),
    body: Joi.string().min(20).required().label('Body'),
    tags: Joi.string().allow('', null).label('Tags'),
    bounty: Joi.number().min(0).max(balance).label('Bounty amount'),
    bountyDueDate: Joi.date().min(new Date()).label('Due date'),
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
      bountyDueDate: question.bountyDueDate,
    },
  });

  const handleChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setQuestion({
      ...question,
      [input.id]: input.value,
    });
  };

  const handleBodyChange = (text: string) => {
    setBody(text);
  };

  const handleTagsChange = ({
    currentTarget: input,
  }: ChangeEvent<HTMLInputElement>) => {
    const tags = input.value.replace(/\s+/g, '').split(',');
    setQuestion({ ...question, tags });
  };

  const handleEditQuestion = async () => {
    try {
      setPostInProgress(true);
      const res: any = await questionAPI.updateQuestion({
        questionTitle: question.title,
        questionContent: body,
        questionBounty: question.bounty,
        questionTag: question.tags,
      }, id);
      navigate(`/question/${id}`, { replace: true });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setPostInProgress(false);
      setErrorMessage(errorMessage);
    }
  };

  useEffect(() => {
    questionAPI.getQuestionById(id)
      .then((res: any) => {
        const { question } = res;
        console.log(question)
        const questionFromAPI: question = {
          title: question.questionTitle,
          body: '',
          tags: [...question.questionTag],
          bounty: question.questionBounty === -1 ? 0 : question.questionBounty,
          question: '',
          bountyDueDate: question.bountyDueDate,
        }
        setQuestion(questionFromAPI);
        setBody(question.questionContent);
      })
      .catch(error => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.question[errorMsg as keyof typeof errorCodes.question];
        toast.error(intl.formatMessage({ id: `Question.${errorCode}` }));
      })
  }, [])

  console.log(question)

  return (
    <PageWithNavbar branch={navbarBranches.question}>
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
                  defaultValue={question.title}
                />
              </Form.Group>

              <Form.Group className={formGroupClassName}>
                <Form.Label htmlFor="body">
                  <h4>{questionBody}</h4>
                </Form.Label>
                <RichTextEditor
                  onChange={handleBodyChange}
                  initialValue={body}
                />
              </Form.Group>

              <Form.Group className={formGroupClassName}>
                <Form.Label>
                  <h4>{questionTags}</h4>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={questionTagsPlaceholder}
                  onChange={e => handleTagsChange(e as any)}
                  defaultValue={question.tags.join(', ')}
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
              </Col>
            </Row>

            <Row>
              <FormInput
                placeholder={addBountyInputPlaceholder}
                name="bounty"
                control={control}
                type="number"
                defaultValue={question.bounty}
              />
            </Row>

            <Row>
              <FormInput
                label={intl.formatMessage({ id: 'AskAQuestionPage.bountyDueDateLabel' })}
                name="bountyDueDate"
                control={control}
                type="date"
                labelClassName={style.label}
                defaultValue={question.bountyDueDate}
              />
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
          onClick={handleEditQuestion}
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

export default injectIntl(EditQuestionPage);

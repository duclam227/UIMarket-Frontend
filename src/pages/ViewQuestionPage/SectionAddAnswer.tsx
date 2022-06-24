import { FC, ChangeEvent, SyntheticEvent, useState, useEffect, } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { customer } from "../../app/util/interfaces";
import { getErrorMessage } from "../../app/util";
import { errors as errorCodes } from "../../app/util/errors";
import answerAPI from "../../api/answer";

import { UserAvatar } from "../../components";

import style from './ViewQuestionPage.module.css';
import { FormattedMessage, injectIntl, IntlShape } from "react-intl";
import { Link } from "react-router-dom";
interface AddAnswerProps {
  question: any;
  currentUser: customer | null;
  handleAddAnswer: Function;
  intl: IntlShape
}

const SectionAddAnswer: FC<AddAnswerProps> = (props) => {
  const { currentUser, question, intl } = props;

  const [answer, setAnswer] = useState<string>('');
  const [editor, setEditor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (currentUser === null) {
    return (
      <div className={style.addCommentWrapper}>
        <Link to='/signup'><FormattedMessage id='ViewQuestionPage.signUp' /></Link>
        <FormattedMessage id='ViewQuestionPage.connectingWordOr' />
        <Link to='/signup'><FormattedMessage id='ViewQuestionPage.logIn' /></Link>
        <FormattedMessage id='ViewQuestionPage.leaveAnswerMsg' />
      </div>
    )
  }

  const handleSubmit = () => {
    setIsLoading(true);
    answerAPI.addNewAnswer(answer, question._id)
      .then((res: any) => {
        props.handleAddAnswer(res);
        editor.setData('');
        setIsLoading(false);
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.answer[errorMsg as keyof typeof errorCodes.answer];
        toast.error(intl.formatMessage({ id: `Answer.${errorCode}` }));
        setIsLoading(false);
      })
  }

  return (
    <div className={style.addCommentWrapper}>
      <div className={style.userAvatar}>
        <UserAvatar image={currentUser.customerAvatar} />
      </div>
      <div className={style.addCommentForm}>
        <Form>
          <Form.Group>
            <CKEditor
              editor={Editor}
              name="body"
              onChange={(event: SyntheticEvent, editor: any): void => {
                setAnswer(editor.getData());
              }}
              onReady={(editor: any) => setEditor(editor)}
            ></CKEditor>
          </Form.Group>

          <Button
            className={style.addCommentButton}
            variant="primary"
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            <FormattedMessage id='ViewQuestionPage.addAnswer' />
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default injectIntl(SectionAddAnswer);
import { FC, ChangeEvent, SyntheticEvent, useState, } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { injectIntl, IntlShape } from "react-intl";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { customer } from "../../app/util/interfaces";
import { getErrorMessage } from "../../app/util";
import { errors as errorCodes } from "../../app/util/errors";
import answerAPI from "../../api/answer";

import { RichTextEditor, UserAvatar } from "../../components";

import style from './ViewQuestionPage.module.css';
interface AddCommentProps {
  question: any;
  currentUser: customer | null;
  handleAddAnswer: Function;
  intl: IntlShape;
}

const SectionAddComment: FC<AddCommentProps> = (props) => {
  const { currentUser, question, intl } = props;

  const [answer, setAnswer] = useState<string>('');
  const [editor, setEditor] = useState<any>(null);

  if (currentUser === null) {
    return (
      <div className={style.addCommentWrapper}>
        Sign up or Log in to leave your answer.
      </div>
    )
  }

  const handleSubmit = () => {
    answerAPI.addNewAnswer(answer, question._id)
      .then((res: any) => {
        props.handleAddAnswer(res);
        setAnswer('');
      })
      .catch((error) => {
        const errorMsg = getErrorMessage(error);
        const errorCode: any = errorCodes.answer[errorMsg as keyof typeof errorCodes.answer];
        toast.error(intl.formatMessage({ id: `Answer.${errorCode}` }));
      })
  }

  const handleChangeContent = (text: string) => {
    setAnswer(text);
  }

  return (
    <div className={style.addCommentWrapper}>
      <div className={style.userAvatar}>
        <UserAvatar image={currentUser.customerAvatar} />
      </div>
      <div className={style.addCommentForm}>
        <Form>
          <Form.Group>
            <RichTextEditor
              onChange={(text: string) => handleChangeContent(text)}
            />
          </Form.Group>

          <Button
            className={style.addCommentButton}
            variant="primary"
            type="button"
            onClick={handleSubmit}
          >
            Add comment
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default injectIntl(SectionAddComment);
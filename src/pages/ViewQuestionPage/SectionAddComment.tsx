import { FC, ChangeEvent, SyntheticEvent, useState, } from "react";
import { Button, Form } from "react-bootstrap";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import style from './ViewQuestionPage.module.css';
import { customer } from "../../app/util/interfaces";
import answerAPI from "../../api/answer";
import { RichTextEditor, UserAvatar } from "../../components";

interface AddCommentProps {
  question: any;
  currentUser: customer | null;
  handleAddAnswer: Function;
}

const SectionAddComment: FC<AddCommentProps> = (props) => {
  const { currentUser, question } = props;

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
        console.log(error);
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

export default SectionAddComment;
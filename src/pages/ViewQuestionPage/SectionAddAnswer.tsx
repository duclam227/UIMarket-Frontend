import { FC, ChangeEvent, SyntheticEvent, useState, } from "react";
import { Button, Form } from "react-bootstrap";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import style from './ViewQuestionPage.module.css';
import { customer } from "../../app/util/interfaces";
import answerAPI from "../../api/answer";

interface AddAnswerProps {
  question: any;
  currentUser: customer | null;
  handleAddAnswer: Function;
}

const SectionAddAnswer: FC<AddAnswerProps> = (props) => {
  const { currentUser, question } = props;

  const [answer, setAnswer] = useState<string>('');

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

  return (
    <div className={style.addCommentWrapper}>
      <div className={style.userAvatar}>avt</div>
      <div className={style.addCommentForm}>
        <Form>
          <Form.Group>
            <CKEditor
              editor={Editor}
              name="body"
              onChange={(event: SyntheticEvent, editor: any): void => {
                setAnswer(editor.getData());
              }}
            ></CKEditor>
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

export default SectionAddAnswer;
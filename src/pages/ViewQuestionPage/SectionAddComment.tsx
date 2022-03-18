import { FC, ChangeEvent, SyntheticEvent, } from "react";
import { Button, Form } from "react-bootstrap";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import style from './ViewQuestionPage.module.css';
import { customer } from "../../app/util/interfaces";

interface AddCommentProps {
  currentUser: customer | null;
}

const SectionAddComment: FC<AddCommentProps> = (props) => {
  const { currentUser } = props;

  if (currentUser === null) {
    return (
      <div className={style.addCommentWrapper}>
        Sign up or Log in to leave your answer.
      </div>
    )
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
            ></CKEditor>
          </Form.Group>

          <Button className={style.addCommentButton} variant="primary" type="button">
            Add comment
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default SectionAddComment;
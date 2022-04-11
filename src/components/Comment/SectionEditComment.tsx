import React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import RichTextEditor from "../common/RichTextEditor/RichTextEditor";

import style from './Comment.module.css';

interface Props {
  initialValue: string;
  onHide: Function;
  onSave: Function;
}

const SectionEditComment: React.FC<Props> = (props) => {
  const { initialValue } = props;
  const [content, setContent] = useState<string>(initialValue || '');

  const handleSaveAnswer = () => {
    props.onSave(content);
    props.onHide();
  }

  const handleChangeContent = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setContent(input.value);
  };

  return (
    <Form className={style.sectionEdit}>
      <Form.Group>
        <Form.Control
          type='textarea'
          onChange={(e) => handleChangeContent(e as any)}
          defaultValue={initialValue}
        />
      </Form.Group>
      <div className={style.editFooter}>
        <Button onClick={() => props.onHide()}>Cancel</Button>
        <Button onClick={handleSaveAnswer}>Save</Button>
      </div>
    </Form>
  )
}

export default SectionEditComment;
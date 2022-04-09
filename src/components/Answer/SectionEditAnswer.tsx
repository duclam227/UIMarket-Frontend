import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import RichTextEditor from "../common/RichTextEditor/RichTextEditor";

import style from './Answer.module.css';

interface Props {
  initialValue: string;
  onHide: Function;
  onSave: Function;
}

const SectionEditAnswer: React.FC<Props> = (props) => {
  const { initialValue } = props;
  const [content, setContent] = useState<string>(initialValue || '');

  const handleSaveAnswer = () => {
    props.onSave(content);
    props.onHide();
  }

  const handleChangeContent = (text: string) => {
    setContent(text);
  }

  return (
    <Form className={style.sectionEdit}>
      <RichTextEditor initialValue={initialValue} onChange={(text: string) => handleChangeContent(text)} />
      <div className={style.editFooter}>
        <Button onClick={() => props.onHide()}>Cancel</Button>
        <Button onClick={handleSaveAnswer}>Save</Button>
      </div>
    </Form>
  )
}

export default SectionEditAnswer;
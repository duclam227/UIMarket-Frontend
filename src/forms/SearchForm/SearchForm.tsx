import React, { ChangeEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IntlShape, injectIntl } from "react-intl";

import style from './SearchForm.module.css';

interface IProps {
  className?: string;
  placeholder?: string;
  initialValue?: string | null;
  handleSubmit: Function;
  intl: IntlShape;
}

const SearchForm: React.FC<IProps> = (props) => {
  const {
    className,
    placeholder,
    initialValue,
    intl,
  } = props;

  const [body, setBody] = useState<string | null>(null);

  const handleChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    setBody(input.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.handleSubmit(body);
  }

  const searchPlaceholder = intl.formatMessage({ id: 'SearchForm.searchPlaceholder' });

  return (
    <Form className={className || style.searchWrapper} onSubmit={(e: any) => handleSubmit(e)}>
      <Form.Group>
        <Form.Control
          type='text'
          placeholder={placeholder || searchPlaceholder}
          defaultValue={initialValue!}
          onChange={(e: any) => handleChange(e as any)}
        />
      </Form.Group>
      <Button type='submit'>Search</Button>
    </Form>
  )
}

export default injectIntl(SearchForm);
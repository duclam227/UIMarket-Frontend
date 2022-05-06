import React, { FC } from 'react';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
  //Q: Why do we have this weird TypeScript generics thing?
  //A: Above is a workaround, the goal is to pass MyDefinedFormFields interface from parent <Form> to this reusable input component. So at runtime it would look like this UseControllerProps<MyDefinedFormFields>

  // MyDefinedFormFields look like this {
  // 	name: string,
  // 	bio: string,
  // 	email: string,
  // 	age: number
  // }

  // UseControllerProps must take in a FieldValues types in order to work. If not it will give error <MyDefinedFormFields> | any> is not assignable to <FieldValues | any>

  label?: string;
  className?: string;
  labelClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  isValid?: boolean;
  plaintext?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'lg';
  type?: string;
}

const FormInput = <T extends FieldValues>(props: InputProps<T>) => {
  const { label, className, labelClassName, name, ...rest } = props;
  const {
    field,
    fieldState: { error },
  } = useController(props);
  return (
    <Form.Group className={className} controlId={name}>
      {label && <Form.Label className={labelClassName}>{label}</Form.Label>}
      <Form.Control isInvalid={error ? true : false} {...field} {...rest} />
      {error?.message && (
        <Alert variant="danger" className="mt-2 mb-0">
          {error.message}
        </Alert>
      )}
    </Form.Group>
  );
};

export default FormInput;

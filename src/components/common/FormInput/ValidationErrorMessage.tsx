import { FC } from 'react';
import style from './FormInput.module.css';
interface Props {
  message: any;
}
const ValidationErrorMessage: FC<Props> = props => {
  const { message } = props;
  return <div className={style.error}>{message}</div>;
};
 
export default ValidationErrorMessage;

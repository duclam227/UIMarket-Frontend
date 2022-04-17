import { FC } from 'react';
import css from './InfoCardContainer.module.css';
interface Props {
  children?: JSX.Element;
  className?: string;
  style?: Object;
}
const InfoCardContainer: FC<Props> = ({ children, className, style }) => {
  return (
    <div className={`${css.cardContainer} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default InfoCardContainer;

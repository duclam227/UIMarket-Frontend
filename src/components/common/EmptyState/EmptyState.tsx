import { FunctionComponent } from 'react';
import styles from './EmptyState.module.css';
import NotFoundIllus from '../../../app/assets/error-not-found.png';
import NothingIllus from '../../../app/assets/error-nothing.png';
import EmptyCart from '../../../app/assets/cart-empty.png';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

interface EmptyStateProps {
  img: any; //none || image name in asset folder
  messageId?: string;
  btn: boolean;
  btnMessageId?: string;
  btnDestination?: string;
}

/** EmptyState:
@img none || image name in asset folder
@messageId formatted message ID for description
@btn boolean for showing button
@btnMessageId FM ID for btn Label
@btnDestination Destination URL
*/
const EmptyState: FunctionComponent<EmptyStateProps> = props => {
  const getIllustration = (illu: any) => {
    if (illu === 'error-not-found') {
      return <img src={NotFoundIllus} className={styles.illustration} alt="" />;
    }
    if (illu === 'error-nothing') {
      return <img src={NothingIllus} className={styles.illustration} alt="" />;
    }
    if (illu === 'empty-cart') {
      return <img src={EmptyCart} className={styles.illustration} alt="" />;
    }
    return <img src={illu} className={styles.illustration} alt="" />;
  };

  const showIllustration = (illu: any) => {
    return <>{illu === 'none' ? <></> : getIllustration(illu)}</>;
  };

  return (
    <div className="d-flex flex-column align-items-center my-5">
      {showIllustration(props.img)}
      <div className="my-3"></div>
      <h5 className="text-secondary text-center">
        <FormattedMessage id={props.messageId}></FormattedMessage>
      </h5>

      {props.btn && (
        <Link to={props.btnDestination as string}>
          <Button className="my-3 text-center">
            <FormattedMessage id={props.btnMessageId}></FormattedMessage>
          </Button>
        </Link>
      )}
      {props.children}
    </div>
  );
};

export default EmptyState;

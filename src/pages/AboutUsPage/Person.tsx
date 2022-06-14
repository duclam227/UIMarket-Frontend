import { FunctionComponent } from 'react';

import styles from './AboutPage.module.css';

interface PersonProps {
  image: string;
  name: string;
  title: string;
}

const Person: FunctionComponent<PersonProps> = props => {
  return (
    <div className="d-inline-block mx-5">
      <div className={styles.imgWrapper}>
        <img src={props.image} alt="person" className={styles.img} />
      </div>
      <div className="my-4">
        <h3 className="text-primary text-center">{props.name}</h3>
        <h6 className="text-secondary text-center">{props.title}</h6>
      </div>
    </div>
  );
};

export default Person;

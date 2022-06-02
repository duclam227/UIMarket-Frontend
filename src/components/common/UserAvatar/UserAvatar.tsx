import { FC } from 'react';
import { BsPersonCircle } from 'react-icons/bs';

import style from './UserAvatar.module.css';

interface IProps {
  image: string;
}

const UserAvatar: FC<IProps> = (props) => {
  const { image } = props;

  return (
    <div className={style.wrapper}>
      {image
        ? <img src={image} className={style.avatar} />
        : <BsPersonCircle className={style.content} />
      }

    </div>
  )
};

export default UserAvatar;
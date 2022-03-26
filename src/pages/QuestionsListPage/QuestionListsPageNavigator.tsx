import classNames from 'classnames';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import { navigatorTabItem } from '../../app/util/interfaces';

import style from './QuestionListsPage.module.css';

interface Props {
  tabList: Array<navigatorTabItem>;
  active: string;
}

const QuestionListsPageNavigator: FC<Props> = (props) => {
  const { tabList, active } = props;

  const activeTabItemClassName = classNames(style.tabItem, style.active);

  return (
    <>
      <Container fluid='sm'>
        <div className={style.tabContainer}>
          {tabList.length
            ? tabList.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={active === item.label ? activeTabItemClassName : style.tabItem}
              >
                {item.label}
              </NavLink>
            ))
            : null}
        </div>
      </Container>
    </>
  );
};

export default QuestionListsPageNavigator;
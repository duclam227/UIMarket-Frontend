import { FC } from 'react';
import { Pagination } from 'react-bootstrap';

import { PaginatorProps } from '../../../app/util/interfaces';

import style from './Paginator.module.css';

const Paginator: FC<PaginatorProps> = (props) => {
  const { totalNumberOfPages, currentPage } = props;

  return (
    <div className={style.container}>
      <Pagination className={style.paginator}>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  )
}

export default Paginator;
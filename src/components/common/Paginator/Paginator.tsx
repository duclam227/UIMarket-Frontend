import { render } from '@testing-library/react';
import { FC } from 'react';
import { Pagination } from 'react-bootstrap';

import { PaginatorProps } from '../../../app/util/interfaces';

import style from './Paginator.module.css';

const SMALL_LIMIT = 5;
const BIG_LIMIT = 10;

const Paginator: FC<PaginatorProps> = (props) => {
  const { totalNumberOfPages, currentPage } = props;

  if (totalNumberOfPages <= 1) {
    return null;
  }

  const renderButtons = () => {
    if (currentPage < SMALL_LIMIT) {
      if (totalNumberOfPages > BIG_LIMIT) {
        //render 1 -> 10
        const pagingButtons = [];
        for (let i = 1; i <= 10; i++) {
          pagingButtons.push(
            <Pagination.Item
              key={i}
              active={currentPage === i ? true : false}
              onClick={(number) => goToPage(i)}
            >{i}</Pagination.Item>
          )
        }
        return pagingButtons;
      } else {
        //render 1 -> total
        const pagingButtons = [];
        for (let i = 1; i <= totalNumberOfPages; i++) {
          pagingButtons.push(
            <Pagination.Item
              key={i}
              active={currentPage === i ? true : false}
              onClick={(number) => goToPage(i)}
            >{i}</Pagination.Item>
          )
        }
        return pagingButtons;
      }
    } else {
      if (totalNumberOfPages > BIG_LIMIT) {
        //render 1 -> 10
        const calculatedFirstNumber = currentPage - SMALL_LIMIT;
        const calculatedLastNumber = currentPage + SMALL_LIMIT - 1;
        const firstNumber = calculatedFirstNumber >= 1 ? calculatedFirstNumber : 1;
        const lastNumber = calculatedLastNumber <= totalNumberOfPages ? calculatedLastNumber : totalNumberOfPages;

        const finalFirstNumber = lastNumber == totalNumberOfPages ? totalNumberOfPages - 9 : firstNumber;
        const finalLastNumber = firstNumber === 1 ? 10 : lastNumber;

        const pagingButtons = [];
        for (let i = finalFirstNumber; i <= finalLastNumber; i++) {
          pagingButtons.push(
            <Pagination.Item
              key={i}
              active={currentPage === i ? true : false}
              onClick={() => goToPage(i)}
            >{i}</Pagination.Item>
          )
        }
        return pagingButtons;
      } else {
        //render 1 -> total
        const pagingButtons = [];
        for (let i = 1; i <= totalNumberOfPages; i++) {
          pagingButtons.push(
            <Pagination.Item
              key={i}
              active={currentPage === i ? true : false}
              onClick={(number) => goToPage(i)}
            >{i}</Pagination.Item>
          )
        }
        return pagingButtons;
      }
    }
  }

  const goToPage = (pageNumber: number) => {
    if (pageNumber === currentPage) {
      return;
    }

    props.handleClickGoToPage(pageNumber);
  }

  const nextPage = () => {
    if (currentPage === totalNumberOfPages) {
      return;
    }

    props.handleClickGoToPage(currentPage + 1);
  }

  const previousPage = () => {
    if (currentPage === 1) {
      return;
    }

    props.handleClickGoToPage(currentPage - 1);
  }

  const firstpage = () => {
    props.handleClickGoToPage(1);
  }

  return (
    <div className={style.container}>
      <Pagination className={style.paginator}>
        {currentPage === 1
          ? null
          : <>
            <Pagination.First onClick={() => props.handleClickGoToPage(1)} />
            <Pagination.Prev onClick={previousPage} />
          </>}

        {renderButtons()}

        {currentPage === totalNumberOfPages
          ? null
          : <>
            <Pagination.Next onClick={nextPage} />
            <Pagination.Last onClick={() => props.handleClickGoToPage(totalNumberOfPages)} />
          </>}
      </Pagination>
    </div>
  )
}

export default Paginator;
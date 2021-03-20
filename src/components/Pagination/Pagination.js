import { useEffect, useState } from 'react';

import ChevronIcon from '../Icons/Chevron';
import ChevronDoubleIcon from '../Icons/ChevronDouble';

import clsx from 'clsx';
import s from './Pagination.module.css';

export default function Pagination(props) {
  const { className, totalPages, currentPage, pagesToShow, onSetPage } = props;

  const [pageArray, setPageArray] = useState([]);

  useEffect(() => {
    const pageArr = calculatePageArray(totalPages, currentPage, pagesToShow) || [1];
    setPageArray(pageArr);

    //eslint-disable-next-line
  }, [currentPage]);

  const calculatePageArray = () => {
    let startPage;
    let endPage;

    if (totalPages <= pagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      // total pages more than max so calculate start and end pages
      let maxPagesBeforeCurrentPage = Math.floor(pagesToShow / 2);
      let maxPagesAfterCurrentPage = Math.ceil(pagesToShow / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = pagesToShow;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        // current page near the end
        startPage = totalPages - pagesToShow + 1;
        endPage = totalPages;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    // create an array of pages from startPage and endPage
    const pages = Array(endPage - startPage + 1)
      .fill()
      .map((_, idx) => startPage + idx);

    return pages;
  };

  // check if buttons should be disabled
  const checkDisabled = (type) => {
    let isDisabled = false;

    if ((type === 'first' || type === 'previous') && currentPage === 1) {
      isDisabled = true;
    } else if ((type === 'last' || type === 'next') && currentPage >= totalPages) {
      isDisabled = true;
    }

    return isDisabled;
  };

  // calculate next or previous page
  const goToPage = (type) => {
    let calculatedPage = 1;

    if (type === 'previous') {
      calculatedPage = currentPage > 1 ? currentPage - 1 : 1;
    } else if (type === 'next') {
      calculatedPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    }

    onSetPage(calculatedPage);
  };

  return (
    <div className={clsx(s.Pagination, className)}>
      <button
        className={s.Button}
        disabled={checkDisabled('first')}
        onClick={() => goToPage('first')}
      >
        <ChevronDoubleIcon className={s.ChevronIcon} />
      </button>

      <button
        className={s.Button}
        disabled={checkDisabled('previous')}
        onClick={() => goToPage('previous')}
      >
        <ChevronIcon className={s.ChevronIcon} />
      </button>

      {pageArray.map((page) => (
        <button
          key={`page-${page}`}
          className={clsx(s.Button, currentPage === page ? s.ActiveButton : '')}
          onClick={() => onSetPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={clsx(s.Button, s.ChevronRight)}
        onClick={() => goToPage('next')}
        disabled={checkDisabled('next')}
      >
        <ChevronIcon className={s.ChevronIcon} />
      </button>

      <button
        className={clsx(s.Button, s.ChevronRight)}
        onClick={() => goToPage('last')}
        disabled={checkDisabled('last')}
      >
        <ChevronDoubleIcon className={s.ChevronIcon} />
      </button>
    </div>
  );
}

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';

const paginationButtonClass = `
  border-none rounded-[var(--border-radius-sm)]
  font-medium text-[14px]
  flex items-center justify-center gap-[4px]
  px-[12px] py-[6px]
  transition-all duration-300
  bg-grey-50
  enabled:hover:bg-brand-600 enabled:hover:text-brand-50
  [&_svg]:h-[18px] [&_svg]:w-[18px]
  [&:has(span:last-child)]:pl-[4px]
  [&:has(span:first-child)]:pr-[4px]
  disabled:cursor-not-allowed
`;

function Pagination({ resultCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(resultCount / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? 1 : currentPage - 1;
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-[14px] ml-[8px] [&_span]:font-semibold">
        Showing
        <span> {(currentPage - 1) * PAGE_SIZE + 1} </span>
        to{' '}
        <span>
          {currentPage === pageCount
            ? resultCount
            : currentPage * PAGE_SIZE}{' '}
        </span>
        out of
        <span> {resultCount} </span>
        results
      </p>

      <div className="flex gap-[6px]">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={paginationButtonClass}
        >
          <HiChevronLeft /> <span>Previous</span>
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={paginationButtonClass}
        >
          <span>Next</span> <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;

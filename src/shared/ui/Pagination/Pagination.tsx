import Icon from "../Icon";
import Button from "../Button";
import ArrowLeft from "@/shared/assets/icons/arrow-left.svg?react";
import ArrowRight from "@/shared/assets/icons/arrow-right.svg?react";
import type { TPaginationProps } from "./types";

import "./Pagination.scss";

const Pagination = (props: TPaginationProps) => {
  const { page, pageSize, total, totalPages, onPageChange } = props;

  if (total === 0 || totalPages <= 1) {
    return null;
  }

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <nav className="pagination" aria-label="Пагинация">
      <Button
        title="Предыдущая страница"
        disabled={isFirstPage}
        aria-label="Предыдущая страница"
        onClick={() => onPageChange(page - 1)}
      >
        <Icon icon={ArrowLeft} />
      </Button>

      <span>
        {from} - {to} из {total}
      </span>

      <Button
        title="Следующая страница"
        disabled={isLastPage}
        aria-label="Следующая страница"
        onClick={() => onPageChange(page + 1)}
      >
        <Icon icon={ArrowRight} />
      </Button>
    </nav>
  );
};

export default Pagination;

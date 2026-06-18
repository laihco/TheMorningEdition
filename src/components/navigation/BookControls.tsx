import { ChevronLeft, ChevronRight } from "lucide-react";

type BookControlsProps = {
  currentPage: number;
  pageCount: number;
  label: string;
  isFlipping: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function BookControls({
  currentPage,
  pageCount,
  label,
  isFlipping,
  onPrev,
  onNext,
}: BookControlsProps) {
  const isFirst = currentPage === 0;
  const isLast = currentPage === pageCount - 1;

  return (
    <nav className="book-nav" aria-label="Zine navigation">
      <button
        className="book-nav__button"
        type="button"
        aria-label="Previous page"
        disabled={isFirst || isFlipping}
        onClick={onPrev}
      >
        <ChevronLeft size={22} strokeWidth={1.8} aria-hidden="true" />
      </button>
      <div className="book-nav__meta" aria-live="polite">
        {currentPage + 1}/{pageCount} / {label}
      </div>
      <button
        className="book-nav__button book-nav__button--next"
        type="button"
        aria-label="Next page"
        disabled={isLast || isFlipping}
        onClick={onNext}
      >
        <ChevronRight size={22} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </nav>
  );
}

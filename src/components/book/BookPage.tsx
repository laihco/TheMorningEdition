import { forwardRef, type ReactNode } from "react";

type BookPageProps = {
  children: ReactNode;
  density?: "light" | "dark";
  number: number;
  testId?: string;
};

export const BookPage = forwardRef<HTMLDivElement, BookPageProps>(
  ({ children, density = "light", number, testId }, ref) => {
    return (
      <section
        className="zine-page"
        data-density={density}
        data-testid={testId}
        ref={ref}
      >
        <div className="page-inner">
          {children}
          <span className="book-page-number">Page {number}</span>
        </div>
      </section>
    );
  }
);

BookPage.displayName = "BookPage";

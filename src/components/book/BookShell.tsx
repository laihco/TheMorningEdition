import {
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import HTMLFlipBook from "react-pageflip";

import { bookPages, projectPageIndex } from "../../data/book";
import { projects } from "../../data/projects";
import { ComicsPage } from "../../pages/ComicsPage";
import { ContactPage } from "../../pages/ContactPage";
import { CoverPage } from "../../pages/CoverPage";
import { ProjectGridPage } from "../../pages/ProjectGridPage";
import { ProjectPage } from "../../pages/ProjectPage";
import { BookControls } from "../navigation/BookControls";
import { BookPage } from "./BookPage";

type FlipCorner = "top" | "bottom";

type FlipController = {
  flipNext: (corner?: FlipCorner) => void;
  flipPrev: (corner?: FlipCorner) => void;
  turnToPage: (page: number) => void;
  getCurrentPageIndex: () => number;
  getOrientation: () => "portrait" | "landscape";
};

type FlipBookHandle = {
  pageFlip: () => FlipController;
};

export function BookShell() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const bookRef = useRef<FlipBookHandle | null>(null);
  const fallbackTimer = useRef<number | null>(null);

  const projectBySlug = useMemo(
    () => new Map(projects.map((project) => [project.slug, project])),
    []
  );

  const pageCount = bookPages.length;
  const currentLabel = bookPages[currentPage]?.label ?? "Page";

  const pageFlip = useCallback(() => bookRef.current?.pageFlip(), []);

  const clearNavigationFallback = useCallback(() => {
    if (fallbackTimer.current) {
      window.clearTimeout(fallbackTimer.current);
      fallbackTimer.current = null;
    }
  }, []);

  const syncCurrentPage = useCallback((controller: FlipController) => {
    const page = controller.getCurrentPageIndex();

    if (Number.isInteger(page)) {
      setCurrentPage(page);
    }
  }, []);

  const getAdjacentPage = useCallback((
    page: number,
    direction: "next" | "prev",
    orientation: "portrait" | "landscape"
  ) => {
    if (orientation === "portrait") {
      return direction === "next"
        ? Math.min(page + 1, pageCount - 1)
        : Math.max(page - 1, 0);
    }

    if (direction === "next") {
      return page === 0 ? 1 : Math.min(page + 2, pageCount - 1);
    }

    return page <= 1 ? 0 : Math.max(page - 2, 0);
  }, [pageCount]);

  const scheduleNavigationFallback = useCallback((
    controller: FlipController,
    startPage: number,
    direction: "next" | "prev"
  ) => {
    clearNavigationFallback();
    fallbackTimer.current = window.setTimeout(() => {
      if (controller.getCurrentPageIndex() === startPage) {
        controller.turnToPage(
          getAdjacentPage(startPage, direction, controller.getOrientation())
        );
        syncCurrentPage(controller);
      }

      setIsFlipping(false);
      fallbackTimer.current = null;
    }, 1100);
  }, [clearNavigationFallback, getAdjacentPage, syncCurrentPage]);

  const turnToPage = useCallback((page: number) => {
    if (page < 0 || page >= pageCount) {
      return;
    }

    const controller = pageFlip();

    if (!controller) {
      return;
    }

    clearNavigationFallback();
    setIsFlipping(false);
    controller.turnToPage(page);
    syncCurrentPage(controller);
  }, [clearNavigationFallback, pageCount, pageFlip, syncCurrentPage]);

  const flipNext = useCallback(() => {
    const controller = pageFlip();
    const startPage = controller?.getCurrentPageIndex() ?? currentPage;

    if (!controller || isFlipping || startPage >= pageCount - 1) {
      return;
    }

    setCurrentPage(startPage);
    setIsFlipping(true);
    controller.flipNext("bottom");
    scheduleNavigationFallback(controller, startPage, "next");
  }, [currentPage, isFlipping, pageCount, pageFlip, scheduleNavigationFallback]);

  const flipPrev = useCallback(() => {
    const controller = pageFlip();
    const startPage = controller?.getCurrentPageIndex() ?? currentPage;

    if (!controller || isFlipping || startPage <= 0) {
      return;
    }

    setCurrentPage(startPage);
    setIsFlipping(true);
    controller.flipPrev("bottom");
    scheduleNavigationFallback(controller, startPage, "prev");
  }, [currentPage, isFlipping, pageFlip, scheduleNavigationFallback]);

  const goToProject = useCallback((slug: string) => {
    const targetPage = projectPageIndex.get(slug);

    if (typeof targetPage === "number") {
      turnToPage(targetPage);
    }
  }, [turnToPage]);

  const openFeaturedSpread = useCallback(() => {
    turnToPage(1);
  }, [turnToPage]);

  const findProjectSlugForClick = useCallback(
    (target: EventTarget | null, clientX: number, clientY: number) => {
      const directButton =
        target instanceof HTMLElement
          ? target.closest<HTMLElement>("[data-project-slug]")
          : null;

      if (directButton?.dataset.projectSlug) {
        return directButton.dataset.projectSlug;
      }

      const topmostButton = document
        .elementsFromPoint(clientX, clientY)
        .map((element) =>
          element instanceof HTMLElement
            ? element.closest<HTMLElement>("[data-project-slug]")
            : null
        )
        .find((button): button is HTMLElement => Boolean(button));

      if (topmostButton?.dataset.projectSlug) {
        return topmostButton.dataset.projectSlug;
      }

      const containingButtons = Array.from(
        document.querySelectorAll<HTMLElement>("[data-project-slug]")
      ).filter((button) => {
        const rect = button.getBoundingClientRect();
        const styles = window.getComputedStyle(button);

        return (
          rect.width > 0 &&
          rect.height > 0 &&
          styles.visibility !== "hidden" &&
          styles.display !== "none" &&
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        );
      });

      containingButtons.sort((first, second) => {
        const firstRect = first.getBoundingClientRect();
        const secondRect = second.getBoundingClientRect();

        return (
          firstRect.width * firstRect.height -
          secondRect.width * secondRect.height
        );
      });

      return containingButtons[0]?.dataset.projectSlug;
    },
    []
  );

  useEffect(() => {
    const handleDocumentProjectEvent = (event: globalThis.MouseEvent) => {
      const stage = document.querySelector(".book-stage");

      if (!(event.target instanceof Node) || !stage?.contains(event.target)) {
        return;
      }

      if (currentPage === 0) {
        return;
      }

      const slug = findProjectSlugForClick(
        event.target,
        event.clientX,
        event.clientY
      );

      if (!slug) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      goToProject(slug);
    };

    document.addEventListener("click", handleDocumentProjectEvent, true);

    return () => {
      document.removeEventListener("click", handleDocumentProjectEvent, true);
    };
  }, [currentPage, findProjectSlugForClick, goToProject]);

  useEffect(() => clearNavigationFallback, [clearNavigationFallback]);

  const handleBookClickCapture = (event: MouseEvent<HTMLElement>) => {
    if (currentPage === 0) {
      return;
    }

    const slug = findProjectSlugForClick(
      event.target,
      event.clientX,
      event.clientY
    );

    if (!slug) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    goToProject(slug);
  };

  const renderPage = (page: (typeof bookPages)[number], index: number) => {
    if (page.kind === "cover") {
      return (
        <BookPage key={page.id} number={index + 1} testId="cover-page">
          <CoverPage />
        </BookPage>
      );
    }

    if (page.kind === "project-grid") {
      return (
        <BookPage key={page.id} number={index + 1} testId={page.id}>
          <ProjectGridPage side={page.side} onOpenProject={goToProject} />
        </BookPage>
      );
    }

    if (page.kind === "project") {
      const project = projectBySlug.get(page.projectSlug);

      if (!project) {
        return null;
      }

      return (
        <BookPage
          key={page.id}
          number={index + 1}
          testId={`project-page-${project.slug}`}
        >
          <ProjectPage project={project} onReturnHome={() => turnToPage(0)} />
        </BookPage>
      );
    }

    if (page.kind === "contact") {
      return (
        <BookPage key={page.id} number={index + 1} testId="contact-page">
          <ContactPage />
        </BookPage>
      );
    }

    return (
      <BookPage key={page.id} number={index + 1} testId="comics-page">
        <ComicsPage />
      </BookPage>
    );
  };

  return (
    <main className="app-shell">
      <BookControls
        currentPage={currentPage}
        pageCount={pageCount}
        label={currentLabel}
        isFlipping={isFlipping}
        onPrev={flipPrev}
        onNext={flipNext}
      />
      <section
        className="book-stage"
        aria-label="Ananya Setty digital zine"
        onClickCapture={handleBookClickCapture}
      >
        <HTMLFlipBook
          ref={bookRef}
          className="flip-book"
          style={{}}
          width={560}
          height={760}
          size="stretch"
          minWidth={300}
          maxWidth={560}
          minHeight={420}
          maxHeight={760}
          drawShadow
          flippingTime={900}
          usePortrait
          startPage={0}
          startZIndex={0}
          autoSize
          maxShadowOpacity={0.48}
          showCover
          mobileScrollSupport
          clickEventForward
          useMouseEvents
          swipeDistance={24}
          showPageCorners
          disableFlipByClick
          onFlip={(event) => {
            clearNavigationFallback();
            setCurrentPage(event.data);
            setIsFlipping(false);
          }}
          onChangeState={(event) => {
            setIsFlipping(event.data !== "read");
          }}
        >
          {bookPages.map(renderPage)}
        </HTMLFlipBook>
        {currentPage === 0 ? (
          <button
            aria-label="Open featured work spread"
            className="cover-click-guard"
            data-testid="cover-click-guard"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              openFeaturedSpread();
            }}
            onPointerDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onPointerUp={(event) => {
              event.preventDefault();
              event.stopPropagation();
              openFeaturedSpread();
            }}
          />
        ) : null}
      </section>
    </main>
  );
}

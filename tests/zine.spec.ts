import { expect, test, type Page } from "@playwright/test";

const waitForFlip = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1050);
  });
};

const isMobileViewport = (page: Page) => (page.viewportSize()?.width ?? 0) < 700;

test("cover page renders bio and CTA without the project grid", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Ananya Setty/i })).toBeVisible();
  await expect(
    page.getByText(/Hello! I’m Ananya, a Computer Science: Game Design student/i)
  ).toBeVisible();
  await expect(
    page.getByText(/Flip through my newspaper to see my work!/i)
  ).toBeVisible();
  await expect(page.getByTestId("cover-page").getByText(/Endless Runner/i)).toHaveCount(0);
  await expect(page.getByText(/1\/14 \/ Cover/i)).toBeVisible();
});

test("cover clicks only open the featured work spread", async ({ page }) => {
  await page.goto("/");

  const guard = page.getByTestId("cover-click-guard");
  await expect(guard).toBeVisible();

  const bottomBox = await guard.boundingBox();
  expect(bottomBox).not.toBeNull();

  if (bottomBox) {
    await page.mouse.move(bottomBox.x + bottomBox.width - 24, bottomBox.y + bottomBox.height - 24);
    await page.mouse.down();
    await page.mouse.up();
  }

  await expect(page.getByText(/2\/14 \/ Featured Work/i)).toBeVisible();
  await expect(page.getByText(/14\/14 \/ Comics & Games/i)).toHaveCount(0);
  await expect(
    page.getByTestId("project-page-endless-runner").getByRole("heading", {
      name: /Endless Runner/i,
    })
  ).not.toBeVisible();

  await page.goto("/");
  await expect(guard).toBeVisible();

  const topBox = await guard.boundingBox();
  expect(topBox).not.toBeNull();

  if (topBox) {
    await guard.click({ position: { x: topBox.width - 24, y: 24 } });
  }

  await expect(page.getByText(/2\/14 \/ Featured Work/i)).toBeVisible();
  await expect(
    page.getByTestId("project-page-golf-quest-mini").getByRole("heading", {
      name: /Golf Quest Mini/i,
    })
  ).not.toBeVisible();
});

test("top corner navigation follows the physical spread sequence", async ({
  page,
}) => {
  await page.goto("/");

  const expectedForwardLabels = isMobileViewport(page)
    ? [
        /2\/14 \/ Featured Work/i,
        /3\/14 \/ Featured Work/i,
        /4\/14 \/ Seymour AR Game/i,
        /5\/14 \/ Endless Runner/i,
        /6\/14 \/ Cinematic Walkthrough/i,
        /7\/14 \/ Belka in Space/i,
        /8\/14 \/ Golf Quest Mini/i,
        /9\/14 \/ SlugFest!/i,
        /10\/14 \/ Starcraft 2 Mod/i,
        /11\/14 \/ GMTK Game Jam 2025: Loops/i,
        /12\/14 \/ Design and Art/i,
        /13\/14 \/ Classifieds/i,
        /14\/14 \/ Comics & Games/i,
      ]
    : [
        /2\/14 \/ Featured Work/i,
        /4\/14 \/ Seymour AR Game/i,
        /6\/14 \/ Cinematic Walkthrough/i,
        /8\/14 \/ Golf Quest Mini/i,
        /10\/14 \/ Starcraft 2 Mod/i,
        /12\/14 \/ Design and Art/i,
        /14\/14 \/ Comics & Games/i,
      ];

  await page.getByRole("button", { name: "Next page" }).click();
  await waitForFlip();
  await expect(page.getByTestId("project-grid-left")).toBeVisible({
    timeout: 3000,
  });
  await expect(page.getByRole("button", { name: /Seymour AR Game/i })).toBeVisible();
  await expect(page.getByText(expectedForwardLabels[0])).toBeVisible();

  if (!isMobileViewport(page)) {
    await expect(page.getByTestId("project-grid-right")).toBeVisible({
      timeout: 3000,
    });
    await expect(page.getByRole("button", { name: /Golf Quest Mini/i })).toBeVisible();
  }

  for (const label of expectedForwardLabels.slice(1)) {
    await page.getByRole("button", { name: "Next page" }).click();
    await waitForFlip();
    await expect(page.getByText(label)).toBeVisible();
  }

  await expect(page.getByRole("button", { name: "Next page" })).toBeDisabled();

  await page.getByRole("button", { name: "Previous page" }).click();
  await waitForFlip();
  await expect(
    page.getByText(
      isMobileViewport(page)
        ? /13\/14 \/ Classifieds/i
        : /12\/14 \/ Design and Art/i
    )
  ).toBeVisible();
});

test("project grid clicks open the selected project spread", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Next page" }).click();
  await waitForFlip();
  if (isMobileViewport(page)) {
    await page.getByRole("button", { name: "Next page" }).click();
    await waitForFlip();
  }
  await page.getByRole("button", { name: /Golf Quest Mini/i }).click();

  await expect(
    page
      .getByTestId("project-page-golf-quest-mini")
      .getByRole("heading", { name: /Golf Quest Mini/i })
  ).toBeVisible({ timeout: 3000 });
  await expect(page.getByText(/8\/14 \/ Golf Quest Mini/i)).toBeVisible();
});

test("left project grid click flips directly to Endless Runner", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Next page" }).click();
  await waitForFlip();
  await page.getByRole("button", { name: /Endless Runner/i }).click();

  await expect(
    page
      .getByTestId("project-page-endless-runner")
      .getByRole("heading", { name: /Endless Runner/i })
  ).toBeVisible({ timeout: 3000 });
  await expect(
    page.getByText(
      isMobileViewport(page)
        ? /5\/14 \/ Endless Runner/i
        : /4\/14 \/ Seymour AR Game/i
    )
  ).toBeVisible();
});

test("front page button visually resets the book to the cover", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Next page" }).click();
  await waitForFlip();
  await page.getByRole("button", { name: /Endless Runner/i }).click();

  await expect(
    page
      .getByTestId("project-page-endless-runner")
      .getByRole("heading", { name: /Endless Runner/i })
  ).toBeVisible({ timeout: 3000 });

  await page.getByRole("button", { name: /Front Page/i }).last().click();

  await expect(page.getByText(/1\/14 \/ Cover/i)).toBeVisible();
  await expect(
    page.getByTestId("cover-page").getByRole("heading", { name: /Ananya Setty/i })
  ).toBeVisible();
  await expect(
    page
      .getByTestId("project-page-endless-runner")
      .getByRole("heading", { name: /Endless Runner/i })
  ).not.toBeVisible();
});

test("rippable poster tears off a contact tab", async ({ page }) => {
  await page.goto("/");

  const contactHeading = page.getByRole("heading", { name: /Contact Me/i });

  for (let index = 0; index < 14; index += 1) {
    if (await contactHeading.isVisible()) {
      break;
    }

    const nextButton = page.getByRole("button", { name: "Next page" });
    await expect(nextButton).toBeEnabled();
    await nextButton.click();
    await page.waitForTimeout(1050);
  }

  await expect(contactHeading).toBeVisible();

  const resumeTab = page.getByRole("link", { name: /Resume/i }).last();
  await resumeTab.click();
  await expect(resumeTab).toHaveClass(/poster-tab--torn/);
});

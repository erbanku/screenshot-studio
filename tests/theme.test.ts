import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("root layout defaults to light theme via ThemeProvider", async () => {
  const layout = await readFile(
    new URL("../app/layout.tsx", import.meta.url),
    "utf8",
  );
  const provider = await readFile(
    new URL("../components/theme-provider.tsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(layout, /className="dark"/);
  assert.match(layout, /suppressHydrationWarning/);
  assert.match(layout, /ThemeProvider/);
  assert.match(provider, /defaultTheme="light"/);
  assert.match(provider, /storageKey=\{THEME_STORAGE_KEY\}/);
});

test("theme toggle is visible in editor chrome and marketing nav", async () => {
  const header = await readFile(
    new URL("../components/editor/EditorHeader.tsx", import.meta.url),
    "utf8",
  );
  const nav = await readFile(
    new URL("../components/landing/Navigation.tsx", import.meta.url),
    "utf8",
  );

  assert.match(header, /ThemeToggle/);
  assert.match(nav, /ThemeToggle/);
});

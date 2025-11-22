// src/lib/highlightCss.ts
import { githubDarkTheme } from "./highlight-themes/github-dark";
import { githubLightTheme } from "./highlight-themes/github-light";

/**
 * Load a Highlight.js CSS theme
 * Uses bundled themes to avoid node_modules path resolution issues
 */
export async function loadHljsCss(theme = "github"): Promise<string> {
  // Use bundled themes - guaranteed to work regardless of node_modules setup
  const bundledThemes: Record<string, string> = {
    "github": githubLightTheme,
    "github-dark": githubDarkTheme,
    "github-light": githubLightTheme,
  };

  if (bundledThemes[theme]) {
    console.log(`✓ Using bundled highlight.js theme: ${theme}`);
    return bundledThemes[theme];
  }

  // If theme not found, default to github-dark
  console.warn(`Theme "${theme}" not found, falling back to github-dark`);
  return githubDarkTheme;
}

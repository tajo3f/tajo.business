export function ThemeScript() {
  const script = `
    try {
      const stored = localStorage.getItem("tajo-theme");
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.dataset.theme =
        stored || (systemDark ? "dark" : "light");
    } catch {}
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

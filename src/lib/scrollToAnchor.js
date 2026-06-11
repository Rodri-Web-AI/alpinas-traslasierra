/**
 * Desplaza suavemente hacia una sección por su id (#ancla).
 */
export function scrollToAnchor(href) {
  const id = href.replace(/^#/, "");
  if (!id) return false;

  const target = document.getElementById(id);
  if (!target) return false;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", `#${id}`);
  return true;
}

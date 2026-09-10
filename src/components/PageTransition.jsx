// Transformed route wrappers trap fixed overlays and make them scroll with the page.
export default function PageTransition({ children }) {
  return <div className="w-full min-h-screen">{children}</div>;
}

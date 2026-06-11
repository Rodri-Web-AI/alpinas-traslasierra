export default function IconBox({ children }) {
  return (
    <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/5">
      {children}
    </span>
  );
}

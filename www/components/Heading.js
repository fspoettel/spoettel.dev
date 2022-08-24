export function Heading({ children }) {
  return (
    <h2 className="heading">
      {children}
      <style jsx scoped>{`
        .heading {
          font-size: 2.75rem;
        }
      `}</style>
    </h2>
  );
}

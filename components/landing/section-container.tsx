interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionContainer({
  children,
  className = "",
  id,
}: SectionContainerProps) {
  return (
    <section className={`w-full px-4 sm:px-6 lg:px-8 ${className}`} id={id}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

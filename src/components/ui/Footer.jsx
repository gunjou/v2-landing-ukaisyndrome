import Container from "./Container";

// columns: [{ title, links: [{ label, href }] }]
export default function Footer({ brand = "Syndrome UKAI", description, columns, copyright }) {
  return (
    <footer className="tone-brand-dark">
      <Container className="grid gap-12 py-16 md:grid-cols-[2fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <p className="text-lg font-bold tracking-tight text-fg">{brand}</p>
          {description && <p className="mt-4 text-sm leading-relaxed text-fg-muted">{description}</p>}
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-fg">{col.title}</p>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-fg-muted transition-colors hover:text-highlight">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      {copyright && (
        <Container className="border-t border-line py-6 text-xs text-fg-subtle">{copyright}</Container>
      )}
    </footer>
  );
}

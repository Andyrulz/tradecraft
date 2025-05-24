import Link from 'next/link';

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap text-sm text-muted-foreground gap-1">
        {items.map((item, idx) => (
          <li key={item.label} className="flex items-center">
            {item.href ? (
              <Link href={item.href} className="hover:underline text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-foreground">{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

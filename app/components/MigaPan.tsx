import Link from "next/link";

export default function MigaPan({ actual }: { actual: string }) {
  return (
    <nav className="miga-pan" aria-label="Miga de pan">
      <Link href="/">Inicio</Link>
      <span className="miga-pan__separador">/</span>
      <span className="miga-pan__actual" aria-current="page">
        {actual}
      </span>
    </nav>
  );
}

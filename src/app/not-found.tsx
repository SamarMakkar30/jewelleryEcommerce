import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-ivory min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-display text-neutral-900 mb-4">404</h1>
        <p className="text-body text-neutral-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

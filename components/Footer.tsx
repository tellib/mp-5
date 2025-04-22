import Link from "next/link";

export default function Footer() {
  return (
    <div className="border-t border-inset border-white/40 from-white/40 to-white/30 bg-gradient-to-b p-2 text-center">
      <Link href={"https://github.com/tellib"} className="text-sm">
        <span className="opacity-50">https://github.com/tellib</span>
      </Link>
    </div>
  );
}

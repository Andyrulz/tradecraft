import Link from 'next/link';
import { BarChart2 } from 'lucide-react';

export function Footer() {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="bg-white border-t border-gray-200 py-8 px-4">
			<div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
				<div className="flex items-center space-x-2 mb-2 md:mb-0">
					<BarChart2 className="h-6 w-6 text-blue-600" />
					<span className="font-bold text-lg text-gray-900">TradeCraft</span>
				</div>
				<nav className="flex flex-wrap gap-4 text-sm text-gray-500">
					<Link
						href="/about"
						className="hover:text-blue-600 transition"
					>
						About
					</Link>
					<Link
						href="/faq"
						className="hover:text-blue-600 transition"
					>
						FAQ
					</Link>
					<Link
						href="/contact"
						className="hover:text-blue-600 transition"
					>
						Contact
					</Link>
					<Link
						href="/privacy-policy"
						className="hover:text-blue-600 transition"
					>
						Privacy
					</Link>
					<Link
						href="/terms-of-service"
						className="hover:text-blue-600 transition"
					>
						Terms
					</Link>
					<Link
						href="/disclaimer"
						className="hover:text-blue-600 transition"
					>
						Disclaimer
					</Link>
				</nav>
				<span className="text-xs text-gray-400">
					© {currentYear} TradeCraft
				</span>
			</div>
		</footer>
	);
}
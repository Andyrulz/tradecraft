'use client';

import Link from 'next/link';
import { BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export function Header({ setOverlayOpen }: { setOverlayOpen?: (open: boolean) => void }) {
	const { data: session, status } = useSession();
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	useEffect(() => {
		if (setOverlayOpen) setOverlayOpen(!!mobileNavOpen);
	}, [mobileNavOpen, setOverlayOpen]);

	return (
		<header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
			<div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
				<div className="flex items-center" style={{ minWidth: '16rem' }}>
					<Link href="/" className="flex items-center gap-2 group ml-2 md:ml-8">
						<BarChart2 className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
						<span className="font-extrabold text-xl text-primary tracking-tight">TradeCraft</span>
					</Link>
				</div>
				{/* Desktop nav */}
				<nav className="hidden md:flex items-center space-x-8">
					<Link href="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">Home</Link>
					<Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors font-medium">Features</Link>
					<Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors font-medium">Pricing</Link>
					<Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">About Me</Link>
					<Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">Contact</Link>
				</nav>
				{/* Mobile nav hamburger */}
				<button
					className="md:hidden p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
					aria-label="Open navigation menu"
					onClick={() => setMobileNavOpen(true)}
					style={{ minWidth: 44, minHeight: 44, touchAction: 'manipulation' }}
				>
					<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
				</button>
				{/* Auth UI */}
				<div className="flex items-center space-x-3">
					{status === 'loading' ? null : session ? (
						<>
							<span className="hidden md:inline text-sm text-muted-foreground">{session.user?.name}</span>
							<Button size="sm" variant="outline" onClick={() => signOut()}>Sign out</Button>
						</>
					) : (
						<>
							<Link href="/auth/signin">
								<Button size="sm" variant="ghost">Sign in</Button>
							</Link>
							<Link href="/auth/signin?mode=signup">
								<Button size="sm" variant="default">Sign up</Button>
							</Link>
						</>
					)}
				</div>
			</div>
			{/* Mobile nav Drawer */}
			{mobileNavOpen && (
				<div className="fixed inset-0 z-50 bg-black/40" onClick={() => setMobileNavOpen(false)} />
			)}
			<div
				className={`fixed top-0 right-0 h-full w-4/5 max-w-xs bg-background z-[60] shadow-lg transition-transform duration-300 ${mobileNavOpen ? 'translate-x-0' : 'translate-x-full'}`}
				style={{ willChange: 'transform' }}
			>
				<div className="flex justify-end p-4">
					<button
						aria-label="Close navigation menu"
						className="rounded-full p-3 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
						onClick={() => setMobileNavOpen(false)}
						style={{ minWidth: 44, minHeight: 44, touchAction: 'manipulation' }}
					>
						<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
					</button>
				</div>
				<nav className="flex flex-col gap-2 px-6 py-4">
					<Link href="/" className="py-3 text-lg text-primary hover:text-primary/80 font-semibold" onClick={() => setMobileNavOpen(false)}>Home</Link>
					<Link href="/#features" className="py-3 text-lg text-primary hover:text-primary/80 font-semibold" onClick={() => setMobileNavOpen(false)}>Features</Link>
					<Link href="/pricing" className="py-3 text-lg text-primary hover:text-primary/80 font-semibold" onClick={() => setMobileNavOpen(false)}>Pricing</Link>
					<Link href="/about" className="py-3 text-lg text-primary hover:text-primary/80 font-semibold" onClick={() => setMobileNavOpen(false)}>About Me</Link>
					<Link href="/contact" className="py-3 text-lg text-primary hover:text-primary/80 font-semibold" onClick={() => setMobileNavOpen(false)}>Contact</Link>
					
					{/* Mobile auth buttons */}
					<div className="border-t pt-4 mt-4">
						{status === 'loading' ? null : session ? (
							<>
								<div className="py-2 text-sm text-muted-foreground">{session.user?.name}</div>
								<Button size="sm" variant="outline" onClick={() => { signOut(); setMobileNavOpen(false); }} className="w-full">Sign out</Button>
							</>
						) : (
							<div className="flex flex-col gap-2">
								<Link href="/auth/signin" onClick={() => setMobileNavOpen(false)}>
									<Button size="sm" variant="ghost" className="w-full">Sign in</Button>
								</Link>
								<Link href="/auth/signin?mode=signup" onClick={() => setMobileNavOpen(false)}>
									<Button size="sm" variant="default" className="w-full">Sign up</Button>
								</Link>
							</div>
						)}
					</div>
				</nav>
			</div>
		</header>
	);
}
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, ChevronLeft, ChevronRight, FileBarChart2, TrendingUp, BookOpen, GraduationCap, User, Newspaper, BarChart2 } from 'lucide-react';
import { signOut, signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const navSections = [
	{
		header: 'General',
		items: [
			{ label: 'Home', href: '/', icon: Menu },
      { label: 'Benefits', href: '/#benefits', icon: FileBarChart2 },
      { label: 'Pricing', href: '/pricing', icon: FileBarChart2 },
		],
	},
	{
		header: 'Tools',
		items: [
			{ label: 'Generate Trade Plan', href: '/trade-plan/start-here', icon: FileBarChart2 },
			{ label: 'Momentum Screener', href: '/screener', icon: TrendingUp },
			{ label: 'Market Movers', href: '/market-movers', icon: TrendingUp },
		],
	},
	{
		header: 'Research',
		items: [
			{ label: 'Market News', href: '/news', icon: Newspaper },
			{ label: 'Blog', href: '/blog', icon: BookOpen },
			{ label: 'Education', href: '/education', icon: GraduationCap },
		],
	},
];

export function Sidebar({ isCollapsed = false, setCollapsed, setOverlayOpen }: { isCollapsed?: boolean, setCollapsed: any, setOverlayOpen?: (open: boolean) => void }) {
	const pathname = usePathname();
	const [collapsed, setLocalCollapsed] = useState(isCollapsed);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { data: session } = useSession();
	const [hash, setHash] = useState('');

	useEffect(() => {
		if (setOverlayOpen) setOverlayOpen(drawerOpen);
	}, [drawerOpen, setOverlayOpen]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const updateHash = () => setHash(window.location.hash);
			updateHash();
			window.addEventListener('hashchange', updateHash);
			return () => window.removeEventListener('hashchange', updateHash);
		}
	}, []);

	const handleToggle = () => {
		if (setCollapsed) setCollapsed(!collapsed);
		setLocalCollapsed(!collapsed);
	};

	return (
		<>
			{/* Desktop sidebar */}
			<aside className={`hidden md:flex flex-col ${collapsed ? 'w-16' : 'w-64'} fixed left-0 top-14 bg-white border-r border-gray-200 z-40 h-[calc(100vh-3.5rem)] px-1 md:px-2 justify-between items-stretch shadow transition-all duration-300`}>
				<div>
					<div className="flex items-center justify-between px-3 pt-4 pb-1">
            {!collapsed && <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">General</div>}
            <button
              className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ml-auto"
              onClick={handleToggle}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              style={{ touchAction: 'manipulation' }}
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>
          {/* Render General section items */}
          <ul className="flex flex-col gap-0.5">
            {navSections[0].items.map((item) => {
              const Icon = item.icon;
              let isActive = false;
              if (item.label === 'Home') {
                isActive = pathname === '/' && (hash !== '#benefits');
              } else if (item.label === 'Benefits') {
                isActive = pathname === '/' && hash === '#benefits';
              } else {
                isActive = pathname === item.href;
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 relative ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500 shadow-sm md:shadow-none md:bg-blue-50 md:text-blue-700'
                        : 'text-gray-800 hover:bg-gray-100'
                    } ${collapsed ? 'pl-2 pr-2 justify-center' : ''} md:pl-3 md:pr-3`}
                    style={{ maxWidth: '100%', minHeight: 40, touchAction: 'manipulation' }}
                    aria-current={isActive ? 'page' : undefined}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-400'}`} />
                    {!collapsed && <span className="truncate block">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* Render the rest of the sections as before */}
          <SidebarContent skipGeneral collapsed={collapsed} pathname={pathname} session={session} />
        </div>
        {/* User info at the bottom */}
        <div className="flex flex-col items-start gap-2 mb-4 px-3">
          {session ? (
            <div className="flex items-center gap-2">
              {!collapsed && <span className="text-sm text-gray-700 font-semibold">{session.user?.name}</span>}
              <Button size="sm" variant="outline" onClick={() => signOut()}>Sign out</Button>
            </div>
          ) : (
            <Button size="sm" variant="outline" onClick={() => signIn('google')}>Sign in with Google</Button>
          )}
          <Link href="/contact" className="flex items-center gap-2 mt-2 px-0 py-2 rounded-md hover:bg-gray-100 transition-colors min-h-[40px]">
            <User className="h-5 w-5 text-gray-400" />
            {!collapsed && <span className="text-sm text-gray-700">Contact Me</span>}
          </Link>
        </div>
			</aside>
			{/* Mobile drawer */}
			<div className="md:hidden fixed top-4 left-4 z-50">
				<button
					aria-label="Open sidebar"
					className="bg-white border border-gray-200 shadow-sm rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
					onClick={() => setDrawerOpen(true)}
					style={{ minWidth: 48, minHeight: 48, touchAction: 'manipulation' }}
				>
					<Menu className="h-7 w-7 text-blue-500" />
				</button>
				{drawerOpen && (
					<div className="fixed inset-0 z-50 bg-black/40" onClick={() => setDrawerOpen(false)} />
				)}
				<div
					className={`fixed top-0 left-0 h-full w-4/5 max-w-xs bg-white z-[60] shadow-lg transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
					style={{ willChange: 'transform' }}
				>
					<div className="flex justify-end p-4">
						<button
							aria-label="Close sidebar"
							className="rounded-full p-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
							onClick={() => setDrawerOpen(false)}
							style={{ minWidth: 48, minHeight: 48, touchAction: 'manipulation' }}
						>
							<ChevronLeft className="h-7 w-7 text-gray-500" />
						</button>
					</div>
					<SidebarContent onClick={() => setDrawerOpen(false)} collapsed={collapsed} pathname={pathname} session={session} />
					<div className="flex items-center gap-2 mb-4 px-3 py-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer min-h-[48px]">
						<User className="h-5 w-5 text-gray-400" />
						<span className="text-sm text-gray-700">Account</span>
					</div>
					<Link href="/contact" className="flex items-center gap-2 mb-6 px-3 py-3 rounded-md hover:bg-gray-100 transition-colors min-h-[48px]">
          <User className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-700">Contact Me</span>
        </Link>
				</div>
			</div>
		</>
	);
}

function SidebarContent({ onClick, skipGeneral = false, collapsed, pathname, session }: { onClick?: () => void, skipGeneral?: boolean, collapsed: boolean, pathname: string, session: any }) {
	return (
		<nav className="flex flex-col gap-1 mt-2">
			{navSections.map((section, sIdx) => {
				if (skipGeneral && sIdx === 0) return null;
				return (
					<div key={section.header} className="mb-2">
						{/* Hide section header if sidebar is collapsed */}
						{!collapsed && (
							<div className="text-xs font-semibold text-gray-400 px-3 pt-4 pb-1 uppercase tracking-wider">
								{section.header}
							</div>
						)}
						<ul className="flex flex-col gap-0.5">
							{section.items.map((item) => {
								const Icon = item.icon;
								const isActive = pathname === item.href;
								return (
									<li key={item.href}>
										<Link
											href={item.href}
											onClick={onClick}
											className={`group flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 relative ${
												isActive
													? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500 shadow-sm md:shadow-none md:bg-blue-50 md:text-blue-700'
													: 'text-gray-800 hover:bg-gray-100'
											} ${collapsed ? 'pl-2 pr-2 justify-center' : ''} md:pl-3 md:pr-3`}
											style={{ maxWidth: '100%', minHeight: 40, touchAction: 'manipulation' }}
											aria-current={isActive ? 'page' : undefined}
											title={collapsed ? item.label : undefined}
										>
											<Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-400'}`} />
											{!collapsed && <span className="truncate block">{item.label}</span>}
										</Link>
									</li>
								);
							})}
						</ul>
						{sIdx < navSections.length - 1 && !collapsed && (
							<div className="my-2 border-t border-gray-200" />
						)}
					</div>
				);
			})}
		</nav>
	);
}

export default Sidebar;

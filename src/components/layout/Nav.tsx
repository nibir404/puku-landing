import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu, ChevronDown, Code, Terminal, Cloud, Paintbrush, Users, Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const productItems = [
  { name: 'Puku Editor', href: '/products/editor', icon: Code, desc: 'AI-native code workspace', badge: 'v2.4' },
  { name: 'Puku CLI', href: '/products/cli', icon: Terminal, desc: 'Autonomous terminal assistant', badge: null },
  { name: 'Puku Cloud', href: '/products/cloud', icon: Cloud, desc: 'Parallel GPU execution fleet', badge: 'New' },
  { name: 'Puku Design', href: '/products/design', icon: Paintbrush, desc: 'Figma layout & AI UI canvas', badge: null },
  { name: 'Puku Co-work', href: '/products/cowork', icon: Users, desc: 'Real-time team agent pair', badge: null },
  { name: 'Puku App', href: '/products/app', icon: Smartphone, desc: 'Desktop & mobile workspace', badge: null },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setProductsOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-200 border-b',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-[#E5E5E8]'
          : 'bg-white/80 backdrop-blur-sm border-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16 relative">
        
        {/* Left Column: Puku Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Puku">
            <img src="/puku-mark.svg" alt="Puku Logo" className="h-7 w-auto object-contain" />
            <span className="text-[18px] font-extrabold tracking-tight text-[#0F0F11] font-display">
              Puku
            </span>
          </Link>
        </div>

        {/* Center Column: Perfectly Center-Aligned Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
          
          {/* Products Dropdown */}
          <div className="relative" ref={dropdownRef} onMouseEnter={() => setProductsOpen(true)}>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              aria-expanded={productsOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 text-[15px] font-semibold text-[#1A1A1E] hover:text-[#6E56CF] py-2 transition-colors rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
            >
              <span>Products</span>
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200 text-[#0F0F11]', productsOpen && 'rotate-180 text-[#6E56CF]')} />
            </button>

            {productsOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[460px] bg-white rounded-[2px] border border-[#E5E5E8] p-2.5 grid grid-cols-2 gap-1 z-50 shadow-none"
                onMouseLeave={() => setProductsOpen(false)}
              >
                {productItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center gap-2.5 p-2.5 rounded-[2px] hover:bg-[#FAFAFC] border border-transparent hover:border-[#E5E5E8] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
                    >
                      <div className="flex h-7.5 w-7.5 items-center justify-center rounded-[2px] bg-[#F3F3F5] border border-[#E5E5E8] group-hover:bg-[#6E56CF] group-hover:border-[#6E56CF] transition-colors shrink-0">
                        <Icon className="h-3.5 w-3.5 text-[#0F0F11] group-hover:text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[13.5px] font-semibold text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors truncate">{item.name}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 font-bold bg-[#F4F2FF] text-[#6E56CF]">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="text-[11.5px] text-[#4A4A52] font-normal truncate">{item.desc}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <NavLink to="/enterprise" className={({ isActive }) => cn('text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]', isActive ? 'text-[#6E56CF]' : 'text-[#1A1A1E] hover:text-[#6E56CF]')}>
            Enterprise
          </NavLink>
          <NavLink to="/pricing" className={({ isActive }) => cn('text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]', isActive ? 'text-[#6E56CF]' : 'text-[#1A1A1E] hover:text-[#6E56CF]')}>
            Pricing
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => cn('text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]', isActive ? 'text-[#6E56CF]' : 'text-[#1A1A1E] hover:text-[#6E56CF]')}>
            Blog
          </NavLink>
        </nav>

        {/* Right Column: Action Buttons */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-4">
          <Link
            to="/login"
            className="min-h-[44px] px-5 py-2.5 text-[15px] font-semibold text-[#0F0F11] hover:text-[#6E56CF] transition-colors rounded-[2px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="min-h-[44px] px-6 py-2.5 text-[15px] font-semibold text-white bg-[#0F0F11] hover:bg-[#6E56CF] rounded-[2px] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF] focus-visible:ring-offset-2"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu using shadcn Sheet component */}
        <div className="md:hidden ml-auto">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2.5 text-[#0F0F11] rounded-[2px] min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
                aria-label="Toggle navigation menu"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6 bg-white border-l border-[#E5E5E8] flex flex-col gap-6">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left text-lg font-semibold">
                  <img src="/puku-mark.svg" alt="Puku" className="h-6 w-auto" />
                  Navigation
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#4A4A52]">Products Suite</div>
                <div className="grid grid-cols-1 gap-2">
                  {productItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2.5 min-h-[44px] bg-[#FAFAFC] rounded-[2px] border border-[#E5E5E8] hover:border-[#6E56CF]"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4 text-[#6E56CF]" />
                          <span className="text-[13.5px] font-semibold text-[#0F0F11]">{item.name}</span>
                        </div>
                        {item.badge && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E5E8] space-y-1">
                <NavLink to="/docs" onClick={() => setMobileMenuOpen(false)} className="block text-[15px] font-semibold text-[#0F0F11] hover:text-[#6E56CF] min-h-[44px] px-3 rounded-[2px] flex items-center">Documentation</NavLink>
                <NavLink to="/enterprise" onClick={() => setMobileMenuOpen(false)} className="block text-[15px] font-semibold text-[#0F0F11] hover:text-[#6E56CF] min-h-[44px] px-3 rounded-[2px] flex items-center">Enterprise</NavLink>
                <NavLink to="/pricing" onClick={() => setMobileMenuOpen(false)} className="block text-[15px] font-semibold text-[#0F0F11] hover:text-[#6E56CF] min-h-[44px] px-3 rounded-[2px] flex items-center">Pricing</NavLink>
                <NavLink to="/blog" onClick={() => setMobileMenuOpen(false)} className="block text-[15px] font-semibold text-[#0F0F11] hover:text-[#6E56CF] min-h-[44px] px-3 rounded-[2px] flex items-center">Blog</NavLink>
              </div>

              <div className="mt-auto pt-4 border-t border-[#E5E5E8] flex flex-col gap-3">
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full min-h-[44px] py-2.5 text-center text-[15px] font-semibold text-white bg-[#0F0F11] hover:bg-[#6E56CF] rounded-[2px] flex items-center justify-center transition-colors">
                  Get Started
                </Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full min-h-[44px] py-2 text-center text-[15px] font-semibold text-[#0F0F11] border border-[#E5E5E8] rounded-[2px] hover:bg-[#FAFAFC] flex items-center justify-center transition-colors">
                  Log in
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
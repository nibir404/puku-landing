import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu, X, ChevronDown, Code, Terminal, Cloud, Paintbrush, Users, Smartphone
} from 'lucide-react';
import { cn } from '@/lib/cn';

const productItems = [
  { name: 'Puku Editor', href: '/products/editor', icon: Code, desc: 'AI-native code workspace' },
  { name: 'Puku CLI', href: '/products/cli', icon: Terminal, desc: 'Autonomous terminal assistant' },
  { name: 'Puku Cloud', href: '/products/cloud', icon: Cloud, desc: 'Parallel GPU execution fleet' },
  { name: 'Puku Design', href: '/products/design', icon: Paintbrush, desc: 'Figma layout & AI UI canvas' },
  { name: 'Puku Co-work', href: '/products/cowork', icon: Users, desc: 'Real-time team agent pair' },
  { name: 'Puku App', href: '/products/app', icon: Smartphone, desc: 'Desktop & mobile workspace' },
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
    <>
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
                className="flex items-center gap-1 text-[15px] font-medium text-[#666666] hover:text-[#6E56CF] py-2 transition-colors rounded-[2px]"
              >
                <span>Products</span>
                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-200', productsOpen && 'rotate-180 text-[#6E56CF]')} />
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
                        className="flex items-center gap-2.5 p-2.5 rounded-[2px] hover:bg-[#FAFAFC] border border-transparent hover:border-[#E5E5E8] transition-colors group"
                      >
                        <div className="flex h-7.5 w-7.5 items-center justify-center rounded-[2px] bg-[#F3F3F5] border border-[#E5E5E8] group-hover:bg-[#6E56CF] group-hover:border-[#6E56CF] transition-colors shrink-0">
                          <Icon className="h-3.5 w-3.5 text-[#0F0F11] group-hover:text-white" />
                        </div>
                        <div>
                          <div className="text-[13.5px] font-semibold text-[#0F0F11] group-hover:text-[#6E56CF] transition-colors">{item.name}</div>
                          <div className="text-[11.5px] text-[#666666]">{item.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <NavLink to="/enterprise" className={({ isActive }) => cn('text-[15px] font-medium transition-colors', isActive ? 'text-[#6E56CF] font-semibold' : 'text-[#666666] hover:text-[#6E56CF]')}>
              Customers
            </NavLink>
            <NavLink to="/enterprise" className={({ isActive }) => cn('text-[15px] font-medium transition-colors', isActive ? 'text-[#6E56CF] font-semibold' : 'text-[#666666] hover:text-[#6E56CF]')}>
              Enterprise
            </NavLink>
            <NavLink to="/pricing" className={({ isActive }) => cn('text-[15px] font-medium transition-colors', isActive ? 'text-[#6E56CF] font-semibold' : 'text-[#666666] hover:text-[#6E56CF]')}>
              Pricing
            </NavLink>
            <NavLink to="/blog" className={({ isActive }) => cn('text-[15px] font-medium transition-colors', isActive ? 'text-[#6E56CF] font-semibold' : 'text-[#666666] hover:text-[#6E56CF]')}>
              Blog
            </NavLink>
          </nav>

          {/* Right Column: Action Buttons */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-5">
            <Link to="/download" className="px-3.5 py-1.5 text-[15px] font-medium text-[#0F0F11] hover:text-[#6E56CF] transition-colors rounded-[2px]">
              Log in
            </Link>
            <Link
              to="/contact"
              className="px-5 py-2 text-[15px] font-semibold text-white bg-[#0F0F11] hover:bg-[#6E56CF] rounded-[2px] transition-colors flex items-center justify-center shadow-none"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#0F0F11] rounded-[2px] ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6E56CF]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-40 bg-white border-b border-[#E5E5E8] p-5 shadow-none space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#888888]">Products Suite</div>
          <div className="grid grid-cols-2 gap-2">
            {productItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-2 p-2 bg-[#FAFAFC] rounded-[2px] border border-[#E5E5E8]"
                >
                  <Icon className="h-3.5 w-3.5 text-[#6E56CF]" />
                  <span className="text-[13px] font-medium text-[#0F0F11]">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E5E5E8] space-y-2.5">
            <NavLink to="/enterprise" className="block text-[15px] font-medium text-[#0F0F11]">Customers</NavLink>
            <NavLink to="/enterprise" className="block text-[15px] font-medium text-[#0F0F11]">Enterprise</NavLink>
            <NavLink to="/pricing" className="block text-[15px] font-medium text-[#0F0F11]">Pricing</NavLink>
            <NavLink to="/blog" className="block text-[15px] font-medium text-[#0F0F11]">Blog</NavLink>
          </div>

          <div className="pt-3 border-t border-[#E5E5E8] flex flex-col gap-3">
            <Link to="/contact" className="w-full py-2.5 text-center text-[15px] font-semibold text-white bg-[#0F0F11] rounded-[2px]">
              Get Started
            </Link>
            <Link to="/download" className="w-full py-2 text-center text-[15px] font-medium text-[#0F0F11]">
              Log in
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
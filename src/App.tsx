import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Enterprise from './pages/Enterprise';
import Security from './pages/Security';
import Pricing from './pages/Pricing';
import Docs from './pages/Docs';
import Blog from './pages/Blog';
import Changelog from './pages/Changelog';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Download from './pages/Download';
import AuthPage from './pages/Auth';

import BlogPostDetail from './pages/BlogPostDetail';
import CaseStudyDetail from './pages/CaseStudyDetail';
import CareersDetail from './pages/CareersDetail';

import Editor from './pages/products/Editor';
import CLI from './pages/products/CLI';
import Cloud from './pages/products/Cloud';
import Design from './pages/products/Design';
import Cowork from './pages/products/Cowork';
import AppProduct from './pages/products/App';

import Chat from './pages/Chat';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  const isChatRoute = location.pathname === '/chat';

  if (isChatRoute) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col justify-between">
      <ScrollToTop />
      <Nav />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />

          <Route path="/products/editor" element={<Editor />} />
          <Route path="/products/cli" element={<CLI />} />
          <Route path="/products/cloud" element={<Cloud />} />
          <Route path="/products/design" element={<Design />} />
          <Route path="/products/cowork" element={<Cowork />} />
          <Route path="/products/app" element={<AppProduct />} />

          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/security" element={<Security />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/docs/:productName" element={<Docs />} />
          <Route path="/docs/:productName/:pageId" element={<Docs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/customers/:slug" element={<CaseStudyDetail />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/careers" element={<Careers />} /> */}
          {/* <Route path="/careers/:slug" element={<CareersDetail />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/download" element={<Download />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />


          <Route
            path="*"
            element={
              <div className="flex min-h-[80vh] items-center justify-center px-6 pt-32 pb-20">
                <div className="text-center">
                  <div className="font-pixel-mono text-[18px] uppercase tracking-wider text-ink-muted">404</div>
                  <h1 className="mt-4 font-display text-4xl font-medium text-ink">Page not found</h1>
                  <p className="mt-3 text-ink-muted">The page you were looking for does not exist or has moved.</p>
                  <a href="/" className="mt-7 inline-block rounded-lg bg-ink px-5 py-2.5 text-[13px] font-medium text-white hover:bg-ink/85 transition-colors shadow-pill">
                    Go home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
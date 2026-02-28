import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SmartCTA } from "@/components/ui/SmartCTA";
import { AIChat } from "@/components/chat/AIChat";

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: "Решения", href: "/solutions" },
    { name: "Локации", href: "/locations" },
    { name: "Тарифы и Услуги", href: "/pricing" },
    { name: "Стандарт 24/7", href: "/standard" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-border py-4"
            : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tighter flex items-center gap-2"
          >
            <span className="w-4 h-4 bg-primary rounded-sm"></span>
            GROUND ZERO
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contacts"
              className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              Записаться на визит
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-2xl font-medium tracking-tight"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contacts"
              className="mt-8 bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold text-center text-lg"
            >
              Записаться на визит
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-brand-blue text-white py-12 mt-24">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6"
            >
              <span className="w-4 h-4 bg-brand-yellow rounded-sm"></span>
              GROUND ZERO
            </Link>
            <p className="text-white/70 max-w-sm">
              Управляемая бизнес-среда для вашего результата. Инфраструктура
              24/7 в центре Ташкента.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Решения</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link
                  to="/solutions/night-flow"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Night Flow
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/resident"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Hot / Personal Desk
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/team"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Corporate / Team
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/meeting"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Meeting Rooms
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/event"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Event Spaces
                </Link>
              </li>
              <li>
                <Link
                  to="/solutions/virtual"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Virtual Office
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link
                  to="/locations"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Локации
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Тарифы и Услуги
                </Link>
              </li>
              <li>
                <Link
                  to="/standard"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Стандарт 24/7
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="hover:text-brand-yellow transition-colors"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-sm text-white/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Ground Zero. Все права защищены.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="#" className="hover:text-white transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <SmartCTA />
      
      {/* AI Chat */}
      <AIChat />
    </div>
  );
}

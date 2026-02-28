import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Calculator, MessageSquare } from "lucide-react";

export function SmartCTA() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [hasTeamInterest, setHasTeamInterest] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    try {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    } catch (e) {
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    try {
      const stored = localStorage.getItem("team_interest");
      if (stored === "true") {
        setHasTeamInterest(true);
      }

      if (location.pathname === "/solutions/team" && !hasTeamInterest) {
        // 30 seconds timer
        timer = setTimeout(() => {
          try {
            localStorage.setItem("team_interest", "true");
            setHasTeamInterest(true);
          } catch (e) {
            setIsError(true);
          }
        }, 30000);
      }
    } catch (e) {
      setIsError(true);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [location.pathname, hasTeamInterest]);

  const trackEvent = (ctaType: string) => {
    try {
      // Simulate GA4 tracking
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "click_smart_cta", {
          event_category: "engagement",
          event_label: ctaType,
        });
      } else {
        console.log(`[GA4] Event tracked: click_smart_cta (${ctaType})`);
      }
    } catch (error) {
      console.error("GA4 tracking failed", error);
      setIsError(true);
    }
  };

  if (isError) {
    return (
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <Link
          to="/contacts"
          className="bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-2xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          Оставить заявку
        </Link>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href="tel:+998901234567"
          onClick={() => trackEvent("mobile_call")}
          className="bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-2xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Phone className="w-4 h-4" />
          Позвонить менеджеру
        </a>
      </div>
    );
  }

  if (hasTeamInterest) {
    return (
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <Link
          to="/solutions/team"
          onClick={() => trackEvent("team_calc")}
          className="bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-2xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Calculator className="w-4 h-4" />
          Получить расчет для команды
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <Link
        to="/contacts"
        onClick={() => trackEvent("standard")}
        className="bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-2xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm"
      >
        <MessageSquare className="w-4 h-4" />
        Оставить заявку
      </Link>
    </div>
  );
}

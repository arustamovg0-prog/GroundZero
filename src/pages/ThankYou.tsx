import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-roboto pt-24 pb-12">
      <Helmet>
        <title>Спасибо за заявку | Ground Zero</title>
      </Helmet>
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-200 text-center max-w-md w-full mx-4">
        <div className="w-20 h-20 rounded-full bg-brand-yellow/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-brand-yellow" />
        </div>
        <h1 className="text-3xl font-bold text-brand-blue mb-4">
          Заявка успешно отправлена!
        </h1>
        <p className="text-brand-blue/70 mb-8">
          Мы получили ваши данные. Наш B2B-менеджер свяжется с вами в ближайшее время для уточнения деталей.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full bg-brand-blue text-white py-4 rounded-xl font-bold hover:bg-brand-yellow hover:text-brand-blue transition-colors"
        >
          Вернуться на главную
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

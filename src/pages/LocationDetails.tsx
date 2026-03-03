import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react";
import { locationsData } from "@/data/locations";

export function LocationDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [location, setLocation] = useState<any>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const found = locationsData.find((loc) => loc.id === id);
    if (found) {
      // Simulate fetching occupancy status
      setLocation({
        ...found,
        occupancy: Math.random() > 0.5 ? 95 : 60, // Random for demo
      });
    } else {
      navigate("/locations");
    }
  }, [id, navigate]);

  if (!location) return null;

  const isHighOccupancy = location.occupancy >= 90;

  return (
    <div className="min-h-screen bg-[#121212] text-white pt-24 pb-16 font-sans">
      <Helmet>
        <title>{location.name} | GroundZero</title>
      </Helmet>

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Back Button */}
        <Link
          to="/locations"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#FDD835] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к локациям
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {location.name}
            </h1>
            
            {/* Badge */}
            {isHighOccupancy ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium whitespace-nowrap">
                <AlertCircle className="w-4 h-4" />
                Осталось мало мест
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium whitespace-nowrap">
                <Users className="w-4 h-4" />
                Свободно
              </div>
            )}
          </div>
          
          <p className="text-gray-400 flex items-center gap-2 text-lg">
            <MapPin className="w-5 h-5 text-[#FDD835]" />
            {location.address}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={location.images[activeImage]}
                alt={`${location.name} view ${activeImage + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {location.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === idx
                      ? "border-[#FDD835] opacity-100"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Info & Actions */}
          <div className="lg:col-span-5 flex flex-col">
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              {location.description}
            </p>

            {/* Formats */}
            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                Доступные форматы
              </h3>
              <div className="flex flex-wrap gap-2">
                {location.formats.map((format: string) => (
                  <span
                    key={format}
                    className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-sm font-medium text-gray-200"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h3 className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                Особенности
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {location.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-[#FDD835] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <Link
                to="/contacts"
                className="flex-1 bg-[#FDD835] text-black px-6 py-4 rounded-xl font-bold text-center hover:bg-[#FDD835]/90 transition-colors"
              >
                Забронировать визит
              </Link>
              <Link
                to="/contacts"
                className="flex-1 bg-transparent border border-gray-600 text-white px-6 py-4 rounded-xl font-bold text-center hover:bg-gray-800 transition-colors"
              >
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { BRAND_CONFIG } from '../../data/products';

export const PopularDesignsSection = ({ onSelectDesign }) => {
  const designs = [
    {
      id: 'pop-spider',
      title: 'Crimson Spider Graphic',
      subtitle: 'Acid Wash Heavy Oversized Tee',
      tag: 'Acid Wash',
      price: '₹899',
      image: '/images/custom-studio/popular-spider.jpg',
      style: 'Oversized',
      color: 'Black',
    },
    {
      id: 'pop-butterflies',
      title: 'Twin Butterflies & Sparkles',
      subtitle: 'Minimalist Y2K Graphic Print',
      tag: 'Y2K Edition',
      price: '₹799',
      image: '/images/custom-studio/popular-butterflies.jpg',
      style: 'Round Neck',
      color: 'White',
    },
    {
      id: 'pop-hearts',
      title: 'Trio Calligraphy Hearts',
      subtitle: 'Pastel Streetwear Graphic',
      tag: 'Pastel Cut',
      price: '₹799',
      image: '/images/custom-studio/popular-hearts.jpg',
      style: 'Oversized',
      color: 'Cream / Beige',
    },
    {
      id: 'pop-crystal-butterfly',
      title: 'Crystal Monarch & Sleeve Print',
      subtitle: 'Embellished Butterfly Artwork',
      tag: 'Jeweled Monarch',
      price: '₹949',
      image: '/images/custom-studio/popular-crystal-butterfly.jpg',
      style: 'Round Neck',
      color: 'Navy Blue',
    },
  ];

  return (
    <section id="popular-designs" className="py-8 sm:py-10 bg-[#FAF8F5] border-b border-gray-200 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and WhatsApp Inquiry link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-block mb-1">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                Trending Atelier Drops
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-black font-normal mb-1">
              Popular Designs
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-light">
              Get inspired with our custom T-shirt styles. Click any design to order directly on WhatsApp.
            </p>
          </div>

          <a
            href={`https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(
              'Hello KODE X ATTIRE Studio! I would like to order a custom printed T-shirt.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black hover:bg-neutral-800 text-white rounded text-xs uppercase tracking-wider font-semibold transition-all group shadow-sm"
          >
            <svg className="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>Order on WhatsApp</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Popular Designs Grid - 2 columns in mobile view */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {designs.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (onSelectDesign) {
                  onSelectDesign(item.title);
                } else {
                  const url = `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(
                    `Hello KODE X ATTIRE Studio! I want to order the custom design: "${item.title}". Please share pricing and size availability.`
                  )}`;
                  window.open(url, '_blank', 'noopener,noreferrer');
                }
              }}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Product Visual Container */}
              <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Hover Order Overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 sm:p-4">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white text-black text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#25D366]" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Order on WhatsApp</span>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-3 sm:p-4 bg-white flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-black group-hover:text-neutral-800 tracking-tight line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-neutral-500 font-light mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-gray-100 flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-600">
                  <span className="font-medium text-black">Fast Dispatch</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Available
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDesignsSection;

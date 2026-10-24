import { useState, useMemo, useEffect, useRef } from 'react';
import { getStoredReviews } from '../../data/reviews';

export const ReviewsSection = () => {
  const [reviews] = useState(() => getStoredReviews());
  const [activeFilter, setActiveFilter] = useState('all');
  const [startIndex, setStartIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    let result = reviews;
    if (activeFilter === 'men') {
      result = reviews.filter((r) => r.category === 'men');
    } else if (activeFilter === 'women') {
      result = reviews.filter((r) => r.category === 'women');
    } else if (activeFilter === 'top-rated') {
      result = reviews.filter((r) => r.rating === 5);
    }
    return result;
  }, [reviews, activeFilter]);

  // Reset startIndex when filter changes
  useEffect(() => {
    setStartIndex(0);
  }, [activeFilter]);

  // Auto-rotating timer ("changing" every 4 seconds)
  useEffect(() => {
    if (!isPlaying || filteredReviews.length <= 3) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % filteredReviews.length);
    }, 4000);

    return () => clearInterval(timerRef.current);
  }, [isPlaying, filteredReviews.length]);

  // Visible 3 columns in 1 row
  const visibleReviews = useMemo(() => {
    if (!filteredReviews.length) return [];
    const count = Math.min(3, filteredReviews.length);
    const cols = [];
    for (let i = 0; i < count; i++) {
      const idx = (startIndex + i) % filteredReviews.length;
      cols.push(filteredReviews[idx]);
    }
    return cols;
  }, [filteredReviews, startIndex]);

  const handleNext = () => {
    if (!filteredReviews.length) return;
    setStartIndex((prev) => (prev + 1) % filteredReviews.length);
  };

  const handlePrev = () => {
    if (!filteredReviews.length) return;
    setStartIndex((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  };

  return (
    <section className="py-8 sm:py-10 bg-white border-t border-brand-border/60">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-medium tracking-wider uppercase mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Verified Reviews • Tamil Nadu</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-black font-normal mb-1">
            Customer Reviews
          </h2>
          <p className="text-xs text-neutral-600 font-light max-w-xl">
            Authentic feedback from verified customers across Tamil Nadu.
          </p>
        </div>

        {/* Toolbar: Category Filters + Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: `All Reviews (${reviews.length})` },
              { id: 'men', label: `Men's Collection (${reviews.filter((r) => r.category === 'men').length})` },
              { id: 'women', label: `Women's Collection (${reviews.filter((r) => r.category === 'women').length})` },
              { id: 'top-rated', label: '5-Star Ratings' }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setActiveFilter(pill.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                  activeFilter === pill.id
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs text-stone-500 font-medium">
            <button
              onClick={handlePrev}
              title="Previous reviews"
              className="p-1 px-2 rounded-lg border border-stone-200 hover:border-black text-stone-700 hover:text-black transition-colors text-xs"
            >
              ←
            </button>

            <button
              onClick={handleNext}
              title="Next reviews"
              className="p-1 px-2 rounded-lg border border-stone-200 hover:border-black text-stone-700 hover:text-black transition-colors text-xs"
            >
              →
            </button>
          </div>
        </div>

        {/* 3 Columns and 1 Row (Compact Height & Auto-Changing) */}
        <div
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5"
        >
          {visibleReviews.map((rev, index) => (
            <div
              key={`${rev.id}-${startIndex}-${index}`}
              className="bg-[#FAF8F5] border border-stone-200/90 hover:border-stone-400/90 rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-500 hover:shadow-md animate-fade-in"
            >
              <div>
                {/* Header: Stars & Time */}
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">
                    {rev.date}
                  </span>
                </div>

                {/* Review Title */}
                <h4 className="font-serif text-sm sm:text-base text-black font-medium mb-1 leading-snug">
                  "{rev.title}"
                </h4>

                {/* Comment Text */}
                <p className="text-xs text-neutral-800 font-normal leading-relaxed mb-3 line-clamp-2">
                  {rev.comment}
                </p>
              </div>

              {/* Bottom Metadata */}
              <div className="pt-2.5 border-t border-stone-200/80 space-y-1 mt-auto">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-black">
                    {rev.author}
                  </span>
                  <span className="text-[9px] text-emerald-700 font-medium inline-flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                    ✓ Verified
                  </span>
                </div>
                <p className="text-[10px] text-neutral-600 font-medium">
                  {rev.city}
                </p>
                <div className="text-[10px] text-neutral-800 truncate font-normal">
                  <span className="text-neutral-500">Item: </span>
                  <span className="font-semibold text-neutral-900">{rev.productName}</span>
                </div>
                {rev.fit && (
                  <div className="text-[9px] uppercase tracking-wider text-stone-600 font-medium bg-stone-200/60 px-2 py-0.5 rounded-full w-fit">
                    Fit: {rev.fit}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Compact Bottom Pagination Ticker Indicator */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {filteredReviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === startIndex ? 'w-6 bg-black' : 'w-1.5 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to review group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

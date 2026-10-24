import React, { useState } from 'react';
import { BRAND_CONFIG } from '../../data/products';

export const CustomStudioForm = ({ selectedDesign }) => {
  const [style, setStyle] = useState('Round Neck');
  const [color, setColor] = useState('Black');
  const [size, setSize] = useState('M');
  const [designName, setDesignName] = useState(selectedDesign || '');
  const [quantity, setQuantity] = useState('1 unit');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [note, setNote] = useState('');

  React.useEffect(() => {
    if (selectedDesign) {
      setDesignName(selectedDesign);
    }
  }, [selectedDesign]);

  const styles = ['Round Neck', 'Oversized', 'Polo'];
  const colors = [
    { name: 'Black', hex: '#111111' },
    { name: 'White', hex: '#FFFFFF', border: true },
    { name: 'Heather Grey', hex: '#8E949C' },
    { name: 'Navy Blue', hex: '#1B2738' },
    { name: 'Cream', hex: '#E5D9C5' },
  ];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const quantities = ['1 unit', '2 - 5 units', '10+ units (Team)', '25+ units (Bulk)'];

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      `*👕 KODE X ATTIRE - Custom Order Inquiry*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━`,
    ];

    if (designName.trim()) {
      lines.push(`• *Design / Concept:* ${designName.trim()}`);
    }
    lines.push(`• *Style:* ${style}`);
    lines.push(`• *Color:* ${color}`);
    lines.push(`• *Size:* ${size}`);
    lines.push(`• *Quantity:* ${quantity}`);

    if (name.trim()) {
      lines.push(`• *Name:* ${name.trim()}`);
    }
    if (whatsapp.trim()) {
      lines.push(`• *WhatsApp / Phone:* ${whatsapp.trim()}`);
    }
    if (uploadedFile) {
      lines.push(`• *File:* Yes (${uploadedFile.name}) — will send file in chat`);
    }
    if (note.trim()) {
      lines.push(`• *Note:* ${note.trim()}`);
    }

    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`Please share price quote & next steps. Thank you!`);

    const message = lines.join('\n');
    const waUrl = `https://wa.me/${BRAND_CONFIG.whatsappRaw}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="custom-order-form" className="py-6 sm:py-8 bg-white border-b border-gray-200 scroll-mt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Simple Header */}
        <div className="text-center mb-5">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-500 block mb-1">
            CUSTOM STUDIO
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-black mb-1.5">
            Quick Order Inquiry
          </h2>
          <p className="text-xs text-neutral-500 font-light">
            Pick your preferences and connect with our team on WhatsApp.
          </p>
        </div>

        {/* Clean Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#FAF8F5] border border-neutral-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs"
        >
          {/* Design / Idea Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">
              Design / Idea
            </label>
            <input
              type="text"
              value={designName}
              onChange={(e) => setDesignName(e.target.value)}
              placeholder="e.g. Crimson Spider, Twin Butterflies, or my own artwork"
              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black"
            />
          </div>

          {/* Style Buttons */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">
              Style
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {styles.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStyle(s)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg transition-all text-center ${
                    style === s
                      ? 'bg-black text-white font-semibold shadow-xs'
                      : 'bg-white text-neutral-700 border border-gray-300 hover:border-black'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color & Size in One Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            {/* Color Swatches */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-black">
                  Color
                </label>
                <span className="text-xs text-neutral-500 font-medium">{color}</span>
              </div>
              <div className="flex items-center gap-3">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    className={`w-7 h-7 rounded-full transition-transform relative flex items-center justify-center ${
                      c.border ? 'border border-gray-300' : ''
                    } ${
                      color === c.name
                        ? 'ring-2 ring-offset-2 ring-black scale-110 shadow-xs'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {color === c.name && (
                      <svg
                        className={`w-3.5 h-3.5 ${
                          c.name === 'White' || c.name === 'Cream' ? 'text-black' : 'text-white'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Pills */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSize(sz)}
                    className={`min-w-[40px] py-1.5 px-3 text-xs font-medium rounded-lg transition-all ${
                      size === sz
                        ? 'bg-black text-white font-semibold'
                        : 'bg-white text-neutral-700 border border-gray-300 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity & Name in One Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">
                Quantity
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-black focus:outline-none focus:border-black"
              >
                {quantities.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-black focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {/* WhatsApp / Phone & File Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-black focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">
                Upload Artwork <span className="text-neutral-400 font-normal lowercase">(optional)</span>
              </label>
              <div className="relative border border-dashed border-gray-300 hover:border-black rounded-lg px-3 py-2 bg-white flex items-center justify-between">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="text-xs text-neutral-600 truncate">
                  {uploadedFile ? `📎 ${uploadedFile.name}` : 'Choose image / logo file'}
                </span>
                {uploadedFile && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                    className="text-[11px] text-red-500 ml-2 hover:underline z-10 font-medium shrink-0"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Short Note (optional) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-black mb-2">
              Notes / Special Instructions <span className="text-neutral-400 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any details on placement, text, or sizing..."
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs sm:text-sm text-black focus:outline-none focus:border-black"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all shadow-sm"
            >
              <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Enquire on WhatsApp</span>
              <span className="text-sm">→</span>
            </button>
            <p className="text-[11px] text-neutral-400 text-center mt-2 font-light">
              Opens directly in WhatsApp with your details pre-filled.
            </p>
          </div>
        </form>

      </div>
    </section>
  );
};

export default CustomStudioForm;

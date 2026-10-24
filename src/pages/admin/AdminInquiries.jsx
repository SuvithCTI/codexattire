import { useState, useMemo } from 'react';

export const AdminInquiries = ({ inquiries, onSaveInquiries }) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchSearch =
        inq.name.toLowerCase().includes(search.toLowerCase()) ||
        inq.email.toLowerCase().includes(search.toLowerCase()) ||
        inq.message.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        filterStatus === 'all' || inq.status.toLowerCase() === filterStatus.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [inquiries, search, filterStatus]);

  const handleToggleStatus = (id) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: inq.status === 'Answered' ? 'Pending' : 'Answered' } : inq
    );
    onSaveInquiries(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this inquiry from records?')) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      onSaveInquiries(updated);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white">
            Concierge & Custom Studio Inquiries
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-0.5">
            Client messages received from the Contact page and Custom Studio consultations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
            {inquiries.filter((i) => i.status === 'Pending').length} Pending
          </span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search inquiries by client name, email or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-neutral-500 focus:outline-none"
          />
          <svg className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <span>Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-brand-gold"
            >
              <option value="all">All Inquiries</option>
              <option value="pending">Pending</option>
              <option value="answered">Answered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 text-xs bg-[#141414] border border-neutral-800 rounded-2xl">
            No inquiries match your filter criteria.
          </div>
        ) : (
          filteredInquiries.map((inq) => {
            const isPending = inq.status === 'Pending';
            const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Hello ${inq.name}, this is KODE X ATTIRE atelier concierge responding to your inquiry.`
            )}`;

            return (
              <div
                key={inq.id}
                className={`bg-[#141414] border rounded-2xl p-5 sm:p-6 space-y-4 transition-all ${
                  isPending
                    ? 'border-amber-500/30 bg-gradient-to-r from-[#141414] to-[#1C1612]'
                    : 'border-neutral-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-serif text-base text-white font-medium">{inq.name}</h3>
                      <span className="text-[10px] bg-neutral-800 text-brand-gold px-2 py-0.5 rounded-full font-medium">
                        {inq.inquiryType || 'General'}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 font-light flex items-center gap-2">
                      <span>{inq.email}</span>
                      <span>•</span>
                      <span>{inq.phone}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-neutral-500">{inq.date}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(inq.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                        isPending
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25'
                          : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
                      }`}
                    >
                      {inq.status} (Click to toggle)
                    </button>
                  </div>
                </div>

                {/* Message body */}
                <p className="text-xs text-neutral-300 font-light leading-relaxed bg-neutral-900/60 p-4 rounded-xl border border-neutral-800/60">
                  "{inq.message}"
                </p>

                {/* Quick actions row */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="flex items-center gap-3">
                    <a
                      href={`mailto:${inq.email}?subject=${encodeURIComponent('KODE X ATTIRE Atelier Inquiry Response')}`}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-[11px] font-medium transition-colors"
                    >
                      ✉ Reply via Email
                    </a>

                    {cleanPhone && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-700/40 text-emerald-300 rounded-lg text-[11px] font-medium transition-colors"
                      >
                        WhatsApp Client
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="text-[11px] text-rose-400 hover:underline"
                  >
                    Delete Message
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;

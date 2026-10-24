import { useState, useMemo } from 'react';
import useAuth from '../../hooks/useAuth';

export const AdminCustomers = ({ orders }) => {
  const { users, deleteUser, updateUserTier } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customerList = useMemo(() => {
    return users.map((u) => {
      // Find orders matching this user
      const userOrders = orders.filter(
        (o) =>
          o.email?.toLowerCase() === u.email.toLowerCase() ||
          o.address?.email?.toLowerCase() === u.email.toLowerCase()
      );
      const totalSpent = userOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

      return {
        ...u,
        orderCount: userOrders.length,
        totalSpent,
      };
    });
  }, [users, orders]);

  const filteredCustomers = useMemo(() => {
    return customerList.filter((c) => {
      const matchSearch =
        c.fullName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.phone && c.phone.includes(search));

      const matchTier =
        selectedTier === 'all' || (c.tier && c.tier.toLowerCase().includes(selectedTier.toLowerCase()));

      return matchSearch && matchTier;
    });
  }, [customerList, search, selectedTier]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white">
            Clientele & Member Accounts
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-0.5">
            Manage registered atelier client profiles, upgrade VIP tiers, and inspect purchase histories.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
            {users.length} Registered Accounts
          </span>
        </div>
      </div>

      {/* Search & Tier Filters */}
      <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search clients by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-neutral-500 focus:outline-none"
          />
          <svg className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <span>Membership:</span>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-brand-gold"
            >
              <option value="all">All Tiers</option>
              <option value="noir">Noir Atelier</option>
              <option value="vip">Executive VIP</option>
              <option value="member">Atelier Member</option>
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Customers Table (hidden on mobile & tablet, visible on lg+) */}
      <div className="hidden lg:block bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/60 text-neutral-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-semibold">Client Identity</th>
                <th className="py-3 px-4 font-semibold">Contact Info</th>
                <th className="py-3 px-4 font-semibold">Privilege Tier</th>
                <th className="py-3 px-4 font-semibold">Joined Date</th>
                <th className="py-3 px-4 font-semibold text-center">Orders</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-neutral-500 text-xs font-light">
                    No customer accounts match your search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((client) => (
                  <tr key={client.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Identity with Initial Badge */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 text-brand-gold font-serif font-bold text-xs flex items-center justify-center shrink-0">
                          {client.avatarInitials || client.fullName.slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <div className="font-medium text-white flex items-center gap-1.5">
                            <span>{client.fullName}</span>
                            {client.role === 'admin' && (
                              <span className="text-[9px] bg-brand-gold/20 text-brand-gold px-1.5 py-0.2 rounded font-bold uppercase">
                                Staff
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-neutral-500 font-mono">{client.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="py-3.5 px-4 text-neutral-300">
                      <div>{client.email}</div>
                      <div className="text-[10px] text-neutral-500">{client.phone || 'No phone recorded'}</div>
                    </td>

                    {/* Tier Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={client.tier || 'Atelier Member'}
                        onChange={(e) => updateUserTier(client.id, e.target.value)}
                        className="bg-neutral-900 border border-neutral-800 text-brand-gold font-medium rounded-lg px-2.5 py-1 text-[11px] focus:outline-none focus:border-brand-gold"
                      >
                        <option value="Noir Atelier Member">Noir Atelier Member</option>
                        <option value="Executive VIP Client">Executive VIP Client</option>
                        <option value="Atelier Member">Atelier Member</option>
                        <option value="Standard Client">Standard Client</option>
                      </select>
                    </td>

                    {/* Joined Date */}
                    <td className="py-3.5 px-4 text-neutral-400 font-light">
                      {client.joinedDate || '2024'}
                    </td>

                    {/* Orders count */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-200 font-bold text-[11px]">
                        {client.orderCount}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setSelectedCustomer(client)}
                          className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-[10px] uppercase tracking-wider transition-colors"
                        >
                          Profile
                        </button>

                        {client.role !== 'admin' && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete client account for ${client.fullName}?`)) {
                                deleteUser(client.id);
                              }
                            }}
                            className="p-1 hover:bg-rose-950/40 text-neutral-500 hover:text-rose-400 rounded-lg transition-colors"
                            title="Delete Client Account"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Mobile View Alone (lg:hidden) */}
      <div className="lg:hidden space-y-3">
        {filteredCustomers.length === 0 ? (
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-8 text-center text-neutral-500 text-xs font-light">
            No customer accounts match your search.
          </div>
        ) : (
          filteredCustomers.map((client) => (
            <div
              key={client.id}
              className="bg-[#141414] border border-neutral-800 rounded-2xl p-4 space-y-3 shadow-card"
            >
              {/* Header: Initial, Name, and Role */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 text-brand-gold font-serif font-bold text-xs flex items-center justify-center shrink-0">
                    {client.avatarInitials || client.fullName.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-white text-xs truncate flex items-center gap-1.5">
                      <span>{client.fullName}</span>
                      {client.role === 'admin' && (
                        <span className="text-[9px] bg-brand-gold/20 text-brand-gold px-1.5 py-0.2 rounded font-bold uppercase">
                          Staff
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate">
                      {client.email}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] bg-neutral-800 text-brand-gold font-semibold px-2 py-0.5 rounded-full">
                    {client.orderCount} {client.orderCount === 1 ? 'order' : 'orders'}
                  </span>
                </div>
              </div>

              {/* Tier & Details Row */}
              <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs">
                <select
                  value={client.tier || 'Atelier Member'}
                  onChange={(e) => updateUserTier(client.id, e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 text-brand-gold font-medium rounded-lg px-2.5 py-1 text-[10px] focus:outline-none"
                >
                  <option value="Noir Atelier Member">Noir Atelier Member</option>
                  <option value="Executive VIP Client">Executive VIP Client</option>
                  <option value="Atelier Member">Atelier Member</option>
                  <option value="Standard Client">Standard Client</option>
                </select>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCustomer(client)}
                    className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold transition-colors"
                  >
                    Profile
                  </button>
                  {client.role !== 'admin' && (
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete client account for ${client.fullName}?`)) {
                          deleteUser(client.id);
                        }
                      }}
                      className="p-1 hover:bg-rose-950/40 text-neutral-500 hover:text-rose-400 rounded-lg transition-colors"
                      title="Delete Client Account"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Customer Profile Inspection Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141414] border border-neutral-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 text-white max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute right-6 top-6 text-neutral-400 hover:text-white transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 border-b border-neutral-800 pb-4">
              <span className="w-14 h-14 rounded-full bg-brand-gold/15 text-brand-gold font-serif font-bold text-xl flex items-center justify-center border border-brand-gold/30">
                {selectedCustomer.avatarInitials || 'CL'}
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                  {selectedCustomer.tier || 'Atelier Client'}
                </span>
                <h3 className="font-serif text-xl font-medium text-white">{selectedCustomer.fullName}</h3>
                <p className="text-xs text-neutral-400 font-light">{selectedCustomer.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
              <div>
                <span className="text-neutral-500 text-[10px] uppercase font-bold block">Phone</span>
                <span className="text-white">{selectedCustomer.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[10px] uppercase font-bold block">Joined</span>
                <span className="text-white">{selectedCustomer.joinedDate || '2024'}</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[10px] uppercase font-bold block">Total Orders</span>
                <span className="text-brand-gold font-bold">{selectedCustomer.orderCount}</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[10px] uppercase font-bold block">Role</span>
                <span className="text-white capitalize">{selectedCustomer.role || 'client'}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="w-full py-3 bg-brand-gold hover:bg-brand-goldDark text-black font-semibold rounded-xl uppercase tracking-widest text-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;

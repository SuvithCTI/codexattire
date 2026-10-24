import { useState, useMemo } from 'react';
import formatPrice from '../../utils/formatPrice';

export const AdminOrders = ({
  orders,
  onSaveOrders,
  selectedOrder,
  onCloseSelectedOrder,
  onSelectOrder,
}) => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const clientName = (order.customerName || `${order.address?.firstName || ''} ${order.address?.lastName || ''}`).toLowerCase();
      const orderId = (order.orderId || '').toLowerCase();
      const email = (order.email || order.address?.email || '').toLowerCase();
      const q = search.toLowerCase();

      const matchSearch = clientName.includes(q) || orderId.includes(q) || email.includes(q);
      const matchStatus = selectedStatus === 'all' || order.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [orders, search, selectedStatus]);

  const handleUpdateStatus = (orderId, newStatus) => {
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o));
    onSaveOrders(updated);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
      case 'Shipped':
        return 'bg-sky-500/15 text-sky-400 border border-sky-500/30';
      case 'Processing':
      case 'Pending':
        return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
      case 'Cancelled':
        return 'bg-rose-500/15 text-rose-400 border border-rose-500/30';
      default:
        return 'bg-neutral-800 text-neutral-300 border border-neutral-700';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-white">
            Client Orders & Dispatches
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-0.5">
            Monitor client dispatches, change tracking statuses, and inspect digital packing slips.
          </p>
        </div>

        {/* Quick order counter pills */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
            {orders.filter((o) => o.status === 'Processing' || o.status === 'Pending').length} Active
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            {orders.filter((o) => o.status === 'Delivered').length} Delivered
          </span>
        </div>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by Order ID, client name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-brand-gold rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-neutral-500 focus:outline-none"
          />
          <svg className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-brand-gold"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <span className="text-xs text-neutral-500 hidden sm:inline">
            Showing <strong className="text-white font-medium">{filteredOrders.length}</strong> orders
          </span>
        </div>
      </div>

      {/* Desktop Orders Table (hidden on mobile & tablet, visible on lg+) */}
      <div className="hidden lg:block bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/60 text-neutral-400 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-semibold">Order ID</th>
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Payment</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-neutral-500 text-xs font-light">
                    No orders match your filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const clientName = order.customerName || `${order.address?.firstName || ''} ${order.address?.lastName || ''}`;
                  return (
                    <tr key={order.orderId} className="hover:bg-white/[0.02] transition-colors">
                      {/* Order ID */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-brand-gold">
                        {order.orderId}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-neutral-400 font-light">
                        {order.date}
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-white">{clientName}</div>
                        <div className="text-[10px] text-neutral-500">{order.email || order.address?.email}</div>
                      </td>

                      {/* Payment */}
                      <td className="py-3.5 px-4 text-neutral-300">
                        <span className="truncate block max-w-[140px] text-[11px]">
                          {order.paymentMethod || 'Online Payment'}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-4 font-semibold text-white">
                        {formatPrice(order.total)}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.orderId, e.target.value)}
                          className={`text-[10px] font-bold uppercase tracking-wider rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer ${getStatusBadge(order.status)}`}
                        >
                          <option value="Pending" className="bg-neutral-900 text-amber-400">Pending</option>
                          <option value="Processing" className="bg-neutral-900 text-amber-400">Processing</option>
                          <option value="Shipped" className="bg-neutral-900 text-sky-400">Shipped</option>
                          <option value="Delivered" className="bg-neutral-900 text-emerald-400">Delivered</option>
                          <option value="Cancelled" className="bg-neutral-900 text-rose-400">Cancelled</option>
                        </select>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onSelectOrder(order)}
                          className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-brand-cream rounded-lg text-[10px] uppercase tracking-wider font-medium transition-colors"
                        >
                          View Slip
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Mobile View Alone (lg:hidden) */}
      <div className="lg:hidden space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-[#141414] border border-neutral-800 rounded-2xl p-8 text-center text-neutral-500 text-xs font-light">
            No orders match your filter.
          </div>
        ) : (
          filteredOrders.map((order) => {
            const clientName = order.customerName || `${order.address?.firstName || ''} ${order.address?.lastName || ''}`;
            return (
              <div
                key={order.orderId}
                className="bg-[#141414] border border-neutral-800 rounded-2xl p-4 space-y-3 shadow-card"
              >
                {/* Row 1: Order ID, Date & Total Price */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand-gold text-xs">
                        {order.orderId}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-light block mt-0.5">
                      {order.date}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-white text-sm block">
                      {formatPrice(order.total)}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {order.paymentMethod || 'Online'}
                    </span>
                  </div>
                </div>

                {/* Row 2: Customer Name & Email */}
                <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-semibold text-white text-xs truncate">
                      {clientName}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate">
                      {order.email || order.address?.email}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectOrder(order)}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-lg text-xs font-semibold shrink-0 transition-colors"
                  >
                    View Slip →
                  </button>
                </div>

                {/* Row 3: Status Selector */}
                <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                    Dispatch Status:
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order.orderId, e.target.value)}
                    className={`text-[10px] font-bold uppercase tracking-wider rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer ${getStatusBadge(order.status)}`}
                  >
                    <option value="Pending" className="bg-neutral-900 text-amber-400">Pending</option>
                    <option value="Processing" className="bg-neutral-900 text-amber-400">Processing</option>
                    <option value="Shipped" className="bg-neutral-900 text-sky-400">Shipped</option>
                    <option value="Delivered" className="bg-neutral-900 text-emerald-400">Delivered</option>
                    <option value="Cancelled" className="bg-neutral-900 text-rose-400">Cancelled</option>
                  </select>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#141414] border border-neutral-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-white max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <button
              onClick={onCloseSelectedOrder}
              className="absolute right-6 top-6 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Slip Header */}
            <div className="border-b border-neutral-800 pb-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                  ATELIER DISPATCH MANIFEST
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-medium text-white flex items-center gap-3">
                <span>Order {selectedOrder.orderId}</span>
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                Registered on {selectedOrder.date} • Payment: {selectedOrder.paymentMethod}
              </p>
            </div>

            {/* Customer & Shipping Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800/80 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold block">
                  Client Details
                </span>
                <div className="font-medium text-white">
                  {selectedOrder.customerName || `${selectedOrder.address?.firstName || ''} ${selectedOrder.address?.lastName || ''}`}
                </div>
                <div className="text-neutral-400">{selectedOrder.email || selectedOrder.address?.email}</div>
                <div className="text-neutral-400">{selectedOrder.phone || selectedOrder.address?.phone}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold block">
                  Shipping Destination
                </span>
                <div className="text-neutral-300 font-light">
                  {selectedOrder.address?.street}
                  {selectedOrder.address?.apartment && <span>, {selectedOrder.address?.apartment}</span>}
                </div>
                <div className="text-neutral-300 font-light">
                  {selectedOrder.address?.city}, {selectedOrder.address?.state} - {selectedOrder.address?.pincode}
                </div>
                <div className="text-neutral-400">India</div>
              </div>
            </div>

            {/* Line Items List */}
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400 block">
                Order Items ({selectedOrder.items?.length || 0})
              </span>

              <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/40">
                {(selectedOrder.items || []).map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || '/images/products/polo-tshirt.jpg'}
                        alt={item.name}
                        className="w-10 h-12 object-cover rounded-lg border border-neutral-800 bg-neutral-900"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/products/polo-tshirt.jpg';
                        }}
                      />
                      <div className="space-y-0.5">
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-[11px] text-neutral-400 font-light">
                          Qty: <span className="font-semibold text-white">{item.quantity}</span> • Size: <span className="font-semibold text-white">{item.size}</span>
                          {item.color && <span> • Color: {item.color}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold text-white shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Totals Summary */}
            <div className="p-4 bg-neutral-900/80 rounded-2xl border border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>{formatPrice(selectedOrder.subtotal || selectedOrder.total)}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Privilege Concession</span>
                  <span>- {formatPrice(selectedOrder.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Express Atelier Dispatch</span>
                <span>{selectedOrder.shippingFee === 0 ? 'Complimentary' : formatPrice(selectedOrder.shippingFee || 0)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-neutral-800">
                <span>Total Amount</span>
                <span className="text-brand-gold font-serif text-base">{formatPrice(selectedOrder.total)}</span>
              </div>
            </div>

            {/* Status Modification in Modal */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
                <span className="text-neutral-400">Modify Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    handleUpdateStatus(selectedOrder.orderId, e.target.value);
                    selectedOrder.status = e.target.value;
                  }}
                  className="bg-neutral-900 border border-neutral-700 text-white rounded-xl px-3 py-2 text-xs focus:border-brand-gold focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => alert(`Invoice printed / dispatched for Order ${selectedOrder.orderId}`)}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs uppercase tracking-wider font-medium transition-colors"
                >
                  Print Packing Slip
                </button>
                <button
                  type="button"
                  onClick={onCloseSelectedOrder}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-brand-gold text-black hover:bg-brand-goldDark font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

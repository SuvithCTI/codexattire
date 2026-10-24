import storage from '../utils/storage';
import { PRODUCTS } from './products';

export const DEFAULT_PROMOS = [
  {
    code: 'KODEX10',
    discountPercent: 10,
    minSpend: 999,
    active: true,
    description: 'Welcome 10% discount for all registered atelier clients.',
    expiryDate: '31 Dec 2026',
    usageCount: 142,
  },
  {
    code: 'VIP',
    discountPercent: 10,
    minSpend: 0,
    active: true,
    description: 'Complimentary 10% VIP concession on any order value.',
    expiryDate: 'Never',
    usageCount: 89,
  },
  {
    code: 'ATELIER15',
    discountPercent: 15,
    minSpend: 2499,
    active: true,
    description: 'Exclusive 15% discount for curated atelier wardrobe orders.',
    expiryDate: '15 Nov 2026',
    usageCount: 54,
  },
  {
    code: 'NOIR20',
    discountPercent: 20,
    minSpend: 4999,
    active: false,
    description: 'Private 20% privilege code for Noir Tier members.',
    expiryDate: 'Expired',
    usageCount: 31,
  },
];

export const DEFAULT_ORDERS = [
  {
    orderId: 'KDX-8921-BLR',
    date: '24 Oct 2026',
    status: 'Processing',
    customerName: 'Alex Mercer',
    email: 'alex.mercer@example.com',
    phone: '+91 98765 43210',
    paymentMethod: 'UPI (Google Pay)',
    subtotal: 5499,
    discount: 550,
    shippingFee: 0,
    total: 4949,
    address: {
      firstName: 'Alex',
      lastName: 'Mercer',
      email: 'alex.mercer@example.com',
      phone: '+91 98765 43210',
      street: '12 Richmond Residency, Lavelle Road',
      apartment: 'Penthouse 4B',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
    },
    items: [
      {
        id: 'prod-01',
        name: 'Heavyweight French Terry Boxy Tee',
        quantity: 1,
        size: 'L',
        color: 'Onyx Black',
        price: 2499,
        image: '/images/products/polo-tshirt.jpg',
      },
      {
        id: 'prod-02',
        name: 'Tailored Relaxed Pleated Trousers',
        quantity: 1,
        size: '32',
        color: 'Bone White',
        price: 3000,
        image: '/images/products/pants-pleated-brown-trouser.jpg',
      },
    ],
  },
  {
    orderId: 'KDX-7419-MUM',
    date: '23 Oct 2026',
    status: 'Shipped',
    customerName: 'Priya Singhania',
    email: 'priya.singhania@luxurymail.com',
    phone: '+91 98201 11223',
    paymentMethod: 'Credit Card (Visa •••• 4022)',
    subtotal: 3999,
    discount: 400,
    shippingFee: 0,
    total: 3599,
    address: {
      firstName: 'Priya',
      lastName: 'Singhania',
      email: 'priya.singhania@luxurymail.com',
      phone: '+91 98201 11223',
      street: '44 Sea Mist Mansions, Bandra West',
      apartment: 'Floor 12',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
    },
    items: [
      {
        id: 'prod-05',
        name: "Women's Cream Tie-Front Peasant Blouse",
        quantity: 1,
        size: 'M',
        color: 'Cream',
        price: 599,
        image: '/images/products/top-cream-tie-blouse.jpg',
      },
      {
        id: 'prod-21',
        name: "Women's Navy Floral Babydoll Tunic Top",
        quantity: 2,
        size: 'S',
        color: 'Navy Floral',
        price: 998,
        image: '/images/products/top-navy-floral-babydoll.jpg',
      },
    ],
  },
  {
    orderId: 'KDX-6320-DEL',
    date: '22 Oct 2026',
    status: 'Delivered',
    customerName: 'Rohan Varma',
    email: 'rohan.v@techfoundry.in',
    phone: '+91 99100 88776',
    paymentMethod: 'UPI (PhonePe QR)',
    subtotal: 2199,
    discount: 0,
    shippingFee: 0,
    total: 2199,
    address: {
      firstName: 'Rohan',
      lastName: 'Varma',
      email: 'rohan.v@techfoundry.in',
      phone: '+91 99100 88776',
      street: '18 Golf Links Avenue',
      apartment: 'Villa 3',
      city: 'Delhi NCR',
      state: 'Delhi NCR',
      pincode: '110003',
    },
    items: [
      {
        id: 'prod-08',
        name: 'Textured Waffle Knit Oversized Polo',
        quantity: 1,
        size: 'XL',
        color: 'Ecru Sand',
        price: 2199,
        image: '/images/products/tshirt-cream-waffle-polo.jpg',
      },
    ],
  },
  {
    orderId: 'KDX-5211-HYD',
    date: '21 Oct 2026',
    status: 'Delivered',
    customerName: 'Ananya Reddy',
    email: 'ananya.reddy@hyddesign.com',
    phone: '+91 94401 55432',
    paymentMethod: 'Cash on Delivery (COD)',
    subtotal: 1899,
    discount: 189,
    shippingFee: 99,
    total: 1809,
    address: {
      firstName: 'Ananya',
      lastName: 'Reddy',
      email: 'ananya.reddy@hyddesign.com',
      phone: '+91 94401 55432',
      street: 'Jubilee Hills Road No. 36',
      apartment: 'Villa 14',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033',
    },
    items: [
      {
        id: 'prod-09',
        name: 'Vintage Wash Wide-Leg Skate Denim',
        quantity: 1,
        size: '30',
        color: 'Washed Black',
        price: 1899,
        image: '/images/products/pants-washed-black-baggy.jpg',
      },
    ],
  },
  {
    orderId: 'KDX-4102-BLR',
    date: '20 Oct 2026',
    status: 'Cancelled',
    customerName: 'Karan Mehra',
    email: 'karan.m@gmail.com',
    phone: '+91 98450 12345',
    paymentMethod: 'Net Banking (HDFC)',
    subtotal: 1299,
    discount: 0,
    shippingFee: 99,
    total: 1398,
    address: {
      firstName: 'Karan',
      lastName: 'Mehra',
      email: 'karan.m@gmail.com',
      phone: '+91 98450 12345',
      street: 'Indiranagar 100ft Road',
      apartment: '',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560038',
    },
    items: [
      {
        id: 'prod-03',
        name: 'Archival Graphic Drop Shoulder Tee',
        quantity: 1,
        size: 'M',
        color: 'Vintage White',
        price: 1299,
        image: '/images/products/tshirt-white-minimal-graphic.jpg',
      },
    ],
  },
];

export const DEFAULT_INQUIRIES = [
  {
    id: 'inq_101',
    date: '24 Oct 2026',
    name: 'Sameer Singhania',
    email: 'sameer.s@singhaniaholdings.com',
    phone: '+91 98200 44556',
    inquiryType: 'Private Client Concierge',
    message: 'We are requesting a bespoke private fitting session for 4 gentlemen for an upcoming gala in Mumbai next month.',
    status: 'Pending',
  },
  {
    id: 'inq_102',
    date: '23 Oct 2026',
    name: 'Devika Kapoor',
    email: 'devika.k@gmail.com',
    phone: '+91 98111 22334',
    inquiryType: 'Custom Studio Bespoke Tailoring',
    message: 'Can I request crystal butterfly placement on the black oversized heavyweight hoodie with custom initials embroidered on the cuff?',
    status: 'Answered',
  },
  {
    id: 'inq_103',
    date: '22 Oct 2026',
    name: 'Vikramaditya Roy',
    email: 'vikram.roy@atelierkolkata.in',
    phone: '+91 98300 99887',
    inquiryType: 'Wholesale & Editorial Collaborations',
    message: 'Interested in featuring KODE X ATTIRE capsule items for an autumn fashion editorial shoot in Delhi.',
    status: 'Answered',
  },
];

// Helper to access and initialize live products
export const getAdminProducts = () => {
  const saved = storage.get('products', null);
  if (!saved || !Array.isArray(saved) || saved.length === 0) {
    const initialized = PRODUCTS.map((p, idx) => {
      const sampleStock = idx === 3 ? 3 : idx === 7 ? 0 : 25;
      return {
        ...p,
        stock: p.stock !== undefined ? p.stock : sampleStock,
        inStock: p.stock !== undefined ? p.stock > 0 : sampleStock > 0,
      };
    });
    storage.set('products', initialized);
    return initialized;
  }
  return saved.map((p) => {
    const stockQty = p.stock !== undefined ? p.stock : (p.inStock === false ? 0 : 20);
    return {
      ...p,
      stock: stockQty,
      inStock: stockQty > 0,
    };
  });
};

export const saveAdminProducts = (products) => {
  storage.set('products', products);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('kodex_products_updated', { detail: products }));
  }
};

// Helper for orders
export const getAdminOrders = () => {
  const saved = storage.get('all_orders', null);
  if (!saved || !Array.isArray(saved) || saved.length === 0) {
    storage.set('all_orders', DEFAULT_ORDERS);
    return DEFAULT_ORDERS;
  }
  return saved;
};

export const saveAdminOrders = (orders) => {
  storage.set('all_orders', orders);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('kodex_orders_updated', { detail: orders }));
  }
};

// Helper for promos
export const getAdminPromos = () => {
  const saved = storage.get('promo_codes', null);
  if (!saved || !Array.isArray(saved) || saved.length === 0) {
    storage.set('promo_codes', DEFAULT_PROMOS);
    return DEFAULT_PROMOS;
  }
  return saved;
};

export const saveAdminPromos = (promos) => {
  storage.set('promo_codes', promos);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('kodex_promos_updated', { detail: promos }));
  }
};

// Helper for inquiries
export const getAdminInquiries = () => {
  const saved = storage.get('client_inquiries', null);
  if (!saved || !Array.isArray(saved) || saved.length === 0) {
    storage.set('client_inquiries', DEFAULT_INQUIRIES);
    return DEFAULT_INQUIRIES;
  }
  return saved;
};

export const saveAdminInquiries = (inquiries) => {
  storage.set('client_inquiries', inquiries);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('kodex_inquiries_updated', { detail: inquiries }));
  }
};

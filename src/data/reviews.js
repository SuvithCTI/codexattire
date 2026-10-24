/**
 * KODE X ATTIRE - Realtime Verified Reviews Data (Tamil Nadu)
 */

export const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    author: 'Karthik Sundaram',
    city: 'Chennai, Tamil Nadu',
    category: 'men',
    productName: "Men's White Textured Casual Shirt",
    rating: 5,
    date: '14 minutes ago',
    timestamp: Date.now() - 14 * 60 * 1000,
    verified: true,
    title: 'Very comfortable and good fit',
    comment:
      'Fabric is very soft and breathable for Chennai weather. Fits true to size and delivered in 2 days.',
    fit: 'True to size'
  },
  {
    id: 'rev-02',
    author: 'Priya Natarajan',
    city: 'Coimbatore, Tamil Nadu',
    category: 'women',
    productName: "Women's Cream Tie-Front Peasant Blouse",
    rating: 5,
    date: '38 minutes ago',
    timestamp: Date.now() - 38 * 60 * 1000,
    verified: true,
    title: 'Loved the design and stitching',
    comment:
      'Stitching and ribbon quality is very neat. Looks exact like photo. Very happy with the purchase.',
    fit: 'Perfect fit'
  },
  {
    id: 'rev-03',
    author: 'Vigneshwaran R.',
    city: 'Madurai, Tamil Nadu',
    category: 'men',
    productName: "Men's Light Wash Wide-Leg Denim Pants",
    rating: 5,
    date: '1 hour ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    verified: true,
    title: 'Great wide leg fit',
    comment:
      'Denim material is thick and sturdy. Fits comfortably on waist and length is just right.',
    fit: 'Relaxed wide fit'
  },
  {
    id: 'rev-04',
    author: 'Meenakshi S.',
    city: 'Tiruchirappalli, Tamil Nadu',
    category: 'women',
    productName: "Women's Ivory & Indigo Embroidered Kurta Set",
    rating: 5,
    date: '2 hours ago',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    verified: true,
    title: 'Elegant for office & functions',
    comment:
      'Cloth is pure soft cotton and the embroidery work is neat. Dupatta length is also good.',
    fit: 'Tailored fit'
  },
  {
    id: 'rev-05',
    author: 'Praveen Kumar',
    city: 'Tiruppur, Tamil Nadu',
    category: 'men',
    productName: "Men's Colorblock Zip Knit Polo",
    rating: 5,
    date: '3 hours ago',
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
    verified: true,
    title: 'Superb fabric quality',
    comment:
      'Being from Tiruppur I know fabric quality, and this knit cotton is genuinely premium and soft.',
    fit: 'Regular fit'
  },
  {
    id: 'rev-06',
    author: 'Divya Prakash',
    city: 'Salem, Tamil Nadu',
    category: 'women',
    productName: "Women's Raw Hem Wide-Leg Jeans",
    rating: 5,
    date: '5 hours ago',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    verified: true,
    title: 'Perfect high-waist jeans',
    comment:
      'Fits really well on waist and thighs. Comfortable to wear all day and shade looks great.',
    fit: 'True to waist size'
  },
  {
    id: 'rev-07',
    author: 'Arvind Kumar',
    city: 'Erode, Tamil Nadu',
    category: 'men',
    productName: "Men's Minimalist Line Graphic Tee",
    rating: 5,
    date: '7 hours ago',
    timestamp: Date.now() - 7 * 60 * 60 * 1000,
    verified: true,
    title: 'Nice simple t-shirt',
    comment:
      'Good heavy cotton cloth. Neck ribbing stays intact after wash. Very good value for money.',
    fit: 'Comfortable regular'
  },
  {
    id: 'rev-08',
    author: 'Keerthana R.',
    city: 'Vellore, Tamil Nadu',
    category: 'women',
    productName: "Women's Maroon Flared Anarkali Kurta Set",
    rating: 5,
    date: '1 day ago',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    verified: true,
    title: 'Beautiful flare and color',
    comment:
      'Color is rich maroon and flare is wide. Received good compliments at a family function.',
    fit: 'Flared fit'
  }
];

const STORAGE_KEY = 'kodex_realtime_reviews_tn_v2';

export const getStoredReviews = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading reviews from localStorage:', err);
  }
  return INITIAL_REVIEWS;
};

export const saveNewReview = (reviewData) => {
  try {
    const current = getStoredReviews();
    const newReview = {
      id: `rev-${Date.now()}`,
      date: 'Just now',
      timestamp: Date.now(),
      verified: true,
      ...reviewData
    };
    const updated = [newReview, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving review to localStorage:', err);
    return INITIAL_REVIEWS;
  }
};

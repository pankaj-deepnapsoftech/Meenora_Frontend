
export const products = [
  {
    id: 1,
    name: "Meenora Nourishing Shampoo",
    description: "Revitalize your hair with our natural shampoo, designed for daily nourishment and shine.",
    price: 24.99,
    image: "Elegant bottle of Meenora Nourishing Shampoo with botanical elements",
    category: "Hair Care",
    inStock: true,
    featured: true,
    ingredients: ["Argan Oil", "Aloe Vera", "Vitamin E", "Pea Protein"],
    benefits: ["Reduces Hair Loss", "Improves Shine & Smoothness", "Restores pH Balance", "Deeply Nourishes Scalp"],
    howToUse: "Apply a generous amount to wet hair. Gently massage into scalp and through to ends. Rinse thoroughly. For best results, follow with Meenora Hydrating Conditioner.",
    concern: "Hair Growth",
    tags: ["Bestseller", "Hair Growth"]
  },
  {
    id: 2,
    name: "Meenora Hydrating Conditioner",
    description: "Deeply moisturize and detangle your hair, leaving it silky smooth and manageable.",
    price: 26.99,
    image: "Luxurious bottle of Meenora Hydrating Conditioner with floral accents",
    category: "Hair Care",
    inStock: true,
    featured: true,
    ingredients: ["Shea Butter", "Coconut Oil", "Biotin", "Soy Protein"],
    benefits: ["Intense Hydration", "Reduces Breakage", "Adds Softness & Shine", "Detangles Effortlessly"],
    howToUse: "After shampooing, apply generously to hair, focusing on mid-lengths and ends. Leave in for 2-3 minutes. Rinse thoroughly.",
    concern: "Hair Damage",
    tags: ["Bestseller", "Hair Damage Repair"]
  },
  {
    id: 3,
    name: "Meenora Protective Sunscreen Cream SPF 50",
    description: "Lightweight, broad-spectrum sunscreen to shield your skin from harmful UV rays.",
    price: 32.99,
    image: "Sleek tube of Meenora Protective Sunscreen Cream with sun icon",
    category: "Skincare",
    inStock: false,
    comingSoon: true,
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Hyaluronic Acid", "Green Tea Extract"],
    benefits: ["Broad Spectrum SPF 50", "Lightweight & Non-Greasy", "Moisturizes Skin", "Prevents Sun Damage"],
    howToUse: "Apply generously and evenly to all exposed skin 15 minutes before sun exposure. Reapply at least every 2 hours, or after swimming or sweating.",
    concern: "Face Care",
    tags: ["Coming Soon", "Face Care"]
  },
  {
    id: 4,
    name: "Meenora Daily Glow Moisturiser",
    description: "Hydrate and illuminate your skin with our nourishing daily moisturiser.",
    price: 28.99,
    image: "Chic jar of Meenora Daily Glow Moisturiser with dewy texture",
    category: "Skincare",
    inStock: false,
    comingSoon: true,
    ingredients: ["Hyaluronic Acid", "Vitamin C", "Niacinamide", "Squalane"],
    benefits: ["Deep Hydration", "Boosts Radiance", "Evens Skin Tone", "Lightweight Formula"],
    howToUse: "Apply a small amount to cleansed face and neck, morning and night. Gently massage until fully absorbed.",
    concern: "Face Care",
    tags: ["Coming Soon", "Face Care"]
  },
  {
    id: 5,
    name: "Meenora Gentle Purifying Face Wash",
    description: "Cleanse and refresh your skin without stripping its natural moisture.",
    price: 22.99,
    image: "Minimalist bottle of Meenora Gentle Purifying Face Wash with water droplet effect",
    category: "Skincare",
    inStock: false,
    comingSoon: true,
    ingredients: ["Chamomile Extract", "Aloe Vera", "Glycerin", "Salicylic Acid (mild)"],
    benefits: ["Gently Cleanses", "Soothes Skin", "Removes Impurities", "Maintains pH Balance"],
    howToUse: "Wet face with lukewarm water. Apply a small amount of face wash and gently massage in circular motions. Rinse thoroughly and pat dry.",
    concern: "Face Care",
    tags: ["Coming Soon", "Face Care"]
  },
  {
    id: 6,
    name: "Meenora Hair Styling Gel",
    description: "Achieve your desired hairstyle with a strong, natural hold.",
    price: 19.99,
    image: "Modern tube of Meenora Hair Styling Gel with dynamic swirl design",
    category: "Hair Care",
    inStock: true,
    featured: false,
    ingredients: ["Flaxseed Extract", "Aloe Vera", "Pro-Vitamin B5"],
    benefits: ["Strong Hold", "Non-Sticky", "Adds Shine", "Nourishes Hair"],
    howToUse: "Apply a small amount to damp or dry hair. Style as desired. For external use only.",
    concern: "Hair Styling",
    tags: ["Hair Styling"]
  },
  {
    id: 7,
    name: "Meenora Curl Defining Cream",
    description: "Enhance and define your natural curls with this moisturizing cream.",
    price: 23.99,
    image: "Elegant jar of Meenora Curl Defining Cream with curl illustration",
    category: "Hair Care",
    inStock: true,
    featured: false,
    ingredients: ["Shea Butter", "Argan Oil", "Keratin"],
    benefits: ["Defines Curls", "Reduces Frizz", "Moisturizes", "Adds Bounce"],
    howToUse: "Apply to damp hair from roots to ends. Scrunch hair to encourage curl formation. Air dry or diffuse.",
    concern: "Curl Care",
    tags: ["Curl Care"]
  }
];

export const categories = [
  { id: 1, name: "All Products", slug: "all" },
  { id: 2, name: "Hair Care", slug: "hair-care" },
  { id: 3, name: "Skincare", slug: "skincare" },
  { id: 4, name: "Hair Growth", slug: "hair-growth" },
  { id: 5, name: "Hair Damage", slug: "hair-damage" },
  { id: 6, name: "Hair Styling", slug: "hair-styling" },
  { id: 7, name: "Curl Care", slug: "curl-care" },
  { id: 8, name: "Face Care", slug: "face-care" }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (categorySlug) => {
  if (categorySlug === "all") return products;
  const category = categories.find(cat => cat.slug === categorySlug);
  if (!category) return [];
  return products.filter(product => product.category.toLowerCase().replace(' ', '-') === category.slug || product.concern === category.name);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getAvailableProducts = () => {
  return products.filter(product => product.inStock);
};

export const getComingSoonProducts = () => {
  return products.filter(product => product.comingSoon);
};

export const getProductsByConcern = (concern) => {
  return products.filter(product => product.concern === concern);
};

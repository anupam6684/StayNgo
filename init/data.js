const sampleListings = [
  {
    title: "Beachside Bungalow",
    description:
      "Enjoy ocean views and fresh air in this beautiful seaside home.",
    image: {
      url: "https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "beachside-bungalow",
    },
    price: 150,
    location: "Goa",
    country: "India",
  },
  {
    title: "Mountain Escape Cabin",
    description: "Perfect hideaway in the hills, surrounded by pine trees.",
    image: {
      url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "mountain-escape-cabin",
    },
    price: 200,
    location: "Manali",
    country: "India",
  },
  {
    title: "Urban Loft",
    description: "Modern loft with skyline views, ideal for city explorers.",
    image: {
      url: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "urban-loft",
    },
    price: 180,
    location: "Mumbai",
    country: "India",
  },
  {
    title: "Desert Camp",
    description: "Traditional-style camp with camel rides and starry nights.",
    image: {
      url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "desert-camp",
    },
    price: 90,
    location: "Jaisalmer",
    country: "India",
  },
  {
    title: "Tea Garden Cottage",
    description: "Stay amidst tea plantations with scenic valley views.",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1676139860076-bc568722ff75?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "tea-garden-cottage",
    },
    price: 120,
    location: "Darjeeling",
    country: "India",
  },
  {
    title: "Backwater Houseboat",
    description:
      "A floating stay with all the comforts and peaceful backwaters.",
    image: {
      url: "https://images.unsplash.com/photo-1471623320832-752e8bbf8413?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "backwater-houseboat",
    },
    price: 250,
    location: "Alleppey",
    country: "India",
  },
  {
    title: "Snow Chalet",
    description: "Warm wooden interiors with snow all around—cozy and magical.",
    image: {
      url: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "snow-chalet",
    },
    price: 300,
    location: "Gulmarg",
    country: "India",
  },
  {
    title: "Lakeview Villa",
    description: "Spacious villa overlooking a quiet lake, great for families.",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1688137879530-873373c077e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "lakeview-villa",
    },
    price: 220,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Jungle Treehouse",
    description: "Live among the treetops and explore nearby wildlife trails.",
    image: {
      url: "https://images.unsplash.com/photo-1612445076771-7ab7c46780a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "jungle-treehouse",
    },
    price: 160,
    location: "Wayanad",
    country: "India",
  },
  {
    title: "City Center Studio",
    description: "Compact and modern studio in the heart of the city.",
    image: {
      url: "https://images.unsplash.com/photo-1579616075377-696d66a6e373?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "city-center-studio",
    },
    price: 110,
    location: "Bangalore",
    country: "India",
  },
  {
    title: "Himalayan Retreat",
    description: "A serene stay with panoramic mountain views and fresh air.",
    image: {
      url: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "himalayan-retreat",
    },
    price: 180,
    location: "Shimla",
    country: "India",
  },
  {
    title: "Modern City Flat",
    description:
      "A sleek apartment in the heart of the city with all amenities.",
    image: {
      url: "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "modern-city-flat",
    },
    price: 140,
    location: "Delhi",
    country: "India",
  },
  {
    title: "Coastal Paradise",
    description: "White sand, blue water, and a cozy beachside cottage.",
    image: {
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "coastal-paradise",
    },
    price: 200,
    location: "Pondicherry",
    country: "India",
  },
  {
    title: "Forest Edge Homestay",
    description: "Peaceful homestay on the edge of a lush green forest.",
    image: {
      url: "https://images.unsplash.com/photo-1552903023-dc7b4c9fa5bf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "forest-edge-homestay",
    },
    price: 100,
    location: "Coorg",
    country: "India",
  },
  {
    title: "Luxury Lake Resort",
    description:
      "Spacious rooms with balconies facing the lake, full-service spa included.",
    image: {
      url: "https://images.unsplash.com/photo-1559910369-3924e235c1cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      filename: "luxury-lake-resort",
    },
    price: 280,
    location: "Nainital",
    country: "India",
  },
];

module.exports = { data: sampleListings };

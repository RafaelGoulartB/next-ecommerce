const products = [
  {
    id: 1,
    name: 'Apple iPhone SE (64GB, Black)',
    description:
      '4.7-inch Retina HD display, water and dust resistant, with a fast A13 Bionic chip and a 12MP camera.',
    img_url: '/products/81hCytKTUTL.jpg',
    price: 250.52,
    rating: 4.5,
    category: 'smartphone',
  },
  {
    id: 2,
    name: 'Nintendo Switch with Neon Blue',
    description:
      'Hybrid console with TV, tabletop and handheld play styles and a 6.2-inch multi-touch screen.',
    img_url: '/products/61JnrafZ7zL._AC_SL1457_.jpg',
    price: 374.88,
    rating: 2,
    category: 'videogame',
  },
  {
    id: 3,
    name: 'Ring Fit Adventure - Nintendo Switch',
    description:
      'An adventure game and workout experience with a fantasy world, exercise-based battles and dozens of levels.',
    img_url: '/products/81V7L6auixL._SL1500_.jpg',
    price: 109,
    rating: 4.7,
    category: 'videogame',
  },
  {
    id: 4,
    name: 'Acer SB220Q 21.5-inch Full HD Monitor',
    description:
      'Slim IPS monitor with 1920 x 1080 resolution, zero-frame design, HDMI and VGA ports.',
    img_url: '/products/81QpkIctqPL._AC_SL1500_.jpg',
    price: 89.99,
    rating: 2.8,
    category: 'computers',
  },
  {
    id: 5,
    name: 'ASUS VivoBook 15 Thin and Light Laptop',
    description:
      '15.6-inch Full HD laptop with Intel Core i3, 8GB RAM, 128GB SSD, backlit keyboard and fingerprint reader.',
    img_url: '/products/81fstJkUlaL._AC_SL1500_.jpg',
    price: 484.66,
    rating: 2,
    category: 'laptop',
  },
  {
    id: 6,
    name: 'AmazonBasics Wireless Keyboard and Mouse Combo',
    description:
      'Full-size wireless keyboard and mouse combo with a comfortable US QWERTY layout for everyday work.',
    img_url: '/products/71nmrSRQ3cL._AC_SL1500_.jpg',
    price: 39.49,
    rating: 3.5,
    category: 'keyboard',
  },
  {
    id: 7,
    name: 'Michael Kors Slim Runway Stainless Steel Watch',
    description:
      '44mm stainless steel watch with black dial, gold-tone indexes, three-hand movement and bracelet.',
    img_url: '/products/71xe2bDZ0nL._AC_UX679_.jpg',
    price: 188.67,
    rating: 4,
    category: 'watch',
  },
  {
    id: 8,
    name: 'Acer Aspire TC-885-UA92 Desktop',
    description:
      'Desktop computer with Intel Core i5, 12GB DDR4 RAM, 512GB SSD, Wi-Fi and USB-C connectivity.',
    img_url: '/products/61UgXsi%2BmcL._AC_SL1500_.jpg',
    price: 549.99,
    rating: 4,
    category: 'computers',
  },
  {
    id: 9,
    name: 'Acer Aspire 5 15.6-inch Full HD Laptop',
    description:
      'Full HD IPS laptop with Intel Core i5, 8GB RAM, 256GB NVMe SSD, Wi-Fi 6 and a backlit keyboard.',
    img_url: '/products/71S-XwHaGzL._AC_SL1500_.jpg',
    price: 699,
    rating: 5,
    category: 'laptop',
  },
  {
    id: 10,
    name: 'Moto G Stylus 128GB',
    description:
      'Unlocked smartphone with 4GB RAM, 128GB storage, 48MP camera and a built-in stylus.',
    img_url: '/products/61xQRmY%2BRRL._AC_SL1500_.jpg',
    price: 269.99,
    rating: 3.8,
    category: 'smartphone',
  },
  {
    id: 11,
    name: 'Xiaomi Redmi Note 8 Pro',
    description:
      '6.53-inch smartphone with 6GB RAM, 64GB storage, 64MP camera and a powerful octa-core processor.',
    img_url: '/products/81UgYuadkpL._AC_SL1500_.jpg',
    price: 208.99,
    rating: 5,
    category: 'smartphone',
  },
  {
    id: 12,
    name: 'DOSS SoundBox Plus Bluetooth Speaker',
    description:
      'Portable 16W Bluetooth speaker with deep bass, stereo pairing and up to 20 hours of playtime.',
    img_url: '/products/71VqtdDUzsL._AC_SL1500_.jpg',
    price: 39.99,
    rating: 3.7,
    category: 'speaker',
  },
  {
    id: 13,
    name: 'Dell OptiPlex 7090 Desktop',
    description:
      'Business desktop with Intel Core i7 performance, compact design and fast solid-state storage.',
    img_url: '/products/61UgXsi%2BmcL._AC_SL1500_.jpg',
    price: 789.99,
    rating: 4.2,
    category: 'computers',
  },
  {
    id: 14,
    name: 'Apple iMac 24-inch M1',
    description:
      'All-in-one desktop with Apple M1 chip, vivid 24-inch display and a clean, ultra-thin design.',
    img_url: '/products/81fstJkUlaL._AC_SL1500_.jpg',
    price: 1199,
    rating: 4.6,
    category: 'mac',
  },
  {
    id: 15,
    name: 'Apple MacBook Air M2',
    description:
      'Lightweight MacBook with M2 chip, long battery life, crisp display and silent fanless operation.',
    img_url: '/products/71S-XwHaGzL._AC_SL1500_.jpg',
    price: 999,
    rating: 4.8,
    category: 'mac',
  },
  {
    id: 16,
    name: 'Apple Mac mini M2',
    description:
      'Compact desktop powered by the Apple M2 chip with fast connectivity for home and office setups.',
    img_url: '/products/61UgXsi%2BmcL._AC_SL1500_.jpg',
    price: 599,
    rating: 4.4,
    category: 'mac',
  },
  {
    id: 17,
    name: 'Lenovo IdeaPad 3 15.6-inch Laptop',
    description:
      'Reliable everyday laptop with Full HD display, comfortable keyboard and ample storage for work and study.',
    img_url: '/products/81fstJkUlaL._AC_SL1500_.jpg',
    price: 429.99,
    rating: 3.9,
    category: 'laptop',
  },
  {
    id: 18,
    name: 'Logitech MX Keys Wireless Keyboard',
    description:
      'Premium wireless keyboard with low-profile keys, backlighting and multi-device support.',
    img_url: '/products/71nmrSRQ3cL._AC_SL1500_.jpg',
    price: 99.99,
    rating: 4.5,
    category: 'keyboard',
  },
  {
    id: 19,
    name: 'Razer BlackWidow V3 Mechanical Keyboard',
    description:
      'Mechanical gaming keyboard with tactile switches, customizable lighting and a durable aluminum frame.',
    img_url: '/products/71nmrSRQ3cL._AC_SL1500_.jpg',
    price: 129.99,
    rating: 4.3,
    category: 'keyboard',
  },
  {
    id: 20,
    name: 'Kingston Fury 16GB DDR4 Memory Kit',
    description:
      'High-speed 16GB DDR4 memory kit designed to improve multitasking and gaming performance.',
    img_url: '/products/61UgXsi%2BmcL._AC_SL1500_.jpg',
    price: 54.99,
    rating: 4.4,
    category: 'components',
  },
  {
    id: 21,
    name: 'Samsung 980 1TB NVMe SSD',
    description:
      'Fast 1TB NVMe solid-state drive with reliable performance for applications, games and daily storage.',
    img_url: '/products/61UgXsi%2BmcL._AC_SL1500_.jpg',
    price: 79.99,
    rating: 4.7,
    category: 'components',
  },
  {
    id: 22,
    name: 'Corsair CV650 650W Power Supply',
    description:
      '650W power supply with efficient operation and dependable power delivery for desktop components.',
    img_url: '/products/61UgXsi%2BmcL._AC_SL1500_.jpg',
    price: 69.99,
    rating: 4.1,
    category: 'components',
  },
  {
    id: 23,
    name: 'JBL Flip 6 Portable Bluetooth Speaker',
    description:
      'Portable waterproof speaker with bold sound, durable construction and all-day battery life.',
    img_url: '/products/71VqtdDUzsL._AC_SL1500_.jpg',
    price: 129.95,
    rating: 4.6,
    category: 'speaker',
  },
  {
    id: 24,
    name: 'Logitech Z407 Bluetooth Computer Speakers',
    description:
      'Desktop speaker system with immersive sound, wireless control dial and flexible placement options.',
    img_url: '/products/71VqtdDUzsL._AC_SL1500_.jpg',
    price: 119.99,
    rating: 4.2,
    category: 'speaker',
  },
  {
    id: 25,
    name: 'LG 50-inch 4K UHD Smart TV',
    description:
      '4K smart television with vivid HDR picture, streaming apps and a slim modern profile.',
    img_url: '/products/81QpkIctqPL._AC_SL1500_.jpg',
    price: 399.99,
    rating: 4.3,
    category: 'tv',
  },
  {
    id: 26,
    name: 'Samsung 55-inch Crystal UHD 4K TV',
    description:
      'Large 4K smart TV with vibrant colors, smooth motion and an easy-to-use connected interface.',
    img_url: '/products/81QpkIctqPL._AC_SL1500_.jpg',
    price: 549.99,
    rating: 4.5,
    category: 'tv',
  },
  {
    id: 27,
    name: 'TCL 43-inch Android TV',
    description:
      'Compact 4K television with Android TV, built-in streaming and clear picture quality for small rooms.',
    img_url: '/products/81QpkIctqPL._AC_SL1500_.jpg',
    price: 279.99,
    rating: 4,
    category: 'tv',
  },
  {
    id: 28,
    name: 'PlayStation 5 Digital Edition',
    description:
      'Digital gaming console with fast SSD loading, immersive graphics and a next-generation controller.',
    img_url: '/products/61JnrafZ7zL._AC_SL1457_.jpg',
    price: 399.99,
    rating: 4.4,
    category: 'videogame',
  },
  {
    id: 29,
    name: 'Apple Watch SE',
    description:
      'Smartwatch with activity tracking, notifications, workout tools and a bright Retina display.',
    img_url: '/products/71xe2bDZ0nL._AC_UX679_.jpg',
    price: 249,
    rating: 4.3,
    category: 'watch',
  },
  {
    id: 30,
    name: 'Casio G-Shock Classic Watch',
    description:
      'Rugged everyday watch with shock resistance, reliable quartz movement and a durable case.',
    img_url: '/products/71xe2bDZ0nL._AC_UX679_.jpg',
    price: 89.99,
    rating: 4.1,
    category: 'watch',
  },
];

module.exports = products;

// Dynamic product catalog generator script
// Outputs 360+ unique, detailed electronic products in 5 categories

const brandsByCategory = {
    smartphones: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Redmi', 'POCO', 'Realme', 'Vivo', 'Oppo', 'Motorola', 'Nothing', 'Google'],
    headphones: ['Sony', 'JBL', 'Boat', 'Sennheiser', 'Skullcandy', 'Bose', 'Apple', 'Beats'],
    smartwatches: ['Apple', 'Samsung', 'Garmin', 'Amazfit', 'Noise', 'Fire-Boltt', 'Boat'],
    laptops: ['Apple', 'HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'MSI', 'Razer'],
    gaming: ['Logitech', 'Razer', 'Corsair', 'HyperX', 'SteelSeries', 'Sony', 'Microsoft']
};

const colors = ['Midnight Black', 'Platinum Silver', 'Deep Blue', 'Forest Green', 'Rose Gold', 'Space Gray', 'Titanium Gold', 'Alpine White'];

// Categories map
const categories = ['smartphones', 'headphones', 'smartwatches', 'laptops', 'gaming'];

// Unsplash base images for categories to generate working image arrays
const categoryImages = {
    smartphones: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
        'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80',
        'https://images.unsplash.com/photo-1565849906461-096573c7a140?w=600&q=80',
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
        'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=600&q=80',
        'https://images.unsplash.com/photo-1533228893-a40d82945217?w=600&q=80',
        'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80'
    ],
    headphones: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
        'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80',
        'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=600&q=80',
        'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&q=80',
        'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=600&q=80',
        'https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=600&q=80'
    ],
    smartwatches: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
        'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80',
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80',
        'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80',
        'https://images.unsplash.com/photo-1517502884422-41eaaced0168?w=600&q=80',
        'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80',
        'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600&q=80'
    ],
    laptops: [
        'https://images.unsplash.com/photo-1496181130204-7552cc145cd6?w=600&q=80',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80',
        'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80',
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80'
    ],
    gaming: [
        'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80',
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
        'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&q=80',
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
        'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80',
        'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=600&q=80',
        'https://images.unsplash.com/photo-1592155977684-f06051783005?w=600&q=80',
        'https://images.unsplash.com/photo-1612480186146-7e6e22e1488c?w=600&q=80'
    ]
};

// Generate deterministic spec list based on attributes
const getSpecs = (category, brand, level) => {
    const list = [];
    if (category === 'smartphones') {
        list.push({ label: 'Display', value: level === 'flagship' ? '6.7" OLED 120Hz LTPO' : level === 'premium' ? '6.5" AMOLED 120Hz' : '6.4" LCD 90Hz' });
        list.push({ label: 'Processor', value: brand === 'Apple' ? 'Apple A17 Pro' : brand === 'Google' ? 'Google Tensor G3' : level === 'flagship' ? 'Snapdragon 8 Gen 3' : 'MediaTek Dimensity 7200' });
        list.push({ label: 'RAM', value: level === 'flagship' ? '12GB / 16GB' : level === 'premium' ? '8GB' : '6GB' });
        list.push({ label: 'Storage', value: level === 'flagship' ? '256GB / 512GB' : '128GB' });
        list.push({ label: 'Camera', value: level === 'flagship' ? '200MP Triple System' : '50MP Dual System' });
        list.push({ label: 'Battery', value: '5000 mAh' });
    } else if (category === 'laptops') {
        list.push({ label: 'Display', value: level === 'flagship' ? '16" QHD+ OLED 120Hz' : '15.6" Full HD IPS' });
        list.push({ label: 'Processor', value: brand === 'Apple' ? 'Apple M3 Pro' : level === 'flagship' ? 'Intel Core i9 14th Gen' : 'Intel Core i5 / AMD Ryzen 5' });
        list.push({ label: 'RAM', value: level === 'flagship' ? '32GB DDR5' : '16GB DDR4' });
        list.push({ label: 'Storage', value: level === 'flagship' ? '1TB NVMe SSD' : '512GB SSD' });
        list.push({ label: 'Graphics', value: level === 'flagship' ? 'NVIDIA RTX 4080 12GB' : 'Intel Iris Xe Graphics' });
        list.push({ label: 'OS', value: brand === 'Apple' ? 'macOS Sonoma' : 'Windows 11 Home' });
    } else if (category === 'headphones') {
        list.push({ label: 'Driver Size', value: '40mm Dynamic' });
        list.push({ label: 'Connectivity', value: level === 'budget' ? 'Wired 3.5mm' : 'Bluetooth 5.3 & Wired' });
        list.push({ label: 'Battery Life', value: level === 'budget' ? 'N/A' : 'Up to 40 Hours' });
        list.push({ label: 'Noise Cancelling', value: level === 'flagship' ? 'Hybrid Active Noise Cancellation (ANC)' : 'Passive' });
    } else if (category === 'smartwatches') {
        list.push({ label: 'Display', value: '1.43" Always-on AMOLED' });
        list.push({ label: 'Battery Life', value: brand === 'Apple' || brand === 'Samsung' ? 'Up to 36 Hours' : 'Up to 14 Days' });
        list.push({ label: 'Sensors', value: 'Heart Rate, SpO2, Sleep Tracking, GPS' });
        list.push({ label: 'Water Resistance', value: '5ATM / IP68' });
    } else if (category === 'gaming') {
        list.push({ label: 'Compatibility', value: 'PC, PS5, Xbox Series X/S' });
        list.push({ label: 'Connectivity', value: 'Wireless 2.4GHz + Bluetooth' });
        list.push({ label: 'RGB Lighting', value: 'Yes, Customizable Chroma RGB' });
    }
    return list;
};

// Main generator
const generateCatalog = () => {
    const products = [];
    let idCounter = 1;

    // Helper to get random item
    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const formatPrice = (p) => Math.round(p / 100) * 100 - 1; // Round to nearest 99

    // --- 1. SMARTPHONES: 105 Items ---
    const phoneAdjectives = ['Ultra', 'Pro', 'Neo', 'Max', 'Plus', 'Zoom', 'Prime', 'X', 'Speed', 'Air', 'Note', 'Edge'];
    const phoneModels = ['S24', 'F5', 'V30', 'Reno', 'CE4', 'Phone 2', 'Nord', 'Gt', '12R', 'Focus', 'Z Fold', 'Z Flip'];

    for (let i = 1; i <= 105; i++) {
        const brand = randomItem(brandsByCategory.smartphones);
        const adj = randomItem(phoneAdjectives);
        const mod = randomItem(phoneModels);
        const name = `${brand} ${mod} ${adj} 5G (Vol-${i})`;
        
        // Define price segment
        let segment = 'mid';
        let price = randomRange(12000, 35000);
        if (i <= 20) {
            segment = 'budget';
            price = randomRange(2500, 10000);
        } else if (i > 80) {
            segment = 'flagship';
            price = randomRange(80000, 150000);
        } else if (i > 50) {
            segment = 'premium';
            price = randomRange(36000, 75000);
        }
        price = formatPrice(price);

        const discountPct = randomItem([5, 10, 15, 20, 25]);
        const originalPrice = formatPrice(price * (1 + discountPct / 100));
        
        const imageIndex = i % categoryImages.smartphones.length;
        const mainImage = categoryImages.smartphones[imageIndex];
        const subImages = [
            mainImage,
            categoryImages.smartphones[(imageIndex + 1) % categoryImages.smartphones.length],
            categoryImages.smartphones[(imageIndex + 2) % categoryImages.smartphones.length]
        ];

        const ratingVal = parseFloat((randomRange(40, 49) / 10).toFixed(1));
        const specsList = getSpecs('smartphones', brand, segment);

        products.push({
            name,
            brand,
            category: 'smartphones',
            description: `Experience cutting edge connectivity and photography with the all-new ${name}. Packed with a high-capacity battery, an ultra-crisp display, and powered by industry-leading smart processors. Perfect for multitasking and gaming.`,
            specs: specsList,
            specifications: specsList,
            price,
            originalPrice,
            discount: discountPct,
            stock: randomRange(5, 45),
            ratings: ratingVal,
            rating: ratingVal,
            numReviews: randomRange(15, 480),
            image: mainImage,
            images: subImages,
            featured: ratingVal >= 4.7,
            bestseller: i % 7 === 0,
            isNewArrival: i % 5 === 0,
            warranty: '1 Year Brand Warranty',
            colorOptions: [randomItem(colors), randomItem(colors)]
        });
    }

    // --- 2. HEADPHONES: 52 Items ---
    const hpAdjectives = ['Studio Wireless', 'Bass Boost', 'Pure Sound', 'Noise Shield', 'AudioPro', 'Rhythm Link', 'Vibe Pro', 'Elite ANC'];
    const hpTypes = ['Over-Ear', 'On-Ear', 'In-Ear TWS', 'Neckband', 'Wired Pro'];

    for (let i = 1; i <= 52; i++) {
        const brand = randomItem(brandsByCategory.headphones);
        const adj = randomItem(hpAdjectives);
        const type = randomItem(hpTypes);
        const name = `${brand} ${adj} ${type} (Edition-${i})`;

        let segment = 'mid';
        let price = randomRange(5000, 15000);
        if (i <= 10) {
            segment = 'budget';
            price = randomRange(2500, 4900);
        } else if (i > 40) {
            segment = 'flagship'; // Audiophile / Premium ANC
            price = randomRange(25000, 50000);
        } else if (i > 25) {
            segment = 'premium';
            price = randomRange(16000, 24000);
        }
        price = formatPrice(price);

        const discountPct = randomItem([10, 15, 20, 30, 40]);
        const originalPrice = formatPrice(price * (1 + discountPct / 100));

        const imageIndex = i % categoryImages.headphones.length;
        const mainImage = categoryImages.headphones[imageIndex];
        const subImages = [
            mainImage,
            categoryImages.headphones[(imageIndex + 1) % categoryImages.headphones.length],
            categoryImages.headphones[(imageIndex + 2) % categoryImages.headphones.length]
        ];

        const ratingVal = parseFloat((randomRange(41, 49) / 10).toFixed(1));
        const specsList = getSpecs('headphones', brand, segment);

        products.push({
            name,
            brand,
            category: 'headphones',
            description: `Immerse yourself in acoustic bliss with the ${name}. Features high fidelity sound outputs, deep bass, and comfortable ear cushions designed for prolonged listening sessions. Fully compatible with voice assistants and bluetooth devices.`,
            specs: specsList,
            specifications: specsList,
            price,
            originalPrice,
            discount: discountPct,
            stock: randomRange(5, 50),
            ratings: ratingVal,
            rating: ratingVal,
            numReviews: randomRange(10, 350),
            image: mainImage,
            images: subImages,
            featured: ratingVal >= 4.7,
            bestseller: i % 6 === 0,
            isNewArrival: i % 4 === 0,
            warranty: '1 Year Brand Warranty',
            colorOptions: [randomItem(colors), randomItem(colors)]
        });
    }

    // --- 3. SMART WATCHES: 52 Items ---
    const watchAdjectives = ['Fit', 'Pro GPS', 'Classic', 'Sport', 'Active', 'Smart Band', 'Rugged', 'Luxury Edition'];

    for (let i = 1; i <= 52; i++) {
        const brand = randomItem(brandsByCategory.smartwatches);
        const adj = randomItem(watchAdjectives);
        const name = `${brand} Watch ${adj} V${i}`;

        let segment = 'mid';
        let price = randomRange(6000, 25000);
        if (i <= 10) {
            segment = 'budget';
            price = randomRange(2500, 5000);
        } else if (i > 42) {
            segment = 'flagship'; // Luxury / Rugged Garmin
            price = randomRange(55000, 100000);
        } else if (i > 25) {
            segment = 'premium';
            price = randomRange(26000, 54000);
        }
        price = formatPrice(price);

        const discountPct = randomItem([5, 10, 15, 20, 25]);
        const originalPrice = formatPrice(price * (1 + discountPct / 100));

        const imageIndex = i % categoryImages.smartwatches.length;
        const mainImage = categoryImages.smartwatches[imageIndex];
        const subImages = [
            mainImage,
            categoryImages.smartwatches[(imageIndex + 1) % categoryImages.smartwatches.length],
            categoryImages.smartwatches[(imageIndex + 2) % categoryImages.smartwatches.length]
        ];

        const ratingVal = parseFloat((randomRange(42, 49) / 10).toFixed(1));
        const specsList = getSpecs('smartwatches', brand, segment);

        products.push({
            name,
            brand,
            category: 'smartwatches',
            description: `Track your workouts and stay connected with the premium ${name}. Includes advanced health monitoring features, long battery life, customizable watch faces, and water-resistant materials built for ultimate durability.`,
            specs: specsList,
            specifications: specsList,
            price,
            originalPrice,
            discount: discountPct,
            stock: randomRange(8, 48),
            ratings: ratingVal,
            rating: ratingVal,
            numReviews: randomRange(20, 290),
            image: mainImage,
            images: subImages,
            featured: ratingVal >= 4.7,
            bestseller: i % 8 === 0,
            isNewArrival: i % 6 === 0,
            warranty: '1 Year Brand Warranty',
            colorOptions: [randomItem(colors), randomItem(colors)]
        });
    }

    // --- 4. LAPTOPS: 78 Items ---
    const laptopAdjectives = ['Notebook', 'Book Pro', 'ZenBook', 'VivoBook', 'ThinkPad', 'Inspiron', 'Legion Gaming', 'Spectre'];
    const laptopSpecs = ['Intel i5', 'Intel i7', 'AMD Ryzen 7', 'Apple M3 Duo', 'Intel Ultra 9', 'Ryzen 9 Pro'];

    for (let i = 1; i <= 78; i++) {
        const brand = randomItem(brandsByCategory.laptops);
        const adj = randomItem(laptopAdjectives);
        const spec = randomItem(laptopSpecs);
        const name = `${brand} ${adj} (${spec} - Gen ${i})`;

        let segment = 'mid';
        let price = randomRange(55000, 95000);
        if (i <= 15) {
            segment = 'budget';
            price = randomRange(40000, 54000);
        } else if (i > 60) {
            segment = 'flagship'; // Heavy gaming / Macbook Pro M3 Max / Razer Blade
            price = randomRange(160000, 250000);
        } else if (i > 35) {
            segment = 'premium';
            price = randomRange(96000, 159000);
        }
        price = formatPrice(price);

        const discountPct = randomItem([5, 10, 12, 15, 18]);
        const originalPrice = formatPrice(price * (1 + discountPct / 100));

        const imageIndex = i % categoryImages.laptops.length;
        const mainImage = categoryImages.laptops[imageIndex];
        const subImages = [
            mainImage,
            categoryImages.laptops[(imageIndex + 1) % categoryImages.laptops.length],
            categoryImages.laptops[(imageIndex + 2) % categoryImages.laptops.length]
        ];

        const ratingVal = parseFloat((randomRange(43, 49) / 10).toFixed(1));
        const specsList = getSpecs('laptops', brand, segment);

        products.push({
            name,
            brand,
            category: 'laptops',
            description: `Supercharge your productivity, creative workflows, and gaming experience with the elite ${name}. Features a sleek, modern chassis, beautiful wide color-gamut displays, and top tier thermal management systems for quiet performance.`,
            specs: specsList,
            specifications: specsList,
            price,
            originalPrice,
            discount: discountPct,
            stock: randomRange(5, 25),
            ratings: ratingVal,
            rating: ratingVal,
            numReviews: randomRange(8, 150),
            image: mainImage,
            images: subImages,
            featured: ratingVal >= 4.7,
            bestseller: i % 9 === 0,
            isNewArrival: i % 7 === 0,
            warranty: '2 Year Brand Warranty',
            colorOptions: ['Space Gray', 'Platnium Gold', 'Slate Black']
        });
    }

    // --- 5. GAMING: 78 Items ---
    const gamingTypes = ['Mechanical Keyboard', 'Pro Gaming Mouse', 'Wireless Controller', 'DualSense Stand', 'Gaming Monitor', 'Steering Wheel', 'VR Headset', 'RGB Gaming Mat'];
    const gamingMods = ['Ornata', 'G502', 'Viper', 'Blackshark', 'Apex Pro', 'Kestrel', 'HyperX Cast', 'Stealth RGB'];

    for (let i = 1; i <= 78; i++) {
        const brand = randomItem(brandsByCategory.gaming);
        const type = randomItem(gamingTypes);
        const mod = randomItem(gamingMods);
        const name = `${brand} ${mod} ${type} (V${i})`;

        let price = randomRange(4000, 20000);
        if (i <= 15) {
            price = randomRange(2500, 3900); // Budget mice/keyboards
        } else if (i > 60) {
            price = randomRange(50000, 150000); // High-end monitors / VR headsets / Gaming consoles
        } else if (i > 35) {
            price = randomRange(21000, 49000); // Premium gear / Steering wheels
        }
        price = formatPrice(price);

        const discountPct = randomItem([8, 10, 15, 20, 25, 30]);
        const originalPrice = formatPrice(price * (1 + discountPct / 100));

        const imageIndex = i % categoryImages.gaming.length;
        const mainImage = categoryImages.gaming[imageIndex];
        const subImages = [
            mainImage,
            categoryImages.gaming[(imageIndex + 1) % categoryImages.gaming.length],
            categoryImages.gaming[(imageIndex + 2) % categoryImages.gaming.length]
        ];

        const ratingVal = parseFloat((randomRange(42, 49) / 10).toFixed(1));
        const specsList = getSpecs('gaming', brand, 'gaming_gear');

        products.push({
            name,
            brand,
            category: 'gaming',
            description: `Dominate the leaderboard with the professional grade ${name}. Designed in collaboration with e-sports professionals, this device offers zero latency responses, extreme ergonomic comfort, and RGB custom profiles built for elite gaming.`,
            specs: specsList,
            specifications: specsList,
            price,
            originalPrice,
            discount: discountPct,
            stock: randomRange(10, 60),
            ratings: ratingVal,
            rating: ratingVal,
            numReviews: randomRange(30, 420),
            image: mainImage,
            images: subImages,
            featured: ratingVal >= 4.7,
            bestseller: i % 8 === 0,
            isNewArrival: i % 5 === 0,
            warranty: '1 Year Brand Warranty',
            colorOptions: ['Razer Green', 'Carbon Black', 'Chroma RGB']
        });
    }

    return products;
};

export default generateCatalog;

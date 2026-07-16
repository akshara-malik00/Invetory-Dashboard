import ipad from '../assets/ipad.png';
import iphone from '../assets/iphone.png';
import mac from '../assets/mac.png';
import airpods from '../assets/airpods.png';
import airtag from '../assets/airtag.png';
import appleTV from '../assets/appleTV.png';
import applewatch from '../assets/applewatch.png';
import homepod from '../assets/Homepod.png';

export const ProductData = [
    {
        id: 1,
        productName: 'iPad Pro 12.9"',
        sku: 'IPD-PRO-129',
        category: 'Tablets',
        quantity: 34,
        unitPrice: 1099,
        supplier: 'Ingram Micro',
        description: 'Apple iPad Pro 12.9-inch with Liquid Retina XDR display and M2 chip.',
        thumbnail: ipad,
        createdAt: '2026-01-12',
    },
    {
        id: 2,
        productName: 'iPhone 15 Pro',
        sku: 'IPH-15P-256',
        category: 'Phones',
        quantity: 5,
        unitPrice: 999,
        supplier: 'Tech Data Corporation',
        description: 'Apple iPhone 15 Pro featuring the A17 Pro chip and titanium design.',
        thumbnail: iphone,
        createdAt: '2026-02-03',
    },
    {
        id: 3,
        productName: 'MacBook Air M2',
        sku: 'MBA-M2-256',
        category: 'Laptops',
        quantity: 42,
        unitPrice: 1199,
        supplier: 'Ingram Micro',
        description: 'MacBook Air with the M2 chip, offering all-day battery life in a thin design.',
        thumbnail: mac,
        createdAt: '2026-01-28',
    },
    {
        id: 4,
        productName: 'AirPods Pro (2nd Gen)',
        sku: 'APP-2GEN-WHT',
        category: 'Audio',
        quantity: 0,
        unitPrice: 249,
        supplier: 'ProSupply Distributors',
        description: 'AirPods Pro with active noise cancellation and adaptive transparency.',
        thumbnail: airpods,
        createdAt: '2026-03-15',
    },
    {
        id: 5,
        productName: 'AirTag',
        sku: 'ATG-4PK-SLV',
        category: 'Accessories',
        quantity: 120,
        unitPrice: 29,
        supplier: 'ProSupply Distributors',
        description: 'Apple AirTag item tracker for keeping track of your belongings via Find My.',
        thumbnail: airtag,
        createdAt: '2026-02-20',
    },
    {
        id: 6,
        productName: 'Apple TV 4K',
        sku: 'ATV-4K-128',
        category: 'Entertainment',
        quantity: 18,
        unitPrice: 149,
        supplier: 'Tech Data Corporation',
        description: 'Apple TV 4K with A15 Bionic chip for stunning picture quality and speed.',
        thumbnail: appleTV,
        createdAt: '2026-04-02',
    },
    {
        id: 7,
        productName: 'Apple Watch Series 9',
        sku: 'AWS-9-45MM',
        category: 'Wearables',
        quantity: 8,
        unitPrice: 429,
        supplier: 'Ingram Micro',
        description: 'Apple Watch Series 9 with the new S9 chip and double tap gesture.',
        thumbnail: applewatch,
        createdAt: '2026-03-01',
    },
    {
        id: 8,
        productName: 'HomePod (2nd Gen)',
        sku: 'HPD-2GEN-WHT',
        category: 'Smart Home',
        quantity: 27,
        unitPrice: 299,
        supplier: 'ProSupply Distributors',
        description: 'HomePod delivering immersive sound with spatial audio and Siri built in.',
        thumbnail: homepod,
        createdAt: '2026-04-18',
    },
];

export default ProductData;

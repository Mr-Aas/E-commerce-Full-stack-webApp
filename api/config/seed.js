import Item from '../models/Item.js';

export const seedDatabase = async () => {
  try {
    const count = await Item.countDocuments();
    if (count === 0) {
      console.log('Database is empty. Seeding initial items...');
      const seedItems = [
        {
          name: {
            en: 'Wheat Flour',
            hi: 'गेहूं आटा',
            desi: 'gehoo Aata',
          },
          category: 'Groceries',
          subcategory: 'Flour',
          subcategoryType: 'NonPerishable',
          unitType: 'gram',
          price: 32,
        },
        {
          name: {
            en: 'Electrical Switch',
            hi: 'इलेक्ट्रिकल स्विच',
            desi: 'Electrical Switch',
          },
          category: 'Hardware',
          subcategory: 'Electrical',
          subcategoryType: 'NonPerishable',
          unitType: 'unit',
          price: 10,
        },
        {
          name: {
            en: 'Copper Wire 1mm',
            hi: 'कॉपर वायर 1mm',
            desi: 'Copper Wire 1mm',
          },
          category: 'Hardware',
          subcategory: 'Electrical',
          subcategoryType: 'NonPerishable',
          unitType: 'meter',
          price: 6,
        },
        {
          name: {
            en: 'Fresh Milk 1L',
            hi: 'ताज़ा दूध 1L',
            desi: 'Fresh Milk 1L',
          },
          category: 'Dairy Products',
          subcategory: 'Milk',
          subcategoryType: 'Perishable',
          unitType: 'unit',
          price: 72,
          expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
        {
          name: {
            en: 'Fair and Lovely',
            hi: 'फेयर एंड लवली',
            desi: 'fair and lovely',
          },
          category: 'Cosmetics',
          subcategory: 'Cream',
          subcategoryType: 'NonPerishable',
          unitType: 'unit',
          price: 72,
        },
        {
          name: {
            en: 'Sugar',
            hi: 'चीनी',
            desi: 'chinni',
          },
          category: 'Groceries',
          subcategory: 'Sugar',
          subcategoryType: 'NonPerishable',
          unitType: 'gram',
          price: 46,
        },
      ];
      await Item.insertMany(seedItems);
      console.log('Database successfully seeded with demo products!');
    } else {
      console.log(`Database already has ${count} items. Skipping seeding.`);
    }
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

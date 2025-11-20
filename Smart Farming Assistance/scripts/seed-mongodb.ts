import { connectToDatabase } from '@/lib/mongodb';
import { Seed, Location } from '@/types/farming';

async function seedDatabase() {
  try {
    const { db } = await connectToDatabase();
    
    // Clear existing data
    await db.collection('seeds').deleteMany({});
    await db.collection('locations').deleteMany({});
    
    console.log('Cleared existing data');

    // Seeds data
    const seeds: Seed[] = [
      // High rainfall seeds
      {
        name: 'Rice (Paddy)',
        rainfallRequirement: 'high',
        description: 'Staple crop that thrives in waterlogged conditions and high rainfall areas.',
        growingSeason: '3-4 months (Kharif season)',
        waterRequirement: 'High - 1200-1500mm annually',
        yield: '2.5-4.5 tons per hectare',
        suitableRegions: ['Coastal Andhra', 'Tamil Nadu', 'Kerala', 'West Bengal', 'Assam'],
        climateZone: 'Tropical Wet',
        soilType: ['Clay', 'Loamy', 'Alluvial'],
        plantingTime: 'June-July',
        harvestTime: 'October-November',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sugarcane',
        rainfallRequirement: 'high',
        description: 'Tropical grass that requires substantial water throughout its growing period.',
        growingSeason: '10-12 months',
        waterRequirement: 'Very High - 1500-2500mm annually',
        yield: '60-80 tons per hectare',
        suitableRegions: ['Uttar Pradesh', 'Maharashtra', 'Tamil Nadu', 'Karnataka'],
        climateZone: 'Tropical Semi-Arid',
        soilType: ['Loamy', 'Black Cotton', 'Alluvial'],
        plantingTime: 'February-March',
        harvestTime: 'December-January',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Banana',
        rainfallRequirement: 'high',
        description: 'Tropical fruit crop that needs consistent moisture for optimal growth.',
        growingSeason: '9-12 months',
        waterRequirement: 'High - 1200-1500mm annually with good distribution',
        yield: '30-40 tons per hectare',
        suitableRegions: ['Kerala', 'Tamil Nadu', 'Maharashtra', 'Gujarat'],
        climateZone: 'Tropical Wet',
        soilType: ['Loamy', 'Laterite', 'Alluvial'],
        plantingTime: 'June-July',
        harvestTime: '12-15 months after planting',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Coconut',
        rainfallRequirement: 'high',
        description: 'Tropical palm tree that requires high humidity and rainfall.',
        growingSeason: 'Perennial - starts bearing in 6-8 years',
        waterRequirement: 'High - 1500-2000mm annually',
        yield: '50-100 nuts per tree per year',
        suitableRegions: ['Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh'],
        climateZone: 'Tropical Wet',
        soilType: ['Sandy Loam', 'Laterite', 'Alluvial'],
        plantingTime: 'Monsoon season',
        harvestTime: 'Throughout the year',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Taro (Colocasia)',
        rainfallRequirement: 'high',
        description: 'Root crop that grows well in wet, humid conditions.',
        growingSeason: '6-8 months',
        waterRequirement: 'High - prefers waterlogged soil',
        yield: '15-25 tons per hectare',
        suitableRegions: ['West Bengal', 'Bihar', 'Odisha', 'Assam'],
        climateZone: 'Tropical Wet',
        soilType: ['Clay Loam', 'Alluvial'],
        plantingTime: 'April-May',
        harvestTime: 'October-November',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Low rainfall seeds
      {
        name: 'Millet (Pearl Millet)',
        rainfallRequirement: 'low',
        description: 'Drought-resistant cereal crop ideal for arid and semi-arid regions.',
        growingSeason: '2.5-3 months',
        waterRequirement: 'Low - 300-500mm annually',
        yield: '0.8-1.5 tons per hectare',
        suitableRegions: ['Rajasthan', 'Gujarat', 'Maharashtra', 'Karnataka'],
        climateZone: 'Arid',
        soilType: ['Sandy', 'Black Cotton', 'Loamy'],
        plantingTime: 'June-July',
        harvestTime: 'September-October',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sorghum',
        rainfallRequirement: 'low',
        description: 'Drought-tolerant grain crop suitable for dry farming.',
        growingSeason: '3-4 months',
        waterRequirement: 'Low - 400-600mm annually',
        yield: '1-2.5 tons per hectare',
        suitableRegions: ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Madhya Pradesh'],
        climateZone: 'Semi-Arid',
        soilType: ['Black Cotton', 'Loamy', 'Clay'],
        plantingTime: 'June-July',
        harvestTime: 'October-November',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chickpea (Gram)',
        rainfallRequirement: 'low',
        description: 'Pulse crop with excellent drought tolerance.',
        growingSeason: '3-4 months (Rabi season)',
        waterRequirement: 'Low - 300-400mm annually',
        yield: '0.8-1.2 tons per hectare',
        suitableRegions: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Uttar Pradesh'],
        climateZone: 'Semi-Arid',
        soilType: ['Black Cotton', 'Loamy', 'Alluvial'],
        plantingTime: 'October-November',
        harvestTime: 'February-March',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pigeon Pea (Tur Dal)',
        rainfallRequirement: 'low',
        description: 'Drought-resistant legume that thrives in low rainfall conditions.',
        growingSeason: '5-6 months',
        waterRequirement: 'Low - 400-600mm annually',
        yield: '1-1.8 tons per hectare',
        suitableRegions: ['Maharashtra', 'Uttar Pradesh', 'Madhya Pradesh', 'Gujarat'],
        climateZone: 'Semi-Arid',
        soilType: ['Black Cotton', 'Loamy'],
        plantingTime: 'June-July',
        harvestTime: 'December-January',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Castor',
        rainfallRequirement: 'low',
        description: 'Oilseed crop with high drought tolerance.',
        growingSeason: '4-5 months',
        waterRequirement: 'Low - 300-500mm annually',
        yield: '1-2 tons per hectare',
        suitableRegions: ['Gujarat', 'Rajasthan', 'Andhra Pradesh', 'Karnataka'],
        climateZone: 'Arid',
        soilType: ['Black Cotton', 'Sandy Loam'],
        plantingTime: 'July-August',
        harvestTime: 'December-January',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Locations data
    const locations: Location[] = [
      // High rainfall locations
      {
        name: 'Kochi',
        region: 'Kerala',
        country: 'India',
        rainfallPattern: 'high',
        annualRainfall: 3000,
        rainySeason: 'June-September (Southwest Monsoon)',
        climateZone: 'Tropical Wet',
        temperature: { min: 20, max: 33, average: 27 },
        soilType: ['Laterite', 'Sandy Loam'],
        coordinates: { latitude: 9.9312, longitude: 76.2673 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mumbai',
        region: 'Maharashtra',
        country: 'India',
        rainfallPattern: 'high',
        annualRainfall: 2200,
        rainySeason: 'June-September (Southwest Monsoon)',
        climateZone: 'Tropical Wet',
        temperature: { min: 20, max: 33, average: 27 },
        soilType: ['Alluvial', 'Black Cotton'],
        coordinates: { latitude: 19.0760, longitude: 72.8777 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Guwahati',
        region: 'Assam',
        country: 'India',
        rainfallPattern: 'high',
        annualRainfall: 1800,
        rainySeason: 'May-September (Monsoon)',
        climateZone: 'Humid Subtropical',
        temperature: { min: 15, max: 32, average: 24 },
        soilType: ['Alluvial', 'Clay Loam'],
        coordinates: { latitude: 26.1445, longitude: 91.7362 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Low rainfall locations
      {
        name: 'Jaipur',
        region: 'Rajasthan',
        country: 'India',
        rainfallPattern: 'low',
        annualRainfall: 650,
        rainySeason: 'July-September (Limited Monsoon)',
        climateZone: 'Arid',
        temperature: { min: 15, max: 41, average: 28 },
        soilType: ['Sandy', 'Loamy'],
        coordinates: { latitude: 26.9124, longitude: 75.7873 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ahmedabad',
        region: 'Gujarat',
        country: 'India',
        rainfallPattern: 'low',
        annualRainfall: 750,
        rainySeason: 'June-September (Southwest Monsoon)',
        climateZone: 'Semi-Arid',
        temperature: { min: 19, max: 42, average: 30 },
        soilType: ['Black Cotton', 'Sandy Loam'],
        coordinates: { latitude: 23.0225, longitude: 72.5714 },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hyderabad',
        region: 'Telangana',
        country: 'India',
        rainfallPattern: 'low',
        annualRainfall: 800,
        rainySeason: 'June-October (Southwest Monsoon)',
        climateZone: 'Semi-Arid',
        temperature: { min: 20, max: 39, average: 29 },
        soilType: ['Red Soil', 'Black Cotton'],
        coordinates: { latitude: 17.3850, longitude: 78.4867 },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Insert seeds
    const seedResult = await db.collection('seeds').insertMany(seeds);
    console.log(`Inserted ${seedResult.insertedCount} seeds`);

    // Insert locations
    const locationResult = await db.collection('locations').insertMany(locations);
    console.log(`Inserted ${locationResult.insertedCount} locations`);

    console.log('Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run the seeding function
seedDatabase()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
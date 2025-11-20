import { db } from '@/lib/db';

async function main() {
  // Seeds for high rainfall areas
  const highRainfallSeeds = [
    {
      name: 'Rice (Paddy)',
      rainfallRequirement: 'high',
      description: 'Staple crop that thrives in waterlogged conditions and high rainfall areas.',
      growingSeason: '3-4 months (Kharif season)',
      waterRequirement: 'High - 1200-1500mm annually',
      yield: '2.5-4.5 tons per hectare'
    },
    {
      name: 'Sugarcane',
      rainfallRequirement: 'high',
      description: 'Tropical grass that requires substantial water throughout its growing period.',
      growingSeason: '10-12 months',
      waterRequirement: 'Very High - 1500-2500mm annually',
      yield: '60-80 tons per hectare'
    },
    {
      name: 'Banana',
      rainfallRequirement: 'high',
      description: 'Tropical fruit crop that needs consistent moisture for optimal growth.',
      growingSeason: '9-12 months',
      waterRequirement: 'High - 1200-1500mm annually with good distribution',
      yield: '30-40 tons per hectare'
    },
    {
      name: 'Coconut',
      rainfallRequirement: 'high',
      description: 'Tropical palm tree that requires high humidity and rainfall.',
      growingSeason: 'Perennial - starts bearing in 6-8 years',
      waterRequirement: 'High - 1500-2000mm annually',
      yield: '50-100 nuts per tree per year'
    },
    {
      name: 'Taro (Colocasia)',
      rainfallRequirement: 'high',
      description: 'Root crop that grows well in wet, humid conditions.',
      growingSeason: '6-8 months',
      waterRequirement: 'High - prefers waterlogged soil',
      yield: '15-25 tons per hectare'
    },
    {
      name: 'Jute',
      rainfallRequirement: 'high',
      description: 'Fiber crop that requires high humidity and rainfall during growth.',
      growingSeason: '4-5 months',
      waterRequirement: 'High - 1000-1200mm annually',
      yield: '2-2.5 tons of fiber per hectare'
    }
  ];

  // Seeds for low rainfall areas
  const lowRainfallSeeds = [
    {
      name: 'Millet (Pearl Millet)',
      rainfallRequirement: 'low',
      description: 'Drought-resistant cereal crop ideal for arid and semi-arid regions.',
      growingSeason: '2.5-3 months',
      waterRequirement: 'Low - 300-500mm annually',
      yield: '0.8-1.5 tons per hectare'
    },
    {
      name: 'Sorghum',
      rainfallRequirement: 'low',
      description: 'Drought-tolerant grain crop suitable for dry farming.',
      growingSeason: '3-4 months',
      waterRequirement: 'Low - 400-600mm annually',
      yield: '1-2.5 tons per hectare'
    },
    {
      name: 'Chickpea (Gram)',
      rainfallRequirement: 'low',
      description: 'Pulse crop with excellent drought tolerance.',
      growingSeason: '3-4 months (Rabi season)',
      waterRequirement: 'Low - 300-400mm annually',
      yield: '0.8-1.2 tons per hectare'
    },
    {
      name: 'Pigeon Pea (Tur Dal)',
      rainfallRequirement: 'low',
      description: 'Drought-resistant legume that thrives in low rainfall conditions.',
      growingSeason: '5-6 months',
      waterRequirement: 'Low - 400-600mm annually',
      yield: '1-1.8 tons per hectare'
    },
    {
      name: 'Castor',
      rainfallRequirement: 'low',
      description: 'Oilseed crop with high drought tolerance.',
      growingSeason: '4-5 months',
      waterRequirement: 'Low - 300-500mm annually',
      yield: '1-2 tons per hectare'
    },
    {
      name: 'Cactus (Prickly Pear)',
      rainfallRequirement: 'low',
      description: 'Extremely drought-resistant plant suitable for arid regions.',
      growingSeason: 'Perennial - starts bearing in 2-3 years',
      waterRequirement: 'Very Low - 200-300mm annually',
      yield: '20-40 tons of fruits per hectare'
    },
    {
      name: 'Guar',
      rainfallRequirement: 'low',
      description: 'Drought-tolerant legume grown for gum production.',
      growingSeason: '3-4 months',
      waterRequirement: 'Low - 300-400mm annually',
      yield: '0.8-1.5 tons per hectare'
    },
    {
      name: 'Mustard',
      rainfallRequirement: 'low',
      description: 'Oilseed crop that can grow with minimal water.',
      growingSeason: '3-4 months (Rabi season)',
      waterRequirement: 'Low - 350-500mm annually',
      yield: '1-2 tons per hectare'
    }
  ];

  // Insert high rainfall seeds
  for (const seed of highRainfallSeeds) {
    await db.seed.create({
      data: seed
    });
  }

  // Insert low rainfall seeds
  for (const seed of lowRainfallSeeds) {
    await db.seed.create({
      data: seed
    });
  }

  console.log('Seed data has been successfully inserted!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
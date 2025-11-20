import { NextRequest, NextResponse } from 'next/server';
import { mockSeeds, mockLocations } from '@/lib/mock-data';
import { Seed, Location, SeedSuggestion } from '@/types/farming';

export async function POST(request: NextRequest) {
  try {
    const { location, rainfallType } = await request.json();

    if (!location && !rainfallType) {
      return NextResponse.json(
        { error: 'Either location or rainfallType must be provided' },
        { status: 400 }
      );
    }

    let targetRainfallType = rainfallType;
    let selectedLocation: Location | null = null;

    // If location is provided, get location details and use its rainfall pattern
    if (location) {
      selectedLocation = mockLocations.find(loc => loc._id === location) || null;
      if (selectedLocation) {
        targetRainfallType = selectedLocation.rainfallPattern;
      }
    }

    // Validate rainfall type
    if (!targetRainfallType || !['high', 'low'].includes(targetRainfallType)) {
      return NextResponse.json(
        { error: 'Invalid rainfall type. Must be "high" or "low".' },
        { status: 400 }
      );
    }

    // Get seeds matching the rainfall requirement
    const seeds = mockSeeds.filter(seed => seed.rainfallRequirement === targetRainfallType);

    // Calculate match scores and reasons for each seed
    const suggestions: SeedSuggestion[] = seeds.map(seed => {
      let matchScore = 70; // Base score for matching rainfall requirement
      const reasons: string[] = [`Matches ${targetRainfallType} rainfall requirements`];

      // If we have location data, calculate more sophisticated matching
      if (selectedLocation) {
        // Check if seed is suitable for the location's region
        if (seed.suitableRegions.includes(selectedLocation.region)) {
          matchScore += 15;
          reasons.push(`Well-suited for ${selectedLocation.region} region`);
        }

        // Check climate zone compatibility
        if (seed.climateZone === selectedLocation.climateZone) {
          matchScore += 10;
          reasons.push(`Perfect climate zone match: ${selectedLocation.climateZone}`);
        }

        // Check soil type compatibility
        const commonSoilTypes = seed.soilType.filter(soil => 
          selectedLocation.soilType.includes(soil)
        );
        if (commonSoilTypes.length > 0) {
          matchScore += 5;
          reasons.push(`Compatible soil types: ${commonSoilTypes.join(', ')}`);
        }

        // Temperature suitability (simple check)
        if (selectedLocation.temperature.average >= 20 && selectedLocation.temperature.average <= 30) {
          matchScore += 5;
          reasons.push('Suitable temperature range');
        }
      }

      return {
        seed,
        location: selectedLocation || {
          _id: '',
          name: 'Unknown',
          region: '',
          country: '',
          rainfallPattern: targetRainfallType,
          annualRainfall: 0,
          rainySeason: '',
          climateZone: '',
          temperature: { min: 0, max: 0, average: 0 },
          soilType: [],
          createdAt: new Date(),
          updatedAt: new Date()
        },
        matchScore: Math.min(matchScore, 100),
        reasons
      };
    });

    // Sort by match score (highest first)
    suggestions.sort((a, b) => b.matchScore - a.matchScore);

    return NextResponse.json({
      suggestions,
      count: suggestions.length,
      location: selectedLocation,
      rainfallType: targetRainfallType
    });

  } catch (error) {
    console.error('Error fetching seed suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seed suggestions' },
      { status: 500 }
    );
  }
}
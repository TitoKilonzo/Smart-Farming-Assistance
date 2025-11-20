'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cloud, Droplets, Sprout, TrendingUp, MapPin, Thermometer, Calendar, Search } from 'lucide-react';

interface Seed {
  _id: string;
  name: string;
  rainfallRequirement: 'high' | 'low';
  description: string;
  growingSeason: string;
  waterRequirement: string;
  yield: string;
  suitableRegions: string[];
  climateZone: string;
  soilType: string[];
  plantingTime: string;
  harvestTime: string;
}

interface Location {
  _id: string;
  name: string;
  region: string;
  country: string;
  rainfallPattern: 'high' | 'low';
  annualRainfall: number;
  rainySeason: string;
  climateZone: string;
  temperature: {
    min: number;
    max: number;
    average: number;
  };
  soilType: string[];
}

interface SeedSuggestion {
  seed: Seed;
  location: Location;
  matchScore: number;
  reasons: string[];
}

export default function FarmingSystem() {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rainfallType, setRainfallType] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SeedSuggestion[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Fetch locations on component mount
  useEffect(() => {
    fetchLocations();
  }, []);

  // Filter locations based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLocations([]);
      setShowSearchResults(false);
    } else {
      const filtered = locations.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.region.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
      setShowSearchResults(true);
    }
  }, [searchQuery, locations]);

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/locations');
      if (response.ok) {
        const data = await response.json();
        setLocations(data.locations);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const handleGetSuggestions = async () => {
    if (!selectedLocation && !rainfallType) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/seeds/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          location: selectedLocation,
          rainfallType: rainfallType || undefined
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRainfallTypeFromLocation = (locationId: string) => {
    const location = locations.find(loc => loc._id === locationId);
    return location?.rainfallPattern || '';
  };

  // Handle location selection from search
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location._id);
    setSearchQuery(`${location.name}, ${location.region}`);
    setShowSearchResults(false);
    const rainfallType = getRainfallTypeFromLocation(location._id);
    setRainfallType(rainfallType);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedLocation('');
    setRainfallType('');
    setShowSearchResults(false);
    setFilteredLocations([]);
  };

  const selectedLocationData = locations.find(loc => loc._id === selectedLocation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Sprout className="h-10 w-10 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">Kenya Smart Farming Assistant</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized seed recommendations based on your Kenyan location and rainfall patterns
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location & Climate
                </CardTitle>
                <CardDescription>
                  Search for your Kenyan location to get location-specific recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location-search">Search Location</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location-search"
                      type="text"
                      placeholder="Search town or county..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowSearchResults(true)}
                      className="pl-10 pr-10"
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearSearch}
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                  
                  {/* Search Results Dropdown */}
                  {showSearchResults && filteredLocations.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {filteredLocations.map((location) => (
                        <button
                          key={location._id}
                          onClick={() => handleLocationSelect(location)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <div className="font-medium text-gray-900">{location.name}</div>
                          <div className="text-sm text-gray-500">{location.region}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {location.annualRainfall}mm annual rainfall • {location.climateZone}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {selectedLocationData && (
                  <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {selectedLocationData.name} Climate Info
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">County:</span>
                        <span className="font-medium text-blue-900">{selectedLocationData.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Annual Rainfall:</span>
                        <span className="font-medium text-blue-900">{selectedLocationData.annualRainfall}mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Rainy Season:</span>
                        <span className="font-medium text-blue-900 text-xs">{selectedLocationData.rainySeason}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Climate Zone:</span>
                        <span className="font-medium text-blue-900">{selectedLocationData.climateZone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Temperature:</span>
                        <span className="font-medium text-blue-900">
                          {selectedLocationData.temperature.min}°C - {selectedLocationData.temperature.max}°C
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="rainfall-type">Rainfall Season Type</Label>
                  <Select value={rainfallType} onValueChange={setRainfallType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rainfall pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Rainfall Season</SelectItem>
                      <SelectItem value="low">Short/Low Rainfall Season</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleGetSuggestions} 
                  disabled={(!selectedLocation && !rainfallType) || loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Getting Suggestions...' : 'Get Seed Recommendations'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Seed Recommendations
                </CardTitle>
                <CardDescription>
                  Suitable seeds for your Kenyan location and climate conditions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {suggestions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Sprout className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Search for your Kenyan location or select rainfall type to see seed recommendations</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-lg">{suggestion.seed.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              suggestion.seed.rainfallRequirement === 'high' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {suggestion.seed.rainfallRequirement === 'high' ? 'High Rainfall' : 'Low Rainfall'}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {suggestion.matchScore}% Match
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{suggestion.seed.description}</p>
                        
                        {suggestion.reasons.length > 0 && (
                          <div className="mb-3">
                            <h4 className="font-medium text-sm text-green-700 mb-1">Why this seed:</h4>
                            <ul className="text-xs text-green-600 space-y-1">
                              {suggestion.reasons.map((reason, idx) => (
                                <li key={idx}>• {reason}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="font-medium">Growing Season:</span>
                            <p className="text-gray-600">{suggestion.seed.growingSeason}</p>
                          </div>
                          <div>
                            <span className="font-medium">Water Needs:</span>
                            <p className="text-gray-600">{suggestion.seed.waterRequirement}</p>
                          </div>
                          <div>
                            <span className="font-medium">Expected Yield:</span>
                            <p className="text-gray-600">{suggestion.seed.yield}</p>
                          </div>
                          <div>
                            <span className="font-medium">Climate Zone:</span>
                            <p className="text-gray-600">{suggestion.seed.climateZone}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium">Suitable Regions:</span>
                            <p className="text-gray-600">{suggestion.seed.suitableRegions.join(', ')}</p>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-600">
                              Plant: {suggestion.seed.plantingTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-600">
                              Harvest: {suggestion.seed.harvestTime}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Droplets className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-900">Water Efficient</h4>
                  <p className="text-sm text-green-700">Optimized for Kenyan rainfall</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900">High Yield</h4>
                  <p className="text-sm text-blue-700">Maximum productivity</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-purple-900">Kenya Smart</h4>
                  <p className="text-sm text-purple-700">Adapted to local conditions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
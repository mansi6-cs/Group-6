import { TerrainType, Season, GearCategory } from '../types';

export const baseGear: GearCategory[] = [
  {
    name: 'Shelter',
    items: [
      { name: 'Tent', category: 'Shelter', essential: true, weight: 2500 },
      { name: 'Sleeping Bag', category: 'Shelter', essential: true, weight: 1200 },
      { name: 'Sleeping Pad', category: 'Shelter', essential: true, weight: 450 },
      { name: 'Tent Stakes', category: 'Shelter', essential: true, weight: 200 },
      { name: 'Ground Tarp', category: 'Shelter', essential: false, weight: 300 },
    ],
  },
  {
    name: 'Cooking',
    items: [
      { name: 'Stove', category: 'Cooking', essential: true, weight: 300 },
      { name: 'Fuel Canister', category: 'Cooking', essential: true, weight: 400 },
      { name: 'Cooking Pot', category: 'Cooking', essential: true, weight: 250 },
      { name: 'Utensils', category: 'Cooking', essential: true, weight: 100 },
      { name: 'Water Filter', category: 'Cooking', essential: true, weight: 350 },
      { name: 'Water Bottles (2L)', category: 'Cooking', essential: true, weight: 200 },
      { name: 'Lighter/Matches', category: 'Cooking', essential: true, weight: 50 },
    ],
  },
  {
    name: 'Clothing',
    items: [
      { name: 'Base Layer Top', category: 'Clothing', essential: true, weight: 200 },
      { name: 'Base Layer Bottom', category: 'Clothing', essential: true, weight: 200 },
      { name: 'Insulation Layer', category: 'Clothing', essential: true, weight: 400 },
      { name: 'Rain Jacket', category: 'Clothing', essential: true, weight: 350 },
      { name: 'Rain Pants', category: 'Clothing', essential: false, weight: 250 },
      { name: 'Hiking Boots', category: 'Clothing', essential: true, weight: 1000 },
      { name: 'Socks (3 pairs)', category: 'Clothing', essential: true, weight: 150 },
      { name: 'Hat', category: 'Clothing', essential: true, weight: 100 },
      { name: 'Gloves', category: 'Clothing', essential: false, weight: 100 },
    ],
  },
  {
    name: 'Navigation & Safety',
    items: [
      { name: 'Map', category: 'Navigation & Safety', essential: true, weight: 50 },
      { name: 'Compass', category: 'Navigation & Safety', essential: true, weight: 50 },
      { name: 'First Aid Kit', category: 'Navigation & Safety', essential: true, weight: 400 },
      { name: 'Headlamp', category: 'Navigation & Safety', essential: true, weight: 100 },
      { name: 'Extra Batteries', category: 'Navigation & Safety', essential: true, weight: 100 },
      { name: 'Whistle', category: 'Navigation & Safety', essential: true, weight: 20 },
      { name: 'Emergency Shelter', category: 'Navigation & Safety', essential: false, weight: 150 },
      { name: 'Multi-tool', category: 'Navigation & Safety', essential: true, weight: 150 },
    ],
  },
  {
    name: 'Personal Items',
    items: [
      { name: 'Sunscreen', category: 'Personal Items', essential: true, weight: 100 },
      { name: 'Sunglasses', category: 'Personal Items', essential: true, weight: 50 },
      { name: 'Toiletries', category: 'Personal Items', essential: true, weight: 200 },
      { name: 'Toilet Paper', category: 'Personal Items', essential: true, weight: 100 },
      { name: 'Trowel', category: 'Personal Items', essential: true, weight: 80 },
      { name: 'Insect Repellent', category: 'Personal Items', essential: false, weight: 100 },
    ],
  },
];

export const terrainSpecificGear: Record<TerrainType, GearCategory[]> = {
  mountain: [
    {
      name: 'Mountain Specific',
      items: [
        { name: 'Trekking Poles', category: 'Mountain Specific', essential: true, weight: 500 },
        { name: 'Crampons', category: 'Mountain Specific', essential: false, weight: 800 },
        { name: 'Ice Axe', category: 'Mountain Specific', essential: false, weight: 600 },
        { name: 'Altitude Medication', category: 'Mountain Specific', essential: false, weight: 50 },
        { name: 'Extra Warm Layer', category: 'Mountain Specific', essential: true, weight: 500 },
      ],
    },
  ],
  forest: [
    {
      name: 'Forest Specific',
      items: [
        { name: 'Bear Canister', category: 'Forest Specific', essential: true, weight: 1000 },
        { name: 'Bear Spray', category: 'Forest Specific', essential: true, weight: 300 },
        { name: 'Hammock', category: 'Forest Specific', essential: false, weight: 600 },
        { name: 'Extra Bug Spray', category: 'Forest Specific', essential: true, weight: 150 },
      ],
    },
  ],
  desert: [
    {
      name: 'Desert Specific',
      items: [
        { name: 'Extra Water Capacity (4L)', category: 'Desert Specific', essential: true, weight: 400 },
        { name: 'Sun Shade/Umbrella', category: 'Desert Specific', essential: true, weight: 300 },
        { name: 'Neck Gaiter', category: 'Desert Specific', essential: true, weight: 50 },
        { name: 'Electrolyte Tablets', category: 'Desert Specific', essential: true, weight: 100 },
        { name: 'Light-colored Clothing', category: 'Desert Specific', essential: true, weight: 300 },
      ],
    },
  ],
  coastal: [
    {
      name: 'Coastal Specific',
      items: [
        { name: 'Tide Chart', category: 'Coastal Specific', essential: true, weight: 20 },
        { name: 'Waterproof Bags', category: 'Coastal Specific', essential: true, weight: 200 },
        { name: 'Sand Stakes', category: 'Coastal Specific', essential: true, weight: 250 },
        { name: 'Water Shoes', category: 'Coastal Specific', essential: false, weight: 400 },
      ],
    },
  ],
  plains: [
    {
      name: 'Plains Specific',
      items: [
        { name: 'Extra Wind Protection', category: 'Plains Specific', essential: true, weight: 200 },
        { name: 'Heavy Duty Stakes', category: 'Plains Specific', essential: true, weight: 300 },
        { name: 'Wide-brim Hat', category: 'Plains Specific', essential: true, weight: 150 },
      ],
    },
  ],
};

export const seasonalGear: Record<Season, GearCategory[]> = {
  winter: [
    {
      name: 'Winter Gear',
      items: [
        { name: '4-Season Tent', category: 'Winter Gear', essential: true, weight: 3000 },
        { name: 'Winter Sleeping Bag (-20°F)', category: 'Winter Gear', essential: true, weight: 1800 },
        { name: 'Insulated Sleeping Pad', category: 'Winter Gear', essential: true, weight: 600 },
        { name: 'Down Jacket', category: 'Winter Gear', essential: true, weight: 600 },
        { name: 'Insulated Pants', category: 'Winter Gear', essential: true, weight: 500 },
        { name: 'Winter Gloves', category: 'Winter Gear', essential: true, weight: 200 },
        { name: 'Balaclava', category: 'Winter Gear', essential: true, weight: 100 },
        { name: 'Hand Warmers', category: 'Winter Gear', essential: false, weight: 100 },
      ],
    },
  ],
  spring: [
    {
      name: 'Spring Gear',
      items: [
        { name: 'Extra Rain Gear', category: 'Spring Gear', essential: true, weight: 400 },
        { name: 'Waterproof Stuff Sacks', category: 'Spring Gear', essential: true, weight: 150 },
        { name: 'Gaiters', category: 'Spring Gear', essential: false, weight: 200 },
      ],
    },
  ],
  summer: [
    {
      name: 'Summer Gear',
      items: [
        { name: 'Lightweight Tent', category: 'Summer Gear', essential: true, weight: 1500 },
        { name: 'Summer Sleeping Bag (40°F)', category: 'Summer Gear', essential: true, weight: 800 },
        { name: 'Bug Net', category: 'Summer Gear', essential: false, weight: 150 },
        { name: 'Extra Sunscreen', category: 'Summer Gear', essential: true, weight: 150 },
      ],
    },
  ],
  fall: [
    {
      name: 'Fall Gear',
      items: [
        { name: '3-Season Sleeping Bag (20°F)', category: 'Fall Gear', essential: true, weight: 1200 },
        { name: 'Extra Insulation Layer', category: 'Fall Gear', essential: true, weight: 400 },
        { name: 'Warm Hat', category: 'Fall Gear', essential: true, weight: 100 },
      ],
    },
  ],
};

export function generateGearList(terrain: TerrainType, season: Season): GearCategory[] {
  const allGear = [
    ...baseGear,
    ...(terrainSpecificGear[terrain] || []),
    ...(seasonalGear[season] || []),
  ];
  return allGear;
}

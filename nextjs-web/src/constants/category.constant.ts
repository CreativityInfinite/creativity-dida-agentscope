import { MapPin, Plane, Hotel, Plane as FlightIcon, Camera, Ship, Heart, Globe } from 'lucide-react';

// 一级分类键值
export const PRIMARY_CATEGORIES = ['DomesticTravel', 'OutboundTravel', 'Hotels', 'Flights', 'LocalExperiences', 'CruiseTravel', 'CustomTravel'] as const;

export type PrimaryCategoryKey = (typeof PRIMARY_CATEGORIES)[number];

// 分类图标映射
export const CATEGORY_ICONS = {
  DomesticTravel: MapPin,
  OutboundTravel: Globe,
  Hotels: Hotel,
  Flights: FlightIcon,
  LocalExperiences: Camera,
  CruiseTravel: Ship,
  CustomTravel: Heart
} as const;

// 分类颜色映射
export const CATEGORY_COLORS = {
  DomesticTravel: '#1d4ed81a',
  OutboundTravel: '#9333ea1a',
  Hotels: '#22d3ee1a',
  Flights: '#f59e0b1a',
  LocalExperiences: '#ef44441a',
  CruiseTravel: '#0ea5e91a',
  CustomTravel: '#ec48991a'
} as const;

// 二级分类键值（使用英文 Key）
export const SUBCATEGORIES = {
  DomesticTravel: ['CityBreaks', 'ScenicSpots', 'CulturalTours', 'NaturalLandscapes', 'ThemeParks', 'HotSprings', 'BeachResorts', 'MountainRetreat'],
  OutboundTravel: ['PopularDestinations', 'EuropeTravel', 'AsiaTravel', 'AmericaTravel', 'AfricaTravel', 'OceaniaTravel', 'IslandGetaways', 'CulturalJourneys'],
  Hotels: ['LuxuryHotels', 'BusinessHotels', 'BoutiqueHotels', 'ResortHotels', 'BudgetHotels', 'Homestays', 'Apartments', 'UniqueStays'],
  Flights: ['DomesticFlights', 'InternationalFlights', 'LowCostCarriers', 'BusinessClass', 'FirstClass', 'CharterFlights', 'FlightDeals', 'FlightPackages'],
  LocalExperiences: ['SightseeingTours', 'CulturalExperiences', 'AdventureSports', 'FoodTours', 'ShoppingTours', 'NightlifeTours', 'WellnessRetreats', 'FamilyActivities'],
  CruiseTravel: ['OceanCruises', 'RiverCruises', 'LuxuryCruises', 'FamilyCruises', 'ThemeCruises', 'ExpeditionCruises', 'RegionalCruises', 'WorldCruises'],
  CustomTravel: ['PersonalizedTours', 'PrivateGuides', 'TailoredItineraries', 'LuxuryTravel', 'AdventureTravel', 'CulturalImmersion', 'WellnessRetreat', 'FamilyTravel']
} as const;

export type SubcategoryKey<T extends PrimaryCategoryKey> = (typeof SUBCATEGORIES)[T][number];

// 获取分类显示名称的函数（需要传入 messages 对象）
export function getCategoryDisplayName(key: PrimaryCategoryKey, messages: any): string {
  return messages?.labels?.primaryCategories?.[key] || key;
}

// 获取子分类显示名称的函数（需要传入 messages 对象）
export function getSubcategoryDisplayName<T extends PrimaryCategoryKey>(primaryKey: T, subcategoryKey: SubcategoryKey<T>, messages: any): string {
  return messages?.labels?.subcategories?.[primaryKey]?.[subcategoryKey] || subcategoryKey;
}

import domesticTravelData from '@/src/data/tools/domestic-travel.json';
import outboundTravelData from '@/src/data/tools/outbound-travel.json';
import hotelsData from '@/src/data/tools/hotels.json';
import flightsData from '@/src/data/tools/flights.json';
import localExperiencesData from '@/src/data/tools/local-experiences.json';
import cruiseTravelData from '@/src/data/tools/cruise-travel.json';
import customTravelData from '@/src/data/tools/custom-travel.json';

import type { Tool } from '@/types/tool';
import type { PrimaryCategoryKey } from '@/src/constants/category.constant';

export const ROUTE_TO_PRIMARY: Record<string, PrimaryCategoryKey> = {
  'domestic-travel': 'DomesticTravel',
  'outbound-travel': 'OutboundTravel',
  'hotels': 'Hotels',
  'flights': 'Flights',
  'local-experiences': 'LocalExperiences',
  'cruise-travel': 'CruiseTravel',
  'custom-travel': 'CustomTravel'
};

export const DATA_BY_PRIMARY: Record<PrimaryCategoryKey, Tool[]> = {
  DomesticTravel: domesticTravelData as unknown as Tool[],
  OutboundTravel: outboundTravelData as unknown as Tool[],
  Hotels: hotelsData as unknown as Tool[],
  Flights: flightsData as unknown as Tool[],
  LocalExperiences: localExperiencesData as unknown as Tool[],
  CruiseTravel: cruiseTravelData as unknown as Tool[],
  CustomTravel: customTravelData as unknown as Tool[]
};

export const getToolsByPrimaryCategory = (key: string): Tool[] => {
  const primary: PrimaryCategoryKey = ROUTE_TO_PRIMARY[key] || 'DomesticTravel';
  return DATA_BY_PRIMARY[primary] || [];
};
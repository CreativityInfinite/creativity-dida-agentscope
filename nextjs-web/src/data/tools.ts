import domesticTravelData from '@data/tools/domestic-travel.json';
import outboundTravelData from '@data/tools/outbound-travel.json';
import hotelsData from '@data/tools/hotels.json';
import flightsData from '@data/tools/flights.json';
import localExperiencesData from '@data/tools/local-experiences.json';
import cruiseTravelData from '@data/tools/cruise-travel.json';
import customTravelData from '@data/tools/custom-travel.json';

export const toolsData = [...domesticTravelData, ...outboundTravelData, ...hotelsData, ...flightsData, ...localExperiencesData, ...cruiseTravelData, ...customTravelData];

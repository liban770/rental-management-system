export type Currency = 'USD' | 'SLSH';

export interface Property {
  id: string;
  title: string;
  tagline?: string;
  location: string;
  district: string;
  city: string;
  priceUsd: number;
  beds: number;
  baths: number;
  areaM2: number;
  parking: number;
  yearBuilt: number;
  category: 'villa' | 'apartment' | 'duplex' | 'office';
  deedNumber: string;
  isVerified: boolean;
  isFeatured?: boolean;
  isAvailableNow?: boolean;
  furnishing: 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
  rating: number;
  reviewCount: number;
  images: {
    hero: string;
    master?: string;
    kitchen?: string;
    courtyard?: string;
    aerial?: string;
    gallery?: string[];
  };
  amenities: string[];
  description: string;
  financialTerms: {
    monthlyRentUsd: number;
    depositUsd: number;
    minLeaseMonths: number;
    paymentMethods: string[];
  };
  proximity: {
    airportMin: number;
    cityCenterMin: number;
    hospitalMin: number;
    unHubMin: number;
    coordinates: string;
  };
  landlord: {
    name: string;
    role: string;
    agency: string;
    isKycVerified: boolean;
    rating: number;
    avatar: string;
    phone: string;
    whatsapp: string;
  };
}

export interface RentCollectionTransaction {
  id: string;
  tenantName: string;
  tenantPhone: string;
  tenantInitials: string;
  propertyName: string;
  unit: string;
  amountUsd: number;
  paymentMethod: string;
  dateStr: string;
  status: 'Paid' | 'Processing' | 'Pending';
}

export interface MaintenanceTicket {
  id: string;
  title: string;
  unit: string;
  description: string;
  contractor: string;
  priority: 'High' | 'Medium' | 'Low';
  eta: string;
  status: 'Submitted' | 'Assigned' | 'In Progress' | 'Completed';
  step: number;
}

export interface SubUnit {
  id: string;
  name: string;
  floor: string;
  beds: number;
  baths: number;
  areaM2: number;
  estimatedRentUsd: number;
}

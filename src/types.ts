/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  size: string;
  bedType: string;
  image: string;
  amenities: string[];
  featured: boolean;
  rating: number;
}

export interface BanquetPackage {
  id: string;
  name: string;
  description: string;
  capacityRange: string;
  pricePerPlate: number;
  features: string[];
  image: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  tag?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'rooms' | 'banquet' | 'dining' | 'interior';
  image: string;
}

export interface Booking {
  id: string;
  bookingType: 'room' | 'banquet';
  itemName: string; // Room Name or Banquet package Name
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  checkInDate: string;
  checkOutDate?: string; // Optional for banquets
  guestCount: number;
  totalPrice: number;
  status: 'confirmed' | 'pending';
  eventDate?: string;
  eventType?: string;
  foodPreference?: 'veg' | 'non-veg' | 'both';
  createdAt: string;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Users, Building, ShieldCheck, ArrowRight, Heart } from 'lucide-react';
import { HOTEL_INFO } from '../data';

interface HeroProps {
  onCheckAvailability: (searchState: {
    bookingType: 'room' | 'banquet';
    checkIn: string;
    checkOut?: string;
    guests: number;
  }) => void;
}

export default function Hero({ onCheckAvailability }: HeroProps) {
  const [bookingType, setBookingType] = useState<'room' | 'banquet'>('room');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({
      bookingType,
      checkIn: checkIn || new Date().toISOString().split('T')[0],
      checkOut: bookingType === 'room' ? (checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0]) : undefined,
      guests: Number(guests)
    });
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-stone-950">
      {/* Background Image with Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/anant_hero_banner_1783610693597.jpg"
          alt="Anant One Hotel & Banquet Facade"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow brightness-[0.4]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-stone-950/30" />
      </div>

      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-700 z-10" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 text-xs uppercase tracking-[0.2em] font-medium font-sans">
            <Heart className="w-3.5 h-3.5 fill-amber-500 animate-pulse text-amber-500" />
            <span>Ghaziabad's Premier Luxury Landmark</span>
          </div>

          {/* Titles */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-100 tracking-tight leading-none">
            {HOTEL_INFO.name} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 font-hindi block mt-2 text-2xl sm:text-3xl lg:text-4xl">
              {HOTEL_INFO.hindiName}
            </span>
          </h1>

          {/* Description */}
          <p className="text-stone-300 text-base sm:text-lg lg:text-xl font-sans font-light leading-relaxed max-w-2xl">
            {HOTEL_INFO.description} Experience exceptional hospitality, awesome food quality, and custom wedding setups that capture comfort and elegance beautifully.
          </p>

          {/* Key Quick Amenities List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 pt-2">
            <div className="flex items-center space-x-2 text-stone-300 text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>3-Storey Banquet Building</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-300 text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Fabulous Gourmet Food</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-300 text-sm">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Complimentary Valet Parking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Overlay at Bottom */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-stone-900/90 backdrop-blur-md p-6 rounded-xl border border-stone-800 shadow-2xl relative overflow-hidden">
          {/* Subtly glowing backglow */}
          <div className="absolute top-0 right-0 w-64 h-2 bg-gradient-to-l from-amber-500 to-transparent opacity-30" />

          <form onSubmit={handleSubmit} className="space-y-4" id="hero-booking-wizard">
            <div className="flex flex-wrap items-center justify-between border-b border-stone-800 pb-4 gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-stone-400 text-xs uppercase tracking-wider font-semibold font-sans">
                  Choose Booking Type:
                </span>
                <div className="inline-flex rounded-lg bg-stone-950 p-1 border border-stone-850">
                  <button
                    type="button"
                    onClick={() => setBookingType('room')}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                      bookingType === 'room'
                        ? 'bg-amber-500 text-stone-950 shadow-md'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Luxurious Rooms
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingType('banquet')}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                      bookingType === 'banquet'
                        ? 'bg-amber-500 text-stone-950 shadow-md'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Banquet & Functions
                  </button>
                </div>
              </div>

              <div className="text-amber-500 text-xs font-mono">
                {bookingType === 'room'
                  ? '• Rates starting from ₹1,799/night'
                  : '• Host weddings, birthdays, corporate functions'}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Check-In Date */}
              <div className="flex flex-col space-y-1">
                <label className="text-stone-400 text-xs font-medium flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                  {bookingType === 'room' ? 'Check-In Date' : 'Event Date'}
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="bg-stone-950 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors w-full [color-scheme:dark]"
                />
              </div>

              {/* Check-Out Date (Rooms only) */}
              {bookingType === 'room' ? (
                <div className="flex flex-col space-y-1">
                  <label className="text-stone-400 text-xs font-medium flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                    Check-Out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    className="bg-stone-950 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors w-full [color-scheme:dark]"
                  />
                </div>
              ) : (
                /* Event Type (Banquets only) */
                <div className="flex flex-col space-y-1">
                  <label className="text-stone-400 text-xs font-medium flex items-center">
                    <Building className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                    Function / Event Type
                  </label>
                  <select
                    className="bg-stone-950 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors w-full"
                    defaultValue="Wedding Ceremony"
                  >
                    <option value="Wedding Ceremony">Wedding / Marriage Function</option>
                    <option value="Engagement Ceremony">Engagement / Ring Ceremony</option>
                    <option value="Birthday Party">Birthday Party Celebration</option>
                    <option value="Anniversary Party">Anniversary / Family Get-Together</option>
                    <option value="Corporate Event">Corporate Meeting / Seminar</option>
                  </select>
                </div>
              )}

              {/* Guests Count */}
              <div className="flex flex-col space-y-1">
                <label className="text-stone-400 text-xs font-medium flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                  {bookingType === 'room' ? 'Number of Guests' : 'Estimated Guest Count'}
                </label>
                {bookingType === 'room' ? (
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="bg-stone-950 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors w-full"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests (Family)</option>
                  </select>
                ) : (
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="bg-stone-950 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors w-full"
                  >
                    <option value={30}>Under 50 guests</option>
                    <option value={80}>50 - 100 guests (Highly Recommended)</option>
                    <option value={150}>100 - 150 guests (Max Capacity)</option>
                  </select>
                )}
              </div>

              {/* Action Button */}
              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  id="hero-search-submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold py-3 px-6 rounded text-sm uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2 border border-amber-400/20 cursor-pointer"
                >
                  <span>{bookingType === 'room' ? 'Check Availability' : 'Calculate & Plan'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

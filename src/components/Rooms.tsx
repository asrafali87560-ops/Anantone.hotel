/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, Users, Maximize, Bed, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ROOMS_DATA } from '../data';
import { Room } from '../types';

interface RoomsProps {
  onSelectRoom: (room: Room) => void;
}

export default function Rooms({ onSelectRoom }: RoomsProps) {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredRooms = ROOMS_DATA.filter(room => {
    if (filterType === 'all') return true;
    if (filterType === 'featured') return room.featured;
    if (filterType === 'budget') return room.pricePerNight < 2000;
    if (filterType === 'suite') return room.id.includes('suite');
    return true;
  });

  return (
    <section id="rooms" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-900 border-t border-stone-850">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-500 font-serif text-sm uppercase tracking-[0.25em] font-semibold">
            Elegant Accommodations
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
            Furnished Luxury Rooms with Good Interiors
          </h2>
          <div className="flex justify-center items-center space-x-2 pt-2">
            <div className="w-12 h-[1px] bg-amber-500/50" />
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <div className="w-12 h-[1px] bg-amber-500/50" />
          </div>
          <p className="text-stone-400 text-base font-sans font-light max-w-2xl mx-auto">
            Our guests rave about our clean, decorative, and well-furnished rooms. Designed with modern aesthetics and supreme comfort to make you feel like family.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-center items-center flex-wrap gap-2 mb-12">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-colors duration-150 ${
              filterType === 'all'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            All Rooms
          </button>
          <button
            onClick={() => setFilterType('featured')}
            className={`px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-colors duration-150 ${
              filterType === 'featured'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            Featured Suits
          </button>
          <button
            onClick={() => setFilterType('suite')}
            className={`px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-colors duration-150 ${
              filterType === 'suite'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            Executive Suites
          </button>
          <button
            onClick={() => setFilterType('budget')}
            className={`px-4 py-2 rounded text-xs font-semibold tracking-wider uppercase transition-colors duration-150 ${
              filterType === 'budget'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            Under ₹2,000 / night
          </button>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="rooms-grid">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              id={`room-card-${room.id}`}
              className="bg-stone-950 rounded-xl overflow-hidden border border-stone-850 shadow-xl flex flex-col group hover:border-amber-500/30 transition-all duration-300"
            >
              {/* Room Image */}
              <div className="relative h-64 overflow-hidden bg-stone-900">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-stone-950/85 backdrop-blur-md border border-stone-800 px-3 py-1 rounded text-amber-400 text-xs font-semibold tracking-wide flex items-center space-x-1 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{room.rating} Rating</span>
                </div>
                {room.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase shadow-md">
                    Premium Best-Seller
                  </div>
                )}
              </div>

              {/* Room Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-serif font-semibold text-stone-100 group-hover:text-amber-400 transition-colors">
                      {room.name}
                    </h3>
                    <div className="text-right">
                      <span className="text-2xl font-serif font-bold text-amber-400">₹{room.pricePerNight}</span>
                      <span className="text-stone-500 text-xs block -mt-1">/ night</span>
                    </div>
                  </div>
                  <p className="text-stone-400 text-sm font-sans font-light leading-relaxed">
                    {room.description}
                  </p>
                </div>

                {/* Quick Specs */}
                <div className="grid grid-cols-3 gap-2 border-y border-stone-900 py-3 text-stone-400 text-xs">
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-amber-500/80" />
                    <span>Up to {room.capacity} Guests</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Maximize className="w-4 h-4 text-amber-500/80" />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Bed className="w-4 h-4 text-amber-500/80" />
                    <span>{room.bedType}</span>
                  </div>
                </div>

                {/* Amenities checklist */}
                <div className="space-y-1.5">
                  <span className="text-stone-400 text-[10px] uppercase tracking-wider font-semibold block">
                    In-Room Amenities:
                  </span>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <div key={idx} className="flex items-center space-x-1 text-stone-300 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Trigger */}
                <button
                  onClick={() => onSelectRoom(room)}
                  id={`room-book-btn-${room.id}`}
                  className="w-full bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-amber-400 border border-stone-800 hover:border-transparent font-semibold py-2.5 rounded text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Book This Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

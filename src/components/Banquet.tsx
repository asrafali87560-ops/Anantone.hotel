/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, Utensils, CalendarDays, Calculator, ArrowRight, Sparkles, AlertCircle, Building2 } from 'lucide-react';
import { BANQUET_PACKAGES } from '../data';
import { BanquetPackage } from '../types';

interface BanquetProps {
  onPlanInquiry: (inquiryData: {
    packageName: string;
    guestCount: number;
    foodPref: 'veg' | 'non-veg';
    decorStyle: string;
    totalEst: number;
  }) => void;
}

export default function Banquet({ onPlanInquiry }: BanquetProps) {
  // Calculator State
  const [guestCount, setGuestCount] = useState<number>(80);
  const [foodPreference, setFoodPreference] = useState<'veg' | 'non-veg'>('veg');
  const [decorStyle, setDecorStyle] = useState<'standard' | 'premium' | 'royal'>('premium');
  const [eventType, setEventType] = useState<string>('Wedding Ceremony');

  // Estimate computation
  const platePrice = foodPreference === 'veg' ? 650 : 850;
  const foodCost = guestCount * platePrice;
  const decorPriceMap = {
    standard: 10000,
    premium: 20000,
    royal: 35000
  };
  const decorCost = decorPriceMap[decorStyle];
  const subTotal = foodCost + decorCost;
  const gstCost = Math.round(subTotal * 0.18);
  const grandTotal = subTotal + gstCost;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlanInquiry({
      packageName: `${eventType} Custom Plan`,
      guestCount,
      foodPref: foodPreference,
      decorStyle: decorStyle.toUpperCase(),
      totalEst: grandTotal
    });
  };

  return (
    <section id="banquet" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-950 border-t border-stone-900">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-500 font-serif text-sm uppercase tracking-[0.25em] font-semibold">
            Celebrate in Style
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
            Three-Story Luxury Banquet & Marriage Hall
          </h2>
          <div className="flex justify-center items-center space-x-2 pt-2">
            <div className="w-12 h-[1px] bg-amber-500/50" />
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <div className="w-12 h-[1px] bg-amber-500/50" />
          </div>
          <p className="text-stone-400 text-base font-sans font-light max-w-2xl mx-auto">
            Perfectly optimized for medium, small, and intimate marriage functions in Ghaziabad. We offer magnificent decorations, fabulous catering services, and premium supervision under the eye of our warm family management.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Package Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-semibold text-stone-200">
                Tailored Event Packages
              </h3>
              <p className="text-stone-400 font-sans font-light text-sm">
                Each package provides dedicated supervision, breathtaking lights, in-house chefs, and a warm family-like approach to accommodate up to 150 guests beautifully.
              </p>
            </div>

            <div className="space-y-6">
              {BANQUET_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-stone-900 rounded-xl p-6 border border-stone-850 flex flex-col md:flex-row gap-6 hover:border-amber-500/20 transition-all duration-300"
                >
                  <div className="w-full md:w-44 h-32 rounded-lg overflow-hidden shrink-0 bg-stone-950">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 flex-wrap">
                        <h4 className="text-lg font-serif font-semibold text-amber-400">{pkg.name}</h4>
                        <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium">
                          {pkg.capacityRange}
                        </span>
                      </div>
                      <p className="text-stone-400 text-xs font-light mt-1.5 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-850/50">
                      <div className="text-xs text-stone-300 flex items-center space-x-1">
                        <Utensils className="w-3.5 h-3.5 text-amber-500" />
                        <span>Starting ₹{pkg.pricePerPlate}/plate</span>
                      </div>
                      <div className="flex items-center text-[11px] text-amber-500 font-semibold space-x-1">
                        <span>Includes custom catering & decor</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Estimator Tool */}
          <div className="bg-stone-900 rounded-2xl border border-stone-800 p-8 relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-500" />
            <div className="flex items-center space-x-2.5 mb-6">
              <Calculator className="w-6 h-6 text-amber-500" />
              <h3 className="text-xl font-serif font-semibold text-stone-200">
                Interactive Event Budget Planner
              </h3>
            </div>

            <div className="space-y-6">
              {/* Event Type Select */}
              <div className="space-y-2">
                <label className="text-stone-400 text-xs font-semibold uppercase tracking-wider">
                  Event / Function Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="bg-stone-950 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2.5 focus:outline-none focus:border-amber-500 w-full"
                >
                  <option value="Wedding Function">Traditional Wedding / Marriage Function</option>
                  <option value="Sangeet / Mehendi">Sangeet or Mehendi Ceremony</option>
                  <option value="Engagement Reception">Premium Ring Ceremony / Engagement</option>
                  <option value="Birthday Bash">Birthday / Small Party Celebration</option>
                  <option value="Anniversary Gala">Anniversary / Custom Gala</option>
                </select>
              </div>

              {/* Guest Count Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-stone-400 text-xs font-semibold uppercase tracking-wider">
                    Number of Guests
                  </label>
                  <span className="text-amber-400 font-mono text-sm font-bold bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                    {guestCount} People
                  </span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={150}
                  step={5}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-950 cursor-pointer h-1.5 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>30 Min</span>
                  <span>100 (Recommended)</span>
                  <span>150 Max Capacity</span>
                </div>
              </div>

              {/* Food Category Selector */}
              <div className="space-y-2">
                <label className="text-stone-400 text-xs font-semibold uppercase tracking-wider block">
                  Food Option & Plate Cost
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFoodPreference('veg')}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                      foodPreference === 'veg'
                        ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400'
                        : 'border-stone-850 bg-stone-950 text-stone-400 hover:border-stone-800'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">Pure Veg Catering</span>
                    <span className="text-lg font-serif font-bold mt-1">₹650 <span className="text-xs font-light">/ plate</span></span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFoodPreference('non-veg')}
                    className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all ${
                      foodPreference === 'non-veg'
                        ? 'border-amber-500/50 bg-amber-950/20 text-amber-400'
                        : 'border-stone-850 bg-stone-950 text-stone-400 hover:border-stone-800'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider">Veg & Non-Veg</span>
                    <span className="text-lg font-serif font-bold mt-1">₹850 <span className="text-xs font-light">/ plate</span></span>
                  </button>
                </div>
              </div>

              {/* Decoration Tier Selector */}
              <div className="space-y-2">
                <label className="text-stone-400 text-xs font-semibold uppercase tracking-wider block">
                  Decoration & Ambience Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'standard', name: 'Elegant Minimal', price: '₹10,000' },
                    { key: 'premium', name: 'Elite Classic', price: '₹20,000' },
                    { key: 'royal', name: 'Grand Royal Palace', price: '₹35,000' }
                  ].map((theme) => (
                    <button
                      key={theme.key}
                      type="button"
                      onClick={() => setDecorStyle(theme.key as any)}
                      className={`p-2.5 rounded text-center flex flex-col items-center justify-between border transition-all ${
                        decorStyle === theme.key
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                          : 'border-stone-850 bg-stone-950 text-stone-400 hover:border-stone-800'
                      }`}
                    >
                      <span className="text-[10px] font-bold block">{theme.name}</span>
                      <span className="text-xs font-mono font-semibold mt-1 text-stone-300">{theme.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Calculation Summary */}
              <div className="bg-stone-950 rounded-xl p-5 border border-stone-850 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Catering ({guestCount} guests × ₹{platePrice}):</span>
                  <span className="text-stone-200">₹{foodCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Bespoke Event Decor:</span>
                  <span className="text-stone-200">₹{decorCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-400 border-t border-stone-900 pt-2">
                  <span>Subtotal:</span>
                  <span className="text-stone-200">₹{subTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>GST Taxes (18%):</span>
                  <span className="text-stone-200">₹{gstCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-amber-400 font-bold border-t border-stone-800 pt-2 text-sm">
                  <span className="flex items-center">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 mr-1.5 shrink-0" />
                    Estimated Total Budget:
                  </span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleInquirySubmit}
                id="banquet-estimate-submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold py-3 px-6 rounded text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2 border border-amber-400/20 cursor-pointer"
              >
                <span>Inquire About This Estimate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8 border-t border-stone-900">
          <div className="p-6 space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-serif font-semibold text-stone-200">Beautiful 3-Story Space</h4>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Our unique three-story architecture provides modular floors to separate ceremony stages, catering buffets, and private family preparation areas.
            </p>
          </div>
          <div className="p-6 space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2">
              <Utensils className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-serif font-semibold text-stone-200">Superb Food Quality</h4>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              Our food is described by clients as "fabulous" and "very tasty." We host highly organized live counter setups managed with pristine hygiene.
            </p>
          </div>
          <div className="p-6 space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mb-2">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-serif font-semibold text-stone-200">Caring Supervision</h4>
            <p className="text-stone-400 text-xs font-light leading-relaxed">
              From our owner who behaves like family, to special staff members like Ganesh ji, every single helper is caring, professional, and hospitable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

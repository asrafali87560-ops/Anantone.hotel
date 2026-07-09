/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin, Mail, Clock, Heart, Star, Navigation } from 'lucide-react';
import { HOTEL_INFO } from '../data';

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-850 pt-20 pb-8 text-stone-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-stone-900">
          {/* Column 1: Brand & Desc */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold tracking-wide text-amber-400">
                ANANT ONE
              </h3>
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500 block">
                Hotel & Banquet • अनंत वन
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Experience grand three-storey architectural comfort, legendary catering services, and premium wedding decors in the heart of Ghaziabad. We handle your parking challenge through complimentary premium valet services.
            </p>
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-[10px] text-stone-500 font-semibold ml-2">5-STAR CUSTOMER CARE</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-stone-200 text-sm font-semibold uppercase tracking-wider font-serif">
              Explore Our Venue
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors duration-150 block">Home Overview</a>
              </li>
              <li>
                <a href="#rooms" className="hover:text-amber-400 transition-colors duration-150 block">Furnished Rooms</a>
              </li>
              <li>
                <a href="#banquet" className="hover:text-amber-400 transition-colors duration-150 block">Three-Story Banquet Hall</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors duration-150 block">Photo Gallery</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors duration-150 block font-medium">Guest Testimonials</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="space-y-4">
            <h4 className="text-stone-200 text-sm font-semibold uppercase tracking-wider font-serif">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 text-amber-500 shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-amber-500 shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-amber-400">
                  {HOTEL_INFO.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-amber-500 shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-amber-400">
                  {HOTEL_INFO.email}
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-amber-500 shrink-0" />
                <span>Open 24 Hours / 7 Days</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Premium Custom Visual Map Guideline */}
          <div className="space-y-4">
            <h4 className="text-stone-200 text-sm font-semibold uppercase tracking-wider font-serif">
              Navigating Here
            </h4>
            <div className="bg-stone-900 border border-stone-850 p-4 rounded-xl space-y-3 shadow-md relative overflow-hidden">
              <div className="text-[11px] leading-relaxed text-stone-300">
                Located prominently inside the bustling <strong className="text-amber-400">Navyug Market</strong> block of Ghaziabad. We offer dedicated spaces with professional valet.
              </div>
              <a
                href={HOTEL_INFO.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-stone-950 hover:bg-amber-500 hover:text-stone-950 text-amber-400 text-[10px] font-bold uppercase tracking-wider py-2 rounded text-center border border-stone-800 hover:border-transparent transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                id="footer-maps-cta"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Launch Google Maps GPS</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Base */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 space-y-4 sm:space-y-0">
          <p>© 2026 {HOTEL_INFO.name}. All Rights Reserved. Designed to perfection.</p>
          <div className="flex items-center space-x-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in Ghaziabad, Uttar Pradesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Menu, X, CalendarCheck2, Star } from 'lucide-react';
import { HOTEL_INFO } from '../data';

interface NavbarProps {
  onOpenBooking: () => void;
  activeSection: string;
}

export default function Navbar({ onOpenBooking, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Banquet & Events', href: '#banquet' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top micro-bar */}
      <div className="bg-amber-950 text-amber-100 text-xs py-2 px-4 sm:px-6 md:px-8 flex justify-between items-center border-b border-amber-900/30 font-sans tracking-wide">
        <div className="flex items-center space-x-4">
          <a
            href={`tel:${HOTEL_INFO.phone.replace(/\s+/g, '')}`}
            className="flex items-center hover:text-amber-300 transition-colors duration-150"
            id="nav-top-phone"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            <span>{HOTEL_INFO.phone}</span>
          </a>
          <span className="hidden sm:inline text-amber-800">|</span>
          <a
            href={HOTEL_INFO.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center hover:text-amber-300 transition-colors duration-150"
            id="nav-top-map"
          >
            <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            <span>Navyug Market, Ghaziabad</span>
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold">Pure Hospitality</span>
          <span className="text-amber-500">•</span>
          <span>Best Price Guaranteed</span>
        </div>
      </div>

      {/* Main header */}
      <header
        id="app-header"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-900/95 backdrop-blur-md shadow-lg border-b border-stone-800 py-3'
            : 'bg-stone-900/80 backdrop-blur-sm border-b border-stone-800/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex flex-col group cursor-pointer"
            id="nav-logo"
          >
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-serif font-semibold tracking-wide text-amber-400 group-hover:text-amber-300 transition-colors">
                ANANT ONE
              </span>
              <span className="text-stone-400 text-xs hidden md:inline">★ ★ ★ ★</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 -mt-0.5 group-hover:text-amber-200/80 transition-colors">
              Hotel & Banquet • अनंत वन
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  id={`nav-link-${item.href.slice(1)}`}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? 'text-amber-400'
                      : 'text-stone-300 hover:text-amber-300'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Quick Booking Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onOpenBooking}
              id="nav-cta-book"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold px-5 py-2.5 rounded text-sm tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center space-x-2 border border-amber-400/20"
            >
              <CalendarCheck2 className="w-4 h-4" />
              <span>Reserve Room / Event</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={onOpenBooking}
              id="nav-mobile-book"
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold p-2 rounded text-xs transition-colors flex items-center justify-center"
              title="Book Now"
            >
              <CalendarCheck2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="nav-mobile-menu-toggle"
              className="p-2 text-stone-300 hover:text-amber-400 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" id="mobile-menu-drawer">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <nav className="fixed top-[92px] left-0 w-full bg-stone-900 border-b border-stone-800 py-6 px-6 shadow-xl flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  id={`nav-mob-link-${item.href.slice(1)}`}
                  className={`text-base font-medium py-2 border-b border-stone-800/50 transition-colors ${
                    isActive ? 'text-amber-400 font-semibold' : 'text-stone-300 hover:text-amber-300'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-4 flex flex-col space-y-4">
              <button
                onClick={() => {
                  onOpenBooking();
                  setIsMobileMenuOpen(false);
                }}
                id="nav-mob-cta-book"
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold py-3 rounded text-center tracking-wider uppercase transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <CalendarCheck2 className="w-4 h-4" />
                <span>Book / Plan Event</span>
              </button>
              <div className="flex items-center justify-center space-x-6 text-stone-400 text-sm pt-2">
                <a href={`tel:${HOTEL_INFO.phone.replace(/\s+/g, '')}`} className="flex items-center hover:text-amber-400">
                  <Phone className="w-4 h-4 mr-1.5" />
                  Call Now
                </a>
                <span>•</span>
                <a href={HOTEL_INFO.mapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-amber-400">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  Directions
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Rooms from './components/Rooms';
import Banquet from './components/Banquet';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import BookingSystem from './components/BookingSystem';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { Room } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedBanquetPlan, setSelectedBanquetPlan] = useState<{
    packageName: string;
    guestCount: number;
    foodPref: 'veg' | 'non-veg';
    totalEst: number;
  } | null>(null);

  // Intersection observer or scroll handler to track active navigation section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'rooms', 'banquet', 'gallery', 'reviews', 'faq'];
      const scrollPosition = window.scrollY + 200; // Offset for sticky headers

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quick Action: Check availability from Hero quick booking search widget
  const handleHeroCheckAvailability = (searchState: {
    bookingType: 'room' | 'banquet';
    checkIn: string;
    checkOut?: string;
    guests: number;
  }) => {
    if (searchState.bookingType === 'room') {
      // Pre-select first room or existing, scroll to booking
      setSelectedRoom(null);
      setTimeout(() => {
        const firstRoom = { id: 'deluxe-king' } as Room; // fallback anchor
        setSelectedRoom(firstRoom);
      }, 50);
    } else {
      setSelectedBanquetPlan({
        packageName: 'Custom Package Inquiry',
        guestCount: searchState.guests,
        foodPref: 'veg',
        totalEst: searchState.guests * 650 + 20000
      });
    }

    // Scroll to the booking element
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Select room from Rooms catalog card trigger
  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Plan inquiry from Banquet Planner Estimator trigger
  const handlePlanInquiry = (inquiryData: {
    packageName: string;
    guestCount: number;
    foodPref: 'veg' | 'non-veg';
    totalEst: number;
  }) => {
    setSelectedBanquetPlan(inquiryData);
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Open booking empty form
  const handleOpenBookingHub = () => {
    setSelectedRoom(null);
    setSelectedBanquetPlan(null);
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleClearSelections = () => {
    setSelectedRoom(null);
    setSelectedBanquetPlan(null);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Premium Header/Navigation */}
      <Navbar onOpenBooking={handleOpenBookingHub} activeSection={activeSection} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Landing */}
        <Hero onCheckAvailability={handleHeroCheckAvailability} />

        {/* Room Showcase */}
        <Rooms onSelectRoom={handleSelectRoom} />

        {/* Banquet & Event Planner Section */}
        <Banquet onPlanInquiry={handlePlanInquiry} />

        {/* Stunning Categorizable Photo Gallery */}
        <Gallery />

        {/* Real Customer Feedback Reviews */}
        <Testimonials />

        {/* Responsive Interactive Booking & Inquiries System */}
        <BookingSystem
          selectedRoom={selectedRoom}
          selectedBanquetPlan={selectedBanquetPlan}
          onClearSelections={handleClearSelections}
        />

        {/* FAQs Accordions */}
        <FAQ />
      </main>

      {/* Premium Footer with Maps */}
      <Footer />
    </div>
  );
}

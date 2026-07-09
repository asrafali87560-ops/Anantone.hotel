/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Users, Phone, Mail, User, ShieldCheck, Ticket, Download, Trash2, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA } from '../data';
import { Booking, Room } from '../types';

interface BookingSystemProps {
  selectedRoom: Room | null;
  selectedBanquetPlan: {
    packageName: string;
    guestCount: number;
    foodPref: 'veg' | 'non-veg';
    totalEst: number;
  } | null;
  onClearSelections: () => void;
}

export default function BookingSystem({ selectedRoom, selectedBanquetPlan, onClearSelections }: BookingSystemProps) {
  // Tabs for Room vs Banquet booking
  const [activeTab, setActiveTab] = useState<'room' | 'banquet'>('room');

  // Customer State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Room Booking State
  const [roomId, setRoomId] = useState(ROOMS_DATA[0].id);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomGuests, setRoomGuests] = useState(2);

  // Banquet Booking State
  const [eventType, setEventType] = useState('Wedding Ceremony');
  const [eventDate, setEventDate] = useState('');
  const [banquetGuests, setBanquetGuests] = useState(80);
  const [foodPref, setFoodPref] = useState<'veg' | 'non-veg'>('veg');

  // Bookings list state
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [activeReceipt, setActiveReceipt] = useState<Booking | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Handle selected items from parent
  useEffect(() => {
    if (selectedRoom) {
      setActiveTab('room');
      setRoomId(selectedRoom.id);
      // scroll to booking section
      const element = document.getElementById('booking-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (selectedBanquetPlan) {
      setActiveTab('banquet');
      setBanquetGuests(selectedBanquetPlan.guestCount);
      setFoodPref(selectedBanquetPlan.foodPref);
      setEventType(selectedBanquetPlan.packageName);
      // scroll to booking section
      const element = document.getElementById('booking-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedBanquetPlan]);

  // Load bookings from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('anant_one_bookings');
    if (saved) {
      setMyBookings(JSON.parse(saved));
    }
  }, []);

  const handleRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !checkIn || !checkOut) return;

    const selectedRoomDetails = ROOMS_DATA.find(r => r.id === roomId) || ROOMS_DATA[0];
    const checkInDateObj = new Date(checkIn);
    const checkOutDateObj = new Date(checkOut);
    const diffTime = Math.abs(checkOutDateObj.getTime() - checkInDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const price = selectedRoomDetails.pricePerNight * diffDays;

    const newBooking: Booking = {
      id: `ANANT-R-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingType: 'room',
      itemName: selectedRoomDetails.name,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guestCount: roomGuests,
      totalPrice: price,
      status: 'confirmed',
      createdAt: new Date().toLocaleDateString('en-IN')
    };

    const updated = [newBooking, ...myBookings];
    setMyBookings(updated);
    localStorage.setItem('anant_one_bookings', JSON.stringify(updated));

    setSuccessMsg(`Room reservation successful! Booking ID: ${newBooking.id}`);
    setActiveReceipt(newBooking);

    // Reset fields except client info for convenience
    setCheckIn('');
    setCheckOut('');
    onClearSelections();
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleBanquetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !eventDate) return;

    // Calculate approximate price
    const platePrice = foodPref === 'veg' ? 650 : 850;
    const foodCost = banquetGuests * platePrice;
    const decorCost = 20000; // default premium decor
    const totalEst = Math.round((foodCost + decorCost) * 1.18);

    const newBooking: Booking = {
      id: `ANANT-B-${Math.floor(1000 + Math.random() * 9000)}`,
      bookingType: 'banquet',
      itemName: eventType,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      checkInDate: eventDate, // we store eventDate in checkInDate
      guestCount: banquetGuests,
      totalPrice: totalEst,
      status: 'pending', // Banquet inquiries are pending verification by management (family-like owner)
      foodPreference: foodPref,
      createdAt: new Date().toLocaleDateString('en-IN')
    };

    const updated = [newBooking, ...myBookings];
    setMyBookings(updated);
    localStorage.setItem('anant_one_bookings', JSON.stringify(updated));

    setSuccessMsg(`Banquet planning inquiry received! Inquiry ID: ${newBooking.id}`);
    setActiveReceipt(newBooking);

    // Reset event details
    setEventDate('');
    onClearSelections();
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = myBookings.filter(b => b.id !== id);
    setMyBookings(updated);
    localStorage.setItem('anant_one_bookings', JSON.stringify(updated));
  };

  return (
    <section id="booking-section" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-900 border-t border-stone-850 relative">
      {/* Decorative Blur Backglow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-500 font-serif text-sm uppercase tracking-[0.25em] font-semibold">
            Reservations Hub
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
            Book Rooms & Plan Banquet Events
          </h2>
          <div className="flex justify-center items-center space-x-2 pt-2">
            <div className="w-12 h-[1px] bg-amber-500/50" />
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <div className="w-12 h-[1px] bg-amber-500/50" />
          </div>
          <p className="text-stone-400 text-base font-sans font-light max-w-2xl mx-auto">
            Book well-furnished, clean rooms with beautiful interiors, or send a detailed wedding & party inquiry. Experience comforting luxury and exceptional Indian hospitality.
          </p>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl max-w-4xl mx-auto mb-10 flex items-center space-x-3 text-sm animate-bounce-slow">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Booking Form Card */}
          <div className="bg-stone-950 rounded-2xl p-6 sm:p-8 border border-stone-850 shadow-2xl lg:col-span-7">
            {/* Form tab controllers */}
            <div className="flex rounded-lg bg-stone-900 p-1 border border-stone-800 mb-8">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('room');
                  onClearSelections();
                }}
                className={`flex-1 text-center py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'room'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Book A Room
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('banquet');
                  onClearSelections();
                }}
                className={`flex-1 text-center py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'banquet'
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Plan Banquet Function
              </button>
            </div>

            {/* Customer Personal Details (Shared) */}
            <div className="space-y-6">
              <div className="border-b border-stone-900 pb-4">
                <h3 className="text-sm font-semibold uppercase text-stone-400 tracking-wider mb-1 flex items-center">
                  <User className="w-4 h-4 text-amber-500 mr-2" />
                  1. Contact Information
                </h3>
                <p className="text-stone-500 text-[11px]">We require your real contact details to process the check-in or events call.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-stone-400 text-xs font-medium">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-stone-400 text-xs font-medium">Mobile Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 076783 39370"
                    className="bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 text-xs font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                />
              </div>

              {/* SPECIFIC TAB FOR ROOMS */}
              {activeTab === 'room' ? (
                <form onSubmit={handleRoomSubmit} className="space-y-6 pt-4">
                  <div className="border-b border-stone-900 pb-4">
                    <h3 className="text-sm font-semibold uppercase text-stone-400 tracking-wider mb-1 flex items-center">
                      <Calendar className="w-4 h-4 text-amber-500 mr-2" />
                      2. Stay Preferences
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-stone-400 text-xs font-medium">Select Room Type</label>
                      <select
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                      >
                        {ROOMS_DATA.map(r => (
                          <option key={r.id} value={r.id}>{r.name} (₹{r.pricePerNight}/night)</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-stone-400 text-xs font-medium">Number of Guests</label>
                      <select
                        value={roomGuests}
                        onChange={(e) => setRoomGuests(Number(e.target.value))}
                        className="bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests (Standard)</option>
                        <option value={3}>3 Guests (Extra Bed)</option>
                        <option value={4}>4 Guests (Suite Max)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-stone-400 text-xs font-medium">Check-In Date</label>
                      <input
                        type="date"
                        required
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-stone-400 text-xs font-medium">Check-Out Date</label>
                      <input
                        type="date"
                        required
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        min={checkIn || new Date().toISOString().split('T')[0]}
                        className="bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      id="room-booking-submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold py-3 px-6 rounded text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2 border border-amber-400/20 cursor-pointer"
                    >
                      <span>Confirm Room Reservation</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* SPECIFIC TAB FOR BANQUETS */
                <form onSubmit={handleBanquetSubmit} className="space-y-6 pt-4">
                  <div className="border-b border-stone-900 pb-4">
                    <h3 className="text-sm font-semibold uppercase text-stone-400 tracking-wider mb-1 flex items-center">
                      <Calendar className="w-4 h-4 text-amber-500 mr-2" />
                      2. Banquet Celebration Specifics
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-stone-400 text-xs font-medium">Event Type</label>
                      <input
                        type="text"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        placeholder="e.g. Wedding, Birthday, Anniversary"
                        className="bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-stone-400 text-xs font-medium">Event Celebration Date</label>
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-stone-400 text-xs font-medium">Estimated Guests (Under 150)</label>
                      <input
                        type="number"
                        min={30}
                        max={150}
                        value={banquetGuests}
                        onChange={(e) => setBanquetGuests(Number(e.target.value))}
                        className="bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-stone-400 text-xs font-medium">Food Preference Choice</label>
                      <select
                        value={foodPref}
                        onChange={(e) => setFoodPref(e.target.value as any)}
                        className="bg-stone-900 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none"
                      >
                        <option value="veg">Pure Vegetarian Buffet (₹650/plate)</option>
                        <option value="non-veg">Veg & Non-Vegetarian Buffet (₹850/plate)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      id="banquet-booking-submit"
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold py-3 px-6 rounded text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2 border border-amber-400/20 cursor-pointer"
                    >
                      <span>Submit Banquet Event Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Booking History & Active Receipts */}
          <div className="space-y-8 lg:col-span-5">
            {/* active receipt board */}
            {activeReceipt && (
              <div className="bg-stone-950 rounded-2xl border border-amber-500/25 p-6 shadow-2xl relative overflow-hidden" id="booking-receipt-slip">
                <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
                <div className="flex justify-between items-baseline mb-4">
                  <div className="flex items-center space-x-1 text-amber-400 text-xs uppercase tracking-widest font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Boarding Pass Receipt</span>
                  </div>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="p-1.5 text-stone-400 hover:text-amber-400 bg-stone-900 border border-stone-800 rounded transition-colors"
                    title="Print Receipt"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Classic Hotel Slip Layout */}
                <div className="bg-stone-900 p-5 rounded-lg border border-stone-800 space-y-4 font-mono text-xs">
                  <div className="text-center border-b border-stone-800 pb-3">
                    <h4 className="text-stone-200 font-serif font-bold text-sm">ANANT ONE HOTEL</h4>
                    <span className="text-[9px] text-stone-500 block">Navyug Market, Ghaziabad | {HOTEL_INFO.phone}</span>
                  </div>

                  <div className="space-y-2 text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-500">ID CODE:</span>
                      <span className="text-amber-400 font-bold">{activeReceipt.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">TYPE:</span>
                      <span className="capitalize text-stone-200">{activeReceipt.bookingType} Selection</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">CLIENT:</span>
                      <span className="text-stone-200 truncate max-w-[150px]">{activeReceipt.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">CONTACT:</span>
                      <span className="text-stone-200">{activeReceipt.customerPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">DATE:</span>
                      <span className="text-stone-200">{activeReceipt.checkInDate}</span>
                    </div>
                    {activeReceipt.checkOutDate && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">UNTIL:</span>
                        <span className="text-stone-200">{activeReceipt.checkOutDate}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-stone-500">GUESTS:</span>
                      <span className="text-stone-200">{activeReceipt.guestCount} People</span>
                    </div>
                    {activeReceipt.foodPreference && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">BUFFET:</span>
                        <span className="text-stone-200 uppercase">{activeReceipt.foodPreference}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-stone-800 pt-3 flex justify-between items-baseline">
                    <span className="text-stone-400 font-sans font-semibold">TOTAL DUE:</span>
                    <span className="text-amber-400 font-serif font-bold text-base">₹{activeReceipt.totalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="text-center text-[10px] text-stone-500 pt-2 border-t border-dashed border-stone-800">
                    {activeReceipt.status === 'confirmed' ? (
                      <span className="text-emerald-500 font-bold uppercase tracking-wider">★ RESERVATION CONFIRMED ★</span>
                    ) : (
                      <span className="text-amber-500 font-bold uppercase tracking-wider">⏳ INQUIRY UNDER REVIEW ⏳</span>
                    )}
                    <p className="mt-1 leading-normal">Show this voucher during reception entry. Thank you so much!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Simulated Booking History Board */}
            <div className="bg-stone-950 rounded-2xl border border-stone-850 p-6 shadow-xl space-y-4">
              <h3 className="text-base font-serif font-semibold text-stone-200 flex items-center">
                <Ticket className="w-5 h-5 text-amber-500 mr-2" />
                Your Booking History ({myBookings.length})
              </h3>

              {myBookings.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-stone-800 rounded-lg text-stone-500 text-xs">
                  No reservations or inquiries made yet. Use the form above to begin.
                </div>
              ) : (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-1" id="booking-history-list">
                  {myBookings.map((bk) => (
                    <div
                      key={bk.id}
                      className="bg-stone-900 border border-stone-850 p-4 rounded-lg flex justify-between items-center text-xs group hover:border-amber-500/10 transition-colors"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-amber-400">{bk.id}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            bk.status === 'confirmed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {bk.status}
                          </span>
                        </div>
                        <p className="text-stone-200 font-semibold truncate">{bk.itemName}</p>
                        <p className="text-stone-500 font-mono text-[10px]">
                          Date: {bk.checkInDate} | Total: ₹{bk.totalPrice.toLocaleString('en-IN')}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => setActiveReceipt(bk)}
                          className="p-1.5 text-stone-400 hover:text-amber-400 bg-stone-950 border border-stone-850 rounded transition-colors"
                          title="View Ticket"
                        >
                          <Ticket className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(bk.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-500 bg-stone-950 border border-stone-850 rounded transition-colors"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

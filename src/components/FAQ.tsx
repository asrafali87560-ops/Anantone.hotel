/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Star } from 'lucide-react';
import { FAQS_DATA } from '../data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-900 border-t border-stone-850">
      <div className="max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-500 font-serif text-sm uppercase tracking-[0.25em] font-semibold">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="flex justify-center items-center space-x-2 pt-2">
            <div className="w-12 h-[1px] bg-amber-500/50" />
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <div className="w-12 h-[1px] bg-amber-500/50" />
          </div>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-4" id="faq-accordions-list">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-stone-950 border border-stone-850 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-6 flex justify-between items-center text-stone-200 hover:text-amber-400 focus:outline-none transition-colors cursor-pointer"
                  id={`faq-btn-${idx}`}
                >
                  <span className="font-serif font-semibold text-sm sm:text-base flex items-center pr-4">
                    <HelpCircle className="w-5 h-5 text-amber-500 mr-3 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'transform rotate-180 text-amber-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-stone-400 text-xs sm:text-sm font-sans font-light leading-relaxed border-t border-stone-900/50 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

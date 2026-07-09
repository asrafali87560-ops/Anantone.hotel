/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Star, MessageSquareCode, PlusCircle, Quote, CheckCircle2, Award } from 'lucide-react';
import { REVIEWS_DATA } from '../data';
import { Review } from '../types';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newTag, setNewTag] = useState('General Feedback');
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('anant_one_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(REVIEWS_DATA);
    }
  }, []);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newReview: Review = {
      id: `custom-rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      comment: newComment,
      tag: newTag,
      date: 'Today'
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('anant_one_reviews', JSON.stringify(updated));

    // Reset Form
    setNewAuthor('');
    setNewRating(5);
    setNewComment('');
    setNewTag('General Feedback');
    setShowAddForm(false);
    setSuccessMessage('Thank you so much for your heartwarming feedback! 🙏');
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-950 border-t border-stone-900">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-500 font-serif text-sm uppercase tracking-[0.25em] font-semibold">
            Honest Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-100 tracking-tight">
            Loved By Families & Function Hosts
          </h2>
          <div className="flex justify-center items-center space-x-2 pt-2">
            <div className="w-12 h-[1px] bg-amber-500/50" />
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <div className="w-12 h-[1px] bg-amber-500/50" />
          </div>
          <p className="text-stone-400 text-base font-sans font-light max-w-2xl mx-auto">
            Read direct quotes from guests who hosted marriage ceremonies and functions or stayed in our well-furnished rooms.
          </p>
        </div>

        {/* Quick Highlights Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          <div className="bg-stone-900/60 p-6 rounded-xl border border-stone-850 text-center space-y-2">
            <span className="text-amber-400 text-3xl font-serif font-bold">5.0 ★</span>
            <h4 className="text-stone-200 text-sm font-semibold uppercase tracking-wider">Caring Hospitality</h4>
            <p className="text-stone-400 text-xs">"Owner behave like a family and every single staff is care able."</p>
          </div>
          <div className="bg-stone-900/60 p-6 rounded-xl border border-stone-850 text-center space-y-2">
            <span className="text-amber-400 text-3xl font-serif font-bold">Fabulous</span>
            <h4 className="text-stone-200 text-sm font-semibold uppercase tracking-wider">Gourmet Food Quality</h4>
            <p className="text-stone-400 text-xs">"Khane ki baat ki jaye to ek dam fabulous, very tasty buffet!"</p>
          </div>
          <div className="bg-stone-900/60 p-6 rounded-xl border border-stone-850 text-center space-y-2">
            <span className="text-amber-400 text-3xl font-serif font-bold">100%</span>
            <h4 className="text-stone-200 text-sm font-semibold uppercase tracking-wider">Beautiful Decor</h4>
            <p className="text-stone-400 text-xs">"Good party space and well maintained decorations and lighting."</p>
          </div>
        </div>

        {/* Success Message Banner */}
        {successMessage && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl max-w-3xl mx-auto mb-10 flex items-center space-x-3 text-sm animate-bounce-slow">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Trigger to write a review */}
        <div className="flex justify-between items-center mb-10 max-w-5xl mx-auto border-b border-stone-850 pb-4">
          <span className="text-stone-400 text-sm font-mono flex items-center">
            <MessageSquareCode className="w-4 h-4 text-amber-500 mr-2" />
            Showing {reviews.length} authentic guest voices
          </span>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs bg-stone-900 hover:bg-amber-500 text-amber-400 hover:text-stone-950 font-semibold px-4 py-2 border border-stone-800 hover:border-transparent rounded transition-all cursor-pointer flex items-center space-x-1.5"
            id="testimonial-add-toggle"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{showAddForm ? 'Close Form' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Add Review Form */}
        {showAddForm && (
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl max-w-xl mx-auto mb-12 shadow-2xl animate-fade-in">
            <h4 className="text-lg font-serif font-semibold text-stone-200 mb-4 flex items-center">
              <Award className="w-5 h-5 text-amber-500 mr-2" />
              Share Your Anant One Experience
            </h4>
            <form onSubmit={handleSubmitReview} className="space-y-4" id="testimonial-form">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-stone-400 text-xs font-semibold uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Sarthak G."
                    className="bg-stone-950 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-stone-400 text-xs font-semibold uppercase">Review Category</label>
                  <select
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="bg-stone-950 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500"
                  >
                    <option value="General Feedback">General Feedback</option>
                    <option value="Rooms Stay">Rooms & Stay</option>
                    <option value="Banquet & Marriage">Banquet & Marriage</option>
                    <option value="Tasty Food Quality">Tasty Food Quality</option>
                    <option value="Excellent Staff Service">Excellent Staff Service</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 text-xs font-semibold uppercase block">Star Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 focus:outline-none transition-transform active:scale-115"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-stone-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-stone-400 text-xs font-semibold uppercase">Your Review Comments</label>
                <textarea
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tell us about the food quality, behavior of staff like Ganesh ji, rooms interior, or party decoration..."
                  className="bg-stone-950 border border-stone-800 text-stone-200 text-sm rounded px-3 py-2 w-full focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                id="testimonial-submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2.5 rounded text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Submit My Review
              </button>
            </form>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonials-grid">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              id={`review-${rev.id}`}
              className="bg-stone-900 border border-stone-850 rounded-xl p-6 relative flex flex-col justify-between hover:border-amber-500/10 transition-all duration-300"
            >
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-amber-500 fill-amber-500" />
              </div>

              <div className="space-y-4">
                {/* Stars and Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-700'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.tag && (
                    <span className="text-[9px] uppercase tracking-wider font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded">
                      {rev.tag}
                    </span>
                  )}
                </div>

                {/* Comment Text */}
                <p className="text-stone-300 text-sm font-sans font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="border-t border-stone-850/50 mt-6 pt-4 flex items-center justify-between text-xs">
                <span className="text-stone-200 font-semibold">{rev.author}</span>
                <span className="text-stone-500 font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

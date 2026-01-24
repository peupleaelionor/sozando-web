'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Plus, MapPin, Star, Phone, Share2 } from 'lucide-react';

const LISTINGS = [
  { id: '1', title: 'Terrain à vendre', price: 45000000, city: 'Kinshasa', category: 'immobilier', rating: 4.8, reviews: 24, verified: true, image: '🏗️', seller: 'Jean Mukanda', phone: '+243 81 234 5678' },
  { id: '2', title: 'iPhone 13 Pro Max', price: 2800000, city: 'Kinshasa', category: 'électronique', rating: 4.9, reviews: 42, verified: true, image: '📱', seller: 'Marie Kasongo', phone: '+243 82 345 6789' },
  { id: '3', title: 'Toyota RAV4 2020', price: 32000000, city: 'Kinshasa', category: 'véhicules', rating: 4.7, reviews: 12, verified: true, image: '🚗', seller: 'Pierre Mbala', phone: '+243 83 456 7890' },
];

export default function Home() {
  const [language, setLanguage] = useState<'ln' | 'fr'>('ln');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleChat = (id: string) => {
    setSelectedListing(id);
    setChatOpen(true);
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleShare = (title: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'soZando',
        text: `Découvrez: ${title}`,
        url: window.location.href,
      });
    } else {
      alert(`Partager: ${title}`);
    }
  };

  const listing = LISTINGS.find(l => l.id === selectedListing);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-red-600">soZando</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('ln')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                language === 'ln' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Lingala
            </button>
            <button
              onClick={() => setLanguage('fr')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                language === 'fr' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Français
            </button>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <Heart size={20} fill={favorites.size > 0 ? 'red' : 'none'} color={favorites.size > 0 ? 'red' : 'gray'} />
              {favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.size}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <MessageCircle size={20} />
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2 font-medium">
              <Plus size={20} />
              {language === 'ln' ? 'Pesa' : 'Publier'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-6">{LISTINGS.length} annonces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LISTINGS.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition overflow-hidden"
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-40 flex items-center justify-center text-6xl relative">
                {listing.image}
                {listing.verified && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    ✓ Vérifié
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(listing.id)}
                  className="absolute bottom-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100"
                >
                  <Heart
                    size={20}
                    fill={favorites.has(listing.id) ? 'red' : 'none'}
                    color={favorites.has(listing.id) ? 'red' : 'gray'}
                  />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{listing.title}</h3>
                <p className="text-red-600 font-bold text-lg mb-2">{(listing.price / 1000000).toFixed(1)}M FC</p>

                <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                  <MapPin size={16} />
                  {listing.city} • {listing.category}
                </div>

                <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                  <Star size={16} fill="gold" color="gold" />
                  {listing.rating} ({listing.reviews} avis)
                </div>

                <div className="mb-3 pb-3 border-b border-gray-200">
                  <p className="text-sm text-gray-700 font-medium">{listing.seller}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleChat(listing.id)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-medium flex items-center justify-center gap-2 transition"
                  >
                    <MessageCircle size={18} />
                    {language === 'ln' ? 'Solola' : 'Discuter'}
                  </button>
                  <button
                    onClick={() => handleCall(listing.phone)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2 transition"
                  >
                    <Phone size={18} />
                    Appeler
                  </button>
                  <button
                    onClick={() => handleShare(listing.title)}
                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Chat Modal */}
      {chatOpen && listing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-white rounded-t-lg p-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Chat avec {listing.seller}</h3>
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="bg-gray-100 rounded-lg p-3 mb-4 text-sm text-gray-700">
              <p className="font-medium mb-1">{listing.seller}:</p>
              <p>Bonjour! Vous êtes intéressé par {listing.title}?</p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder={language === 'ln' ? 'Soki...' : 'Écrivez...'}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 soZando • Solola liboso, mbongo sima 🇨🇩</p>
        </div>
      </footer>
    </div>
  );
}

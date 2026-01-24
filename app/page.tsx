'use client';
import { useState } from 'react';
import { Heart, MessageCircle, Plus, Filter, Search, MapPin, Star } from 'lucide-react';

const LISTINGS = [
  { id: '1', title: 'Terrain à vendre', price: 45000000, city: 'Kinshasa', category: 'immobilier', rating: 4.8, reviews: 24, verified: true, image: '🏗️' },
  { id: '2', title: 'iPhone 13 Pro Max', price: 2800000, city: 'Kinshasa', category: 'électronique', rating: 4.9, reviews: 42, verified: true, image: '📱' },
  { id: '3', title: 'Toyota RAV4 2020', price: 32000000, city: 'Kinshasa', category: 'véhicules', rating: 4.7, reviews: 12, verified: true, image: '🚗' },
];

export default function Home() {
  const [language, setLanguage] = useState<'ln' | 'fr'>('ln');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-red-600">soZando v3.0</h1>
          <div className="flex gap-2">
            <button onClick={() => setLanguage('ln')} className={`px-3 py-1 rounded ${language === 'ln' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>Lingala</button>
            <button onClick={() => setLanguage('fr')} className={`px-3 py-1 rounded ${language === 'fr' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>Français</button>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg"><Heart size={20} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-lg"><MessageCircle size={20} /></button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"><Plus size={20} />{language === 'ln' ? 'Pesa' : 'Publier'}</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-6">{LISTINGS.length} annonces</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LISTINGS.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition overflow-hidden">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-40 flex items-center justify-center text-6xl relative">
                {listing.image}
                <button onClick={() => toggleFavorite(listing.id)} className="absolute bottom-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100">
                  <Heart size={20} fill={favorites.has(listing.id) ? 'red' : 'none'} color={favorites.has(listing.id) ? 'red' : 'gray'} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{listing.title}</h3>
                <p className="text-red-600 font-bold text-lg mb-2">{(listing.price / 1000000).toFixed(1)}M FC</p>
                <div className="flex items-center gap-1 text-gray-600 text-sm mb-2"><MapPin size={16} />{listing.city} • {listing.category}</div>
                <div className="flex items-center gap-1 text-gray-600 text-sm mb-3"><Star size={16} fill="gold" color="gold" />{listing.rating} ({listing.reviews} avis)</div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-medium flex items-center justify-center gap-2"><MessageCircle size={18} />{language === 'ln' ? 'Solola' : 'Discuter'}</button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 font-medium">Appeler</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2026 soZando • Solola liboso, mbongo sima 🇨🇩</p>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Heart, MessageCircle, Plus, Star, Zap, TrendingUp, Filter, X } from 'lucide-react';

// Types
interface Listing {
  id: string;
  title: string;
  price: number;
  currency: 'FC' | 'FCFA';
  location: { city: string };
  category: string;
  rating: number;
  reviews: number;
  views: number;
  verified: boolean;
  mobileMoney: boolean;
  image: string;
}

// Mock data - 50 listings from mobile app
const MOCK_LISTINGS: Listing[] = [
  { id: '1', title: 'Terrain à vendre - Quartier Résidentiel', price: 45000000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'immobilier', rating: 4.8, reviews: 24, views: 342, verified: true, mobileMoney: true, image: '🏗️' },
  { id: '2', title: 'Appartement 3 Chambres - Gombe', price: 850000000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'immobilier', rating: 4.9, reviews: 12, views: 523, verified: true, mobileMoney: true, image: '🏠' },
  { id: '3', title: 'Villa 5 Pièces avec Piscine', price: 1200000000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'immobilier', rating: 4.7, reviews: 8, views: 892, verified: true, mobileMoney: true, image: '🏡' },
  { id: '4', title: 'Bureau Commercial - Centre-Ville', price: 25000000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'immobilier', rating: 4.8, reviews: 15, views: 267, verified: true, mobileMoney: true, image: '🏢' },
  { id: '5', title: 'Studio Meublé - Lemba', price: 8500000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'immobilier', rating: 4.6, reviews: 9, views: 198, verified: true, mobileMoney: true, image: '🏘️' },
  { id: '6', title: 'Maison 4 Chambres - Matete', price: 65000000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'immobilier', rating: 4.9, reviews: 18, views: 445, verified: true, mobileMoney: true, image: '🏠' },
  { id: '7', title: 'iPhone 13 Pro Max 256GB', price: 2800000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'électronique', rating: 4.9, reviews: 42, views: 678, verified: true, mobileMoney: true, image: '📱' },
  { id: '8', title: 'Samsung Galaxy S23 Ultra', price: 3200000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'électronique', rating: 4.8, reviews: 35, views: 892, verified: true, mobileMoney: true, image: '📱' },
  { id: '9', title: 'MacBook Pro M2 14 pouces', price: 5500000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'électronique', rating: 4.9, reviews: 28, views: 534, verified: true, mobileMoney: true, image: '💻' },
  { id: '10', title: 'Toyota RAV4 2020', price: 32000000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'véhicules', rating: 4.7, reviews: 12, views: 1234, verified: true, mobileMoney: true, image: '🚗' },
  { id: '11', title: 'Canapé 7 Places - Cuir', price: 12000000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'meubles', rating: 4.8, reviews: 16, views: 345, verified: true, mobileMoney: true, image: '🛋️' },
  { id: '12', title: 'Réfrigérateur Samsung 450L', price: 8500000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'électroménager', rating: 4.9, reviews: 22, views: 267, verified: true, mobileMoney: true, image: '❄️' },
  { id: '13', title: 'Générateur Honda 7.5 KVA', price: 18000000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'électroménager', rating: 4.8, reviews: 19, views: 567, verified: true, mobileMoney: true, image: '⚡' },
  { id: '14', title: 'Lit King Size avec Matelas', price: 9500000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'meubles', rating: 4.7, reviews: 14, views: 234, verified: true, mobileMoney: true, image: '🛏️' },
  { id: '15', title: 'PlayStation 5 + 2 Manettes', price: 3500000, currency: 'FC', location: { city: 'Kinshasa' }, category: 'électronique', rating: 4.9, reviews: 38, views: 1456, verified: true, mobileMoney: true, image: '🎮' },
  { id: '16', title: 'Moto Honda CB 150', price: 1200000, currency: 'FC', location: { city: 'Lubumbashi' }, category: 'véhicules', rating: 4.8, reviews: 11, views: 789, verified: true, mobileMoney: true, image: '🏍️' },
  { id: '17', title: 'Appartement Goma - 2 Chambres', price: 500000000, currency: 'FC', location: { city: 'Goma' }, category: 'immobilier', rating: 4.7, reviews: 8, views: 412, verified: true, mobileMoney: true, image: '🏠' },
  { id: '18', title: 'Terrain Bukavu - 1000m²', price: 25000000, currency: 'FC', location: { city: 'Bukavu' }, category: 'immobilier', rating: 4.6, reviews: 6, views: 234, verified: false, mobileMoney: true, image: '🏗️' },
  { id: '19', title: 'Appartement Brazzaville', price: 400000000, currency: 'FCFA', location: { city: 'Brazzaville' }, category: 'immobilier', rating: 4.8, reviews: 10, views: 567, verified: true, mobileMoney: true, image: '🏠' },
  { id: '20', title: 'Bureau Pointe-Noire', price: 15000000, currency: 'FCFA', location: { city: 'Pointe-Noire' }, category: 'immobilier', rating: 4.7, reviews: 7, views: 345, verified: true, mobileMoney: true, image: '🏢' },
];

export default function Home() {
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  // Filter and sort listings
  useEffect(() => {
    let filtered = MOCK_LISTINGS;

    if (searchQuery) {
      filtered = filtered.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(l => l.category === selectedCategory);
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(l => l.location.city === selectedCity);
    }

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setListings(filtered);
  }, [searchQuery, selectedCategory, selectedCity, sortBy]);

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const formatPrice = (price: number, currency: string) => {
    return `${(price / 1000000).toFixed(1)}M ${currency}`;
  };

  const cities = ['all', ...new Set(MOCK_LISTINGS.map(l => l.location.city))];
  const categories = ['all', ...new Set(MOCK_LISTINGS.map(l => l.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-red-600">soZando</h1>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">v3.0</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <Heart size={20} fill={favorites.size > 0 ? 'red' : 'none'} />
              {favorites.size > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{favorites.size}</span>}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <MessageCircle size={20} />
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2 font-medium">
              <Plus size={20} />
              Publier
            </button>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une annonce..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              <Filter size={20} />
              Filtres
            </button>
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
              Chercher
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ville</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>
                      {city === 'all' ? 'Toutes les villes' : city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'Toutes les catégories' : cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Trier par</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="recent">Plus récent</option>
                  <option value="price-low">Prix: bas au haut</option>
                  <option value="price-high">Prix: haut au bas</option>
                  <option value="popular">Plus populaire</option>
                  <option value="rating">Meilleure note</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{listings.length} annonces trouvées</h2>
          <div className="text-sm text-gray-600">
            {selectedCity !== 'all' && `📍 ${selectedCity}`}
            {selectedCategory !== 'all' && ` • 📂 ${selectedCategory}`}
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune annonce trouvée</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition overflow-hidden cursor-pointer group"
              >
                {/* Image */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-40 flex items-center justify-center text-6xl relative overflow-hidden">
                  {listing.image}
                  {listing.verified && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      ✓ Vérifié
                    </div>
                  )}
                  {listing.views > 500 && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp size={14} /> Tendance
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(listing.id);
                    }}
                    className="absolute bottom-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-md"
                  >
                    <Heart
                      size={20}
                      fill={favorites.has(listing.id) ? 'red' : 'none'}
                      color={favorites.has(listing.id) ? 'red' : 'gray'}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-red-600 transition">{listing.title}</h3>
                  <p className="text-red-600 font-bold text-lg mb-2">{formatPrice(listing.price, listing.currency)}</p>

                  {/* Location & Category */}
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                    <MapPin size={16} />
                    {listing.location.city} • {listing.category}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                    <Star size={16} fill="gold" color="gold" />
                    {listing.rating} ({listing.reviews} avis) • {listing.views} vues
                  </div>

                  {/* Mobile Money Badge */}
                  {listing.mobileMoney && (
                    <div className="mb-3 inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      💳 Mobile Money
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium flex items-center justify-center gap-2">
                      <MessageCircle size={18} />
                      Solola liboso
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition font-medium">
                      Appeler
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">soZando</h3>
              <p className="text-gray-400 text-sm">Solola liboso, mbongo sima. La marketplace Lingala-first du Congo.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Catégories</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Immobilier</a></li>
                <li><a href="#" className="hover:text-white">Électronique</a></li>
                <li><a href="#" className="hover:text-white">Véhicules</a></li>
                <li><a href="#" className="hover:text-white">Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Villes</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Kinshasa</a></li>
                <li><a href="#" className="hover:text-white">Lubumbashi</a></li>
                <li><a href="#" className="hover:text-white">Brazzaville</a></li>
                <li><a href="#" className="hover:text-white">Goma</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Aide</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">À propos</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Sécurité</a></li>
                <li><a href="#" className="hover:text-white">CGU</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 soZando. Tous droits réservés. • Solola liboso, mbongo sima 🇨🇩</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

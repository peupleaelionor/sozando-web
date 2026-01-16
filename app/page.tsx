'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Heart, MessageCircle, Plus, Star, TrendingUp, Filter, AlertCircle } from 'lucide-react';
import { MOCK_LISTINGS, CITIES, CATEGORIES } from '@/lib/data';
import { useFavorites, useFilters, useLanguage, useOnlineStatus, useNotification } from '@/lib/hooks';
import { formatPrice } from '@/lib/utils';

export default function Home() {
  const [listings, setListings] = useState(MOCK_LISTINGS);
  const { favorites, toggleFavorite } = useFavorites();
  const { filters, updateFilter, resetFilters } = useFilters();
  const { language, changeLanguage } = useLanguage();
  const isOnline = useOnlineStatus();
  const { notification, showNotification } = useNotification();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = MOCK_LISTINGS;

    if (filters.search) {
      filtered = filtered.filter((l) =>
        l.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (l.titleFr && l.titleFr.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter((l) => l.category === filters.category);
    }

    if (filters.city !== 'all') {
      filtered = filtered.filter((l) => l.location.city === filters.city);
    }

    if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setListings(filtered);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isOnline && (
        <div className="bg-yellow-100 border-b border-yellow-400 px-4 py-2 flex items-center gap-2 text-yellow-800">
          <AlertCircle size={18} />
          <span className="text-sm">{language === 'ln' ? 'Mwa te na internet' : 'Vous êtes hors ligne'}</span>
        </div>
      )}

      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 ${
            notification.type === 'success' ? 'bg-green-500' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          {notification.message}
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-red-600">soZando</h1>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">v3.0</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => changeLanguage('ln')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                language === 'ln' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Lingala
            </button>
            <button
              onClick={() => changeLanguage('fr')}
              className={`px-3 py-1 rounded text-sm font-medium transition ${
                language === 'fr' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Français
            </button>
          </div>

          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <Heart size={20} fill={favorites.size > 0 ? 'red' : 'none'} />
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

      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={language === 'ln' ? 'Soki matomba...' : 'Rechercher une annonce...'}
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            >
              <Filter size={20} />
              {language === 'ln' ? 'Filtre' : 'Filtres'}
            </button>
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium">
              {language === 'ln' ? 'Soki' : 'Chercher'}
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ln' ? 'Esika' : 'Ville'}
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => updateFilter('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="all">{language === 'ln' ? 'Esika nyonso' : 'Toutes les villes'}</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ln' ? 'Motango' : 'Catégorie'}
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="all">{language === 'ln' ? 'Motango nyonso' : 'Toutes les catégories'}</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'ln' ? 'Rangela' : 'Trier par'}
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                >
                  <option value="recent">{language === 'ln' ? 'Sika' : 'Plus récent'}</option>
                  <option value="price-low">{language === 'ln' ? 'Presyo: Moke' : 'Prix: bas au haut'}</option>
                  <option value="price-high">{language === 'ln' ? 'Presyo: Mingi' : 'Prix: haut au bas'}</option>
                  <option value="popular">{language === 'ln' ? 'Populaire' : 'Plus populaire'}</option>
                  <option value="rating">{language === 'ln' ? 'Malamu' : 'Meilleure note'}</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  {language === 'ln' ? 'Libola' : 'Réinitialiser'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">
            {listings.length} {language === 'ln' ? 'matomba' : 'annonces'}
          </h2>
          <div className="text-sm text-gray-600">
            {filters.city !== 'all' && `📍 ${filters.city}`}
            {filters.category !== 'all' && ` • 📂 ${filters.category}`}
          </div>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {language === 'ln' ? 'Matomba te' : 'Aucune annonce trouvée'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition overflow-hidden cursor-pointer group"
              >
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-40 flex items-center justify-center text-6xl relative overflow-hidden">
                  {listing.image}
                  {listing.verified && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      ✓ {language === 'ln' ? 'Eleki' : 'Vérifié'}
                    </div>
                  )}
                  {listing.views > 500 && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp size={14} /> {language === 'ln' ? 'Tendance' : 'Tendance'}
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(listing.id);
                      showNotification('success', language === 'ln' ? 'Bolinga!' : 'Favori ajouté!');
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

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-red-600 transition">
                    {language === 'ln' ? listing.title : (listing.titleFr || listing.title)}
                  </h3>
                  <p className="text-red-600 font-bold text-lg mb-2">{formatPrice(listing.price, listing.currency)}</p>

                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                    <MapPin size={16} />
                    {listing.location.city} • {listing.category}
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
                    <Star size={16} fill="gold" color="gold" />
                    {listing.rating.toFixed(1)} ({listing.reviews} {language === 'ln' ? 'avis' : 'avis'}) • {listing.views}{' '}
                    {language === 'ln' ? 'botali' : 'vues'}
                  </div>

                  {listing.mobileMoney && (
                    <div className="mb-3 inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                      💳 Mobile Money
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-medium flex items-center justify-center gap-2">
                      <MessageCircle size={18} />
                      {language === 'ln' ? 'Solola' : 'Discuter'}
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition font-medium">
                      {language === 'ln' ? 'Pika' : 'Appeler'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">soZando</h3>
              <p className="text-gray-400 text-sm">
                {language === 'ln'
                  ? 'Solola liboso, mbongo sima. Marketplace ya Congo.'
                  : 'Solola liboso, mbongo sima. La marketplace du Congo.'}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{language === 'ln' ? 'Motango' : 'Catégories'}</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">{language === 'ln' ? 'Ndako' : 'Immobilier'}</a></li>
                <li><a href="#" className="hover:text-white">{language === 'ln' ? 'Elekitiki' : 'Électronique'}</a></li>
                <li><a href="#" className="hover:text-white">{language === 'ln' ? 'Moto' : 'Véhicules'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{language === 'ln' ? 'Esika' : 'Villes'}</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                {CITIES.slice(0, 4).map((city) => (
                  <li key={city}><a href="#" className="hover:text-white">{city}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{language === 'ln' ? 'Lisungi' : 'Aide'}</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">{language === 'ln' ? 'Nini' : 'À propos'}</a></li>
                <li><a href="#" className="hover:text-white">{language === 'ln' ? 'Motomboki' : 'Contact'}</a></li>
                <li><a href="#" className="hover:text-white">{language === 'ln' ? 'Lisusu' : 'Sécurité'}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 soZando. {language === 'ln' ? 'Moto nyonso eleki.' : 'Tous droits réservés.'} • Solola liboso, mbongo sima 🇨🇩</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { schemeApi } from '../api';
import SchemeCard from '../components/SchemeCard';
import SchemeDetailModal from '../components/SchemeDetailModal';
import { 
  Search, 
  Filter, 
  Building2, 
  Layers, 
  MapPin, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';

const CATEGORIES = [
  'All Sectors',
  'Agriculture & Rural',
  'Healthcare & Wellness',
  'Education & Skill',
  'Housing & Shelter',
  'Financial Inclusion & Business',
  'Social Welfare & Women'
];

const STATES = [
  'All India',
  'Karnataka',
  'Maharashtra',
  'Tamil Nadu',
  'Uttar Pradesh',
  'Delhi',
  'West Bengal',
  'Gujarat'
];

const SchemesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get('keyword') || '';

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [selectedCategory, setSelectedCategory] = useState('All Sectors');
  const [selectedState, setSelectedState] = useState('All India');
  const [selectedScheme, setSelectedScheme] = useState(null);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const params = {};
      if (keyword.trim()) params.keyword = keyword.trim();
      if (selectedCategory !== 'All Sectors') params.category = selectedCategory;
      if (selectedState !== 'All India') params.state = selectedState;

      const res = await schemeApi.search(params);
      setSchemes(res.data);
    } catch (err) {
      console.error('Failed to fetch schemes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [selectedCategory, selectedState]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSchemes();
  };

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedCategory('All Sectors');
    setSelectedState('All India');
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Central & State Initiatives</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">Government Schemes Directory</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5">
            Browse through active government welfare, financial aid, and direct benefit schemes.
          </p>
        </div>

        <div className="text-xs text-slate-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200">
          Showing <strong className="text-slate-900">{schemes.length}</strong> active schemes
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        {/* Search row */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by scheme name, keywords, ministry, or tags..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto btn-primary py-2.5 px-6 text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>

          {(keyword || selectedCategory !== 'All Sectors' || selectedState !== 'All India') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="w-full sm:w-auto btn-secondary py-2.5 px-3 text-xs flex items-center justify-center gap-1"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </form>

        {/* Categories Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Sector:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full shrink-0 font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-64 rounded-3xl bg-slate-100 animate-pulse"></div>
          ))}
        </div>
      ) : schemes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No schemes found matching criteria</h3>
          <p className="text-xs text-slate-500">Try modifying your search keywords or clearing sector filters.</p>
          <button onClick={handleResetFilters} className="btn-secondary text-xs py-2 px-4 inline-block mt-2">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onViewDetails={(s) => setSelectedScheme(s)}
            />
          ))}
        </div>
      )}

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <SchemeDetailModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      )}
    </div>
  );
};

export default SchemesPage;

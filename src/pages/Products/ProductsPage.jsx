import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { periodProductsData } from '../../data/productsData';
import ProductModal from '../../components/products/ProductModal';
import { Search, ArrowRight } from 'lucide-react';

export default function ProductsPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'disposable', 'reusable', 'Internal', 'External'];

  const filteredProducts = periodProductsData.filter((prod) => {
    const matchesCategory = 
      selectedCategory === 'All' ||
      prod.category.toLowerCase() === selectedCategory.toLowerCase() ||
      prod.type.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      prod.name.toLowerCase().includes(search.toLowerCase()) ||
      prod.description.toLowerCase().includes(search.toLowerCase()) ||
      prod.tagline.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '40px 24px 80px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--rose-dark)' }}>
          {t('productsPage.title')}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          {t('productsPage.sub')}
        </p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${selectedCategory === cat ? 'var(--rose)' : 'var(--border)'}`,
                backgroundColor: selectedCategory === cat ? 'var(--rose-dark)' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-primary)',
                fontWeight: selectedCategory === cat ? '700' : '500',
                fontSize: '0.875rem',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {cat === 'All' ? t('common.open') : cat === 'reusable' ? t('productsPage.cups') : cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder={t('common.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border)',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div>
              <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                  <span className="badge-tag">{prod.type}</span>
                  <span className="badge-tag" style={{ backgroundColor: 'var(--surface-soft)' }}>{prod.category}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--rose-dark)', marginBottom: '6px' }}>
                  {prod.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '16px' }}>
                  {prod.tagline}
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                  <span>Cost: <strong>{prod.costInfo}</strong></span>
                  <span>Eco: <strong>{prod.ecoRating}</strong></span>
                </div>
              </div>
            </div>

            <div style={{ padding: '0 24px 24px 24px' }}>
              <button
                type="button"
                onClick={() => setSelectedProduct(prod)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-soft)',
                  border: '1px solid var(--border)',
                  color: 'var(--rose-dark)',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>{t('common.view')}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  CreditCard, Calendar, Package, Sparkles, CheckCircle2, 
  ArrowRight, ShieldCheck, Clock, Plus, Zap, HeartHandshake, RefreshCw
} from 'lucide-react';
import Button from '../../components/Button/Button';

export default function PayablesPage() {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const activeSubscriptions = [
    {
      id: 'sub_1',
      name: 'Organic Cotton Period Care Box',
      type: 'Cycle-Synced Auto-Refill',
      price: '₹349 / month',
      nextBilling: 'Delivers 3 days before period',
      status: 'Active',
      items: ['12 Organic Day Pads', '6 Night Heavy Pads', 'Organic Panty Liners (15x)'],
      color: '#B9345D'
    },
    {
      id: 'sub_2',
      name: 'Sakhi Comfort & Pain Relief Pass',
      type: 'Digital + Wellness Kit',
      price: '₹199 / month',
      nextBilling: 'Auto-renews Oct 15, 2026',
      status: 'Active',
      items: ['Unlimited Sakhi AI Consultations', 'Heat Patch 3-Pack', 'Herbal Cramp Tea'],
      color: '#E05282'
    }
  ];

  const paymentHistory = [
    { id: 'INV-9082', date: 'Sep 01, 2026', item: 'Organic Cotton Period Box', amount: '₹349', status: 'Paid' },
    { id: 'INV-8712', date: 'Aug 15, 2026', item: 'Sakhi Comfort Pass', amount: '₹199', status: 'Paid' },
    { id: 'INV-7721', date: 'Aug 01, 2026', item: 'Organic Cotton Period Box', amount: '₹349', status: 'Paid' }
  ];

  return (
    <div style={{ backgroundColor: '#FFF7F9', minHeight: '100vh', padding: '32px 20px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Page Banner */}
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '36px',
            border: '1px solid rgba(250, 212, 222, 0.7)',
            boxShadow: '0 10px 30px rgba(185, 52, 93, 0.05)',
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div>
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '6px 14px', 
                borderRadius: '50px', 
                backgroundColor: '#FFEBF0', 
                color: '#B9345D', 
                fontSize: '0.85rem', 
                fontWeight: '600',
                marginBottom: '12px' 
              }}
            >
              <CreditCard size={16} />
              <span>Sakhi Payables & Cycle Subscriptions</span>
            </div>
            <h1 
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '2.2rem', 
                color: '#3E242B', 
                fontWeight: '700',
                marginBottom: '8px' 
              }}
            >
              Automated Cycle Care & Smart Payables
            </h1>
            <p style={{ color: '#7D626C', fontSize: '1rem', maxWidth: '620px', lineHeight: 1.6 }}>
              Never run out of essential period products. Sakhi automatically syncs product deliveries 3 days before your predicted period date with transparent, zero-stress payables.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div 
              style={{
                backgroundColor: '#FFF0F4',
                padding: '16px 24px',
                borderRadius: '16px',
                textAlign: 'center',
                border: '1px solid rgba(250, 212, 222, 0.8)'
              }}
            >
              <div style={{ fontSize: '0.8rem', color: '#7D626C', fontWeight: '500' }}>Active Payables</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#B9345D' }}>2 Care Subscriptions</div>
            </div>
          </div>
        </div>

        {/* Active Subscriptions Grid */}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#3E242B', marginBottom: '16px', fontWeight: '600' }}>
          Active Subscriptions & Cycle Refills
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {activeSubscriptions.map((sub) => (
            <div 
              key={sub.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(250, 212, 222, 0.6)',
                boxShadow: '0 4px 16px rgba(185, 52, 93, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span 
                    style={{ 
                      backgroundColor: '#E8F5E9', 
                      color: '#2E7D32', 
                      padding: '4px 10px', 
                      borderRadius: '50px', 
                      fontSize: '0.75rem', 
                      fontWeight: '700' 
                    }}
                  >
                    ● {sub.status}
                  </span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#3E242B' }}>{sub.price}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', color: '#3E242B', fontWeight: '700', marginBottom: '4px' }}>
                  {sub.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#B9345D', fontWeight: '600', marginBottom: '16px' }}>
                  {sub.type}
                </div>

                <div style={{ backgroundColor: '#FFF7F9', padding: '12px 16px', borderRadius: '12px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#7D626C', marginBottom: '6px', fontWeight: '600' }}>Included in Refill Box:</div>
                  {sub.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#5C434B', marginBottom: '4px' }}>
                      <CheckCircle2 size={14} color="#B9345D" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #FAD4DE', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#7D626C' }}>
                  <RefreshCw size={14} color="#B9345D" />
                  <span>{sub.nextBilling}</span>
                </div>
                <button 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#B9345D', 
                    fontSize: '0.85rem', 
                    fontWeight: '600',
                    cursor: 'pointer' 
                  }}
                >
                  Manage →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment History & Smart Cycle Delivery Banner */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          
          {/* Recent Invoices */}
          <div 
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '20px', 
              padding: '24px', 
              border: '1px solid rgba(250, 212, 222, 0.6)' 
            }}
          >
            <h3 style={{ fontSize: '1.1rem', color: '#3E242B', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#B9345D" />
              <span>Recent Payment History</span>
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {paymentHistory.map((item) => (
                <div 
                  key={item.id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '12px 14px', 
                    borderRadius: '12px', 
                    backgroundColor: '#FFF7F9' 
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#3E242B' }}>{item.item}</div>
                    <div style={{ fontSize: '0.75rem', color: '#7D626C' }}>{item.date} • {item.id}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: '#3E242B' }}>{item.amount}</div>
                    <span style={{ fontSize: '0.75rem', color: '#2E7D32', fontWeight: '600' }}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sakhi Cycle Guarantee */}
          <div 
            style={{ 
              backgroundColor: 'linear-gradient(135deg, #B9345D 0%, #E05282 100%)', 
              borderRadius: '20px', 
              padding: '24px', 
              color: '#FFFFFF', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, #B9345D 0%, #8E2343 100%)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <ShieldCheck size={24} color="#FFD1DC" />
                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Zero-Stress Cycle Guarantee</span>
              </div>
              <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.5, marginBottom: '16px' }}>
                All Sakhi Payables subscriptions are 100% discrete, pauseable anytime with 1-click, and dynamically adapt to your period tracking data.
              </p>
            </div>

            <button 
              style={{ 
                backgroundColor: '#FFFFFF', 
                color: '#B9345D', 
                border: 'none', 
                borderRadius: '50px', 
                padding: '12px 20px', 
                fontWeight: '700', 
                fontSize: '0.9rem', 
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Plus size={16} />
              <span>Add Custom Care Subscription</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

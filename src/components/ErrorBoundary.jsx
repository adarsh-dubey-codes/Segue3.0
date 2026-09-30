import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Sakhi Cycle Error Boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    try {
      // Clear temporary stale states if needed and reload page
      window.location.href = '/';
    } catch (e) {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div 
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFF5F7',
            padding: '24px',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '40px 32px',
              maxWidth: '480px',
              border: '1.5px solid #FAD4DE',
              boxShadow: '0 10px 30px rgba(185, 52, 93, 0.1)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌸</div>
            <h2 style={{ color: '#3E242B', fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px' }}>
              Oops! Something went wrong
            </h2>
            <p style={{ color: '#7D626C', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '24px' }}>
              Sakhi Cycle encountered a temporary display issue. Don't worry, your data is safe!
            </p>

            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: '#B9345D',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '50px',
                padding: '12px 28px',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(185, 52, 93, 0.3)'
              }}
            >
              Return to Sakhi Home 🌸
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

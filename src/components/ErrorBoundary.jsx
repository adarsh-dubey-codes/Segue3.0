import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Sakhi Cycle Error Boundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    try {
      localStorage.removeItem('sakhi_cycle_auth_token');
      window.location.href = '/';
    } catch (e) {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      const errorMessage = this.state.error ? this.state.error.toString() : 'Unknown Error';
      const componentStack = this.state.errorInfo ? this.state.errorInfo.componentStack : '';

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
              maxWidth: '640px',
              width: '100%',
              border: '1.5px solid #FAD4DE',
              boxShadow: '0 10px 30px rgba(185, 52, 93, 0.1)'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌸</div>
            <h2 style={{ color: '#3E242B', fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px' }}>
              Oops! Something went wrong
            </h2>
            <p style={{ color: '#7D626C', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '20px' }}>
              Sakhi Cycle caught the following runtime error during refresh:
            </p>

            {/* Error Message Box */}
            <div 
              style={{
                backgroundColor: '#FFEBF0',
                color: '#B9345D',
                padding: '14px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                textAlign: 'left',
                marginBottom: '20px',
                overflowX: 'auto',
                border: '1px solid #FAD4DE',
                maxHeight: '200px'
              }}
            >
              <strong>{errorMessage}</strong>
              {componentStack && (
                <pre style={{ margin: '8px 0 0 0', fontSize: '0.75rem', opacity: 0.85, whiteSpace: 'pre-wrap' }}>
                  {componentStack}
                </pre>
              )}
            </div>

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
              Reset Session & Go Home 🌸
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

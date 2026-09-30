import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { evaluateCyclePattern } from '../../utils/cycleInsightEngine';
import CycleHistoryModal from './CycleHistoryModal';
import Button from '../Button/Button';
import { Sparkles, HeartHandshake, Stethoscope, History, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CyclePatternGuidanceCard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { cycleSetup, dailyLogs, events } = useCycle();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const pattern = evaluateCyclePattern(cycleSetup, dailyLogs, events);

  const translatedBadge = t(pattern.badgeKey, { defaultValue: pattern.badge });
  const translatedTitle = t(pattern.titleKey, { defaultValue: pattern.defaultTitle });
  const translatedMessage = t(pattern.messageKey, { defaultValue: pattern.defaultMessage });

  return (
    <>
      <div
        style={{
          backgroundColor: pattern.bgColor,
          border: `1.5px solid ${pattern.borderColor}`,
          borderRadius: '24px',
          padding: '24px 28px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          transition: 'all 0.2s ease'
        }}
      >
        {/* Header with Pattern Level Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.4rem' }}>{pattern.icon}</span>
            <span
              style={{
                fontSize: '0.775rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: pattern.color,
                backgroundColor: '#FFFFFF',
                border: `1px solid ${pattern.borderColor}`,
                padding: '4px 12px',
                borderRadius: '9999px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              {translatedBadge}
            </span>
          </div>

          <span style={{ fontSize: '0.8rem', color: '#7D626C', fontWeight: '500' }}>
            {t('pattern.nonDiagnosticTag', { defaultValue: 'Personalized Cycle Observation' })}
          </span>
        </div>

        {/* Title & Supportive Narrative */}
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: '700',
              color: '#3E242B',
              margin: '0 0 8px 0',
              lineHeight: 1.35
            }}
          >
            {translatedTitle}
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              color: '#5C434B',
              lineHeight: '1.6',
              margin: 0,
              whiteSpace: 'pre-line'
            }}
          >
            {translatedMessage}
          </p>
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
          {/* Level 3 Primary CTA: Find a doctor */}
          {pattern.level === 3 && (
            <Button
              variant="primary"
              onClick={() => navigate('/doctors')}
              icon={<Stethoscope size={16} />}
              style={{
                backgroundColor: '#9333EA',
                borderColor: '#9333EA',
                borderRadius: '9999px',
                padding: '10px 20px',
                fontSize: '0.875rem',
                boxShadow: '0 4px 14px rgba(147, 51, 234, 0.3)'
              }}
            >
              {t(pattern.primaryCTAKen, { defaultValue: pattern.defaultPrimaryCTA })}
            </Button>
          )}

          {/* Secondary CTA: View my cycle history */}
          {(pattern.level === 2 || pattern.level === 3) && (
            <Button
              variant="outline"
              onClick={() => setIsHistoryOpen(true)}
              icon={<History size={16} />}
              style={{
                borderRadius: '9999px',
                padding: '10px 18px',
                fontSize: '0.875rem',
                backgroundColor: '#FFFFFF'
              }}
            >
              {t(pattern.secondaryCTAKen, { defaultValue: pattern.defaultSecondaryCTA })}
            </Button>
          )}

          {/* Level 1 & 2 CTA: Continue tracking */}
          {pattern.level === 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: '600', fontSize: '0.875rem' }}>
              <CheckCircle2 size={18} />
              <span>{t('pattern.stableConfirmation', { defaultValue: 'Logged history is active & updating automatically' })}</span>
            </div>
          )}
        </div>
      </div>

      {/* Cycle History Review Modal */}
      <CycleHistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </>
  );
}

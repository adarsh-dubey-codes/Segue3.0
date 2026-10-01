import React, { useState, useEffect } from 'react';
import { useCycle } from '../../context/CycleContext';
import { useLanguage } from '../../context/LanguageContext';
import { EVENT_CATEGORIES } from '../../utils/cycleInsightEngine';
import Button from '../Button/Button';
import { X, Check, Plus, AlertCircle } from 'lucide-react';

const CATEGORY_EVENT_TYPES = {
  health: [
    { type: 'fever', titleKey: 'events.types.fever', defaultTitle: 'Fever' },
    { type: 'cold_flu', titleKey: 'events.types.coldFlu', defaultTitle: 'Cold / Flu' },
    { type: 'headache', titleKey: 'events.types.headache', defaultTitle: 'Headache' },
    { type: 'pain', titleKey: 'events.types.pain', defaultTitle: 'Pain' },
    { type: 'stomach_issues', titleKey: 'events.types.stomachIssues', defaultTitle: 'Stomach Issues' },
    { type: 'infection', titleKey: 'events.types.infection', defaultTitle: 'Infection' },
    { type: 'other_health', titleKey: 'events.types.otherHealth', defaultTitle: 'Other Illness' }
  ],
  medication: [
    { type: 'medication_taken', titleKey: 'events.types.medicationTaken', defaultTitle: 'Medication Taken' },
    { type: 'new_medication', titleKey: 'events.types.newMedication', defaultTitle: 'New Medication' },
    { type: 'medication_stopped', titleKey: 'events.types.medicationStopped', defaultTitle: 'Medication Stopped' },
    { type: 'dose_change', titleKey: 'events.types.doseChange', defaultTitle: 'Dose Change' },
    { type: 'supplement', titleKey: 'events.types.supplement', defaultTitle: 'Supplement / Vitamin' }
  ],
  symptoms: [
    { type: 'cramps', titleKey: 'events.types.cramps', defaultTitle: 'Cramps' },
    { type: 'headache', titleKey: 'events.types.headache', defaultTitle: 'Headache' },
    { type: 'breast_tenderness', titleKey: 'events.types.breastTenderness', defaultTitle: 'Breast Tenderness' },
    { type: 'bloating', titleKey: 'events.types.bloating', defaultTitle: 'Bloating' },
    { type: 'acne', titleKey: 'events.types.acne', defaultTitle: 'Acne' },
    { type: 'fatigue', titleKey: 'events.types.fatigue', defaultTitle: 'Fatigue' },
    { type: 'nausea', titleKey: 'events.types.nausea', defaultTitle: 'Nausea' },
    { type: 'spotting', titleKey: 'events.types.spotting', defaultTitle: 'Spotting' }
  ],
  lifestyle: [
    { type: 'poor_sleep', titleKey: 'events.types.poorSleep', defaultTitle: 'Poor Sleep' },
    { type: 'exercise', titleKey: 'events.types.exercise', defaultTitle: 'Exercise' },
    { type: 'exercise_change', titleKey: 'events.types.exerciseChange', defaultTitle: 'Major Exercise Change' },
    { type: 'diet_change', titleKey: 'events.types.dietChange', defaultTitle: 'Diet Change' },
    { type: 'travel', titleKey: 'events.types.travel', defaultTitle: 'Travel' },
    { type: 'jet_lag', titleKey: 'events.types.jetLag', defaultTitle: 'Jet Lag' },
    { type: 'alcohol', titleKey: 'events.types.alcohol', defaultTitle: 'Alcohol' }
  ],
  mental: [
    { type: 'stressful_day', titleKey: 'events.types.stressfulDay', defaultTitle: 'Stressful Day' },
    { type: 'anxiety', titleKey: 'events.types.anxiety', defaultTitle: 'Anxiety' },
    { type: 'emotional_event', titleKey: 'events.types.emotionalEvent', defaultTitle: 'Major Emotional Event' },
    { type: 'exams', titleKey: 'events.types.exams', defaultTitle: 'Exams' },
    { type: 'work_pressure', titleKey: 'events.types.workPressure', defaultTitle: 'Work Pressure' }
  ],
  reproductive: [
    { type: 'period_started', titleKey: 'events.types.periodStarted', defaultTitle: 'Period Started' },
    { type: 'period_ended', titleKey: 'events.types.periodEnded', defaultTitle: 'Period Ended' },
    { type: 'spotting', titleKey: 'events.types.spotting', defaultTitle: 'Spotting' },
    { type: 'birth_control_change', titleKey: 'events.types.birthControlChange', defaultTitle: 'Birth Control Change' }
  ],
  medical: [
    { type: 'doctor_visit', titleKey: 'events.types.doctorVisit', defaultTitle: 'Doctor Visit' },
    { type: 'lab_test', titleKey: 'events.types.labTest', defaultTitle: 'Lab Test' },
    { type: 'vaccination', titleKey: 'events.types.vaccination', defaultTitle: 'Vaccination' }
  ],
  personal: [
    { type: 'other', titleKey: 'events.types.other', defaultTitle: 'Other Event' }
  ]
};

export default function EventComposerModal({ isOpen, onClose, initialDate, initialData }) {
  const { t } = useLanguage();
  const { addEvent, updateEvent } = useCycle();

  const [date, setDate] = useState(initialDate || new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('health');
  const [selectedType, setSelectedType] = useState('fever');
  const [customTitle, setCustomTitle] = useState('');
  const [description, setDescription] = useState('');
  const [medicationName, setMedicationName] = useState('');
  const [sleepHours, setSleepHours] = useState('');

  useEffect(() => {
    if (initialDate) setDate(initialDate);
    if (initialData) {
      setDate(initialData.date || new Date().toISOString().split('T')[0]);
      setCategory(initialData.category || 'health');
      setSelectedType(initialData.type || 'other');
      setCustomTitle(initialData.title || '');
      setDescription(initialData.description || initialData.note || '');
      if (initialData.metadata?.medicationName) setMedicationName(initialData.metadata.medicationName);
      if (initialData.metadata?.sleepHours) setSleepHours(initialData.metadata.sleepHours);
    } else {
      setCustomTitle('');
      setDescription('');
      setMedicationName('');
      setSleepHours('');
    }
  }, [initialDate, initialData, isOpen]);

  if (!isOpen) return null;

  const currentCategoryObj = EVENT_CATEGORIES[category.toUpperCase()] || EVENT_CATEGORIES.HEALTH;
  const availableTypes = CATEGORY_EVENT_TYPES[category] || CATEGORY_EVENT_TYPES.health;

  const handleCategorySelect = (catKey) => {
    setCategory(catKey);
    const typesForCat = CATEGORY_EVENT_TYPES[catKey];
    if (typesForCat && typesForCat.length > 0) {
      setSelectedType(typesForCat[0].type);
      setCustomTitle(t(typesForCat[0].titleKey, { defaultValue: typesForCat[0].defaultTitle }));
    }
  };

  const handleTypeSelect = (item) => {
    setSelectedType(item.type);
    setCustomTitle(t(item.titleKey, { defaultValue: item.defaultTitle }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const titleToSave = customTitle.trim() || t(`events.categories.${category}`, { defaultValue: category });

    const metadata = {};
    if (category === 'medication' && medicationName.trim()) {
      metadata.medicationName = medicationName.trim();
    }
    if (category === 'lifestyle' && sleepHours) {
      metadata.sleepHours = Number(sleepHours);
    }

    if (initialData && initialData.id) {
      updateEvent(initialData.id, {
        date,
        category,
        type: selectedType,
        title: titleToSave,
        description: description.trim(),
        metadata
      });
    } else {
      addEvent({
        date,
        category,
        type: selectedType,
        title: titleToSave,
        description: description.trim(),
        metadata,
        source: 'manual'
      });
    }

    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(40, 24, 32, 0.5)',
        backdropFilter: 'blur(4px)',
        padding: '16px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          border: '1px solid #FAD4DE',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#7D626C',
            cursor: 'pointer',
            padding: '4px'
          }}
          aria-label={t('common.close', { defaultValue: 'Close' })}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#3E242B', margin: 0, fontWeight: '700' }}>
            {initialData ? t('events.editTitle', { defaultValue: 'Edit Context Event' }) : t('events.addTitle', { defaultValue: '+ Add to your day' })}
          </h2>
          <p style={{ color: '#7D626C', fontSize: '0.875rem', marginTop: '4px' }}>
            {t('events.addSubtitle', { defaultValue: 'Record context so Sakhi remembers what happened in your cycle.' })}
          </p>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Category Chips Selector */}
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '700', color: '#3E242B', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('events.categoryLabel', { defaultValue: 'What Category?' })}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {Object.keys(EVENT_CATEGORIES).map((key) => {
                const catObj = EVENT_CATEGORIES[key];
                const active = category === catObj.id;
                return (
                  <button
                    key={catObj.id}
                    type="button"
                    onClick={() => handleCategorySelect(catObj.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '9999px',
                      border: active ? `2px solid ${catObj.color}` : '1px solid #F0D5DD',
                      backgroundColor: active ? catObj.bgColor : '#FAFAFA',
                      color: active ? catObj.color : '#5C434B',
                      fontSize: '0.825rem',
                      fontWeight: active ? '700' : '500',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{catObj.icon}</span>
                    <span>{t(catObj.labelKey, { defaultValue: catObj.id })}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-types options */}
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '700', color: '#3E242B', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t('events.typeLabel', { defaultValue: 'What happened?' })}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {availableTypes.map((item) => {
                const active = selectedType === item.type;
                const translatedTitle = t(item.titleKey, { defaultValue: item.defaultTitle });
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => handleTypeSelect(item)}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '12px',
                      border: active ? `1.5px solid ${currentCategoryObj.color}` : '1px solid #EAEAEA',
                      backgroundColor: active ? '#FFF0F4' : '#FFFFFF',
                      color: active ? '#D9486D' : '#38232A',
                      fontSize: '0.85rem',
                      fontWeight: active ? '600' : '400',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {active && <Check size={14} color={currentCategoryObj.color} />}
                    {translatedTitle}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Title */}
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '700', color: '#3E242B', display: 'block', marginBottom: '6px' }}>
              {t('events.eventTitleLabel', { defaultValue: 'Event Title' })}
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder={t('events.eventTitlePlaceholder', { defaultValue: 'e.g. Fever, Work Pressure, Started Antibiotics' })}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #F0D5DD',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Date Selector */}
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '700', color: '#3E242B', display: 'block', marginBottom: '6px' }}>
              {t('events.dateLabel', { defaultValue: 'Date' })}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #F0D5DD',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Optional Medication / Sleep inputs */}
          {category === 'medication' && (
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: '700', color: '#3E242B', display: 'block', marginBottom: '6px' }}>
                {t('events.medicationNameLabel', { defaultValue: 'Medication Name (Optional)' })}
              </label>
              <input
                type="text"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
                placeholder={t('events.medicationPlaceholder', { defaultValue: 'e.g. Paracetamol, Antibiotic, Vitamin D' })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid #F0D5DD',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {category === 'lifestyle' && selectedType === 'poor_sleep' && (
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: '700', color: '#3E242B', display: 'block', marginBottom: '6px' }}>
                {t('events.sleepHoursLabel', { defaultValue: 'Hours Slept (Optional)' })}
              </label>
              <input
                type="number"
                min="0"
                max="24"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                placeholder="e.g. 5"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid #F0D5DD',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {/* Notes Input */}
          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: '700', color: '#3E242B', display: 'block', marginBottom: '6px' }}>
              {t('events.noteLabel', { defaultValue: 'Add a note (Optional)' })}
            </label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('events.notePlaceholder', { defaultValue: 'e.g. Took medicine after lunch, fever went down.' })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid #F0D5DD',
                fontSize: '0.875rem',
                fontFamily: 'inherit',
                outline: 'none'
              }}
            />
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
            <Button variant="outline" type="button" onClick={onClose}>
              {t('common.cancel', { defaultValue: 'Cancel' })}
            </Button>
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: currentCategoryObj.color, borderColor: currentCategoryObj.color }}
            >
              {t('common.submit', { defaultValue: 'Submit' })}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

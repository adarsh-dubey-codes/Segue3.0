/**
 * Sakhi Partner Layer - Field Worker Training & Certification Page (Module D & G)
 * Rural-ready, low-bandwidth, audio/voice led offline lessons.
 * Generates verified field worker privacy completion certificates.
 */

import React, { useState, useEffect } from 'react';
import fieldWorkerTrainingService, {
  TRAINING_LESSONS,
  TRAINING_QUIZ
} from '../../services/partner/fieldWorkerTraining.service.js';

export const FieldWorkerTrainingPage = () => {
  const [lang, setLang] = useState('hi'); // Default Hindi for rural reach
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [progress, setProgress] = useState({ completedLessons: [], quizScore: 0 });
  const [quizAnswers, setQuizAnswers] = useState({});
  const [workerName, setWorkerName] = useState('');
  const [workerOrg, setWorkerOrg] = useState('');
  const [quizResult, setQuizResult] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    const prg = fieldWorkerTrainingService.getProgress();
    setProgress(prg);
    const certs = fieldWorkerTrainingService.getCertificates();
    setCertificates(certs);
  };

  const handleNextLesson = () => {
    const currentLesson = TRAINING_LESSONS[activeLessonIndex];
    fieldWorkerTrainingService.markLessonComplete(currentLesson.id);
    loadProgress();
    if (activeLessonIndex < TRAINING_LESSONS.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    }
  };

  const handleAudioSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech audio prompt is supported on your browser.');
    }
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    const result = fieldWorkerTrainingService.submitQuiz(quizAnswers, {
      name: workerName.trim() || 'Field Champion',
      org: workerOrg.trim() || 'Rural Health Partner'
    });
    setQuizResult(result);
    loadProgress();
  };

  const currentLesson = TRAINING_LESSONS[activeLessonIndex];
  const allLessonsDone = progress.completedLessons.length >= TRAINING_LESSONS.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header & Language Switcher (Module G) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase backdrop-blur-md mb-2">
              <span>🌾 Field Worker Rural Training</span>
            </div>
            <h1 className="text-2xl font-extrabold">Privacy & Consent Certification</h1>
            <p className="text-xs text-emerald-100 mt-1">
              Offline-ready interactive training on menstrual health, dual consent, and data safety.
            </p>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2 bg-white/20 p-1.5 rounded-xl backdrop-blur-md">
            <button
              onClick={() => setLang('hi')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'hi' ? 'bg-white text-emerald-900 shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              हिन्दी (Hindi)
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'en' ? 'bg-white text-emerald-900 shadow-md' : 'text-white hover:bg-white/10'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Lesson Navigation & Progress */}
        <div className="grid grid-cols-3 gap-2">
          {TRAINING_LESSONS.map((l, idx) => {
            const isCompleted = progress.completedLessons.includes(l.id);
            const isActive = idx === activeLessonIndex;
            return (
              <button
                key={l.id}
                onClick={() => setActiveLessonIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center space-x-2 ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                }`}
              >
                <span className="text-lg">{l.icon}</span>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-bold text-slate-800 dark:text-white truncate">
                    {l.title[lang]}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {isCompleted ? '✅ Done' : `${l.durationMinutes} mins`}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Lesson Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span>{currentLesson.icon}</span>
              <span>{currentLesson.title[lang]}</span>
            </h2>

            {/* Audio Voice Guide Button (Module G) */}
            <button
              onClick={() => handleAudioSpeak(currentLesson.audioPrompt[lang])}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-2 ${
                isPlayingAudio
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-700 dark:text-emerald-300'
              }`}
            >
              <span>🔊</span>
              <span>{isPlayingAudio ? 'Speaking...' : 'Listen Audio'}</span>
            </button>
          </div>

          <div className="prose dark:prose-invert max-w-none text-xs leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
            {currentLesson.content[lang]}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              disabled={activeLessonIndex === 0}
              onClick={() => setActiveLessonIndex(activeLessonIndex - 1)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              onClick={handleNextLesson}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
            >
              {activeLessonIndex === TRAINING_LESSONS.length - 1 ? 'Complete & Start Quiz' : 'Complete & Next'}
            </button>
          </div>
        </div>

        {/* Certification Quiz Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl font-bold">
              🎓
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 dark:text-white">Field Worker Certification Exam</h3>
              <p className="text-xs text-slate-500">100% score required to issue your verified privacy certificate.</p>
            </div>
          </div>

          {quizResult && (
            <div className={`p-4 rounded-xl text-xs ${
              quizResult.success 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200' 
                : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200'
            }`}>
              {quizResult.success ? (
                <div>
                  🏆 <strong>Congratulations!</strong> You passed the training! Your Privacy Certificate has been generated.
                </div>
              ) : (
                <div>
                  ❌ Score: {quizResult.score}/{quizResult.total}. Please review the lessons above and try again.
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleQuizSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunita Devi"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Organization / NGO
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rural Health Vikas Samiti"
                  value={workerOrg}
                  onChange={(e) => setWorkerOrg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-white"
                />
              </div>
            </div>

            {TRAINING_QUIZ.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <p className="text-xs font-bold text-slate-800 dark:text-white">
                  Q{idx + 1}. {q.question[lang]}
                </p>
                <div className="space-y-1.5 pt-1">
                  {q.options.map((opt) => (
                    <label key={opt.id} className="flex items-center space-x-2 text-xs cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.id}
                        checked={quizAnswers[q.id] === opt.id}
                        onChange={() => setQuizAnswers({ ...quizAnswers, [q.id]: opt.id })}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{opt.text[lang]}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all"
            >
              Submit Quiz & Generate Certificate
            </button>
          </form>
        </div>

        {/* Certificate Display */}
        {certificates.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-800 dark:text-white">🏅 Issued Field Worker Certificates</h3>
            <div className="space-y-3">
              {certificates.map((c) => (
                <div key={c.certificateId} className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">{c.workerName}</div>
                    <div className="text-[11px] text-slate-500">{c.organization}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1">Cert ID: {c.certificateId} | Issued: {new Date(c.issuedAt).toLocaleDateString()}</div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] flex items-center justify-center">
                    Verified Privacy Champion
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldWorkerTrainingPage;

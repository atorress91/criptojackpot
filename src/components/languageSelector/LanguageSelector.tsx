import React, { useState, useRef, useEffect } from 'react';
import styles from './LanguageSelector.module.scss';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  // añade aquí otros idiomas si los necesitas
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLanguageChange(code: string) {
    const selected = languages.find(lang => lang.code === code);
    if (selected) {
      setCurrentLanguage(selected);
      setIsOpen(false);
    }
  }

  return (
    <div className={styles['language-selector']} ref={dropdownRef}>
      <button
        type="button"
        className={styles['language-selector__toggle']}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Seleccionar idioma"
      >
        <span className={styles['language-selector__flag']}>{currentLanguage.flag}</span>
        <span className={styles['language-selector__name']}>{currentLanguage.name}</span>
        <svg
          className={`${styles['language-selector__arrow']} ${isOpen ? styles['language-selector__arrow--open'] : ''}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles['language-selector__dropdown']}>
          {languages.map(lang => (
            <button
              key={lang.code}
              type="button"
              className={`
                ${styles['language-selector__option']}
                ${lang.code === currentLanguage.code ? styles['language-selector__option--active'] : ''}
              `}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className={styles['language-selector__flag']}>{lang.flag}</span>
              <span className={styles['language-selector__name']}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

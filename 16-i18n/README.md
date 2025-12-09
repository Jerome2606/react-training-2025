# Internationalisation avec react-i18next

Ce dossier contient des exemples d'internationalisation.

## Installation

```bash
npm install react-i18next i18next
```

## Fichiers

- `i18n.ts` - Configuration
- `locales/` - Fichiers de traduction
- `LanguageSwitcher.tsx` - Sélecteur de langue
- `TranslatedComponent.tsx` - Exemples d'utilisation

## Utilisation

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('items', { count: 5 })}</p>
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
    </div>
  );
};
```

import { FC, useState, createContext } from 'react';
import { IntlProvider, MessageFormatElement } from 'react-intl';

import vi from '../../translations/vi.json';
import en from '../../translations/en.json';

export const LanguageContext = createContext({});

const defaultLocale = navigator.language;
let defaultLanguage:
  | Record<string, string>
  | Record<string, MessageFormatElement[]>
  | undefined;
switch (defaultLocale) {
  case 'vi-VN': {
    defaultLanguage = vi;
    break;
  }
  default: {
    defaultLanguage = en;
    break;
  }
}

const LanguageWrapper: FC = props => {
  const [language, setLanguage] = useState(defaultLanguage);
  const [locale, setLocale] = useState(defaultLocale);

  const changeLanguage = (locale: string) => {
    setLocale(locale);
    switch (locale) {
      case 'vi-VN': {
        setLanguage(vi);
        break;
      }
      default: {
        setLanguage(en);
        break;
      }
    }
  };

  return (
    <>
      <LanguageContext.Provider value={{ locale, changeLanguage }}>
        <IntlProvider locale={locale} messages={language}>
          {props.children}
        </IntlProvider>
      </LanguageContext.Provider>
    </>
  );
};

export default LanguageWrapper;

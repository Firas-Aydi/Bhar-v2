const i18next = require('i18next');
const Backend = require('i18next-fs-backend');

i18next.use(Backend).init({
  lng: 'en', // Changer 'en' en 'fr' pour définir le français comme langue par défaut
  fallbackLng: 'en', // La langue de secours sera également le français
  backend: {
    loadPath: 'locales/{{lng}}/{{ns}}.json',
  },
});

module.exports = i18next;

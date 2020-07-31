import { Title } from "@angular/platform-browser";
import { APP_INITIALIZER, LOCALE_ID } from "@angular/core";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import {
  I18NextModule,
  ITranslationService,
  I18NEXT_SERVICE,
  I18NextTitle,
  I18NextLoadResult,
  defaultInterpolationFormat
} from "angular-i18next";

export function appInit(i18next: ITranslationService) {
  return () => {
    let promise: Promise<I18NextLoadResult> = i18next
      .use(LanguageDetector)
      .use(HttpBackend)
      .init({
        debug: false,
        fallbackLng: "en",
        preload: ["en", "es"],
        ns: ["translations"],
        defaultNS: "translations",
        backend: {
          loadPath: "assets/locales/{{lng}}/{{ns}}.json"
        },
        interpolation: {
          format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
        },
        detection: {
          order: ["cookie"],
          lookupCookie: "lang",
          caches: ["cookie"]
        }
      });
    return promise;
  };
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: Title,
    useClass: I18NextTitle
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: (i18next: ITranslationService) => {
      return i18next.language;
    }
  }
];

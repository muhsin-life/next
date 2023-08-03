import { useRouter } from "next/router";
import en from "../locales/en.json"
import ar from "../locales/ar.json";

export const useLanguage = () => {
  const { locale } = useRouter();

  const t = locale === "ae-en" || locale === "sa-en" ? en : ar;

  const parts = locale?.split("-")

  const currency = parts ? parts[0] === "sa" ? "SAR" : "AED" : "AED"

  const countries = [
    { country: 'United Arab Emirates', flag: 'https://www.lifepharmacy.com/images/svg/flag-ae.svg', path: "ae" },
    { country: 'Saudi Arabia', flag: 'https://www.lifepharmacy.com/images/svg/flag-sa.svg', path: "sa" },
  ]
  const languages = [
    { name: "العربية", path: "ar" },
    { name: "English", path: "en" }
  ]
  const selectedflag = parts && parts[0] === "ae" ? countries[0].flag : countries[1].flag

  const selectedLanguage = parts && parts[1] === "en" ? languages[0].name : languages[1].name

  return { t, locale, currency, countries, languages, selectedflag, selectedLanguage };
};
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const LanguageSelect = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const value = event.target.value;

    i18n.changeLanguage(value).then(() => {
      router.push(router.asPath, `${router.asPath}`, { locale: value });
    });
  };

  return (
    <div>
      <select value={router.locale} onChange={handleLanguageChange}>
        {i18n.options?.locales &&
          i18n.options.locales.map((language, index) => (
            <option key={index} value={language}>
              {language.toUpperCase()}
            </option>
          ))}
      </select>
    </div>
  );
};

export default LanguageSelect;

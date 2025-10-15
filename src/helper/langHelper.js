import en from "../locales/en.json";
// import de from "../lang/de";
// import fr from "../lang/fr";
import ar from "../locales/ar.json";

const lang = (value) => {
  const lang = localStorage.getItem("languageSet")
    ? typeof localStorage.getItem("languageSet") === "string" 
      ? localStorage.getItem("languageSet") 
      : "en" 
    : "en";

  switch (lang) {
    case "en":
      return en[value] || value;
    case "ar":
      return ar[value] || value;
    default:
    // return Capitalize(value);
  }
};

export function Capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default lang;

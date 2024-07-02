import {createContext, useState} from "react";

export const LanguageContext = createContext();

export default function LanguageProvider(props) {
    const [language, setLanguage] = useState("es");
    const [languageData, setLanguageData] = useState(require(`./data/${language}.json`));

    const changeLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        setLanguageData(require(`./data/${newLanguage}.json`));
    }

    const  value = {languageData, changeLanguage}

    return(
        <LanguageContext.Provider value={value}>
            {props.children}
        </LanguageContext.Provider>
    )
}
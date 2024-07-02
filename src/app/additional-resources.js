import {useContext} from "react";
import {LanguageContext} from "@/app/language-context";
import {faLink, faScrewdriverWrench} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function AdditionalResources(){

    const {languageData} = useContext(LanguageContext);

    const resources = languageData.additionalResources;
    const names = resources.names;
    const descriptions = resources.descriptions;
    const languages = resources.languages;
    const links = resources.links;

    const loadResources = () => {

        let resourceComponents = [];

        for (let i = 0; i < names.length ; i++) {
            resourceComponents.push(
                <div className="m-3 mb-6 p-6 border-2 border-my-yellow rounded-3xl">
                    <h1 className="m-1 text-lg border-b-2 border-b-my-green mb-2">
                        <FontAwesomeIcon icon={faScrewdriverWrench}/> {names[i]}
                    </h1>
                    <p className="m-3">{descriptions[i]}</p>
                    <p className="m-2">{resources.language}{languages[i]}</p>
                    <a className="m-2" href={links[i]}>link {<FontAwesomeIcon icon={faLink}/>}</a>
                </div>
            );
        }

        return resourceComponents;
    };

    return(
        <div className="text-center pb-4 pl-4 pr-4">
            {loadResources()}
        </div>
    );
}
import {useContext, useState} from "react";
import {LanguageContext} from "@/app/language-context";
import Home from "@/app/home";
import ExploreData from "@/app/explore-data";
import AdditionalResources from "@/app/additional-resources";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

export default function Navbar(){
    const {languageData} = useContext(LanguageContext);

    const [content, setContent] = useState("home");

    return (
        <div>
            <div className="m-5">
                <nav className="flex justify-center mt-1 mb-10 pt-2 pb-2 ml-5 mr-5">
                    <ul className="sm:inline-flex text-center text-lg">

                        <li className="ml-2 mr-2 sm:ml-4 mb-6 sm:mb-0 navbar-button navbar-button-green bg-my-soft-blue relative"
                            onClick={() => setContent("home")}> {languageData.home.title}
                        </li>

                        <li className="ml-2 mr-2 md:ml-12 sm:ml-2 navbar-button navbar-button-yellow bg-blue-200 relative"
                            onClick={() => setContent("explore-data")}>{languageData.exploreData.title}
                            <div className="ml-2">
                                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                            </div>
                        </li>

                        <li className="ml-2 mr-2 md:ml-12 sm:mr-4 mt-6 sm:mt-0 navbar-button navbar-button-green bg-my-soft-blue relative"
                            onClick={() => setContent("additional-resources")}>{languageData.additionalResources.title}
                        </li>

                    </ul>
                </nav>

                <div className="m-7">
                    {content === 'home' && <Home/>}
                    {content === 'explore-data' && <ExploreData/>}
                    {content === 'additional-resources' && <AdditionalResources/>}
                </div>

            </div>
        </div>
    );
}
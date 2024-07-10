import {useContext, useState} from "react";
import {LanguageContext} from "@/app/language-context";
import {faCalendarDays, faDisease, faSquareVirus, faDownload, faTurnDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function ExploreData(){

    const [userFilters, setUserFilters] = useState([]);

    const filterSelected = (filterSelected) => {
        for (let i = 0; i < userFilters.length; i++) {
            if(userFilters[i] === filterSelected) return;
        }
        setUserFilters([...userFilters, filterSelected]);
    };
    const filterUnselected = (filter) => {
        const newUserFilters = [];
        for (let i = 0; i < userFilters.length; i++) {
            if(userFilters[i] !== filter){
                newUserFilters.push(userFilters[i]);
            }
        }
        setUserFilters(newUserFilters);
    };

    const [diseaseSelected, setDisease] = useState(null)
    const selectDisease = (newDisease) => {
        setDisease(newDisease);
        setUserFilters([]);
    }

    const {languageData} = useContext(LanguageContext);
    const exploreData = languageData.exploreData;

    const diseases = exploreData.diseases;

    const createFilter = (option, icon, fun) => {
        const data = option.data;
        let buttons = [];

        for (let i = 0; i < data.length; i++) {
            buttons.push(
                <button
                    className="m-1.5 p-1.5 text-md border-2 rounded-md border-my-blue hover:border-my-yellow"
                    onClick={() => {fun(data[i])}}>
                    {data[i].title}
                </button>
            );
        }

        return (
            <div className="mb-2">
                <h1 className="flex text-lg border-b-2 border-b-my-yellow mb-2">
                    <div className="mr-2 text-my-green">
                        <FontAwesomeIcon icon={icon}/>
                    </div>
                    {option.title}
                </h1>
                <div className="text-center">
                    {buttons}
                </div>
            </div>
        );
    }

    const createFilters = () => {
        let filterData = diseaseSelected.filters;
        let filters = [];

        if(filterData.length === 0){
            return loadDownload(diseaseSelected);
        }

        for (let i = 0; i < filterData.length; i++) {

            const title = filterData[i].title;
            let icon = faCalendarDays;
            if(title === "Types" || title === "Tipos"){
                icon = faSquareVirus;
            }

            filters.push(
                createFilter(filterData[i], icon, filterSelected)
            );
        }

        return (
            <div>
                {filters}
            </div>
        );
    }

    const loadDiseases = () => {
        return createFilter(diseases, faDisease, selectDisease);
    }

    const loadFilters = () => {
        if(diseaseSelected !== null){
            return createFilters();
        }
    }

    const loadSelectedDisease = () => {
        if(diseaseSelected !== null){
            return (
                <div className="text-center mb-4">
                    <h1 className="mt-6 mb-4 text-lg">{exploreData.selectedDisease}</h1>
                    <p className="inline-block text-lg p-2 border-2 rounded-md border-my-green">{diseaseSelected.title}</p>
                </div>
            );
        }
    }

    const selectedFilters = () => {
        let selectedFilters = [];

        for (let i = 0; i < userFilters.length; i++) {
            selectedFilters.push(
                <button
                    className="m-1.5 p-1.5 text-md border-2 rounded-md border-my-blue hover:border-my-green"
                    onClick={() => filterUnselected(userFilters[i])}>
                    {userFilters[i].title}
                </button>
            );
        }

        return (
            <div className="flex flex-wrap justify-center mb-6">
                {selectedFilters}
            </div>
    )
        ;
    }

    const loadSelectedFilters = () => {
        if(userFilters.length !== 0){
            return(
                <div className="flex flex-col items-center">
                    <h1 className="mt-6 text-lg">{exploreData.userFilters}</h1>
                    <p className="mb-2">
                        {exploreData.instructionUserFilters}
                        <div className="text-center text-my-green">
                            <FontAwesomeIcon icon={faTurnDown}/>
                        </div>
                    </p>
                    {selectedFilters()}
                </div>
            );
        }
    }

    const loadDownload = (filter) => {
        return (
            <div className="text-center m-8">
                <a className="text-7xl text-my-green"
                   href={`/files/${filter.file}.xlsx`} download
                >
                    <FontAwesomeIcon icon={faDownload}/>
                </a>
                <p className="mt-3">{filter.fileDescription}</p>
                <div className="flex flex-col items-center mt-10">
                    <Image
                        className="mx-auto border-my-green border-4 rounded-2xl"
                        src={`/EpidemiologicLibraryWeb/graphs/${filter.image}.png`}
                        alt=""
                        width={500}
                        height={500}
                    />
                    <p className="mt-3 text-center">{diseases.cases} {filter.fileDescription}</p>
                </div>
            </div>
        );
    }

    const loadDownloads = () => {
        let downloads = [];

        if (userFilters.length !== 0) {
            for (let i = 0; i < userFilters.length; i++) {
                downloads.push(loadDownload(userFilters[i]));
            }
        }
        return downloads;
    }

    return(
        <div className="pb-14">
            <p className="mb-6 text-center">{exploreData.instructions}</p>
            {loadDiseases()}
            {loadSelectedDisease()}
            {loadFilters()}
            {loadSelectedFilters()}
            {loadDownloads()}
        </div>
    );
}

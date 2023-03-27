import { useState, useEffect } from "react";
import APlus from "../API/APlus";

export default () => {

    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const studentNameAPI:any = async (emailreq: string) => {
    //const studentNameAPI: ((newState: { emailreq: string }) => void) {
        try {
            const response = await APlus.get('/students', {
                params: {
                    email: emailreq
                }
            });
            console.log("response: " + response)
            //setResults(response.data.data[0])

        } catch (e) {
            setErrorMessage("Something went wrong!");
        }
    };

    useEffect(() => {
        studentNameAPI("anirudh.umarji@utdallas.edu");
    }, []);
    //console.log("RESULTS", results);
    
    return [studentNameAPI, results, errorMessage];
};
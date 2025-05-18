import axios from "axios"

export const getJudge0LanguageId = (Language) => {
    const languageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }
    return languageMap[Language.toUpperCase()]
}


export const submitBatch = async (submissions) => {
    // ye mere judge0 ke end point /submissions/batch ko hit kar raha hoga.
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
        submissions
    })
    console.log("Submission Result : ",data);
    return data; // [{token},{token},{token}]
}

const sleep = (ms) => new Promise((resolve)=>setTimeout(resolve,ms));
export const pollBatchResults = async(tokens)=>{
    while(true){
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,{
            params:{
                tokens:tokens.join(","),
                base64_encoded:false,
            }
        })

        const results = data.submissions;

        const isAllDone = results.every(
            (r) => r.status.id !== 1 && r.status.id !== 2
        )
        if(isAllDone) return results;
        await sleep(2000) // 2 second ke bar es end-points ko dubara call karna
    }
}
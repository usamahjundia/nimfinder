import React from 'react'
import "./List.css"

const codeDict = {
    "160" : "FMIPA",
    "161" : "SITH",
    "162" : "SF",
    "163" : "FITB",
    "164" : "FTTM",
    "165" : "STEI",
    "166" : "FTSL",
    "167" : "FTI",
    "168" : "FSRD",
    "169" : "FTMD",
    "197" : "SBM",
    "199" : "SAPPK",
    "101" : "MA",
    "102" : "FI",
    "103" : "AS",
    "104" : "BM",
    "105" : "KI",
    "106" : "BI",
    "107" : "FA",
    "108" : "ME",
    "112" : "BE",
    "114" : "BA",
    "115" : "BW",
    "116" : "FKK",
    "120" : "GL",
    "121" : "TA",
    "122" : "TM",
    "123" : "TG",
    "125" : "MG",
    "128" : "ME",
    "129" : "OS",
    "130" : "TK",
    "131" : "MS",
    "132" : "EL",
    "133" : "FT",
    "134" : "TI",
    "135" : "IF",
    "136" : "AE",
    "137" : "MT",
    "144" : "MRI",
    "150" : "SI",
    "151" : "GD",
    "152" : "AR",
    "153" : "TL",
    "154" : "PWK",
    "155" : "KL",
    "157" : "RIL",
    "170" : "SR",
    "172" : "KR",
    "173" : "DI",
    "174" : "DKV",
    "175" : "DP",
    "180" : "EP",
    "181" : "ET",
    "182" : "STI",
    "183" : "EB",
    "190" : "MB",
    "192" : "MK"
}

const codeToEmblem = (nim)=>{
    if(nim==="13215072"){
        return "'IF'"
    }
    return codeDict[nim.slice(0,3)]
}

export default function List({loading,mhsList}){

    if(loading){
        return (
            <div className="List-loading">
                <h2 className="List-loading-h2">
                    Please Wait..
                </h2>
            </div>
        )
    }

    return (
        <div className="List">
                <div className="List-list">
                {mhsList.map((elmt)=>{
                    return (
                        <div className="List-elements">
                            <div className="List-elements-emblem">
                                {elmt[1] ? codeToEmblem(elmt[2]): codeToEmblem(elmt[3])}
                            </div>
                            <div className="List-elements-name">
                                {elmt[0]}
                            </div>
                            <div className="List-elements-nim">
                                {elmt[1] ? false : elmt[3]+"/"}{elmt[2]}
                            </div>
                        </div>
                        )
                })}
                </div>
        </div>
    )
}
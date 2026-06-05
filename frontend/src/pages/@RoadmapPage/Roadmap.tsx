/**
 * One single roadmap graph visualization
 */
import React from 'react';


export class RoadmapData {
    name: String = "";
}

type PropsType = {
    data: RoadmapData
}
export default function Roadmap({data}: PropsType) {
    return (<>
        {data.name}        
    </>)
}
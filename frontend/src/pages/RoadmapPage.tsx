import React from 'react';
import Roadmap, {RoadmapData} from './@RoadmapPage/Roadmap';

type PropsType = {
    roadmaps: Array<RoadmapData>
}
export default function RoadmapPage({roadmaps}: PropsType) {

    return (<>
        Roadmaps
        {roadmaps.map((r, i) => <Roadmap data={r} key={i}/>)}
    </>)
}
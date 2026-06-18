import React from 'react';
import Roadmap, { RoadmapData } from './@RoadmapPage/Roadmap';

type PropsType = {
    roadmaps: Array<RoadmapData>
}

import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    CardHeader,
    CardContent,
    TextField,
    Stack,
    Button,
    Link
} from "@mui/material";
import * as api from '../util/api.ts'

{/* Roadmap Page */ }
export default function RoadmapPage(): React.JSX.Element {

    return (<>
        <Paper elevation={4} sx={{ marginTop: "1em" }}>
            <CardHeader title="Skill Gap Summary"></CardHeader>
            <CardContent>
                The most frequent and most important skills you  are missing are:

            </CardContent>
        </Paper >
        <Paper elevation={4} sx={{ marginTop: "1em" }}>
            <CardHeader title="Roadmaps"></CardHeader>
            <CardContent>
                <Paper elevation={4} sx={{ marginTop: "1em" }}>
                    <CardHeader title="Roadmap 1"></CardHeader>
                    <CardContent>
                        test

                    </CardContent>
                </Paper >
                <Paper elevation={4} sx={{ marginTop: "1em" }}>
                    <CardHeader title="Roadmap 2"></CardHeader>
                    <CardContent>
                        test

                    </CardContent>
                </Paper >
            </CardContent>
        </Paper >
    </>);
}


// export default function RoadmapPage({roadmaps}: PropsType) {

//     return (<>
//         Roadmaps
//         {roadmaps.map((r, i) => <Roadmap data={r} key={i}/>)}
//     </>)
// }
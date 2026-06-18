import React from 'react';
import Roadmap, { RoadmapData } from './@RoadmapPage/Roadmap';

type PropsType = {
    roadmaps: Array<RoadmapData>
}

import { useState, } from 'react';
import {
    Paper,
    CardHeader,
    CardContent,
    Grid,
    Button,
    Box
} from "@mui/material";
import * as api from '../util/api.ts'

{/* Combined user qualification and job description page */ }
export default function QualJobPage(): React.JSX.Element {

    return (<>
    <Grid container>
        <Grid size={6}>
            <Paper elevation={4} sx={{ marginTop: "1em" }}>
                <CardHeader title="Qualifications"></CardHeader>
                <CardContent>
                    <Paper elevation={4} sx={{ marginTop: "1em" }}>
                        <CardHeader title="Qualification 1"></CardHeader>
                        <CardContent>
                            test

                        </CardContent>
                    </Paper >
                    <Paper elevation={4} sx={{ marginTop: "1em" }}>
                        <CardHeader title="Qualification 2"></CardHeader>
                        <CardContent>
                            test

                        </CardContent>
                    </Paper >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Button sx={{ margin: "1em" }} variant="contained" color="primary">Job Descriptions</Button>
                    </Box>
                </CardContent>
            </Paper >
        </Grid>
        <Grid size={6}>
            <Paper elevation={4} sx={{ marginTop: "1em" }}>
                <CardHeader title="Job Descriptions"></CardHeader>
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
        </Grid>
    </Grid>
    </>);
}

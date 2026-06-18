import { useNavigate } from 'react-router-dom';
import {
    Paper,
    CardHeader,
    Button,
    Box
} from "@mui/material";
import * as api from '../util/api.ts'

interface HomePageProps {
    alert: (message: string) => void;
}

export default function HomePage({ alert }: HomePageProps) {
    const navigate = useNavigate()

    return (
        <>
            <h2>NaviSkill AI Home</h2>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                <Paper sx={{ marginTop: "1em", width: "15em" }}>
                    <CardHeader title="Jobs"></CardHeader>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Button onClick={() => navigate("/home")} sx={{ margin: "1em" }} variant="contained" color="primary">Job Descriptions</Button>
                        <Button onClick={() => navigate("/roadmap")} sx={{ margin: "1em" }} variant="contained" color="primary">Roadmaps</Button>
                    </Box>
                </Paper>
                <Paper sx={{ marginTop: "1em", width: "15em" }}>
                    <CardHeader title="Applications"></CardHeader>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Button onClick={() => navigate("/home")} sx={{ margin: "1em" }} variant="contained" color="primary">Jobs Applied</Button>
                        <Button onClick={() => navigate("/resume")} sx={{ margin: "1em" }} variant="contained" color="primary">Resume generator</Button>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}
import { useState, } from 'react';
import ReactMarkdown from 'react-markdown';
import {

    Button,
    Grid,
    Box,
    Typography,
    Paper,
} from "@mui/material";
import * as api from '../util/api.ts'

interface ResumeProps {
    alert: (message: string) => void;
}

export default function ResumePage({ alert }: ResumeProps): React.JSX.Element {

    const [resumeGenerated, setResumeGenerated] = useState('')
    const [coverLetterGenerated, setCoverLetterGenerated] = useState('')

    const handleResumeCall = async (): Promise<void> => {
        alert("Calling agent, please hold")
        try {
            const payload = {
                candidate_name: "Victor Wembanyama",
                candidate_skills: ["Python", "SQL", "Pandas", "Jira", "Tableau"],
                experience_history: ["Sales Associate", "Teacher", "Automotive Mechanic"],
                target_job_title: "Software Developer",
            };
            const response = await api.agent.generate_resume(payload)

            console.log("Call successful:", response);
            alert("Call successful")
            setResumeGenerated(response.generated_document)

        } catch (err) {
            console.error(err);
            alert(String(err))
        }


    };

    const handleCoverLetterCall = async (): Promise<void> => {
        alert("Calling agent, please hold")
        try {
            const payload = {
                candidate_skills: ["Game design", "Artist"],
                job_title: ["Level Design"],
                company_name: "Digital Extremes"
            };
            const response = await api.agent.generate_cover_letter(payload)

            console.log("Call successful:", response);
            alert("Call successful")
            setCoverLetterGenerated(response.generated_document)

        } catch (err) {
            console.error(err);
            alert(String(err))
        }


    };

    return (
        <>
            <Grid container sx={{ height: '100vh' }}>
                {/* Left Pane */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper elevation={4} sx={{ marginTop: "1em", width: "30em" }}>
                        <Box sx={{ marginTop: "2em" }}>
                            <Typography variant="h5">Resume</Typography>
                            <Button onClick={handleResumeCall} variant="contained" color="primary">CALL</Button>
                            <Box
                                sx={{
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    '& code': {
                                        wordBreak: 'break-word' // Fixes inline code overflow
                                    },
                                    '& pre': {
                                        bgcolor: 'grey.900',
                                        p: 0.5,
                                        borderRadius: '6px',
                                        overflowX: 'auto',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-all'
                                    }
                                }}
                            >
                                <ReactMarkdown>{resumeGenerated}</ReactMarkdown>
                            </Box>
                        </Box>
                    </Paper>

                </Grid>

                {/* Right Pane */}
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper elevation={4} sx={{ marginTop: "1em", width: "30em" }}>
                        <Box sx={{ marginTop: "2em" }}>
                            <Typography variant="h5">Cover Letter</Typography>
                            <Button onClick={handleCoverLetterCall} variant="contained" color="primary">CALL</Button>
                            <Box
                                sx={{
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    '& code': {
                                        wordBreak: 'break-word' // Fixes inline code overflow
                                    },
                                    '& pre': {
                                        bgcolor: 'grey.900',
                                        p: 0.5,
                                        borderRadius: '6px',
                                        overflowX: 'auto',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-all'
                                    }
                                }}
                            >
                                <ReactMarkdown>{coverLetterGenerated}</ReactMarkdown>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

        </>
    );
}

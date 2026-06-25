import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
    Button,
    Grid,
    Box,
    Typography,
    Paper,
    CircularProgress, 
    TextField        
} from "@mui/material";
import * as api from '../util/api.ts'

interface ResumeProps {
    alert: (message: string) => void;
}

export default function ResumePage({ alert }: ResumeProps): React.JSX.Element {
    const [loading, setLoading] = useState(false);
    const [resumeGenerated, setResumeGenerated] = useState('');
    const [coverLetterGenerated, setCoverLetterGenerated] = useState('');
    
    // Dynamic State
    const [candidateName, setCandidateName] = useState("Victor Wembanyama");
    const [jobTitle, setJobTitle] = useState("Software Developer");

    const handleResumeCall = async (): Promise<void> => {
        setLoading(true);
        try {
            const payload = {
                candidate_name: candidateName,
                candidate_skills: ["Python", "SQL", "Pandas", "Jira", "Tableau"],
                experience_history: ["Sales Associate", "Teacher", "Automotive Mechanic"],
                target_job_title: jobTitle,
            };
            const response = await api.agent.generate_resume(payload);
            setResumeGenerated(response.generated_document);
            alert("Resume generation complete.");
        } catch (err) {
            console.error(err);
            alert("Error generating resume: " + String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container spacing={2} sx={{ p: 3 }}>
            {/* Input Section */}
            <Grid size={12}>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <TextField label="Candidate Name" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} sx={{ mr: 2 }} />
                    <TextField label="Target Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
                    <Button 
                        onClick={handleResumeCall} 
                        variant="contained" 
                        disabled={loading} 
                        sx={{ ml: 2, height: '56px' }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "GENERATE RESUME"}
                    </Button>
                </Paper>
            </Grid>

            {/* Display Section */}
            <Grid size={6}>
                <Paper sx={{ p: 2, height: '70vh', overflowY: 'auto' }}>
                    <Typography variant="h5">Resume</Typography>
                    <ReactMarkdown>{resumeGenerated}</ReactMarkdown>
                </Paper>
            </Grid>
            
            <Grid size={6}>
                <Paper sx={{ p: 2, height: '70vh', overflowY: 'auto' }}>
                    <Typography variant="h5">Cover Letter</Typography>
                    <ReactMarkdown>{coverLetterGenerated}</ReactMarkdown>
                </Paper>
            </Grid>
        </Grid>
    );
}

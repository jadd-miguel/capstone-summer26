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
        <Grid container spacing={4} sx={{ p: 4, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
            {/* Header */}
            <Grid size={12}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                    Career Architect Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Optimize your profile for high-value job markets.
                </Typography>
            </Grid>

            {/* Left: Input Form */}
            <Grid size={4}>
                <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Profile Details</Typography>
                    <TextField fullWidth label="Name" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} sx={{ mb: 2 }} />
                    <TextField fullWidth label="Target Role" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} sx={{ mb: 2 }} />
                    <Button fullWidth variant="contained" onClick={handleResumeCall} disabled={loading} size="large" sx={{ bgcolor: '#1a237e' }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : "BUILD RESUME"}
                    </Button>
                </Paper>
            </Grid>

            {/* Right: Output Preview */}
            <Grid size={8}>
                <Paper sx={{ p: 3, height: '75vh', overflowY: 'auto', borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="h6" gutterBottom>Live Preview</Typography>
                    <ReactMarkdown>{resumeGenerated || "Your professional resume will appear here..."}</ReactMarkdown>
                </Paper>
            </Grid>
        </Grid>
    );
}

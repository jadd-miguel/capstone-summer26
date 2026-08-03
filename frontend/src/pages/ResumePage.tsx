import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
    Button,
    Grid,
    Box,
    Typography,
    Paper,
    CircularProgress,
    TextField,
    Stack
} from "@mui/material";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ResumePDF } from '../components/ResumePDF';
import * as api from '../util/api';
import { UserProfile } from '../util/Profiles';

interface ResumeProps {
    alert: (message: string) => void;
    userProfile?: UserProfile;
}

export default function ResumePage({ alert, userProfile }: ResumeProps): React.JSX.Element {
    const [loading, setLoading] = useState(false);
    const [resumeGenerated, setResumeGenerated] = useState('');
    
    // Dynamic State merging both branches
    const [candidateName, setCandidateName] = useState(userProfile?.name || "Victor Wembanyama");
    const [jobTitle, setJobTitle] = useState(userProfile?.getTargetRole() || "Software Developer");

    async function copyToClipboard(text: string): Promise<void> {
        try {
            await navigator.clipboard.writeText(text);
            alert('Text successfully copied to clipboard');
        } catch (error) {
            alert('Failed to copy text: ' + error);
        }
    }

    function downloadMarkdown(filename: string, content: string): void {
        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename.endsWith('.md') ? filename : `${filename}.md`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const handleResumeCall = async () => {
        setLoading(true);
        try {
            const payload = {
                candidate_name: candidateName,
                candidate_skills: userProfile ? userProfile.getQualifications() : ["Python", "SQL"],
                experience_history: userProfile ? userProfile.getJobDescriptions() : ["Developer"],
                target_job_title: jobTitle,
            };
            const response = await api.agent.generate_resume(payload);
            setResumeGenerated(response.generated_document || response);
            alert("Resume generation complete.");
        } catch (err) {
            console.error(err);
            alert("Error: " + String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 4, bgcolor: '#f0f2f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#0A192F' }}>
                    Career Architect
                </Typography>
                <Typography variant="body1" sx={{ color: '#666' }}>
                    Generate high-conversion assets using the NaviSkill ML Engine.
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Configuration</Typography>
                        <TextField fullWidth label="Name" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} sx={{ mb: 2 }} />
                        <TextField fullWidth label="Target Role" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} sx={{ mb: 3 }} />
                        
                        <Button fullWidth variant="contained" onClick={handleResumeCall} disabled={loading} 
                                sx={{ py: 1.5, bgcolor: '#0A192F', '&:hover': { bgcolor: '#162d4d' } }}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : "GENERATE DOCUMENT"}
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={9}>
                    <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '70vh', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Live Output</Typography>
                            
                            {resumeGenerated && (
                                <Stack direction="row" spacing={2}>
                                    <Button onClick={() => copyToClipboard(resumeGenerated)} variant="outlined" color="primary">Copy</Button>
                                    <Button onClick={() => downloadMarkdown("Resume.md", resumeGenerated)} variant="outlined" color="primary">Markdown</Button>
                                    <PDFDownloadLink 
                                        document={<ResumePDF data={{ candidate_name: candidateName, target_job_title: jobTitle, content: resumeGenerated }} />} 
                                        fileName="NaviSkill_Resume.pdf"
                                    >
                                        {({ loading }) => (
                                            <Button variant="contained" color="primary">
                                                {loading ? 'Preparing...' : 'Export PDF'}
                                            </Button>
                                        )}
                                    </PDFDownloadLink>
                                </Stack>
                            )}
                        </Box>
                        <Box sx={{ flexGrow: 1, overflowY: 'auto', border: '1px solid #e0e0e0', p: 2, borderRadius: 2 }}>
                            <ReactMarkdown>{resumeGenerated || "AI output will be rendered here in real-time..."}</ReactMarkdown>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
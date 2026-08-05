import React, { useState } from 'react';
import { Box, Button, Typography, Paper, CircularProgress, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as api from '../util/api';

interface UploadPageProps {
    alert: (message: string) => void;
}

export default function ResumeUploadPage({ alert }: UploadPageProps): React.JSX.Element {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(api.server("/upload_and_parse_resume"), {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (data.status === "success") {
                alert(`Successfully parsed ${file.name}!`);
                setExtractedSkills(data.extracted_skills || []);
            } else {
                alert("Parsing failed: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Error uploading file: " + String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: '#0A192F' }}>
                    Candidate Resume Ingestion Portal
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', mb: 4 }}>
                    Upload a candidate PDF resume to trigger the Python NER and skills extraction pipeline instantly.
                </Typography>

                <Button
                    variant="contained"
                    component="label"
                    disabled={loading}
                    sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#115293' }, py: 1.5, px: 4, mb: 3 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "SELECT RESUME PDF"}
                    <input type="file" hidden accept=".pdf" onChange={handleFileUpload} />
                </Button>

                {fileName && (
                    <Typography variant="body1" sx={{ mt: 2, fontWeight: 600, color: '#333' }}>
                        Active File: {fileName}
                    </Typography>
                )}

                {extractedSkills.length > 0 && (
                    <Box sx={{ mt: 4, p: 3, bgcolor: '#f4f6f8', borderRadius: 2, textAlign: 'left' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                            Extracted Skills:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {extractedSkills.map((skill, index) => (
                                <span key={index} style={{ background: '#e0e0e0', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', marginRight: '6px', display: 'inline-block', marginBottom: '6px' }}>
                                    {skill}
                                </span>
                            ))}
                        </Box>
                    </Box>
                )}

                <Box sx={{ mt: 4 }}>
                    <Button variant="outlined" onClick={() => navigate('/home')}>
                        Back to Homepage
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
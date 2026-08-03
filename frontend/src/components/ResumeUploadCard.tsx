import React, { useState } from 'react';
import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material';
import * as api from '../util/api';

interface UploadProps {
    alert: (message: string) => void;
    onParsed: (skills: string[]) => void;
}

export default function ResumeUploadCard({ alert, onParsed }: UploadProps) {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            // Direct fetch call for multipart/form-data upload
            const response = await fetch(api.server("/upload_and_parse_resume"), {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (data.status === "success") {
                alert(`Successfully parsed ${file.name}!`);
                onParsed(data.extracted_skills);
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
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Candidate Resume Ingestion</Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
                Upload a candidate PDF resume to auto-extract skills using the NER pipeline.
            </Typography>

            <Button
                variant="contained"
                component="label"
                disabled={loading}
                sx={{ bgcolor: '#0A192F', '&:hover': { bgcolor: '#162d4d' }, py: 1.5, px: 3 }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "UPLOAD RESUME PDF"}
                <input type="file" hidden accept=".pdf" onChange={handleFileUpload} />
            </Button>

            {fileName && (
                <Typography variant="body2" sx={{ mt: 2, color: '#333', fontStyle: 'italic' }}>
                    Active File: {fileName}
                </Typography>
            )}
        </Paper>
    );
}
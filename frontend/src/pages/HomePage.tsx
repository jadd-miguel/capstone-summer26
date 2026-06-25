import { useNavigate } from 'react-router-dom';
import { Paper, Button, Box, Typography, Container, Grid } from "@mui/material";

export default function HomePage() {
    const navigate = useNavigate();

    const menuItems = [
        { title: "Job Market", items: [{ label: "Job Descriptions", path: "/info" }, { label: "Roadmaps", path: "/roadmap" }] },
        { title: "Career Toolkit", items: [{ label: "Jobs Applied", path: "/home" }, { label: "Resume Generator", path: "/resume" }] }
    ];

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#0A192F', textAlign: 'center', mb: 2 }}>
                NaviSkill AI
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#666', textAlign: 'center', mb: 6 }}>
                Orchestrating your career path with precision.
            </Typography>
            
            <Grid container spacing={4}>
                {menuItems.map((section) => (
                    <Grid item xs={12} md={6} key={section.title}>
                        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#1a237e' }}>{section.title}</Typography>
                            {section.items.map((item) => (
                                <Button key={item.label} fullWidth variant="outlined" onClick={() => navigate(item.path)} sx={{ mb: 2, py: 1.5, borderColor: '#1a237e', color: '#1a237e' }}>
                                    {item.label}
                                </Button>
                            ))}
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

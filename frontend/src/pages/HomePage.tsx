import { useNavigate } from 'react-router-dom';
import { Paper, Button, Box, Typography, Container, Grid } from "@mui/material";

export default function HomePage({ alert }: any) {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#0A192F', mb: 1 }}>
                    NaviSkill AI
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', fontSize: '1.1rem' }}>
                    Command center for your career architecture.
                </Typography>
            </Box>
            
            <Grid container spacing={4}>
                {/* Jobs Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 3, height: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#1a237e' }}>
                            Market Intelligence
                        </Typography>
                        <Button fullWidth variant="contained" onClick={() => navigate("/info")} sx={{ mb: 2, py: 1.5 }}>
                            Job Descriptions
                        </Button>
                        <Button fullWidth variant="outlined" onClick={() => navigate("/roadmap")} sx={{ py: 1.5 }}>
                            Career Roadmaps
                        </Button>
                    </Paper>
                </Grid>

                {/* Applications Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 3, height: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#1a237e' }}>
                            Application Suite
                        </Typography>
                        <Button fullWidth variant="contained" onClick={() => navigate("/home")} sx={{ mb: 2, py: 1.5 }}>
                            Jobs Applied
                        </Button>
                        <Button fullWidth variant="outlined" onClick={() => navigate("/resume")} sx={{ py: 1.5 }}>
                            Resume Generator
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

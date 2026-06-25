import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Divider, Stack } from "@mui/material";
import SpeedIcon from '@mui/icons-material/Speed';
import DescriptionIcon from '@mui/icons-material/Description';
import MapIcon from '@mui/icons-material/Map';
import WorkIcon from '@mui/icons-material/Work';

export default function HomePage() {
    const navigate = useNavigate();

    const ActionCard = ({ title, icon: Icon, path }: any) => (
        <Paper 
            onClick={() => navigate(path)}
            sx={{ 
                p: 3, cursor: 'pointer', transition: '0.3s',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
                display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2
            }}
        >
            <Icon sx={{ fontSize: 40, color: '#1a237e' }} />
            <Typography variant="h6" fontWeight={600}>{title}</Typography>
        </Paper>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f0f2f5' }}>
            {/* Sidebar */}
            <Box sx={{ width: 260, bgcolor: '#0A192F', color: 'white', p: 3 }}>
                <Typography variant="h5" fontWeight={800} mb={4}>NaviSkill AI</Typography>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 4 }} />
                <Stack spacing={2}>
                    <Typography variant="caption" color="gray">MAIN</Typography>
                    <Typography sx={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>Dashboard</Typography>
                    <Typography sx={{ cursor: 'pointer' }} onClick={() => navigate('/resume')}>Resume Generator</Typography>
                </Stack>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 6 }}>
                <Typography variant="h4" fontWeight={700} mb={6}>Command Center</Typography>
                <Stack spacing={3}>
                    <ActionCard title="Generate High-Conversion Resume" icon={DescriptionIcon} path="/resume" />
                    <ActionCard title="View Career Roadmaps" icon={MapIcon} path="/roadmap" />
                    <ActionCard title="Explore Job Opportunities" icon={WorkIcon} path="/info" />
                </Stack>
            </Box>
        </Box>
    );
}

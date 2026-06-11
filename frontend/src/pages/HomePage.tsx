import React from 'react';
import {
    Paper,
    CardHeader,
    CardContent,
    TextField,
    Stack,
    Button
} from "@mui/material";
import * as api from '../util/api.ts'

interface HomePageProps {
    alert: (message: string) => void;
}

export default function HomePage({ alert }: HomePageProps) {

        const handleAgentCall = async (): Promise<void> => {
            alert("Calling agent, please hold")
            try {
                const payload = { 
                        candidate_skills: ["Game design", "Artist"],
                        job_title: ["Level Design"],
                        company_name: "Digital Extremes"
                    };
                const response = await api.agent.generate_cover_letter(payload)
    
                console.log("Login successful:", response);
                alert("Call successful")

    
            } catch (err) {
                console.error(err);
                alert(String(err))
            }
    
    
        };

    return (<>
        NaviSkill AI Home

        <br/>
        Test Button To call Agent Remove Later
        <Button onClick={handleAgentCall} variant="contained" color="primary">Test</Button>
    </>)
}
import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import {

    Button,

} from "@mui/material";
import * as api from '../util/api.ts'

interface ResumeProps {
    alert: (message: string) => void;
}

export default function ResumePage({ alert }: ResumeProps): React.JSX.Element {

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

    return (
        <>
            <Button onClick={handleAgentCall}  variant="contained" color="primary">CALL</Button>
        </>
    );
}

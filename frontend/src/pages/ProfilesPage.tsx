import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Paper,
	CardHeader,
	CardContent,
	TextField,
	Stack,
	Button,
	Link
} from "@mui/material";
import * as api from '../util/api.ts'

interface ProfilesProps {
	alert: (message: string) => void;
}

{/* Log in page */ }
export default function ProfilesPage({alert}: ProfilesProps): React.JSX.Element {

	return (
        <>
            Profiles
        </>
	);
}

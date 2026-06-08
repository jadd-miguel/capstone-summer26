import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Paper,
    CardHeader,
    CardContent,
    TextField,
    Stack,
    Button
} from "@mui/material";
import * as api from '../util/api.ts'

{/* Log in page */ }
export default function SignupPage(): React.JSX.Element {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    {/* Called when login button is clicked */ }
    const handleSignup = async (): Promise<void> => {

        try {
            const payload = { email, password };
            const response = await api.auth.signup(payload);

            console.log("Signup successful:", response);
            // Handle your successful login here (e.g., save token, redirect user)
            navigate('/login');

        } catch (err) {
            console.error(err);
            setError(String(err))
            setError("Failed to sign up. Please check your credentials.");
        }

        
    };

    return (
        <Paper elevation={4} sx={{ marginTop: "1em" }}>
            <CardHeader title="Sign Up"></CardHeader>
            <CardContent>
                <TextField fullWidth label="Email" sx={{ marginBottom: "1em" }}
                    value={email}
                    onChange={e => {setEmail(e.target.value) }}

                />
                <TextField fullWidth label="Password"
                    value={password}
                    onChange={e => (setPassword(e.target.value))}
                />
                <Stack direction="row" spacing={2} sx={{ marginTop: "20px", justifyContent: "center" }}>
                    <Button onClick={handleSignup} variant="contained" color="primary">Sign up</Button>
                </Stack>
            </CardContent>
        </Paper >
    );
}

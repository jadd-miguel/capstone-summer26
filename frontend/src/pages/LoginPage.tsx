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

interface LoginProps {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

{/* Log in page */ }
export default function LoginPage({ setIsAuthenticated }: LoginProps): React.JSX.Element {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	{/* Called when login button is clicked */ }
	const handleLogin = async (): Promise<void> => {

		try {
			const payload = { email, password };
			const response = await api.auth.login(payload);

			console.log("Login successful:", response);
			// Handle your successful login here (e.g., save token, redirect user)
			setIsAuthenticated(true);
			navigate('/home');

		} catch (err) {
			console.error(err);
			setError(String(err))
			setError("Failed to sign in. Please check your credentials.");
		}


	};

	return (
		<Paper elevation={4} sx={{ marginTop: "1em" }}>
			<CardHeader title="Log In"></CardHeader>
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
					<Button onClick={handleLogin} variant="contained" color="primary">Log In</Button>
				</Stack>
				<br></br>
				Don't Have an account yet?
				<br></br>
				<Link onClick={()=>navigate("/signup")}>Sign Up</Link>

			</CardContent>
		</Paper >
	);
}

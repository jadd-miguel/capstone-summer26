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

interface LoginProps {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginPage({ setIsAuthenticated }: LoginProps): React.JSX.Element {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleLogin = (): void => {
		setIsAuthenticated(true);

		navigate('/home');
	};


	return (
		<Paper elevation={4} sx={{ marginTop: "1em" }}>
			<CardHeader title="Log In"></CardHeader>
			<CardContent>
				<TextField fullWidth label="Name" sx={{ marginBottom: "1em" }}
					value={""} 
					onChange={()=>{}}
					
				/>
				<TextField fullWidth label="Email"
					value={""}
				/>
				<Stack direction="row" spacing={2} sx={{ marginTop: "20px", justifyContent: "center" }}>
					<Button onClick={handleLogin} variant="contained" color="primary">Log In</Button>
				</Stack>
			</CardContent>
    	</Paper >
	);
}

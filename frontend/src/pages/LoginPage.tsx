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
import { UserProfile, Profile } from '../util/Profiles.ts'
import * as userState from '../util/userstate.ts';

interface LoginProps {
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	alert: (message: string) => void;
	userProfile?: UserProfile;
	setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

{/* Log in page */ }
export default function LoginPage({ alert, setIsAuthenticated }: LoginProps): React.JSX.Element {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	{/* Called when login button is clicked */ }
	const handleLogin = async (): Promise<void> => {

		try {
			const payload = { email, password };
			const response = await api.auth.login(payload);

			if (response.detail == "invalid_credentials | Invalid login credentials") {
				console.log("No success")
				throw new Error("Login Unsuccessful")
			}
			
			console.log("Login successful:", response);
			//Add code to fetch user data and put it in userProfile
			let id :string = response.user.id
			const profile_payload = { user_id : "f4107247-4086-40c7-80ef-4361a54535f3" }
			const profile_response = await api.profiles.get_jd(id)

			console.log(profile_response)

			alert("Login successful")
			setIsAuthenticated(true);
			navigate('/home');

		} catch (err) {
			console.error(err);
			alert(String(err))
		}


	};

	return (
		<Paper elevation={4} sx={{ marginTop: "1em" }}>
			<CardHeader title="Log In"></CardHeader>
			<CardContent>
				<TextField fullWidth label="Email" sx={{ marginBottom: "1em" }}
					value={email}
					onChange={e => { setEmail(e.target.value) }}

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
				<Link onClick={() => navigate("/signup")}>Sign Up</Link>

			</CardContent>
		</Paper >
	);
}

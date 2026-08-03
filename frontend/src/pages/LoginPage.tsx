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
export default function LoginPage({ alert, setIsAuthenticated, userProfile, setUserProfile }: LoginProps): React.JSX.Element {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	{/* Called when login button is clicked */ }
	
    const handleLogin = async (): Promise<void> => {
        try {
            console.log("Executing local test bypass for frontend validation...");
            
            const mockUserId = "test-user-id-12345";
            const mockDisplayName = "Moses Effeyotah";
            
            const profiles: Profile[] = [
                new Profile("Software Developer", ["Python", "PyTorch", "FastAPI"], ["Built machine learning pipelines"], [])
            ];

            setUserProfile(new UserProfile(mockDisplayName, mockUserId, profiles));
            
            alert("Bypass login successful");
            setIsAuthenticated(true);
            navigate('/home');

        } catch (err) {
            console.error(err);
            alert(String(err));
        }
    };

	const loadProfile  = async (): Promise<void> => {
		
	}

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
                    type='password'
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
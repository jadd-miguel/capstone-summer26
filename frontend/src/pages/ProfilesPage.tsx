import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Paper,
	CardHeader,
	CardContent,
	TextField,
	Stack,
	Button,
	Box,
	Typography,
	ButtonGroup,
} from "@mui/material";
import * as api from '../util/api.ts'

import { UserProfile, Profile } from '../util/Profiles.ts';
import { Margin } from '@mui/icons-material';

interface ProfilesProps {
	alert: (message: string) => void;
	userProfile: UserProfile;
	setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

{/* Log in page */ }
export default function ProfilesPage({ alert, userProfile, setUserProfile }: ProfilesProps): React.JSX.Element {

	const [name, setName] = useState(userProfile.name)
	//const [profileIndex, setProfileIndex] = useState(0)

	const handleSelectProfile = (index: number) => {
		setUserProfile((prevUser) => {
			// Create a new reference to trigger a React re-render
			const updatedUser = new UserProfile(prevUser.name, prevUser.profiles);
			updatedUser.selectedProfileIndex = index; // Switch the active index
			return updatedUser;
		});
	};

	return (
		<>
			<Paper elevation={4} sx={{ marginTop: "1em", margin: "1em" }}>
				<CardHeader title="Profiles"></CardHeader>
				<CardContent>
					<TextField fullWidth label="Name" sx={{ margin: "1em", width: "40%" }}
						value={name}
						onChange={e => { setName(e.target.value) }}
					/>
					{/* 1. Dynamic Profile Selection Buttons */}
					<Stack direction="row" spacing={1} sx={{ margin: "1em", marginBottom: "2em" }}>
						<ButtonGroup variant="outlined" aria-label="profile selection">
							{userProfile.profiles.map((profile, index) => {
								const isActive = userProfile.selectedProfileIndex === index;

								return (
									<Button
										key={index} // Always provide a unique key in loops
										variant={isActive ? "contained" : "outlined"}
										onClick={() => handleSelectProfile(index)}
									>
										{`Profile ${index + 1}`}
									</Button>
								);
							})}
						</ButtonGroup>
					</Stack>
					<TextField fullWidth label="Target Role" sx={{ margin: "1em", width: "40%" }}
						value={userProfile.getTargetRole()}
					/>

					<Box sx={{ 
						display: 'flex', 
						flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, side-by-side on desktop
						gap: 4, 
						margin: "1em", 
						marginTop: "2.5em" 
					}}>

						{/* LEFT COLUMN: JOB DESCRIPTIONS */}
						<Box sx={{ flex: 1, minWidth: 0 }}>
							<Typography variant="h6" gutterBottom color="primary">
								Job Descriptions
							</Typography>
							<Stack spacing={2}>
								{userProfile.getJobDescriptions().map((description, index) => (
									<Stack key={`jd-${index}`} direction="row" spacing={1} sx={{ alignItems: "center" }}>
										<TextField
											fullWidth
											multiline
											label={`Requirement #${index + 1}`}
											value={description}
											//onChange={(e) => updateProfileArray('jobDescriptions', 'edit', index, e.target.value)}
										/>

									</Stack>
								))}
							</Stack>
							<Button 
								variant="outlined" 
								//onClick={() => updateProfileArray('jobDescriptions', 'add')}
								sx={{ marginTop: "1em" }}
							>
								+ Add Description
							</Button>
						</Box>

						{/* RIGHT COLUMN: QUALIFICATIONS */}
						<Box sx={{ flex: 1, minWidth: 0 }}>
							<Typography variant="h6" gutterBottom color="primary">
								Qualifications
							</Typography>
							<Stack spacing={2}>
								{userProfile.getQualifications().map((qualification, index) => (
									<Stack key={`qual-${index}`} direction="row" spacing={1} sx={{ alignItems: "center" }}>
										<TextField
											fullWidth
											multiline
											label={`Qualification #${index + 1}`}
											value={qualification}
											//onChange={(e) => updateProfileArray('qualifications', 'edit', index, e.target.value)}
										/>

									</Stack>
								))}
							</Stack>
							<Button 
								variant="outlined" 
								color="primary"
								//onClick={() => updateProfileArray('qualifications', 'add')}
								sx={{ marginTop: "1em" }}
							>
								+ Add Qualification
							</Button>
						</Box>

					</Box>

					<Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
						<Button variant="contained" color="primary">Update</Button>
					</Stack>


				</CardContent>
			</Paper >
		</>
	);
}

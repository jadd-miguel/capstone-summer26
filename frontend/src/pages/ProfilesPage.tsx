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
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
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

	const [openJdPopup, setJdPopupOpen] = useState<boolean>(false);
	const [openQualPopup, setQualPopupOpen] = useState<boolean>(false);

	const [inputJdValue, setJdInputValue] = useState<string>('');
	const [inputQualValue, setQualInputValue] = useState<string>('');

	//const handleOpenJd = (): void => setJdPopupOpen(true);
	//const handleOpenQual = (): void => setQualPopupOpen(true);

	const handleClose = (): void => {
		setJdPopupOpen(false);
		setQualPopupOpen(false)

		setJdInputValue('');
		setQualInputValue('');
	};

	const handleSubmitJd = async (): Promise<void> => {
		console.log("Submitted Value:", inputJdValue);
		try {
			const response = await api.profiles.post_jd({ user_id: userProfile.userId, job_description: inputJdValue, profile: userProfile.selectedProfileIndex })
			updateProfileArray("jobDescriptions", "add", userProfile.selectedProfileIndex, inputJdValue)
			console.log(response)
			reloadUserProfile()
		}
		catch (err) {
			alert(String(err))
		}
		handleClose();
		console.log(userProfile)
	};

	const handleSubmitQual = async (): Promise<void> => {
		console.log("Submitted Value:", inputQualValue);
		try {
			const response = await api.profiles.post_qual({ user_id: userProfile.userId, qualification: inputQualValue, profile: userProfile.selectedProfileIndex })
			updateProfileArray("jobDescriptions", "add", userProfile.selectedProfileIndex, inputQualValue)
			console.log(response)
			reloadUserProfile()
		}
		catch (err) {
			alert(String(err))
		}
		handleClose();
	};


	const handleSelectProfile = (index: number) => {
		setUserProfile((prevUser) => {
			// Create a new reference to trigger a React re-render
			const updatedUser = new UserProfile(prevUser.name, prevUser.userId, prevUser.profiles);
			updatedUser.selectedProfileIndex = index; // Switch the active index
			return updatedUser;
		});
	};
	const updateProfileArray = (
		arrayKey: 'jobDescriptions' | 'qualifications',
		action: 'edit' | 'add' | 'delete',
		index?: number,
		value?: string
	) => {
		setUserProfile((prevUser) => {
			// 1. Loop through profiles to find the one currently selected
			const updatedProfiles = prevUser.profiles.map((profile, pIdx) => {
				if (pIdx !== prevUser.selectedProfileIndex) return profile;

				// 2. Clone the target array so we don't mutate state directly
				let targetArray = [...profile[arrayKey]];

				// 3. Perform the requested action based on your arguments
				if (action === 'edit' && index !== undefined && value !== undefined) {
					targetArray[index] = value; // Update specific string item
				} else if (action === 'add') {
					targetArray.push(""); // Append a clean empty string row
				} else if (action === 'delete' && index !== undefined) {
					targetArray = targetArray.filter((_, idx) => idx !== index); // Remove item by index
				}

				// 4. Return a brand new Profile instance with the updated array data
				return new Profile(
					profile.targetRole,
					arrayKey === 'jobDescriptions' ? targetArray : profile.jobDescriptions,
					arrayKey === 'qualifications' ? targetArray : profile.qualifications,
					profile.jd_ids,
					profile.quals_ids
				);
			});

			// 5. Return a brand new UserProfile instance to break object identity and trigger render
			const updatedUser = new UserProfile(prevUser.name, prevUser.userId, updatedProfiles);
			updatedUser.selectedProfileIndex = prevUser.selectedProfileIndex; // Keep the active tab index
			return updatedUser;
		});
	};

	const handleRoleChange = (newRole: string) => {
		setUserProfile((prevUser) => {
			// 1. Loop through your inner profiles array
			const updatedProfiles = prevUser.profiles.map((profile, idx) => {
				// 2. Only change the one currently active on screen
				if (idx === prevUser.selectedProfileIndex) {
					return new Profile(newRole, profile.jobDescriptions, profile.qualifications, profile.jd_ids, profile.quals_ids);
				}
				return profile;
			});

			// 3. Return a brand new UserProfile instance to trigger a re-render
			const updatedUser = new UserProfile(prevUser.name, prevUser.userId, updatedProfiles);
			updatedUser.selectedProfileIndex = prevUser.selectedProfileIndex; // Maintain the active tab
			return updatedUser;
		});
	};

	const handleNameChange = (newName: string) => {
		setUserProfile((prevUser) => {
			const updatedUser = new UserProfile(newName, prevUser.userId, prevUser.profiles)
			updatedUser.selectedProfileIndex = prevUser.selectedProfileIndex;

			return updatedUser
		});
	};

	const handleNewProfile = () => {
		console.log(userProfile)
		setUserProfile((prevUser) => {
			const newProfileItem = new Profile("New Role", [], [], [], []);
			const updatedProfilesList = [...prevUser.profiles, newProfileItem];
			const updatedUser = new UserProfile(prevUser.name, prevUser.userId, updatedProfilesList);
			updatedUser.selectedProfileIndex = updatedProfilesList.length - 1;

			return updatedUser;
		});
	};
	const handleDeleteProfile = () => {
		// Don't do anything if there's only one profile left
		if (userProfile.profiles.length <= 1) {
			alert("You must keep at least one profile.");
			return;
		}

		setUserProfile((prevUser) => {
			// Filter out the profile currently active on screen
			const updatedProfiles = prevUser.profiles.filter(
				(_, idx) => idx !== prevUser.selectedProfileIndex
			);

			const updatedUser = new UserProfile(prevUser.name, prevUser.userId, updatedProfiles);

			// Reset selected index back to 0 safely so it doesn't point to an out-of-bounds index
			updatedUser.selectedProfileIndex = 0;
			return updatedUser;
		});
	};

	const handleUpdate = async (): Promise<void> => {
		try {

			//const name_response = api.profiles.post_name({id: userProfile.userId, update:{name:"New Name Here"}})
			//console.log(name_response)

			for (let i = 1; i < userProfile.profiles.length; i++) {
				console.log(userProfile.profiles[i].jobDescriptions)
				for (let j = 0; j < userProfile.profiles[i].jobDescriptions.length; j++) {
					const response = await api.profiles.patch_jd({ id: userProfile.profiles[i].jd_ids[j], update: { job_description: userProfile.profiles[i].jobDescriptions[j] } })
					console.log(response)
				}

				for (let j = 0; j < userProfile.profiles[i].qualifications.length; j++) {
					const response = await api.profiles.patch_quals({ id: userProfile.profiles[i].quals_ids[j], update: { qualification: userProfile.profiles[i].qualifications[j] } })
					console.log(response)
				}
			}
			console.log(userProfile)
		}
		catch (err) {
			console.error(err);
			alert(String(err))
		}

	}

	const reloadUserProfile = async (): Promise<void> => {
		const jd_response = await api.profiles.get_jd(userProfile.userId)
		const qualifications_response = await api.profiles.get_quals(userProfile.userId)
		const quals: string[] = []
		qualifications_response.data.forEach((element) => { quals.push(element.profile) });
		const jds: string[] = []
		jd_response.data.forEach((element) => { jds.push(element.profile) });
		const uniqueProfiles: number = Math.max(new Set(jds).size, new Set(quals).size)


		const profiles: Profile[] = []
		for (let i = 0; i < uniqueProfiles; i++) {
			profiles[i] = new Profile("Role", [], [], [], [])
		}

		jd_response.data.map((element) => {
			profiles[element.profile].jobDescriptions.push(element.job_description)
			profiles[element.profile].jd_ids.push(element.id)
		});
		qualifications_response.data.map((element) => {
			profiles[element.profile].qualifications.push(element.qualification)
			profiles[element.profile].quals_ids.push(element.id)
		});

		setUserProfile(new UserProfile(userProfile.name, userProfile.userId, profiles))
	}

	return (
		<>
			<Paper elevation={4} sx={{ marginTop: "1em", margin: "1em" }}>
				<CardHeader title="Profiles"></CardHeader>
				<CardContent>
					<TextField fullWidth label="Name" sx={{ margin: "1em", width: "40%" }}
						value={userProfile.name}
						onChange={e => { handleNameChange(e.target.value) }}
					/>
					<Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
						<Button variant="contained" color="primary" onClick={handleNewProfile}>Add Profile</Button>
					</Stack>

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
										{profile.targetRole}
									</Button>

								);
							})}
						</ButtonGroup>
					</Stack>
					<TextField fullWidth label="Target Role" sx={{ margin: "1em", width: "40%" }}
						value={userProfile.getTargetRole()}
						onChange={(e) => handleRoleChange(e.target.value)}
					/>

					<Box sx={{
						display: 'flex',
						flexDirection: { xs: 'column', md: 'row' },
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
											onChange={(e) => updateProfileArray('jobDescriptions', 'edit', index, e.target.value)}

										/>
										<IconButton
											color="error"
											onClick={() => updateProfileArray('jobDescriptions', 'delete', index)}
											aria-label="delete description"
										>
											<DeleteIcon />
										</IconButton>

									</Stack>
								))}
							</Stack>
							<Button
								variant="outlined"
								onClick={() => setJdPopupOpen(true)}
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
											onChange={(e) => updateProfileArray('qualifications', 'edit', index, e.target.value)}
										/>
										<IconButton
											color="error"
											onClick={() => updateProfileArray('qualifications', 'delete', index)}
											aria-label="delete description"
										>
											<DeleteIcon />
										</IconButton>

									</Stack>
								))}
							</Stack>
							<Button
								variant="outlined"
								color="primary"
								onClick={() => setQualPopupOpen(true)}
								sx={{ marginTop: "1em" }}
							>
								+ Add Qualification
							</Button>
						</Box>

					</Box>

					<Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
						<Button variant="contained" color="secondary" onClick={handleDeleteProfile}>Delete Profile</Button>
					</Stack>
					<Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
						<Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
					</Stack>


				</CardContent>
			</Paper >


			<Dialog open={openJdPopup} onClose={handleClose} fullWidth maxWidth="xs">
				<DialogTitle>Adding</DialogTitle>

				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Description"
						type="text"
						fullWidth
						variant="standard"
						value={inputJdValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJdInputValue(e.target.value)}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color="inherit">
						Cancel
					</Button>
					<Button onClick={handleSubmitJd} variant="contained" color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={openQualPopup} onClose={handleClose} fullWidth maxWidth="xs">
				<DialogTitle>Adding</DialogTitle>

				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Qualification"
						type="text"
						fullWidth
						variant="standard"
						value={inputQualValue}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQualInputValue(e.target.value)}
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color="inherit">
						Cancel
					</Button>
					<Button onClick={handleSubmitQual} variant="contained" color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>

		</>
	);
}

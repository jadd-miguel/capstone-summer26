export class Profile {
    targetRole:string;
    jobDescriptions: string[];
    qualifications: string[];

    constructor(targetRole: string, jobDescriptions:string[], qualifications:string[]) {
        this.targetRole = targetRole;
        this.jobDescriptions = jobDescriptions
        this.qualifications = qualifications
    }
}

export class UserProfile {
    name: string;
    selectedProfileIndex: number = 1;
    profiles: Profile[]


    constructor(name: string, profiles:Profile[]) {
        this.name = name;
        this.profiles = profiles
    }

    getTargetRole(){
        return this.profiles[this.selectedProfileIndex].targetRole
    }

    getJobDescriptions(){
        return this.profiles[this.selectedProfileIndex].jobDescriptions
    }

    getQualifications(){
        return this.profiles[this.selectedProfileIndex].qualifications
    }

}

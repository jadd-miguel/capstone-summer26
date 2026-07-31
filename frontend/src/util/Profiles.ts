export class Profile {
    targetRole:string;
    jobDescriptions: string[];
    qualifications: string[];
    jd_ids: string[];
    quals_ids: string[];

    constructor(targetRole: string, jobDescriptions:string[], qualifications:string[], jd_ids: string[], quals_ids: string[]) {
        this.targetRole = targetRole;
        this.jobDescriptions = jobDescriptions
        this.qualifications = qualifications
        this.jd_ids = jd_ids
        this.quals_ids = quals_ids
    }
}

export class UserProfile {
    name: string;
    selectedProfileIndex: number = 0;
    profiles: Profile[]
    userId: string;


    constructor(name: string, userId: string, profiles:Profile[]) {
        this.name = name;
        this.profiles = profiles
        this.userId = userId
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

    getJdIds(){
        return this.profiles[this.selectedProfileIndex].jd_ids
    }

    getQualsIds(){
        return this.profiles[this.selectedProfileIndex].quals_ids
    }

}

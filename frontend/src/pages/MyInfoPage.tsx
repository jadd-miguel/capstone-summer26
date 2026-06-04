import React from 'react';

class Details {

}
class SkillDetails {
    
}
class CertificationDetails {
    
}
class ExperienceDetails {
    organization: string = "";
    timeWorked: number = 0;
    timeWorkedUnit: "months" | "years" = "years";
}
class ProjectDetails {
    timeWorked: number = 0;
    timeWorkedUnit: "months" | "years" = "months";
}
class EducationDetails {
    institution: string = "";
    numYears: number = 0;
}
class Qualification {
    id: number | undefined;
    name: string = "";
    description: string = "";
    type: "skill" 
        | "experience" 
        | "education" 
        | "certification" 
        | "project"
        | undefined;
    details: Details | undefined;
}



class Education extends Qualification {
    institution: string = "";
}

class UserQualifications {
    constructor(qualifications: Array<Qualification>) {}
}

export default function MyInfoPage() {
    // Qualification array will be retrieved from server

    // IDEA: let users use LinkedIn AutoFill
    return (<>
        My Info
    </>)
}
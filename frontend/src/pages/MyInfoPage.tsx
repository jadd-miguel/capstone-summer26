import React from 'react';

class Details {

}
class SkillDetails {
    
}
class ExperienceDetails {
    organization: String = ""
    type period = {startMonth: Date, endMonth: Date}
}

class Qualification {
    id: String | undefined;
    name: String = "";
    description: String = "";
    type: "skill" 
        | "experience" 
        | "education" 
        | "certification" 
        | "project"
        | undefined;
    details: Details | undefined;
}



class Education extends Qualification {
    institution: String = "";
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
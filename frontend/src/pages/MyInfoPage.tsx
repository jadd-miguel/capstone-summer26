
import { useState } from "react";


type SkillDetails = {
    kind: "skill"

}

type CertificationDetails = {
    kind: "certification"
}

type ExperienceDetails = {
    kind: "experience",
    organization: string,
    timeWorked: number,
    timeWorkedUnit: "months" | "years",
}

type ProjectDetails = {
    kind: "project",
    timeWorked: number,
    timeWorkedUnit: "months" | "years",
}

type EducationDetails = {
    kind: "education"
    institution: string,
    numYears: number,
}

type Details 
    = ExperienceDetails 
    | ProjectDetails 
    | EducationDetails
    | SkillDetails
    | CertificationDetails
    ;

type QualKind 
    = "skill" 
    | "experience" 
    | "education" 
    | "certification" 
    | "project"
    | undefined
    ;
type Qualification = {
    id: number | undefined,
    name: string,
    description: string,
    qualKind: QualKind,
    details: Details | undefined,
}

type UserQualifications = Qualification[]

function visualizeQualification(q: Qualification) {
    return (<>
        <div>
            <div>Type: {q.qualKind}</div>
            <div>Name: {q.name}</div>
            <div>Description: {q.description}</div>
            {
            q.details?.kind == "experience" && <>
                <div>{q.details.organization}</div>
                <div>{q.details.timeWorked} {q.details.timeWorkedUnit}</div>
            </>
            || q.details?.kind == "education" && <>
                <div>{q.details.institution}</div>
                <div>{q.details.numYears}</div>
            </>
            || q.details?.kind == "project" && <>
                <div>{q.details.timeWorked} {q.details.timeWorkedUnit}</div>
            </>
            }
        </div>
    </>)
}

const testQual: Qualification = {
    id: undefined,
    qualKind: "project",
    name: "Kronos Calendar",
    description: "An application that can turn any date from a supported calendar into the corresponding date from any other calendar.",
    details: {
        kind: "project",
        timeWorked: 2,
        timeWorkedUnit: "months"
    }
}


export default function MyInfoPage() {
const [qualKind, setQualKind] = useState<"skill" 
        | "experience" 
        | "education" 
        | "certification" 
        | "project"
        | undefined>(undefined);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
// detail fields
const [organization, setOrganization] = useState("");
const [institution, setInstitution] = useState("");
const [timeWorked, setTimeWorked] = useState("");
const [timeUnit, setTimeUnit] = useState<"years"|"months">("months");
const [numYears, setNumYears] = useState("");


const [qualifications, setQualifications] = useState<Qualification[]>([]);


const resetFields = () => {
    setName("");
    setDescription("");
    setOrganization("");
    setInstitution("");
    setTimeWorked("");
    setNumYears("");
};

const addQualification = () => {
    if (!qualKind || !name) return;


    let details: Qualification["details"] = undefined;


    if (qualKind === "experience") {
    details = {
        kind: "experience",
        organization,
        timeWorked: Number(timeWorked),
        timeWorkedUnit: timeUnit,
    };
    } else if (qualKind === "education") {
    details = {
        kind: "education",
        institution,
        numYears: Number(numYears),
    };
    } else if (qualKind === "project") {
    details = {
        kind: "project",
        timeWorked: Number(timeWorked),
        timeWorkedUnit: timeUnit,
    };
    } else if (qualKind === "skill") {
    details = { kind: "skill" };
    } else if (qualKind === "certification") {
    details = { kind: "certification" };
    }


    const newQual: Qualification = {
    id: Date.now(),
    qualKind,
    name,
    description,
    details,
    };


    setQualifications([...qualifications, newQual]);
    resetFields();
};

const removeQualification = (id: number | undefined) => {
    if (id){
        setQualifications(qualifications.filter(q => q.id !== id));
    }
};


return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto" }}>
    <h1>My Qualifications</h1>
    {/* Form */}
    <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <div>
        <label>Type:</label><br />
        <select value={qualKind} onChange={(e) => setQualKind(e.target.value as QualKind)}>
            <option value={undefined}>Select type</option>
            <option value="skill">Skill</option>
            <option value="experience">Experience</option>
            <option value="education">Education</option>
            <option value="project">Project</option>
            <option value="certification">Certification</option>
        </select>
        </div>
        <div>
        <label>Name:</label><br />
        <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
        <label>Description:</label><br />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        {/* Conditional fields */}
        {qualKind === "experience" && (
        <>
            <div>
            <label>Organization:</label><br />
            <input value={organization} onChange={(e) => setOrganization(e.target.value)} />
            </div>
            <div>
            <label>Time Worked:</label><br />
            <input
                type="number"
                value={timeWorked}
                onChange={(e) => setTimeWorked(e.target.value)}
            />
            <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value as ("years"|"months"))}>
                <option value="months">Months</option>
                <option value="years">Years</option>
            </select>
            </div>
        </>
        )}


        {qualKind === "education" && (
        <>
            <div>
            <label>Institution:</label><br />
            <input value={institution} onChange={(e) => setInstitution(e.target.value)} />
            </div>
            <div>
            <label>Years:</label><br />
            <input
                type="number"
                value={numYears}
                onChange={(e) => setNumYears(e.target.value)}
            />
            </div>
        </>
        )}


        {qualKind === "project" && (
        <div>
            <label>Time Worked:</label><br />
            <input
            type="number"
            value={timeWorked}
            onChange={(e) => setTimeWorked(e.target.value)}
            />
            <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value as ("years"|"months"))}>
            <option value="months">Months</option>
            <option value="years">Years</option>
            </select>
        </div>
        )}


        <button onClick={addQualification} style={{ marginTop: "10px" }}>
        Add Qualification
        </button>
    </div>


    {/* List */}
    <div>
        {qualifications.length === 0 ? (
        <p>No qualifications added yet.</p>
        ) : (
        qualifications.map((q) => (
            <div key={q.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <div><strong>Type:</strong> {q.qualKind}</div>
            <div><strong>Name:</strong> {q.name}</div>
            <div><strong>Description:</strong> {q.description}</div>


            {q.details?.kind === "experience" && (
                <>
                <div>Organization: {q.details.organization}</div>
                <div>{q.details.timeWorked} {q.details.timeWorkedUnit}</div>
                </>
            )}


            {q.details?.kind === "education" && (
                <>
                <div>Institution: {q.details.institution}</div>
                <div>{q.details.numYears} years</div>
                </>
            )}


            {q.details?.kind === "project" && (
                <div>{q.details.timeWorked} {q.details.timeWorkedUnit}</div>
            )}


            <button onClick={() => removeQualification(q.id)} style={{ marginTop: "8px" }}>
                Delete
            </button>
            </div>
        ))
        )}
    </div>
    </div>
);
}


import { useState } from "react";

export default function JobDescPage() {
  const [jobText, setJobText] = useState<string>("");
  const [jobs, setJobs] = useState<string[]>([]);

  const addJob = () => {
    if (jobText.trim() === "") return;
    setJobs([...jobs, jobText]);
    setJobText("");
  };

  const removeJob = (index: number) => {
    const updated = jobs.filter((_, i) => i !== index);
    setJobs(updated);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Saved Job Descriptions</h1>


      {/* Input area */}
      <div style={{ marginBottom: "20px" }}>
        <textarea
          placeholder="Enter a job description..."
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          rows={4}
          style={{ width: "100%", padding: "10px" }}
        />


        <button
          onClick={addJob}
          style={{ marginTop: "10px", padding: "10px", width: "100%" }}
        >
          Add Job Description
        </button>
      </div>
      {/* List */}
      <div>
        {jobs.length === 0 ? (
          <p>No job descriptions added yet.</p>
        ) : (
          jobs.map((job, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p style={{ whiteSpace: "pre-wrap" }}>{job}</p>
              <button
                onClick={() => removeJob(index)}
                style={{ marginTop: "8px" }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

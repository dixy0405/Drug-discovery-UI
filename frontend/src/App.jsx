import { useState } from "react";

import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Dna,
  Loader2,
} from "lucide-react";

import WorkflowPage from "./pages/WorkflowPage";
import CandidateResults from "./pages/CandidateResults";
import MoleculeViewer from "./pages/MoleculeViewer";

import "./App.css";


function App() {

  const [file, setFile] = useState(null);

  const [error, setError] = useState("");

  const [uploading, setUploading] = useState(false);

  const [uploadResult, setUploadResult] = useState(null);

  const [workflowResults, setWorkflowResults] = useState(null);

  const [showCandidates, setShowCandidates] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState(null);


  // =========================================
  // FILE SELECTION
  // =========================================

  const handleFileChange = (event) => {

    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    const fileName = selectedFile.name.toLowerCase();

    if (
      !fileName.endsWith(".pdb") &&
      !fileName.endsWith(".sdf")
    ) {

      setFile(null);
      setUploadResult(null);
      setWorkflowResults(null);
      setShowCandidates(false);
      setSelectedCandidate(null);

      setError(
        "Invalid file. Please upload a .PDB or .SDF file."
      );

      return;
    }

    setError("");

    setUploadResult(null);

    setWorkflowResults(null);

    setShowCandidates(false);

    setSelectedCandidate(null);

    setFile(selectedFile);
  };


  // =========================================
  // UPLOAD FILE
  // =========================================

  const uploadFile = async () => {

    if (!file) {

      setError(
        "Please select a PDB or SDF file first."
      );

      return;
    }

    setUploading(true);

    setError("");

    setUploadResult(null);

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {

        throw new Error(
          "Upload request failed."
        );

      }

      const data = await response.json();

      if (!data.success) {

        setError(data.message);

        return;
      }

      setUploadResult(data);

    } catch (err) {

      console.error(err);

      setError(
        "Could not connect to the backend. Make sure FastAPI is running."
      );

    } finally {

      setUploading(false);

    }

  };


  // =========================================
  // START WORKFLOW
  // =========================================

  const handleStart = async () => {

    if (!file) {

      setError(
        "Please upload a file first."
      );

      return;
    }

    setError("");

    setUploading(true);

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/workflow/start",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {

        throw new Error(
          "Workflow request failed."
        );

      }

      const data = await response.json();

      console.log(
        "WORKFLOW RESULTS:",
        data
      );

      if (!data.success) {

        setError(data.message);

        return;
      }

      setWorkflowResults(
        data.results
      );

      setShowCandidates(false);

      setSelectedCandidate(null);

    } catch (err) {

      console.error(err);

      setError(
        "Could not connect to the backend. Make sure FastAPI is running."
      );

    } finally {

      setUploading(false);

    }

  };


  // =========================================
  // MOLECULE VIEWER
  // =========================================

  if (
    workflowResults &&
    selectedCandidate
  ) {

    return (
      <MoleculeViewer
        candidate={selectedCandidate}
        file={file}
        onBack={() =>
          setSelectedCandidate(null)
        }
      />
    );

  }


  // =========================================
  // CANDIDATE RESULTS
  // =========================================

  if (
    workflowResults &&
    showCandidates
  ) {

    return (
      <CandidateResults
        results={workflowResults}

        onBack={() =>
          setShowCandidates(false)
        }

        onViewMolecule={(candidate) => {

          console.log(
            "SELECTED CANDIDATE:",
            candidate
          );

          setSelectedCandidate(candidate);

        }}

      />
    );

  }


  // =========================================
  // WORKFLOW
  // =========================================

  if (workflowResults) {

    return (
      <WorkflowPage
        results={workflowResults}

        onViewCandidates={() =>
          setShowCandidates(true)
        }
      />
    );

  }


  // =========================================
  // MAIN PAGE
  // =========================================

  return (

    <div className="app">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">

          <Dna size={28} />

          <span>
            DrugDiscovery
          </span>

        </div>

        <div className="nav-links">

          <span>
            Dashboard
          </span>

          <span>
            About
          </span>

        </div>

      </nav>


      {/* MAIN */}

      <main className="hero">

        <div className="hero-content">


          {/* BADGE */}

          <div className="badge">
            COMPUTATIONAL DRUG DISCOVERY
          </div>


          {/* TITLE */}

          <h1>

            From Molecular Structure

            <br />

            <span>
              to Potential Candidates
            </span>

          </h1>


          {/* DESCRIPTION */}

          <p className="subtitle">

            Upload a molecular structure and explore it
            through a unified multi-stage computational
            drug discovery workflow.

          </p>


          {/* UPLOAD CARD */}

          <div className="upload-card">

            <div className="upload-icon">
              <Upload size={32} />
            </div>

            <h2>
              Upload Molecular Structure
            </h2>

            <p>
              Upload one file in PDB or SDF format
            </p>


            {/* BROWSE */}

            <label className="browse-button">

              <FileText size={18} />

              Browse Files

              <input
                type="file"
                accept=".pdb,.sdf"
                onChange={handleFileChange}
                hidden
              />

            </label>


            {/* FORMATS */}

            <div className="supported">

              Supported formats:

              <strong>
                {" "} .PDB {" "}
              </strong>

              /

              <strong>
                {" "} .SDF
              </strong>

            </div>

          </div>


          {/* SELECTED FILE */}

          {file &&
            !uploadResult && (

              <div className="file-result success">

                <div className="file-left">

                  <CheckCircle size={22} />

                  <div>

                    <strong>
                      {file.name}
                    </strong>

                    <span>

                      {file.name
                        .toLowerCase()
                        .endsWith(".pdb")
                        ? "PDB — Protein Structure"
                        : "SDF — Molecular Structure"}

                    </span>

                  </div>

                </div>

                <span className="valid-text">
                  Valid File
                </span>

              </div>

            )}


          {/* UPLOAD */}

          {file &&
            !uploadResult && (

              <button
                className="start-button"
                onClick={uploadFile}
                disabled={uploading}
              >

                {uploading ? (

                  <>

                    <Loader2
                      className="spin"
                      size={20}
                    />

                    Uploading...

                  </>

                ) : (

                  <>

                    Upload to Platform

                    <ArrowRight
                      size={20}
                    />

                  </>

                )}

              </button>

            )}


          {/* UPLOAD RESULT */}

          {uploadResult && (

            <div className="file-result success">

              <div className="file-left">

                <CheckCircle size={22} />

                <div>

                  <strong>
                    {uploadResult.filename}
                  </strong>

                  <span>

                    {uploadResult.type}
                    {" — "}
                    {uploadResult.description}

                  </span>

                </div>

              </div>

              <span className="valid-text">
                Uploaded ✓
              </span>

            </div>

          )}


          {/* ERROR */}

          {error && (

            <div className="file-result error">

              <AlertCircle size={22} />

              <span>
                {error}
              </span>

            </div>

          )}


          {/* START */}

          {uploadResult && (

            <button
              className="start-button"
              onClick={handleStart}
              disabled={uploading}
            >

              {uploading ? (

                <>

                  <Loader2
                    className="spin"
                    size={20}
                  />

                  Running Workflow...

                </>

              ) : (

                <>

                  Start Discovery

                  <ArrowRight
                    size={20}
                  />

                </>

              )}

            </button>

          )}

        </div>

      </main>

    </div>

  );
}


export default App;
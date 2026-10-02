import {
  CheckCircle,
  FlaskConical,
  Clock3,
  ShieldCheck,
  Scale,
  ArrowLeft,
  Eye,
} from "lucide-react";


function CandidateResults({
  results,
  onBack,
  onViewMolecule,
}) {

  // =========================================
  // DEMONSTRATION CANDIDATES
  // =========================================

  const candidates = [

    {
      id: "Candidate-001",
      affinity: "-9.4 kcal/mol",
      saScore: "2.1",
      admet: "Pass",
      residenceTime: "4.8 hr",
      fep: "-2.7 kcal/mol",
      patent: "Clear",
    },

    {
      id: "Candidate-002",
      affinity: "-9.1 kcal/mol",
      saScore: "2.4",
      admet: "Pass",
      residenceTime: "4.2 hr",
      fep: "-2.4 kcal/mol",
      patent: "Clear",
    },

    {
      id: "Candidate-003",
      affinity: "-8.9 kcal/mol",
      saScore: "2.7",
      admet: "Pass",
      residenceTime: "3.9 hr",
      fep: "-2.2 kcal/mol",
      patent: "Clear",
    },

    {
      id: "Candidate-004",
      affinity: "-8.6 kcal/mol",
      saScore: "3.0",
      admet: "Pass",
      residenceTime: "3.5 hr",
      fep: "-1.9 kcal/mol",
      patent: "Review",
    },

    {
      id: "Candidate-005",
      affinity: "-8.3 kcal/mol",
      saScore: "3.2",
      admet: "Pass",
      residenceTime: "3.1 hr",
      fep: "-1.7 kcal/mol",
      patent: "Review",
    },

  ];


  // =========================================
  // VIEW MOLECULE
  // =========================================

  const handleViewMolecule = (candidate) => {

    console.log(
      "VIEW MOLECULE CLICKED:",
      candidate
    );

    if (onViewMolecule) {

      onViewMolecule(candidate);

    } else {

      console.error(
        "onViewMolecule function is missing."
      );

    }

  };


  return (

    <div className="candidate-page">


      {/* HEADER */}

      <div className="candidate-header">

        <div>

          <span className="molecule-label">
            CANDIDATE ANALYSIS
          </span>

          <h1>
            Candidate Molecules
          </h1>

          <p>
            Final candidates identified after the
            computational drug discovery workflow.
          </p>

        </div>


        <div className="candidate-summary">

          <div className="summary-card">

            <FlaskConical size={22} />

            <div>

              <span>
                Candidates
              </span>

              <strong>
                {results.final_candidates}
              </strong>

            </div>

          </div>


          <div className="summary-card">

            <CheckCircle size={22} />

            <div>

              <span>
                ADMET
              </span>

              <strong>
                Pass
              </strong>

            </div>

          </div>

        </div>

      </div>


      {/* CANDIDATE CARDS */}

      <div className="candidate-container">

        {candidates.map((candidate) => (

          <div
            className="candidate-card"
            key={candidate.id}
          >


            {/* CARD HEADER */}

            <div className="candidate-card-header">

              <div>

                <span className="candidate-label">
                  MOLECULAR CANDIDATE
                </span>

                <h2>
                  {candidate.id}
                </h2>

              </div>


              <div className="candidate-check">

                <CheckCircle
                  size={22}
                />

                <span>
                  Validated
                </span>

              </div>

            </div>


            {/* METRICS */}

            <div className="candidate-metrics">


              <div className="metric">

                <FlaskConical size={18} />

                <div>

                  <span>
                    Binding Affinity
                  </span>

                  <strong>
                    {candidate.affinity}
                  </strong>

                </div>

              </div>


              <div className="metric">

                <Scale size={18} />

                <div>

                  <span>
                    SA Score
                  </span>

                  <strong>
                    {candidate.saScore}
                  </strong>

                </div>

              </div>


              <div className="metric">

                <ShieldCheck size={18} />

                <div>

                  <span>
                    ADMET
                  </span>

                  <strong className="pass">
                    {candidate.admet}
                  </strong>

                </div>

              </div>


              <div className="metric">

                <Clock3 size={18} />

                <div>

                  <span>
                    Residence Time
                  </span>

                  <strong>
                    {candidate.residenceTime}
                  </strong>

                </div>

              </div>


              <div className="metric">

                <FlaskConical size={18} />

                <div>

                  <span>
                    FEP
                  </span>

                  <strong>
                    {candidate.fep}
                  </strong>

                </div>

              </div>


              <div className="metric">

                <ShieldCheck size={18} />

                <div>

                  <span>
                    Patent Status
                  </span>

                  <strong
                    className={
                      candidate.patent === "Clear"
                        ? "pass"
                        : "review"
                    }
                  >
                    {candidate.patent}
                  </strong>

                </div>

              </div>


            </div>


            {/* VIEW MOLECULE */}

            <button
              className="view-molecule-button"
              onClick={() =>
                handleViewMolecule(candidate)
              }
            >

              <Eye size={18} />

              View Molecule

            </button>


          </div>

        ))}

      </div>


      {/* BACK BUTTON */}

      <div className="candidate-back-container">

        <button
          className="candidate-back-button"
          onClick={onBack}
        >

          <ArrowLeft size={18} />

          Back to Workflow

        </button>

      </div>


      {/* NOTE */}

      <div className="candidate-note">

        <span>

          Candidate metrics shown here are currently
          demonstration values. They will be replaced
          with outputs from the actual computational
          drug discovery tools during integration.

        </span>

      </div>


    </div>

  );
}


export default CandidateResults;
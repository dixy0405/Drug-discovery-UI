import {
  CheckCircle,
  Dna,
  ArrowRight,
} from "lucide-react";

function WorkflowPage({ results, onViewCandidates }) {

  const stages = [
    {
      name: "Chemical Space / Docking",
      before: results.molecules_before,
      after: results.molecules_after,
    },
    {
      name: "Synthetic Accessibility",
      before: results.molecules_after,
      after: results.molecules_after_sa,
    },
    {
      name: "ADMET",
      before: results.molecules_after_sa,
      after: results.molecules_after_admet,
    },
    {
      name: "Binding Affinity",
      before: results.molecules_after_admet,
      after: results.molecules_after_affinity,
    },
    {
      name: "Binding / Unbinding Kinetics",
      before: results.molecules_after_affinity,
      after: results.molecules_after_kinetics,
    },
    {
      name: "Free Energy Perturbation",
      before: results.molecules_after_kinetics,
      after: results.molecules_after_fep,
    },
    {
      name: "Patent Screening",
      before: results.molecules_after_fep,
      after: results.final_candidates,
    },
  ];


  return (
    <div className="workflow-page">

      {/* HEADER */}

      <div className="workflow-header">

        <Dna size={32} />

        <div>

          <h1>
            Drug Discovery Workflow
          </h1>

          <p>
            Processing your molecular structure through
            multiple computational stages.
          </p>

        </div>

      </div>


      {/* WORKFLOW STAGES */}

      <div className="workflow-container">

        {stages.map((stage, index) => (

          <div
            className="workflow-stage"
            key={stage.name}
          >

            <div className="stage-icon">

              <CheckCircle size={25} />

            </div>


            <div className="stage-content">

              <h2>
                {index + 1}. {stage.name}
              </h2>

              <p>
                {stage.before.toLocaleString()}
                {" → "}
                {stage.after.toLocaleString()}
                {" molecules"}
              </p>

            </div>


            <div className="stage-status">
              COMPLETED
            </div>

          </div>

        ))}

      </div>


      {/* COMPLETE MESSAGE */}

      <div className="workflow-complete">

        <CheckCircle size={28} />

        <div>

          <strong>
            Analysis Complete
          </strong>

          <span>
            {results.final_candidates} candidate
            molecules identified
          </span>

        </div>

      </div>


      {/* VIEW CANDIDATES BUTTON */}

      <button
        className="results-button"
        onClick={onViewCandidates}
      >

        View Candidate Molecules

        <ArrowRight size={20} />

      </button>

    </div>
  );
}

export default WorkflowPage;
import { useEffect, useRef, useState } from "react";
import * as $3Dmol from "3dmol";

function MoleculeViewer({ candidate, file, onBack }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadMolecule = async () => {
      try {
        setLoading(true);
        setError("");

        if (!file) {
          throw new Error("No molecular file was selected.");
        }

        const filename = file.name;

        console.log("Loading molecular structure:", filename);

        const response = await fetch(
          `http://127.0.0.1:8000/structure/${encodeURIComponent(filename)}`
        );

        if (!response.ok) {
          throw new Error(
            `Could not load molecular structure. Server returned ${response.status}.`
          );
        }

        const content = await response.text();

        console.log("Molecular structure length:", content.length);
        console.log(
          "First 200 characters:",
          content.substring(0, 200)
        );

        if (!content.trim()) {
          throw new Error("The molecular structure file is empty.");
        }

        if (cancelled) return;

        const container = containerRef.current;

        if (!container) {
          throw new Error("3D viewer container was not found.");
        }

        // Destroy an existing viewer before creating a new one.
        if (viewerRef.current) {
          try {
            viewerRef.current.clear();
            viewerRef.current = null;
          } catch (cleanupError) {
            console.warn(
              "Previous viewer cleanup warning:",
              cleanupError
            );
          }
        }

        // Make sure the container is completely empty.
        container.innerHTML = "";

        const viewer = $3Dmol.createViewer(container, {
          backgroundColor: "#07111f",
        });

        viewerRef.current = viewer;

        const extension = filename
          .split(".")
          .pop()
          .toLowerCase();

        const format =
          extension === "pdb"
            ? "pdb"
            : extension === "sdf"
            ? "sdf"
            : null;

        if (!format) {
          throw new Error("Unsupported molecular file format.");
        }

        console.log("3Dmol format:", format);
const model = viewer.addModel(content, format);
const atoms = model.selectedAtoms({});

console.log("Parsed atom count:", atoms.length);
console.table(
  atoms.map(({ elem, x, y, z }) => ({ elem, x, y, z }))
);
viewer.resize();
console.log("Model added to 3Dmol.");

viewer.setStyle(
  {},
  {
    stick: {
      radius: 0.25,
      colorscheme: "Jmol",
    },
    sphere: {
      scale: 0.35,
      colorscheme: "Jmol",
    },
  }
);

viewer.center();
viewer.zoomTo();

setTimeout(() => {
  if (!cancelled && viewerRef.current) {
    viewer.resize();
    viewer.center();
    viewer.zoomTo();
    viewer.render();

    console.log("3Dmol viewer resized and rendered.");
  }
}, 200);
        console.log("3D molecule rendered successfully.");

        if (!cancelled) {
          setLoading(false);
        }
      } catch (err) {
        console.error("MOLECULE VIEWER ERROR:", err);

        if (!cancelled) {
          setLoading(false);
          setError(
            err.message || "Could not display the molecular structure."
          );
        }
      }
    };

    loadMolecule();

    return () => {
      cancelled = true;

      if (viewerRef.current) {
        try {
          viewerRef.current.clear();
        } catch (cleanupError) {
          console.warn(
            "Viewer cleanup warning:",
            cleanupError
          );
        }

        viewerRef.current = null;
      }
    };
  }, [file]);

  return (
    <div className="molecule-viewer-page">

      <div className="molecule-viewer-header">
        <button onClick={onBack}>
          ← Back
        </button>

        <div>
          <h2>
            {candidate?.name || "Molecule Viewer"}
          </h2>

          <p>
            {file?.name || "Molecular Structure"}
          </p>
        </div>
      </div>

      <div className="molecule-viewer-wrapper">

        <div
  ref={containerRef}
  className="molecule-viewer"
  style={{
    width: "100%",
    height: "500px",
    minHeight: "500px",
    backgroundColor: "#07111f",
    border: "1px solid #334155",
    borderRadius: "12px",
    position: "relative",
    overflow: "hidden",
  }}
/>

        {loading && (
          <div className="molecule-loading">
            Loading molecular structure...
          </div>
        )}

        {error && (
          <div className="molecule-error">
            {error}
          </div>
        )}

      </div>

      {candidate && (
        <div className="molecule-info">

          <div>
            <strong>Binding Affinity</strong>
            <span>
              {candidate.affinity ?? "N/A"} kcal/mol
            </span>
          </div>

          <div>
            <strong>SA Score</strong>
            <span>
              {candidate.sa ?? "N/A"}
            </span>
          </div>

          <div>
            <strong>ADMET</strong>
            <span>
              {candidate.admet ?? "N/A"}
            </span>
          </div>

          <div>
            <strong>Residence Time</strong>
            <span>
              {candidate.residence ?? "N/A"} hr
            </span>
          </div>

          <div>
            <strong>FEP</strong>
            <span>
              {candidate.fep ?? "N/A"} kcal/mol
            </span>
          </div>

          <div>
            <strong>Patent</strong>
            <span>
              {candidate.patent ?? "N/A"}
            </span>
          </div>

        </div>
      )}

    </div>
  );
}

export default MoleculeViewer;
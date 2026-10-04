export const stages = [
  { name: "Chemical Space / Docking", key: "molecules_after", fallback: 2500, description: "Explores possible ligand poses in a target binding site. This prototype displays an illustrative screening count; it does not run docking." },
  { name: "Synthetic Accessibility", key: "molecules_after_sa", fallback: 800, description: "Estimates how difficult a molecule may be to synthesize. The current stage and scores are demonstration data." },
  { name: "ADMET", key: "molecules_after_admet", fallback: 250, description: "Absorption, distribution, metabolism, excretion and toxicity. A demo Pass label is not evidence of safety or suitability." },
  { name: "Binding Affinity", key: "molecules_after_affinity", fallback: 80, description: "Describes binding strength for a molecule and target. Values here are illustrative, not computed or measured." },
  { name: "Binding / Unbinding Kinetics", key: "molecules_after_kinetics", fallback: 30, description: "Studies how quickly molecules bind and leave a target. Residence times in this prototype are sample values." },
  { name: "Free Energy Perturbation", key: "molecules_after_fep", fallback: 10, description: "A simulation method for estimating free-energy changes. This prototype does not perform FEP simulations." },
  { name: "Patent Screening", key: "final_candidates", fallback: 5, description: "Would compare structures and claims with patent information. Demo labels do not establish novelty or freedom to operate." },
];
export const metrics = [
  { key: "affinity", label: "Binding affinity", unit: "kcal/mol", description: "Illustrative binding score. More negative values rank first in the demo; this is not a measured affinity." },
  { key: "saScore", label: "SA score", unit: "", description: "Synthetic accessibility estimate. Lower demo scores represent easier synthesis; no synthesis calculation is performed here." },
  { key: "admet", label: "ADMET", unit: "", description: "Absorption, distribution, metabolism, excretion and toxicity. Sample status only." },
  { key: "residenceTime", label: "Residence time", unit: "hr", description: "Illustrative time a molecule remains bound. It has not been measured or simulated." },
  { key: "fep", label: "FEP", unit: "kcal/mol", description: "Sample free-energy value. No free-energy simulation has been run." },
  { key: "patent", label: "Patent status", unit: "", description: "Sample screening label, not a patent search or a legal conclusion." },
];
export const candidates = [
  { id: "Candidate-001", affinity: -9.4, saScore: 2.1, admet: "Pass", residenceTime: 4.8, fep: -2.7, patent: "Clear" },
  { id: "Candidate-002", affinity: -9.1, saScore: 2.4, admet: "Pass", residenceTime: 4.2, fep: -2.4, patent: "Clear" },
  { id: "Candidate-003", affinity: -8.9, saScore: 2.7, admet: "Pass", residenceTime: 3.9, fep: -2.2, patent: "Clear" },
  { id: "Candidate-004", affinity: -8.6, saScore: 3, admet: "Pass", residenceTime: 3.5, fep: -1.9, patent: "Review" },
  { id: "Candidate-005", affinity: -8.3, saScore: 3.2, admet: "Pass", residenceTime: 3.1, fep: -1.7, patent: "Review" },
];
export const formatMetric = (candidate, metric) => `${candidate[metric.key] ?? "N/A"}${candidate[metric.key] != null && metric.unit ? ` ${metric.unit}` : ""}`;

from .docking import run_docking
from .sa_score import run_sa_score
from .admet import run_admet
from .affinity import run_affinity
from .kinetics import run_kinetics
from .fep import run_fep
from .patent import run_patent_screening


def run_workflow(file_path):

    # 1. Chemical Space / Docking
    data = run_docking(file_path)

    # 2. Synthetic Accessibility
    data = run_sa_score(data)

    # 3. ADMET
    data = run_admet(data)

    # 4. Binding Affinity
    data = run_affinity(data)

    # 5. Binding / Unbinding Kinetics
    data = run_kinetics(data)

    # 6. Free Energy Perturbation
    data = run_fep(data)

    # 7. Patent Screening
    data = run_patent_screening(data)

    return data
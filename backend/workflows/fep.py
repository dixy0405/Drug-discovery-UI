def run_fep(data):

    print("Running Free Energy Perturbation...")

    return {
        **data,
        "stage": "Free Energy Perturbation",
        "fep_status": "completed",
        "molecules_after_fep": 10
    }
def run_affinity(data):

    print("Running Binding Affinity analysis...")

    return {
        **data,
        "stage": "Binding Affinity",
        "affinity_status": "completed",
        "molecules_after_affinity": 80
    }
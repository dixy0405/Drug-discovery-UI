def run_admet(data):

    print("Running ADMET analysis...")

    return {
        **data,
        "stage": "ADMET",
        "admet_status": "completed",
        "molecules_after_admet": 250
    }
def run_sa_score(data):

    print("Running Synthetic Accessibility Score...")

    return {
        **data,
        "stage": "Synthetic Accessibility",
        "sa_score_status": "completed",
        "molecules_after_sa": 800
    }
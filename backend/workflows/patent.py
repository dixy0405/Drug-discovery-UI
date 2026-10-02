def run_patent_screening(data):

    print("Running Patent Screening...")

    return {
        **data,
        "stage": "Patent Screening",
        "patent_status": "completed",
        "final_candidates": 5
    }
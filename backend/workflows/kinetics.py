def run_kinetics(data):

    print("Running Binding/Unbinding Kinetics...")

    return {
        **data,
        "stage": "Binding/Unbinding Kinetics",
        "kinetics_status": "completed",
        "molecules_after_kinetics": 30
    }
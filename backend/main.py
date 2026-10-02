from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pathlib import Path
import shutil

from workflows.workflow_manager import run_workflow


app = FastAPI(
    title="Drug Discovery API",
    description="Backend for computational drug discovery workflow",
    version="1.0.0"
)


# =========================================
# CORS
# =========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================
# DIRECTORIES
# =========================================

BASE_DIR = Path(__file__).resolve().parent

UPLOAD_DIR = BASE_DIR / "uploads"

UPLOAD_DIR.mkdir(exist_ok=True)


# =========================================
# HOME
# =========================================

@app.get("/")
def home():

    return {
        "message": "Drug Discovery API is running"
    }


# =========================================
# HEALTH
# =========================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy"
    }


# =========================================
# UPLOAD FILE
# =========================================

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    filename = file.filename

    filename_lower = filename.lower()

    # Check extension
    if (
        not filename_lower.endswith(".pdb")
        and not filename_lower.endswith(".sdf")
    ):
        return {
            "success": False,
            "message": "Only PDB and SDF files are supported."
        }

    # Read the uploaded file into memory
    file_content = await file.read()

    # Check whether the uploaded file is empty
    if not file_content:

        print(
            f"ERROR: Empty file received: {filename}"
        )

        return {
            "success": False,
            "message": "The selected file is empty. Please select a valid PDB or SDF file."
        }

    # Save file
    file_path = UPLOAD_DIR / filename

    with open(file_path, "wb") as buffer:
        buffer.write(file_content)

    # Verify saved file
    saved_size = file_path.stat().st_size

    print("--------------------------------")
    print(f"Uploaded file: {filename}")
    print(f"Received size: {len(file_content)} bytes")
    print(f"Saved size: {saved_size} bytes")
    print("--------------------------------")

    # Determine type
    if filename_lower.endswith(".pdb"):

        file_type = "PDB"
        description = "Protein Structure"

    else:

        file_type = "SDF"
        description = "Molecular Structure"

    return {
        "success": True,
        "filename": filename,
        "type": file_type,
        "description": description,
        "size": saved_size,
        "message": "File uploaded successfully."
    }


# =========================================
# GET MOLECULAR STRUCTURE
# =========================================

@app.get("/structure/{filename}")
def get_structure(filename: str):

    file_path = UPLOAD_DIR / filename


    # Security check

    if not file_path.exists():

        return {
            "success": False,
            "message": "Molecular structure file not found."
        }


    # Make sure it is PDB or SDF

    extension = file_path.suffix.lower()

    if extension not in [".pdb", ".sdf"]:

        return {
            "success": False,
            "message": "Unsupported molecular file format."
        }


    print(
        f"Serving molecular structure: {file_path}"
    )


    return FileResponse(
        path=file_path,
        filename=file_path.name
    )


# =========================================
# START WORKFLOW
# =========================================

@app.post("/workflow/start")
async def start_workflow(
    file: UploadFile = File(...)
):

    filename = file.filename

    filename_lower = filename.lower()

    if (
        not filename_lower.endswith(".pdb")
        and not filename_lower.endswith(".sdf")
    ):

        return {
            "success": False,
            "message": "Only PDB and SDF files are supported."
        }


    file_path = UPLOAD_DIR / filename


    # =========================================
    # DO NOT OVERWRITE THE FILE
    # =========================================

    if not file_path.exists():

        return {
            "success": False,
            "message": "File was not uploaded. Please upload the file first."
        }


    file_size = file_path.stat().st_size


    if file_size == 0:

        return {
            "success": False,
            "message": "The molecular file is empty. Please upload a valid PDB or SDF file."
        }


    print(
        f"Starting workflow for: {filename}"
    )

    print(
        f"Using existing file: {file_path}"
    )

    print(
        f"File size: {file_size} bytes"
    )


    # =========================================
    # RUN WORKFLOW USING EXISTING FILE
    # =========================================

    results = run_workflow(
        file_path
    )


    return {

        "success": True,

        "filename": filename,

        "results": results

    }
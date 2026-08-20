from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.pipeline.excel_parser import process_spatial_ingestion
from app.models.raw_data import IngestionResult

app = FastAPI(title="Product Catalog Enrichment Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/stage1/ingest", response_model=IngestionResult)
async def ingest_spreadsheet(file: UploadFile = File(...)):
    if not (file.filename.endswith(".xlsx") or file.filename.endswith(".xls") or file.filename.endswith(".csv")):
        raise HTTPException(status_code=400, detail="Invalid file format. Upload .xlsx, .xls, or .csv")

    content = await file.read()
    try:
        result = process_spatial_ingestion(content, file.filename)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")

@app.get("/health")
async def health():
    return {"status": "healthy", "stage": 1}
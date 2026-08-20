from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

class RawIngestItem(BaseModel):
    row_index: int
    raw_record: Dict[str, Any]
    cleaned_record: Dict[str, Optional[str]]
    detected_mfr: Optional[str] = None
    detected_mpn: Optional[str] = None
    detected_desc: Optional[str] = None
    cleansed_vendor: Optional[str] = None

class IngestionResult(BaseModel):
    filename: str
    total_rows: int
    header_row_index: int
    detected_columns: List[str]
    records: List[RawIngestItem]
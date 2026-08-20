import re
from typing import Optional

PLACEHOLDER_REGEX = re.compile(
    r"^\s*("
    r"--\s*unbranded\s*--|"
    r"--\s*no\s+.*?\s*--|"
    r"n/a|na|none|null|nil|-|--|/|\?|\.{2,}|placeholder|tbd|unknown"
    r")\s*$",
    re.IGNORECASE
)

VENDOR_SUFFIX_REGEX = re.compile(r"\s*[\(\[\{]\s*\d+\s*[\)\]\}]\s*|\s*#\s*\d+\s*$")

def mask_placeholder(val: any) -> Optional[str]:
    if val is None:
        return None
    
    text = str(val).strip()
    if not text or PLACEHOLDER_REGEX.match(text):
        return None
    return text

def clean_vendor_name(vendor: Optional[str]) -> Optional[str]:
    if not vendor:
        return None
    cleaned = VENDOR_SUFFIX_REGEX.sub("", vendor).strip()
    return cleaned if cleaned else None
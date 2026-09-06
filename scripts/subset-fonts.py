"""Optional authoring step: pip install fonttools brotli; python scripts/subset-fonts.py.

Checked-in subsets need no Python during normal development, builds, or deployment.
Source font files remain intact. Playfair retains Latin languages, punctuation,
all variable weights and OpenType layout features; Brodia is only used for R.
"""
from pathlib import Path
from fontTools import subset

root = Path(__file__).resolve().parent.parent / "app" / "fonts"
output = root / "subsets"
output.mkdir(exist_ok=True)
for filename, unicodes in [
    ("PlayfairDisplay-wght.woff2", "U+0020-007E,U+00A0-024F,U+1E00-1EFF,U+2000-206F,U+20AC"),
    ("Brodia-Slant.woff2", "U+0052"),
]:
    subset.main([
        str(root / filename), f"--output-file={output / filename}",
        "--flavor=woff2", f"--unicodes={unicodes}", "--layout-features=*",
        "--notdef-glyph", "--notdef-outline", "--recommended-glyphs",
    ])
    print(f"{filename}: {(root / filename).stat().st_size} → {(output / filename).stat().st_size} bytes")

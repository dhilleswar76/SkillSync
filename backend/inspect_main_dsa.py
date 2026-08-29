import zipfile
import xml.etree.ElementTree as ET

xlsx_path = "DSA problems patternwise.xlsx"

with zipfile.ZipFile(xlsx_path) as z:
    shared_strings = []
    if "xl/sharedStrings.xml" in z.namelist():
        tree = ET.fromstring(z.read("xl/sharedStrings.xml"))
        for si in tree.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si') or tree.findall('.//si'):
            text_pieces = []
            for t in si.iter():
                if t.tag.endswith('t') and t.text:
                    text_pieces.append(t.text)
            shared_strings.append("".join(text_pieces))

    sheet_fn = "xl/worksheets/sheet1.xml"
    stree = ET.fromstring(z.read(sheet_fn))
    
    rows = []
    for row in stree.iter():
        if row.tag.endswith('row'):
            cells = []
            for c in row.iter():
                if c.tag.endswith('c'):
                    c_type = c.attrib.get('t')
                    v = None
                    for child in c:
                        if child.tag.endswith('v'):
                            v = child.text
                            break
                    val = ""
                    if v is not None:
                        if c_type == 's' and int(v) < len(shared_strings):
                            val = shared_strings[int(v)]
                        else:
                            val = v
                    cells.append(val.strip())
            if any(cells):
                rows.append(cells)

    print(f"Total rows in 'Main DSA': {len(rows)}")
    for r in rows[:25]:
        print(r)

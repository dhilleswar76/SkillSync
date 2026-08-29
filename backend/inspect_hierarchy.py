import zipfile
import xml.etree.ElementTree as ET
import json

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

    sheet_fn = "xl/worksheets/sheet2.xml"
    stree = ET.fromstring(z.read(sheet_fn))
    
    topics = {}
    current_topic = "Array"
    current_pattern = "Two-Pointer"

    for row in stree.iter():
        if row.tag.endswith('row'):
            row_idx = row.attrib.get('r')
            if row_idx == '1': continue
            
            cells = {}
            for c in row.iter():
                if c.tag.endswith('c'):
                    ref = c.attrib.get('r')
                    col_letter = "".join([ch for ch in ref if ch.isalpha()])
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
                    cells[col_letter] = val.strip()

            t = cells.get('A', '')
            p = cells.get('B', '')
            prob = cells.get('C', '')

            if t: current_topic = t.replace("\ufffd", "'").replace("Kadanes", "Kadane's").strip()
            if p: current_pattern = p.replace("\ufffd", "'").strip()

            if prob:
                if current_topic not in topics:
                    topics[current_topic] = {}
                if current_pattern not in topics[current_topic]:
                    topics[current_topic][current_pattern] = []
                topics[current_topic][current_pattern].append(prob)

    print("Topics and their Sub-modules (Patterns):")
    for t_name, patterns in topics.items():
        total_p = sum(len(probs) for probs in patterns.values())
        print(f"\n[TOPIC] {t_name} ({total_p} problems, {len(patterns)} submodules):")
        for p_name, probs in patterns.items():
            print(f"   [SUBMODULE] {p_name} ({len(probs)} problems)")

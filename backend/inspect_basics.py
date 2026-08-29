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

    # Read sheets
    # 1. Sheet 'Basics' (sheet2.xml)
    # 2. Sheet 'Main DSA' (sheet1.xml)
    wb_tree = ET.fromstring(z.read("xl/workbook.xml"))
    sheet_map = {}
    for s in wb_tree.iter():
        if s.tag.endswith('sheet'):
            s_name = s.attrib.get('name')
            s_id = s.attrib.get('sheetId')
            sheet_map[s_name] = s_id

    print("Sheet map:", sheet_map)

    # Let's inspect all rows of 'Basics'
    sheet_fn = f"xl/worksheets/sheet{sheet_map.get('Basics', '2')}.xml"
    rel_fn = sheet_fn.replace("worksheets/", "worksheets/_rels/") + ".rels"
    hyperlinks_map = {}
    if rel_fn in z.namelist():
        rel_tree = ET.fromstring(z.read(rel_fn))
        for rel in rel_tree.iter():
            if rel.tag.endswith('Relationship'):
                hyperlinks_map[rel.attrib.get('Id')] = rel.attrib.get('Target')
    
    stree = ET.fromstring(z.read(sheet_fn))
    cell_hyperlinks = {}
    for hl in stree.iter():
        if hl.tag.endswith('hyperlink'):
            c_ref = hl.attrib.get('ref')
            r_id = hl.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
            if c_ref and r_id in hyperlinks_map:
                cell_hyperlinks[c_ref] = hyperlinks_map[r_id]

    # Collect all topics & patterns
    all_problems = []
    current_topic = "General DSA"
    current_pattern = "General"

    for row in stree.iter():
        if row.tag.endswith('row'):
            row_idx = row.attrib.get('r')
            if row_idx == '1': continue # Header
            
            cells = {}
            for c in row.iter():
                if c.tag.endswith('c'):
                    ref = c.attrib.get('r') # e.g. A2, B2, C2, D2, E2
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
                    link = cell_hyperlinks.get(ref, "")
                    cells[col_letter] = (val.strip(), link)

            topic_val = cells.get('A', ('', ''))[0]
            pattern_val = cells.get('B', ('', ''))[0]
            prob_val = cells.get('C', ('', ''))[0]
            lc_link = cells.get('D', ('', ''))[0] or cells.get('D', ('', ''))[1]
            gfg_link = cells.get('E', ('', ''))[0] or cells.get('E', ('', ''))[1]

            if topic_val:
                current_topic = topic_val
            if pattern_val:
                current_pattern = pattern_val

            if prob_val:
                all_problems.append({
                    "topic": current_topic,
                    "pattern": current_pattern,
                    "title": prob_val,
                    "leetcode": lc_link,
                    "gfg": gfg_link
                })

    print(f"Total problems extracted from 'Basics': {len(all_problems)}")
    # Group by Topic & Pattern
    topics_summary = {}
    for p in all_problems:
        key = f"{p['topic']} - {p['pattern']}" if p['pattern'] and p['pattern'] != p['topic'] else p['topic']
        topics_summary[key] = topics_summary.get(key, 0) + 1

    print("\nTopics & Patterns Summary:")
    for k, v in list(topics_summary.items())[:30]:
        print(f"  {k}: {v} problems")

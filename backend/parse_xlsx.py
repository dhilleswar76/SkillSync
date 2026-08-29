import zipfile
import xml.etree.ElementTree as ET
import json
import re
import os

xlsx_path = "DSA problems patternwise.xlsx"

with zipfile.ZipFile(xlsx_path) as z:
    # 1. Read shared strings
    shared_strings = []
    if "xl/sharedStrings.xml" in z.namelist():
        tree = ET.fromstring(z.read("xl/sharedStrings.xml"))
        # namespaces
        ns = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        for si in tree.findall('.//{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si') or tree.findall('.//si'):
            # Text can be in <t> or multiple <r><t>
            text_pieces = []
            for t in si.iter():
                if t.tag.endswith('t') and t.text:
                    text_pieces.append(t.text)
            shared_strings.append("".join(text_pieces))

    print(f"Total shared strings: {len(shared_strings)}")
    print("Sample shared strings:", shared_strings[:20])

    # 2. Read workbook.xml to get sheet names
    wb_tree = ET.fromstring(z.read("xl/workbook.xml"))
    sheets = []
    for s in wb_tree.iter():
        if s.tag.endswith('sheet'):
            sheets.append((s.attrib.get('name'), s.attrib.get('sheetId'), s.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')))
    print(f"Sheets in workbook: {sheets}")

    # 3. Read worksheets
    for name, s_id, r_id in sheets:
        sheet_filename = f"xl/worksheets/sheet{s_id}.xml"
        if sheet_filename not in z.namelist():
            # Try finding by index
            sheet_files = [f for f in z.namelist() if f.startswith("xl/worksheets/sheet") and f.endswith(".xml")]
            sheet_filename = sheet_files[int(s_id)-1] if int(s_id)-1 < len(sheet_files) else sheet_files[0]
        
        # Check hyperlinks
        rel_filename = sheet_filename.replace("worksheets/", "worksheets/_rels/") + ".rels"
        hyperlinks_map = {}
        if rel_filename in z.namelist():
            rel_tree = ET.fromstring(z.read(rel_filename))
            for rel in rel_tree.iter():
                if rel.tag.endswith('Relationship'):
                    r_id_attr = rel.attrib.get('Id')
                    target = rel.attrib.get('Target')
                    if r_id_attr and target:
                        hyperlinks_map[r_id_attr] = target
        
        sheet_tree = ET.fromstring(z.read(sheet_filename))
        
        # Link r:id to cell reference
        cell_hyperlinks = {}
        for hl in sheet_tree.iter():
            if hl.tag.endswith('hyperlink'):
                cell_ref = hl.attrib.get('ref')
                r_id_hl = hl.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
                if cell_ref and r_id_hl and r_id_hl in hyperlinks_map:
                    cell_hyperlinks[cell_ref] = hyperlinks_map[r_id_hl]

        rows_data = []
        for row in sheet_tree.iter():
            if row.tag.endswith('row'):
                row_idx = row.attrib.get('r')
                cells = []
                for c in row.iter():
                    if c.tag.endswith('c'):
                        cell_ref = c.attrib.get('r')
                        cell_type = c.attrib.get('t')
                        v_tag = None
                        for child in c:
                            if child.tag.endswith('v'):
                                v_tag = child.text
                                break
                        
                        val = ""
                        if v_tag is not None:
                            if cell_type == 's' and int(v_tag) < len(shared_strings):
                                val = shared_strings[int(v_tag)]
                            else:
                                val = v_tag
                        
                        link = cell_hyperlinks.get(cell_ref, "")
                        cells.append((cell_ref, val, link))
                if cells:
                    rows_data.append((row_idx, cells))

        print(f"\n--- Sheet: {name} ({len(rows_data)} rows) ---")
        for r_idx, cells in rows_data[:15]:
            print(f"Row {r_idx}: {[c[1] for c in cells]}")
            # print links if any
            links_in_row = [c[2] for c in cells if c[2]]
            if links_in_row:
                print(f"   Links: {links_in_row}")

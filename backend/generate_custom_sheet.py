import zipfile
import xml.etree.ElementTree as ET
import json
import re

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

    wb_tree = ET.fromstring(z.read("xl/workbook.xml"))
    sheet_map = {}
    for s in wb_tree.iter():
        if s.tag.endswith('sheet'):
            s_name = s.attrib.get('name')
            s_id = s.attrib.get('sheetId')
            sheet_map[s_name] = s_id

    # Parse 'Basics' sheet (contains 382 pattern-wise problems with links)
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

    categories_dict = {}
    current_topic = "Array"
    current_pattern = "Two-Pointer"

    prob_counter = 1

    for row in stree.iter():
        if row.tag.endswith('row'):
            row_idx = row.attrib.get('r')
            if row_idx == '1': continue # Header
            
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
                    link = cell_hyperlinks.get(ref, "")
                    cells[col_letter] = (val.strip(), link)

            topic_val = cells.get('A', ('', ''))[0]
            pattern_val = cells.get('B', ('', ''))[0]
            prob_val = cells.get('C', ('', ''))[0]
            lc_link = cells.get('D', ('', ''))[1] or cells.get('D', ('', ''))[0]
            gfg_link = cells.get('E', ('', ''))[1] or cells.get('E', ('', ''))[0]

            if topic_val:
                current_topic = topic_val
            if pattern_val:
                current_pattern = pattern_val

            if prob_val:
                # Clean up category name
                clean_topic = current_topic.replace("\ufffd", "'").replace("Kadanes", "Kadane's").strip()
                clean_pattern = current_pattern.replace("\ufffd", "'").strip()
                cat_name = f"{clean_topic}: {clean_pattern}" if clean_pattern and clean_pattern.lower() != clean_topic.lower() else clean_topic
                
                # Determine difficulty estimation
                p_lower = prob_val.lower()
                diff = "medium"
                if any(w in p_lower for w in ["easy", "two sum", "reverse", "palindrome", "move zero", "max consecutive", "count", "valid", "basic", "binary search", "middle", "delete"]):
                    diff = "easy"
                elif any(w in p_lower for w in ["hard", "trapping", "median", "sliding window maximum", "n-queens", "edit distance", "burst", "alien", "serialize", "merge k"]):
                    diff = "hard"

                primary_link = lc_link if lc_link.startswith("http") else (gfg_link if gfg_link.startswith("http") else "https://leetcode.com/problemset/all/")
                platform = "leetcode" if "leetcode" in primary_link else ("gfg" if "geeksforgeeks" in primary_link else "leetcode")

                starter = "// Solution for: " + prob_val + " (" + clean_pattern + ")\nfunction solve() {\n  // Write your solution here\n}"

                prob_obj = {
                    "id": f"custom-{prob_counter}",
                    "title": prob_val,
                    "topic": clean_topic,
                    "pattern": clean_pattern,
                    "difficulty": diff,
                    "platform": platform,
                    "link": primary_link,
                    "gfgLink": gfg_link if gfg_link.startswith("http") else "",
                    "description": f"Problem '{prob_val}' under pattern '{clean_pattern}' in '{clean_topic}'. Practice on {platform.upper()} or solve directly inside the built-in Monaco workspace.",
                    "solutionHint": f"Apply the {clean_pattern} algorithmic technique to achieve optimal time and space complexity.",
                    "starterCode": starter
                }

                if cat_name not in categories_dict:
                    categories_dict[cat_name] = []
                categories_dict[cat_name].append(prob_obj)
                prob_counter += 1

    formatted_categories = []
    for cat_name, probs in categories_dict.items():
        formatted_categories.append({
            "category": cat_name,
            "problems": probs
        })

    print(f"Generated {len(formatted_categories)} categories with total {prob_counter - 1} problems.")

    # Write to JavaScript file
    js_content = "// Generated from DSA problems patternwise.xlsx\nexport const patternWiseCustomData = " + json.dumps(formatted_categories, indent=2) + ";\n"
    
    with open("frontend/src/data/sheets/patternWiseCustom.js", "w", encoding="utf-8") as f:
        f.write(js_content)

    print("Saved frontend/src/data/sheets/patternWiseCustom.js successfully!")

import zipfile
import xml.etree.ElementTree as ET
import json

xlsx_path = "DSA problems patternwise.xlsx"

TOPIC_ICONS = {
    "Array": "📊",
    "Strings": "🔤",
    "Binary Search": "🔍",
    "Stack": "🥞",
    "Recursion": "🔄",
    "Linked List": "🔗",
    "Double Linked List": "↔️",
    "HashMap": "🗺️",
    "Heap": "⛰️",
    "Tree": "🌳",
    "Binary Search Tree": "🌲",
    "Graph": "🕸️",
    "Backtracking": "🧩",
    "Greedy": "🎯",
    "Dynamic Programming": "⚡",
    "Trie": "🎋",
    "Bit Manipulation": "🔢"
}

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

    topics_dict = {}
    current_topic = "Array"
    current_pattern = "Two-Pointer"
    prob_counter = 1

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
                    link = cell_hyperlinks.get(ref, "")
                    cells[col_letter] = (val.strip(), link)

            t_val = cells.get('A', ('', ''))[0]
            p_val = cells.get('B', ('', ''))[0]
            prob_val = cells.get('C', ('', ''))[0]
            lc_link = cells.get('D', ('', ''))[1] or cells.get('D', ('', ''))[0]
            gfg_link = cells.get('E', ('', ''))[1] or cells.get('E', ('', ''))[0]

            if t_val:
                current_topic = t_val.replace("\ufffd", "'").replace("Kadanes", "Kadane's").strip()
            if p_val:
                current_pattern = p_val.replace("\ufffd", "'").strip()

            if prob_val:
                p_lower = prob_val.lower()
                diff = "medium"
                if any(w in p_lower for w in ["easy", "two sum", "reverse", "palindrome", "move zero", "max consecutive", "count", "valid", "basic", "binary search", "middle", "delete"]):
                    diff = "easy"
                elif any(w in p_lower for w in ["hard", "trapping", "median", "sliding window maximum", "n-queens", "edit distance", "burst", "alien", "serialize", "merge k"]):
                    diff = "hard"

                primary_link = lc_link if lc_link.startswith("http") else (gfg_link if gfg_link.startswith("http") else "https://leetcode.com/problemset/all/")
                platform = "leetcode" if "leetcode" in primary_link else ("gfg" if "geeksforgeeks" in primary_link else "leetcode")

                starter = "// Solution for: " + prob_val + " (" + current_pattern + ")\nfunction solve() {\n  // Write your solution here\n}"

                prob_obj = {
                    "id": f"custom-{prob_counter}",
                    "title": prob_val,
                    "topic": current_topic,
                    "pattern": current_pattern,
                    "difficulty": diff,
                    "platform": platform,
                    "link": primary_link,
                    "gfgLink": gfg_link if gfg_link.startswith("http") else "",
                    "description": f"Problem '{prob_val}' under pattern '{current_pattern}' in topic '{current_topic}'. Practice on {platform.upper()} or solve directly inside the built-in Monaco workspace.",
                    "solutionHint": f"Apply the {current_pattern} algorithmic technique to achieve optimal time and space complexity.",
                    "starterCode": starter
                }

                if current_topic not in topics_dict:
                    topics_dict[current_topic] = {}
                if current_pattern not in topics_dict[current_topic]:
                    topics_dict[current_topic][current_pattern] = []
                topics_dict[current_topic][current_pattern].append(prob_obj)
                prob_counter += 1

    nested_categories = []
    for t_name, patterns in topics_dict.items():
        submodules_list = []
        all_topic_problems = []
        for p_name, probs in patterns.items():
            submodules_list.append({
                "name": p_name,
                "problems": probs
            })
            all_topic_problems.extend(probs)
        
        icon = TOPIC_ICONS.get(t_name, "📁")
        nested_categories.append({
            "category": t_name,
            "topic": t_name,
            "icon": icon,
            "submodules": submodules_list,
            "problems": all_topic_problems # provides backward compatibility for flat lookups
        })

    js_content = "// Generated from DSA problems patternwise.xlsx with nested Topic -> Submodule (Pattern) -> Problems structure\nexport const patternWiseCustomData = " + json.dumps(nested_categories, indent=2) + ";\n"

    with open("frontend/src/data/sheets/patternWiseCustom.js", "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"Successfully generated {len(nested_categories)} topics with total {prob_counter - 1} problems in nested structure.")

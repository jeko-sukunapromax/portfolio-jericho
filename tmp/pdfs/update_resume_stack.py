from pathlib import Path
import json
import pymupdf as fitz


ROOT = Path(r"C:\portfolio-jericho")
SOURCE = Path(
    r"C:\Users\EXOUSIA\.t3\userdata\attachments\e63a9a8e-f2d2-4936-8177-889c80af7960-357355c4-80bf-4b7f-a5a6-a21eaa0c11d7-pdf.pdf"
)
OUTPUT = ROOT / "output/pdf/Jericho-Ivan-Villamor-Resume-Updated.pdf"
HEADSHOT = ROOT / "output/imagegen/jericho-resume-headshot.png"
OBJECTIVE = (
    "IT professional focused on building practical, reliable software that solves real-world "
    "problems, improves everyday processes, and meets the evolving needs of people, "
    "businesses, and communities."
)
ROWS = [
    (
        "Frontend",
        "HTML5, CSS3, JavaScript, TypeScript, React, Tailwind CSS, Blade, Livewire, Chart.js.",
    ),
    (
        "Backend",
        "PHP, Laravel, Node.js, discord.js, Webhooks, Laravel Sanctum, Laravel Jetstream, RBAC, Eloquent ORM, CRUD Operations.",
    ),
    (
        "Databases",
        "SQL, MySQL, PostgreSQL, SQLite, Cloudflare D1.",
    ),
    (
        "AI & Automation",
        "Claude Code (Advanced), Codex, Antigravity, n8n, Prompt Engineering, RAG, Playwright, chromedp, Selenium.",
    ),
    (
        "Cloud & DevOps",
        "Railway, Docker, Docker Compose, GitHub Actions, CI/CD Pipelines, Cloudflare Workers, Wrangler, Windows Server, Linux.",
    ),
    (
        "Tools & Platforms",
        "Git/GitHub, Vite, npm, Composer, Postman, VS Code, XAMPP.",
    ),
    (
        "Networking & Security",
        "Routing, Switching, Wireless Essentials, Network Automation, Cybersecurity.",
    ),
    (
        "Salesforce Training",
        "Salesforce, Apex, Lightning Web Components (LWC).",
    ),
]


def main():
    document = fitz.open(SOURCE)
    matches = [page.number for page in document if page.search_for("TECHNICAL STACK")]
    assert len(matches) == 1, "Expected exactly one Technical Stack section."
    page = document[matches[0]]
    assert page.number == 0, "The inspected stack section should be on page 1."
    training_shift = 32.0
    training_spans = [
        span
        for block in page.get_text("dict")["blocks"]
        for line in block.get("lines", [])
        for span in line["spans"]
        if span["bbox"][1] >= 687 and span["text"].strip()
    ]
    training_rules = [
        drawing for drawing in page.get_drawings()
        if drawing["rect"].y0 >= 687
    ]

    normal_path = Path(r"C:\Windows\Fonts\arial.ttf")
    bold_path = Path(r"C:\Windows\Fonts\arialbd.ttf")
    normal = fitz.Font(fontfile=str(normal_path))
    bold = fitz.Font(fontfile=str(bold_path))
    objective_lines = []
    objective_line = ""
    for word in OBJECTIVE.split():
        candidate = f"{objective_line} {word}" if objective_line else word
        if normal.text_length(candidate, fontsize=12) > 526.8 - 72.024:
            assert objective_line, f"An objective word does not fit: {word}"
            objective_lines.append(objective_line)
            objective_line = word
        else:
            objective_line = candidate
    objective_lines.append(objective_line)
    assert len(objective_lines) <= 3, "Objective exceeds its original space."
    size = 9.5
    left = 79.704
    right = 523.0
    leading = 12.0
    row_gap = 4.0
    baseline = 557.0
    planned_lines = []
    for label, value in ROWS:
        label_text = label + ": "
        label_width = bold.text_length(label_text, fontsize=size)
        text_x = left + label_width
        text_line = ""
        first = True
        for word in value.split():
            candidate = f"{text_line} {word}" if text_line else word
            if normal.text_length(candidate, fontsize=size) > right - text_x:
                assert text_line, f"A word does not fit: {word}"
                planned_lines.append((baseline, label_text if first else None, text_x, text_line))
                baseline += leading
                first = False
                text_line = word
            else:
                text_line = candidate
        planned_lines.append((baseline, label_text if first else None, text_x, text_line))
        baseline += leading + row_gap

    last_baseline = planned_lines[-1][0]
    assert last_baseline + 3 < 715.0, f"Stack exceeds the available space: {last_baseline}"

    change_area = fitz.Rect(70.6, 547.0, 525.1, 715.0)
    training_area = fitz.Rect(70.0, 687.0, 526.0, 780.0)
    objective_area = fitz.Rect(71.5, 173.0, 528.0, 217.0)
    page.add_redact_annot(change_area, fill=(1, 1, 1))
    page.add_redact_annot(objective_area, fill=(1, 1, 1))
    page.add_redact_annot(training_area, fill=(1, 1, 1))
    page.apply_redactions(images=0, graphics=1)
    page.insert_font(fontname="JVArial", fontfile=str(normal_path), set_simple=True)
    page.insert_font(fontname="JVArialBold", fontfile=str(bold_path), set_simple=True)
    for line_index, line in enumerate(objective_lines):
        page.insert_text(
            (72.024, 185.09 + 13.92 * line_index),
            line,
            fontname="JVArial",
            fontsize=12,
        )
    for y, label, x, body in planned_lines:
        if label:
            page.insert_text((left, y), label, fontname="JVArialBold", fontsize=size)
        page.insert_text((x, y), body, fontname="JVArial", fontsize=size)

    for span in training_spans:
        x, y = span["origin"]
        y += training_shift
        if span["font"] == "SymbolMT":
            page.draw_circle((x + 2.3, y - 3.0), 1.5, color=None, fill=(0, 0, 0))
        else:
            page.insert_text(
                (x, y),
                span["text"],
                fontname="JVArialBold" if "Bold" in span["font"] else "JVArial",
                fontsize=span["size"],
            )
    for drawing in training_rules:
        area = drawing["rect"]
        page.draw_rect(
            fitz.Rect(area.x0, area.y0 + training_shift, area.x1, area.y1 + training_shift),
            color=None,
            fill=drawing.get("fill") or (0, 0, 0),
        )

    portrait_images = [
        item for item in page.get_image_info(xrefs=True)
        if item["xref"] > 0 and item["bbox"][0] > 450 and item["bbox"][3] < 150
    ]
    assert len(portrait_images) == 1, "Expected exactly one resume portrait."
    page.replace_image(portrait_images[0]["xref"], filename=str(HEADSHOT))
    page.clean_contents()

    metadata = document.metadata
    metadata["title"] = "Jericho Ivan Villamor - Resume"
    document.set_metadata(metadata)
    blank_pages_removed = 0
    while len(document) > 1:
        last = document[-1]
        if last.get_text().strip() or last.get_image_info() or last.get_drawings() or last.first_annot:
            break
        document.delete_page(len(document) - 1)
        blank_pages_removed += 1
    document.subset_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    document.save(str(OUTPUT), garbage=4, deflate=True)
    document.close()

    edited = fitz.open(OUTPUT)
    original = fitz.open(SOURCE)
    assert len(edited) == len(original) - blank_pages_removed, "Unexpected page count."
    expected = ["TypeScript", "React", "Node.js", "RAG", "Docker Compose", "GitHub Actions", "Salesforce Training"]
    text = edited[0].get_text(sort=True)
    for term in expected:
        assert term in text, f"Missing expected stack item: {term}"
    assert OBJECTIVE in " ".join(text.split()), "The updated objective is incomplete."
    assert "aiming to secure an internship" not in text, "Old objective remains."

    for page_index in range(len(edited)):
        before = original[page_index].get_pixmap(alpha=False)
        after = edited[page_index].get_pixmap(alpha=False)
        assert (before.width, before.height) == (after.width, after.height)
        if page_index != matches[0]:
            assert before.samples == after.samples, f"Unrelated page {page_index + 1} changed visually."
            continue
        original_pixels = before.samples
        edited_pixels = after.samples
        pixel_width = before.n
        for y in range(before.height):
            start = y * before.stride
            end = start + before.stride
            if 24 <= y <= 140:
                left_end = start + 470 * pixel_width
                right_start = start + 575 * pixel_width
                assert original_pixels[start:left_end] == edited_pixels[start:left_end]
                assert original_pixels[right_start:end] == edited_pixels[right_start:end]
            elif 171 <= y <= 219:
                left_end = start + 70 * pixel_width
                right_start = start + 530 * pixel_width
                assert original_pixels[start:left_end] == edited_pixels[start:left_end]
                assert original_pixels[right_start:end] == edited_pixels[right_start:end]
            elif 545 <= y <= 803:
                left_end = start + 68 * pixel_width
                right_start = start + 528 * pixel_width
                assert original_pixels[start:left_end] == edited_pixels[start:left_end]
                assert original_pixels[right_start:end] == edited_pixels[right_start:end]
            else:
                assert original_pixels[start:end] == edited_pixels[start:end], f"Unexpected change outside edited sections at row {y}."

    print(json.dumps({
        "output": str(OUTPUT),
        "pages": len(edited),
        "blank_pages_removed": blank_pages_removed,
        "objective_lines": len(objective_lines),
        "headshot": str(HEADSHOT),
        "stack_lines": len(planned_lines),
        "last_baseline": round(last_baseline, 2),
        "other_content": "visually unchanged",
        "size_bytes": OUTPUT.stat().st_size,
    }))


if __name__ == "__main__":
    main()

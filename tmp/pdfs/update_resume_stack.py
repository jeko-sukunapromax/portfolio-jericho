from pathlib import Path
import json
import pymupdf as fitz


ROOT = Path(r"C:\portfolio-jericho")
SOURCE = Path(
    r"C:\Users\EXOUSIA\.t3\userdata\attachments\e63a9a8e-f2d2-4936-8177-889c80af7960-357355c4-80bf-4b7f-a5a6-a21eaa0c11d7-pdf.pdf"
)
OUTPUT = ROOT / "output/pdf/Jericho-Ivan-Villamor-Resume-Updated.pdf"
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

    normal_path = Path(r"C:\Windows\Fonts\arial.ttf")
    bold_path = Path(r"C:\Windows\Fonts\arialbd.ttf")
    normal = fitz.Font(fontfile=str(normal_path))
    bold = fitz.Font(fontfile=str(bold_path))
    size = 9.12
    left = 79.704
    right = 523.0
    leading = 10.6
    row_gap = 2.0
    baseline = 555.5
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
                text_x = left
                text_line = word
            else:
                text_line = candidate
        planned_lines.append((baseline, label_text if first else None, text_x, text_line))
        baseline += leading + row_gap

    last_baseline = planned_lines[-1][0]
    assert last_baseline + 3 < 684.5, f"Stack exceeds the available space: {last_baseline}"

    change_area = fitz.Rect(70.6, 547.0, 525.1, 684.5)
    page.add_redact_annot(change_area, fill=(1, 1, 1))
    page.apply_redactions(images=0, graphics=0)
    page.insert_font(fontname="JVArial", fontfile=str(normal_path), set_simple=True)
    page.insert_font(fontname="JVArialBold", fontfile=str(bold_path), set_simple=True)
    for y, label, x, body in planned_lines:
        if label:
            page.insert_text((left, y), label, fontname="JVArialBold", fontsize=size)
        page.insert_text((x, y), body, fontname="JVArial", fontsize=size)

    metadata = document.metadata
    metadata["title"] = "Jericho Ivan Villamor - Resume"
    document.set_metadata(metadata)
    document.subset_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    document.save(str(OUTPUT), garbage=4, deflate=True)
    document.close()

    edited = fitz.open(OUTPUT)
    original = fitz.open(SOURCE)
    assert len(edited) == len(original), "Page count changed."
    expected = ["TypeScript", "React", "Node.js", "RAG", "Docker Compose", "GitHub Actions", "Salesforce Training"]
    text = edited[0].get_text(sort=True)
    for term in expected:
        assert term in text, f"Missing expected stack item: {term}"

    for page_index in range(len(original)):
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
            if 545 <= y <= 686:
                left_end = start + 68 * pixel_width
                right_start = start + 528 * pixel_width
                assert original_pixels[start:left_end] == edited_pixels[start:left_end]
                assert original_pixels[right_start:end] == edited_pixels[right_start:end]
            else:
                assert original_pixels[start:end] == edited_pixels[start:end], f"Unexpected change outside the stack at row {y}."

    print(json.dumps({
        "output": str(OUTPUT),
        "pages": len(edited),
        "stack_lines": len(planned_lines),
        "last_baseline": round(last_baseline, 2),
        "other_content": "visually unchanged",
        "size_bytes": OUTPUT.stat().st_size,
    }))


if __name__ == "__main__":
    main()

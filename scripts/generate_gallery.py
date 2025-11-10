#!/usr/bin/env python3
"""
generate_gallery.py

Small utility to regenerate the gallery grid in index.html from the files
found in the images/ directory. Keeps an alphabetical order and supports
common image extensions. It replaces the contents inside the
`<div class="gallery-grid">` ... `</div>` block.

Usage:
  python3 scripts/generate_gallery.py

Options:
  --images-dir PATH   (default: images)
  --index PATH        (default: index.html)

This is intentionally simple and edits `index.html` in place.
"""
import os
import sys
import argparse
import re


def is_image_file(name: str) -> bool:
    lower = name.lower()
    return lower.endswith(('.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'))


GALLERY_START = r"<div class=\"gallery-grid\">"
GALLERY_END = r"</div>"


def build_gallery_html(images_dir: str):
    names = [n for n in os.listdir(images_dir) if is_image_file(n)]
    names.sort(key=lambda s: s.lower())
    items = []
    for n in names:
        # escape any HTML-sensitive characters in filename (simple)
        src = os.path.join('images', n).replace('\\', '/')
        alt = os.path.splitext(n)[0]
        items.append(f'            <div class="gallery-item"><img src="{src}" alt="{alt}"></div>')
    return "\n".join(items)


def regenerate_index(index_path: str, images_dir: str):
    with open(index_path, 'r', encoding='utf-8') as f:
        text = f.read()

    # find the gallery-grid block
    pattern = re.compile(r'(<div class="gallery-grid">)(.*?)(</div>)', re.S)
    m = pattern.search(text)
    if not m:
        print('Could not find <div class="gallery-grid"> block in', index_path)
        return False

    start, old_content, end = m.group(1), m.group(2), m.group(3)
    new_inner = '\n' + build_gallery_html(images_dir) + '\n        '
    new_block = start + new_inner + end

    new_text = text[:m.start()] + new_block + text[m.end():]
    backup = index_path + '.bak'
    with open(backup, 'w', encoding='utf-8') as bf:
        bf.write(text)
    with open(index_path, 'w', encoding='utf-8') as of:
        of.write(new_text)

    print(f'Updated {index_path} from images in {images_dir} (backup saved to {backup})')
    return True


def main(argv=None):
    p = argparse.ArgumentParser(description='Regenerate gallery in index.html from images folder')
    p.add_argument('--images-dir', default='images')
    p.add_argument('--index', default='index.html')
    args = p.parse_args(argv)

    if not os.path.isdir(args.images_dir):
        print('Images directory not found:', args.images_dir)
        sys.exit(1)

    ok = regenerate_index(args.index, args.images_dir)
    if not ok:
        sys.exit(2)


if __name__ == '__main__':
    main()

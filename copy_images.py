import os
import glob
from PIL import Image

src_dir = '/Users/nagee/.gemini/antigravity/brain/bf6ee682-bc8a-4730-a4d2-860b812ba014'
dest_dir = '/Users/nagee/git/gaobon-galbi/assets/images'

os.makedirs(dest_dir, exist_ok=True)

mapping = {
    'hero_image_*.png': 'hero.jpg',
    'story_image_*.png': 'story.jpg',
    'menu_galbi_*.png': 'menu-galbi.jpg',
    'menu_naengmyeon_*.png': 'menu-naengmyeon.jpg',
    'gallery_1_*.png': 'gallery-1.jpg',
    'gallery_2_*.png': 'gallery-2.jpg',
    'gallery_3_*.png': 'gallery-3.jpg',
    'gallery_4_*.png': 'gallery-4.jpg',
    'gallery_5_*.png': 'gallery-5.jpg',
    'gallery_6_*.png': 'gallery-6.jpg',
}

for pattern, out_name in mapping.items():
    matches = glob.glob(os.path.join(src_dir, pattern))
    if not matches:
        print(f"No match for {pattern}")
        continue
    
    # Sort to get the latest if there are multiple
    latest = sorted(matches)[-1]
    
    out_path = os.path.join(dest_dir, out_name)
    
    # Convert PNG to JPG
    img = Image.open(latest)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    
    img.save(out_path, 'JPEG', quality=90)
    print(f"Saved {out_name}")

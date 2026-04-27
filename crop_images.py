import os
from PIL import Image

blog_dir = 'blogContent'
out_dir = 'assets/images'
os.makedirs(out_dir, exist_ok=True)

images_needed = [
    'hero.jpg',
    'story.jpg',
    'menu-galbi.jpg',
    'menu-naengmyeon.jpg',
    'gallery-1.jpg',
    'gallery-2.jpg',
    'gallery-3.jpg',
    'gallery-4.jpg',
    'gallery-5.jpg',
    'gallery-6.jpg',
]

# Find the screenshots
files = [f for f in os.listdir(blog_dir) if f.endswith('.png') or f.endswith('.jpg')]
if not files:
    print("No screenshots found.")
    exit(1)

# Just use the first file to generate all for now
img_path = os.path.join(blog_dir, files[0])
print(f"Opening {img_path}...")
img = Image.open(img_path)

width, height = img.size
print(f"Size: {width}x{height}")

# We will crop squares from the center horizontally, going down vertically
crop_size = min(width, 1000)
num_images = len(images_needed)

# Skip the very top (headers) and bottom
start_y = 1000
end_y = height - 2000
y_step = (end_y - start_y) // max(1, num_images)

for i, name in enumerate(images_needed):
    y = start_y + i * y_step
    
    # Ensure we don't go out of bounds
    if y + crop_size > height:
        y = height - crop_size
        
    x = (width - crop_size) // 2
    
    box = (x, y, x + crop_size, y + crop_size)
    print(f"Cropping {name} at {box}")
    cropped = img.crop(box)
    
    # Convert to RGB in case it's RGBA
    if cropped.mode in ("RGBA", "P"):
        cropped = cropped.convert("RGB")
        
    out_path = os.path.join(out_dir, name)
    cropped.save(out_path, 'JPEG', quality=85)

print("Images generated successfully.")

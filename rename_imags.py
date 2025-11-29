import os

# Folder containing images
folder = r"C:\Users\Aatif\Desktop\Rukhsar-Portfolio\Images\USV\Ocr_res\results\v5"

for filename in os.listdir(folder):
    # Process only image files (jpg, png, jpeg)
    if filename.lower().endswith((".jpg", ".jpeg", ".png", ".bmp", ".gif")):
        name, ext = os.path.splitext(filename)
        new_name = f"{name}_{ext}"  # add underscore before extension

        src = os.path.join(folder, filename)
        dst = os.path.join(folder, new_name)

        os.rename(src, dst)
        print(f"Renamed: {filename} → {new_name}")

print("Done!")

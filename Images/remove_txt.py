
##Remove ROI (Erase Only That Region)

# import cv2
# import numpy as np
# import os

# img = cv2.imread(r"C:\Users\Aatif\Desktop\Rukhsar-Portfolio\Images\honda\Screenshot from 2024-11-07 17-37-02.png")
# mask = np.ones(img.shape[:2], dtype=np.uint8) * 255
# x, y, w, h = 38, 72, 275, 88

# # Erase region by writing white into the image
# img[y:y+h, x:x+w] = 220

# cv2.imwrite(r"C:\Users\Aatif\Desktop\Rukhsar-Portfolio\Images\Modified\Screenshot from 2024-11-07 17-37-02.png", img)






import cv2
import numpy as np
import os

#Get Image from the Directory and remove the last line
images=os.listdir(r"C:\Users\Aatif\Desktop\Rukhsar-Portfolio\Images\honda")

for image in images:
    if image.endswith(".jpg") or image.endswith(".png") or image.endswith(".jpeg"):
        image_path=os.path.join(r"C:\Users\Aatif\Desktop\Rukhsar-Portfolio\Images\honda",image)
        output_image_path=os.path.join(r"C:\Users\Aatif\Desktop\Rukhsar-Portfolio\Images\Modified",image)
        img = cv2.imread(image_path)
        
        mask = np.ones(img.shape[:2], dtype=np.uint8) * 255
        x, y, w, h = 38, 65, 249, 60
        
    

        # Erase region by writing white into the image
        img[y:y+h, x:x+w] = 220

        cv2.imwrite(f"{output_image_path}", img)

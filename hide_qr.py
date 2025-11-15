import cv2

img_path="C:/Users/Aatif/Desktop/Rukhsar-Portfolio/Images/USV/Ocr_res/results/v3/2.jpg"
    


def hide_qr_opencv_only(img_path, output_path):
    img = cv2.imread(img_path)
    print('image', img)
    qr = cv2.QRCodeDetector()

    # Detect QR code
    retval, points = qr.detect(img)

    if retval and points is not None:
        pts = points[0]  # 4 corner points

        # Get bounding box
        x_min = int(min(pts[:, 0]))
        x_max = int(max(pts[:, 0]))
        y_min = int(min(pts[:, 1]))
        y_max = int(max(pts[:, 1]))

        # Extract ROI
        roi = img[y_min:y_max, x_min:x_max]

        # Blur QR region
        blurred = cv2.GaussianBlur(roi, (51, 51), 0)

        # Put back
        img[y_min:y_max, x_min:x_max] = blurred

        cv2.imwrite(output_path, img)
        print("QR hidden:", output_path)

    else:
        print("No QR code detected!")

# Run
hide_qr_opencv_only(img_path, "output.jpg")

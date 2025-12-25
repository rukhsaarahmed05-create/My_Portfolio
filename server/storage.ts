import { projects, blogPosts, contacts, skills, type Project, type InsertProject, type BlogPost, type InsertBlogPost, type Contact, type InsertContact, type Skill, type InsertSkill } from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(category?: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Blog Posts
  getBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  searchBlogPosts(query: string): Promise<BlogPost[]>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  
  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private blogPosts: Map<number, BlogPost>;
  private contacts: Map<number, Contact>;
  private skills: Map<number, Skill>;
  private currentProjectId: number;
  private currentBlogPostId: number;
  private currentContactId: number;
  private currentSkillId: number;

  constructor() {
    this.projects = new Map();
    this.blogPosts = new Map();
    this.contacts = new Map();
    this.skills = new Map();
    this.currentProjectId = 1;
    this.currentBlogPostId = 1;
    this.currentContactId = 1;
    this.currentSkillId = 1;
    
    this.seedInitialData();
  }

  private seedInitialData() {
    // Seed skills
    const initialSkills: InsertSkill[] = [
      {
        name: "Computer Vision",
        category: "Machine Learning",
        icon: "fas fa-eye",
        description: "OpenCV, PIL, Scikit-image, Object Detection, Image Segmentation",
        technologies: ["OpenCV", "YOLO", "PIL", "Scikit-image"],
        color: "brand"
      },
      {
        name: "Deep Learning",
        category: "AI",
        icon: "fas fa-brain",
        description: "TensorFlow, PyTorch, Keras, Neural Networks, CNN, RNN",
        technologies: ["PyTorch", "TensorFlow", "Keras", "CNN", "RNN"],
        color: "violet"
      },
      {
        name: "Programming",
        category: "Development",
        icon: "fas fa-code",
        description: "Python, C++, CUDA, NumPy, Pandas, Matplotlib",
        technologies: ["Python", "CUDA", "NumPy", "Pandas"],
        color: "emerald"
      },
      {
        name: "Deployment",
        category: "MLOps",
        icon: "fas fa-server",
        description: "Docker, AWS, Flask, FastAPI, MLOps, Model Optimization",
        technologies: ["Docker", "AWS", "Flask", "FastAPI"],
        color: "amber"
      }
    ];

    initialSkills.forEach(skill => this.createSkill(skill));

    // Seed projects
    const initialProjects: InsertProject[] = [
      // {
      //   title: "Medical Image Analysis",
      //   subtitle: "AI-Powered Pneumonia Detection System",
      //   description: "CNN-based system for automated detection of pneumonia in chest X-rays with 95% accuracy using transfer learning.",
      //   category: "Medical AI",
      //   technologies: ["PyTorch", "ResNet", "OpenCV"],
      //   imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      //   additionalImages: [
      //     "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      //     "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop"
      //   ],
      //   githubUrl: "https://github.com/example/medical-ai",
      //   liveUrl: "https://medical-ai-demo.com",
      //   featured: true
      // },


      {
        title: "Engraved Text on Metal Components: Challenges and Insights",
        description: "In industrial environments, capturing clear and readable text from metal components is essential for traceability, quality verification, and automated inspection workflows. The image shown here depicts a cast metal mechanical component, likely part of an engine casing or gearbox housing, featuring a faint engraved alphanumeric identification code. These markings usually represent part numbers, batch codes, or manufacturing identifiers.\n Although such markings are critical, making them readable through a camera—especially in automated systems—can be surprisingly difficult. The surface of the component in this case is highly textured cast metal, creating unpredictable reflections and making the engraved characters blend into the background.\n**Key Challenges in Reading Engraved Text**\n 1. Surface Texture & Reflections:\nThe rough, uneven surface of cast metal causes light to scatter in complex ways. This leads to glare spots and shadows that obscure parts of the engraving.\n2. Low Contrast:\nEngraved text often lacks sufficient contrast against the metal background, especially if the engraving is shallow or worn over time.\n3. Variable Lighting Conditions:\nIn industrial settings, lighting can vary significantly—harsh overhead lights, ambient daylight, or even dim environments—further complicating image capture.\n4. Angle & Perspective Distortion:\nCameras positioned at non-ideal angles can introduce perspective distortion, making characters appear skewed or compressed.\n 5. Oil, Dust, and Residue\n Manufacturing environments introduce contamination that degrades image quality and further reduces readability.\n**Techniques for Improving Readability**\nTo enhance the visibility of engraved text on metal components, several image processing techniques can be employed:\n- Controlled Lighting: Using diffuse lighting setups or ring lights to minimize harsh reflections.\n- Image Preprocessing: Applying filters such as histogram equalization, edge detection (e.g., Canny), and contrast enhancement to highlight engraved features.\n- Multi-Angle Imaging: Capturing images from multiple angles to find the best view of the engraving.\n- Machine Learning OCR: Training OCR models specifically on images of engraved text to improve recognition accuracy despite challenging conditions.\nBy addressing these challenges with a combination of hardware setup and software processing, it is possible to reliably read engraved text on metal components—enabling effective automation in quality control and inventory management processes.",
        category: "Industrial AI",
        technologies: ["OpenCV", "ZBar", "Python", "Image Processing"],
        imageUrl: "/Images/Engraved_Metal/OCR_display.png",

        additionalImages: [
          "/Images/Engraved_Metal/0 (2).jpg",
          "/Images/Engraved_Metal/0.jpg",
          "/Images/Engraved_Metal/1 (2).jpg",
          // "/Images/Engraved_Metal/2 (2).jpg",
          "/Images/Engraved_Metal/2.jpg",
          "/Images/Engraved_Metal/4.jpg",
          "/Images/Engraved_Metal/Screenshot from 2025-08-22 12-59-35.png",
          "/Images/Engraved_Metal/8.jpg"
        ],

        githubUrl: "https://github.com/example/barcode-qc",
        featured: false
      }, 


      {
        title: "Automated Defect Detection on Shiny Metal Parts: From Faucets to Sanitary Ware",
        subtitle: "AI-Powered cracks and Dents Detection System",
        description: "Shiny metal components like faucets, taps, shower fittings, and sanitary ware must meet the highest standards of surface finish and durability. Even small defects such as cracks, dents, scratches, or water marks can compromise quality and result in costly rework or rejection. Traditional manual inspection struggles with reflective surfaces and tiny imperfections, making AI-powered defect detection a powerful solution.\n In this post, we’ll walk through the complete workflow of building a defect detection system for shiny metal parts — covering data acquisition, defect labeling, model training, multi-camera inspection, and deployment.\n\n**Common Defects in Shiny Metal Parts**\nCracks – fine lines or fractures that weaken the structure.\nDents – visible depressions caused during machining or handling.\nSurface Defects – scratches, abrasions, or uneven polishing.\nHoles – unwanted gaps or voids in cast or machined parts.\nUnfinished Parts – incomplete machining or missing polishing steps.\nWater Marks – spots or stains left during cleaning or plating.\nEach defect can appear differently depending on lighting, viewing angle, or polish level, making inspection especially challenging.\n\n**Step 1: Data Acquisition**\nSince shiny surfaces reflect light, capturing defects consistently is the biggest challenge. A multi-camera setup is used:\nMultiple View Angles: Top, side, and oblique views ensure no defect is hidden.\nControlled Lighting: Diffused dome or ring lights minimize glare and highlight surface inconsistencies.\nHigh-Resolution Cameras: Industrial cameras capture fine cracks and surface textures.\nTriggering System: Parts are placed on a rotating jig or conveyor, and synchronized cameras capture frames.\nThis results in a rich dataset covering all possible defect orientations.\n**Step 2: Data Annotation**\nDefect regions are annotated using bounding boxes, polygons, or segmentation masks.\nClasses include crack, dent, scratch, hole, unfinished, watermark.\nAnnotation tools like CVAT, Labelme, or Supervisely help create consistent labels.\nSince defects can be tiny, pixel-level annotation (segmentation) often works better than just bounding boxes.\n**Step 3: Model Training**\nFor shiny metal defect detection, a combination of object detection and anomaly detection works best:\nObject Detection (YOLOv8, Faster R-CNN): For visible, localized defects like dents or holes.\nSegmentation Models (U-Net, Mask R-CNN, Segment Anything): For detailed defect area localization\n**Step 4: Multi-Camera Inference Pipeline\nFor shiny metal parts like faucets and sanitary ware, a single camera cannot cover the full geometry due to reflections and hidden surfaces. To overcome this, the inspection system uses three synchronized cameras and a rotary mechanism:\n**Trigger-Based Capture**\nA rotary fixture holds the part and rotates it 360° in fixed increments.\nAt each rotation step, a trigger signal synchronizes all three cameras to capture images simultaneously.\nThis ensures complete coverage from three perspectives (front, side, angled view)\n**Image Processing Flow**\nEach camera sends images to the inference server.\nThe defect detection model (YOLO, Anomalib, or hybrid) analyzes every frame for cracks, dents, scratches, water marks, etc.\nResults are timestamped and indexed with the camera ID + rotation angle.\n**Multi-View Fusion**\nDefect detections are aggregated across all cameras and rotation steps\nIf any camera detects a defect at any angle, the part is flagged as NG (Not Good).\nOtherwise, after completing the full 360° rotation, the part is classified as OK.\n**Real-Time Feedback**\nThe system communicates with a PLC or rejection mechanism\nNG parts are automatically separated from the conveyor/assembly line.\nA dashboard UI displays the captured views, defect highlights (bounding boxes/heatmaps), and final decision\nThis multi-camera + rotary setup ensures 100% surface coverage with minimal blind spots, even for highly reflective metallic parts.",
        category: "Manufacturing AI",
        technologies: ["PyTorch", "ResNet", "OpenCV"],
        imageUrl: "/Images/Jaquar2/2025-08-25_15-01-18_.jpg",
        
        
        additionalImages: [
          "/Images/Jaquar2/2025-08-20_14-38-51_.jpg",
          "/Images/Jaquar2/2025-08-20_14-44-54_.jpg",
          "/Images/Jaquar2/2025-08-20_15-18-59_.jpg",
          "/Images/Jaquar2/2025-08-21_15-01-22_.jpg",
          "/Images/Jaquar2/2025-08-21_09-46-23_.jpg",
          "/Images/Jaquar2/2025-08-21_10-35-50_.jpg",
          "/Images/Jaquar2/2025-08-21_16-53-45_.jpg",
          "/Images/Jaquar2/2025-08-22_10-34-19_.jpg",
          "/Images/Jaquar2/2025-08-22_13-52-06_.jpg",
          "/Images/Jaquar2/2025-08-21_17-55-12_.jpg",
          "/Images/Jaquar2/2025-08-23_11-07-57_.jpg",
          "/Images/Jaquar2/2025-08-22_14-59-10_.jpg",
          "/Images/Jaquar2/2025-08-25_16-16-33_.jpg",
          "/Images/Jaquar2/2025-08-26_11-15-51_.jpg"
        ],
        githubUrl: "https://github.com/example/medical-ai",
        liveUrl: "https://medical-ai-demo.com",
        featured: true
      },



      {
        title: "Multi-Domain OCR Pipeline",
        description: "In industries where printed cards (such as ID cards, membership cards, loyalty cards, or product labels) are produced in bulk, quality control is essential. Even the smallest misprint, missing character, or surface defect can cause compliance issues, reduce brand reputation, or render the card unusable.\nManual inspection is often slow, error-prone, and labor-intensive. This is where OCR (Optical Character Recognition) systems combined with computer vision and defect detection come in — delivering automated, scalable, and reliable quality checks.\n\n**Why Card OCR & Defect Detection Matters**\nAccuracy: Ensures card text (e.g., names, numbers, barcodes) is readable and error-free.\nCompliance: Prevents faulty cards (with typos or missing fields) from reaching customers.\nEfficiency: Automates inspection for thousands of cards per hour.\nCost Reduction: Detecting defects early reduces material wastage and rework.\n\n**Challenges in Card OCR Inspection**\nGlossy Surfaces: Cards often reflect light, creating glare.\nSmall Fonts: Fine text, embossed letters, or micro-printing can be hard to read.\nBackground Designs: Colored or patterned backgrounds interfere with OCR engines.\nDefect Variety: Scratches, faded ink, misalignment, or missing text.\n\n**OCR System Workflow for Card Inspection**\n**Image Capture**\nHigh-resolution industrial cameras scan each card under controlled lighting.\nMultiple angles can help capture embossed or reflective text.\n**Preprocessing & Enhancement**\nGlare removal, contrast enhancement, and binarization improve text clarity.\nROI (Region of Interest) detection isolates areas like card number, name, or barcode.\n**OCR Text Recognition**\nEngines like PaddleOCR, Tesseract, or custom CNN models extract alphanumeric text.\nFine-tuning ensures recognition accuracy on custom fonts and small print.\n**Verification Against Templates**\nExtracted text is matched against the expected template (e.g., card numbers must be 16 digits).\nFormatting rules (date formats, serial codes) are validated.\n**Defect Detection**\nBeyond OCR, computer vision algorithms detect:\nMisaligned prints\nBlurry or faded ink\nScratches or contamination on the surface\nMissing holograms or logos\n**Real-Time Feedback**\nDefective cards are flagged and rejected automatically.\nAnalytics dashboards show defect trends for process optimization.\n\n**Analytics dashboards show defect trends for process optimization.**\nBanking: Credit/debit card number and expiry validation.\nGovernment: ID cards, driver’s licenses, voter cards.\nRetail: Loyalty and membership cards.\nRetail: Loyalty and membership cards.",
        category: "Computer Vision",
        technologies: ["PaddleOCR", "Flask", "API", "Text Processing"],
        imageUrl: "/Images/OCR/OCR_display_.png",
        additionalImages: [
          "/Images/OCR/Image__2025-05-08__14-12-30_ocr_res_img_.jpg",
          "/Images/OCR/Image__2025-05-08__14-13-06_ocr_res_img_.jpg",
          "/Images/OCR/Image__2025-05-08__14-12-30_ocr_res_img_.jpg",
          "/Images/OCR/Asti/OCR/NG/Image__2025-05-08__16-11-30_.jpg_.png",
          "/Images/OCR/Asti/OCR/OK/Image__2025-05-08__14-13-18_.jpg_.png",
          "/Images/OCR/Asti/OCR/OK/Image__2025-05-08__14-13-27_.jpg_.png",

        ],
        featured: false
      },
    


      {
        title: "Smart PCB Component Verification with DINOv2",
        subtitle: "Vision Transformer-Based Quality Control",
        description: "In modern electronics manufacturing, speed and precision are everything. Even the smallest assembly defect—like a capacitor flipped the wrong way or a missing transistor—can lead to costly failures down the line. Traditionally, these checks require manual inspection or basic rule-based vision systems, which often miss subtle misalignments or orientation errors.I built a deep learning–powered PCB classification system using Meta’s DINOv2 Vision Transformer, designed to verify component placement at the ROI (Region of Interest) level with high accuracy.\n\n**Why ROI-Level Classification?**\n\nInstead of trying to judge the entire PCB at once, I focused on component-specific inspection. Each capacitor, transistor, or critical component is extracted as an ROI and analyzed individually. This approach improves accuracy, simplifies training, and allows fine-grained defect detection.\n\n**What My System Checks For**\n\n1. Component Presence – Detect if capacitors, transistors, or other parts are missing from their designated positions.\n2. Component Orientation – Ensure capacitors are installed correctly, with the correct polarity.\n3. Component Alignment – Verify that components are properly aligned and spaced according to design guidelines.\n4. Component Count – Confirm that the correct number of components are present on the PCB.\n5. Component Quality – Identify defects in components such as scratches, cracks, or misaligned pins.\n\n**How It Works**\n\n**Image Preprocessing**: The system first preprocesses the image to enhance contrast and remove noise. This includes resizing, color normalization, and applying filters to highlight key features.\n2.**Region of Interest (ROI) Extraction**: Using a bounding box approach, the system identifies and extracts individual components from the PCB image. This ensures that each component is analyzed independently.\n3.**Vision Transformer Model**: The DINOv2 model processes each ROI to classify it as either good or bad. The model is trained on a dataset of good and bad components, and it uses a confidence threshold to determine if a component is acceptable.\n4.**Post-Processing**: After the model has made its predictions, a post-processing step is applied to refine the results. This includes applying a non-maximum suppression algorithm to remove overlapping bounding boxes and applying a confidence threshold to the predictions.\n\n## **Why DINOv2?**\n\n**Self-Supervised Learning**: Learns from massive, diverse image datasets without needing millions of PCB-specific images.\n\n**Strong Generalization**: Performs well even with limited labeled defect data.\n\n**Fine Detail Recognition**: The transformer architecture captures both **global layout** and **tiny local changes**—perfect for component orientation checks.\n\n**Results**\n\nThe system achieved an accuracy of 98.5% in classifying components as either good or bad. This is a significant improvement over traditional vision systems, which often have an accuracy of around 80%.",
        category: "Industrial AI",
        technologies: ["Vision Transformers", "Robust Augmentation Pipeline ", "FlashAttention"],
        imageUrl: "/Images/PCB/Ng/pcb Defet_.png",
        additionalImages: [
          "/Images/PCB/Ng/1_.png",
          "/Images/PCB/Ng/2_.png", 
          "/Images/PCB/Ng/3_.png",
          "/Images/PCB/ok/3_.png",
        ],
        githubUrl: "https://github.com/example/medical-ai",
        liveUrl: "https://medical-ai-demo.com",
        featured: true
      },


      {
        title: "AI-Powered Engine Assembly Block Inspection",
        subtitle: "No More Manual Inspection ",

        description: "**Introduction**\n\nIn modern automotive manufacturing, the engine assembly block is one of the most critical components. Any missing part, misplaced element, or incorrectly installed component can compromise performance, cause costly recalls, and even lead to safety hazards.\n\nManual inspection is slow, labor-intensive, and prone to human error. This is where AI-powered visual inspection comes in — ensuring that every component is exactly where it should be, at production-line speeds.\n\n**Core Inspection Objectives**\n\nOur AI inspection system is designed to verify:\n\n1.Presence & Absence Detection – Confirm that every required component is installed.\n2.Position Verification – Ensure each part is placed in its correct location within the engine block.\n3.Orientation Check – Identify components that are flipped or incorrectly aligned.\n\n**How It Works**\n\n**1. Image Acquisition**\nHigh-resolution industrial cameras capture detailed images of the engine block from multiple angles.\n ** 2. Feature Extraction **Using computer vision techniques, the system identifies key visual features for each component—edges, contours, textures, and shapes—to create unique signatures for each part.\n**3. Object Detection & Localisation**An object detection model (e.g., YOLO, Faster R-CNN) locates each component within the assembly block image. This allows:\nPrecise bounding box localisation of each part\nChecking if the detected part falls inside its expected region\n\n4. Count & Presence Verification\nFor each component type:\nExpected Count (e.g., 10 bolts, 4 circlips, 2 gaskets) is stored in the system.\nDetected Count is calculated from object detection results.\nIf counts match and all detected parts are inside their correct positions → OK\nIf counts mismatch or any part is missing/misplaced → Fail\n\n**Example Use Cases**\n\nIn our deployment for an automotive manufacturing line, the system successfully:\nVerified that all bolts, circlips, and sensors were present and in correct positions.\nDetected missing coolant pipe seals before final assembly.\nIdentified misaligned mounting brackets that could cause vibration issues.\nFlagged extra or misplaced bolts that could damage the block during operation.",
        category: "Computer Vision",  
        technologies: ["Object Detecion ", "Augmentation ", "Feature Extraction"],
        imageUrl: "/Images/Result_objDetUI/Screenshot from 2025-08-23 16-33-32_.png",
        additionalImages: [
          "/Images/honda/Screenshot from 2024-11-07 17-37-02_.png",
          "/Images/honda/Screenshot from 2024-11-07 18-38-47_.png", 
          "/Images/honda/Screenshot from 2024-11-07 18-41-01_.png",
          "/Images/honda/Screenshot from 2025-02-12 12-09-22_.png",
          "/Images/honda/Screenshot from 2025-02-12 12-09-41_.png",
        ],
        githubUrl: "https://github.com/example/medical-ai",
        liveUrl: "https://medical-ai-demo.com",
        featured: true
      },


      {
        title: "AI-Powered Surface Defect Detection in Manufacturing",
        description: "In precision manufacturing, the quality of a product’s surface is not just about aesthetics — it’s a critical factor for durability, performance, and customer satisfaction. Even the smallest defect can lead to structural weakness, premature wear, or product rejection.\nOur AI-based Surface Defect Detection system is designed to identify surface irregularities, dents, and scratches — from large visible marks to micro-level imperfections — in real-time on production lines.\n\n**Types of Defects Detected**\n1.Surface Irregularities – Imperfections formed during casting, molding, or finishing processes.\n2.Scratches – Linear damage from handling, machining, or assembly.\n3.Dents – Depressions of varying depths and sizes, from large indentations to very small micro-dents.\n4.Small-Scale Anomalies – Subtle, hard-to-spot defects that traditional inspection methods often miss.\n\n**Project Workflow**\n**1. High-Quality Data Preparation**\nA successful defect detection system begins with quality training data:\nCapturing high-resolution images using industrial-grade cameras.\nDiverse datasets covering different lighting conditions, angles, and surface textures.\nDetailed annotation of defects, including bounding boxes and depth labels for dents.\n\n2.**Advanced Image Processing**\nBefore feeding images into the AI model, preprocessing enhances defect visibility:\nContrast enhancement to highlight subtle surface variations.\nEdge detection to make scratches and fine dents more apparent.\nNoise reduction to avoid false positives.\n\n**3. Defect Detection Model**\nAn AI-driven detection model is trained to:\nLocate defects (bounding box/localisation).\nClassify the type of defect (dent, scratch, irregularity).\nEstimate severity for dents based on depth and size.\n\n**4. Depth & Size Analysis for Dents**\nUsing 3D surface mapping or shadow-based intensity analysis, the system can:\nDistinguish shallow cosmetic dents from deep structural damage.\nPrioritise defects for repair or rejection.\n\n**Real-World Benefits**\nPrecision — Detects even micro-defects invisible to the naked eye.\nSpeed — Processes each product in milliseconds without slowing production.\nConsistency — Removes human subjectivity from quality control.\nCost Efficiency — Prevents defective products from reaching customers.\n\n**Example Deployment**\nIn a metal automotive part inspection line, our system:\nDetected hairline scratches missed by manual QC.\nIdentified tiny impact dents that could lead to paint cracking.\nFlagged surface irregularities caused by improper molding pressure.\n\n**Conclusion**\nFrom high-quality data preparation to advanced image processing and real-time AI detection, our Surface Defect Detection system ensures every product meets the highest manufacturing standards. Whether it’s a deep dent or a barely visible scratch, our solution catches it before it leaves the factory — safeguarding both brand reputation and customer trust.",
        category: "Computer Vision",
        technologies: ["YOLO", "OpenCV",  "Image Processing"],
        imageUrl: "/Images/Minda/Screenshot from 2024-10-22 14-59-48 - Copy_.png",

        additionalImages: [
          "/Images/Minda/Screenshot from 2024-10-22 14-59-48_.png",
          "/Images/Minda/Screenshot from 2024-10-22 15-00-01_.png",
          "/Images/Minda/Screenshot from 2024-10-22 15-06-06_.png",
          "/Images/Minda/Screenshot from 2024-10-22 15-00-05_.png",
          "/Images/Minda/Screenshot from 2024-10-22 14-56-49_.png",
          "/Images/Minda/Screenshot from 2024-10-22 14-57-29_.png",
          "/Images/Minda/Screenshot from 2024-10-22 14-57-33_.png",
          "/Images/Minda/Screenshot from 2024-10-22 14-56-27_.png",
        ],
        
        githubUrl: "https://github.com/example/autonomous-vision",
        featured: true
      },
     

      {
        title: "Crack and Damage Detection on Industrial Metal Parts: Ensuring Reliability and Safety",
        description:"Industrial metal parts are the backbone of manufacturing, automotive, aerospace, and heavy engineering industries. From gears and shafts to pipelines and machine components, these parts operate under extreme conditions—high loads, vibrations, and temperature variations. Over time, they are prone to cracks, corrosion, fatigue, and wear, which can compromise structural integrity and lead to costly failures.\n**Why Crack and Damage Detection Matters**\nSafety: Undetected cracks in critical components like turbines, aircraft parts, or pressure vessels can result in accidents or catastrophic failures.\nCost Savings: Early detection prevents expensive repairs, production downtime, and replacement costs.\nQuality Assurance: Ensures manufactured parts meet industry standards and customer requirements.\nPredictive Maintenance: Detecting early signs of damage enables industries to schedule maintenance before breakdowns occur.\n**Modern AI and Vision-Based Approaches**\nThe rise of computer vision and AI has transformed crack and defect detection:\nHigh-Resolution Imaging – Captures micro-level surface abnormalities.\nDeep Learning Models – Automatically classify defects like cracks, pits, corrosion, and deformation.\nReal-Time Monitoring – Cameras integrated with production lines for 24/7 inspection.\nPredictive Analytics – AI systems predict failure points based on historical defect data.",
        category: "Industrial  AI",
        technologies: ["Damage Detection", "Python", "OpenCV", "Crack Detection"],
        imageUrl: "/Images/Jaq1/Image__2025-03-29__15-32-30_.jpg",

        additionalImages: [
         "/Images/Jaq1/Image__2025-03-29__15-32-30_.jpg",
         "/Images/Jaq1/Image__2025-03-29__15-54-09_.jpg",
         "/Images/Jaq1/Image__2025-03-29__16-02-12_.jpg"        
        ],
        
        featured: false
      },
      
      {
        title: "Quality Control System",
        description: "**Automated Defect Detection in Watch Dials Using Anomalib**\nIn luxury watch manufacturing, quality is everything. Even the smallest defect—like a hairline scratch on the dial or a misprint on the day/date window—can impact both aesthetics and brand value. Traditional inspection methods rely on human inspectors under magnification, but this process is slow, subjective, and prone to errors\nWith advances in deep learning, we can now automate defect detection using anomaly detection frameworks such as Anomalib, an open-source library designed for visual anomaly detection in industrial settings.\n**Why Anomaly Detection for Watch Dials?**\nUnlike traditional classification or object detection tasks, defect detection in watch dials has a unique challenge:\nDefects are rare and unpredictable (e.g., scratches, smudges, misprints).\nThe majority of samples are normal (OK dials).\nAnnotating every possible defect type is impractical.\nAnomaly detection provides a solution by learning what a “good” watch dial looks like and flagging anything that deviates from that norm.\n**Highlighting Common Defects**\n**Scratches**\nFine scratches often appear on the dial surface or indices.\nAnomalib heatmaps highlight linear deviations from smooth textures.\n**Printing Defects (Day/Date)**\nMisalignment, missing ink, or double-printing on day/date apertures.\nAnomalib detects these as abnormal patterns since normal font shapes are well-learned.\n**Dust or Smudges**\nTiny particles or oil marks on the dial.\nDetected as local anomalies in otherwise clean surfaces.\n**Results & Benefits**\nHigh Precision: Detects even minute defects that human eyes may miss.\nAutomated Workflow: Can be integrated with inspection cameras on the assembly line.\nVisual Explainability: Heatmaps make it easy to understand where the defect is\nScalable: Works across different dial designs without retraining for each defect type.",
        category: "Industrial AI",
        technologies: ["TensorFlow", "CNN", "EdgeAI"],
        // imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
        imageUrl: "/Images/titan/Screenshot from 2024-08-07 14-30-55_.png",

        additionalImages: [
          "/Images/titan/images/bad/0_.png",
          "/Images/titan/images/bad/3_.png",
          "/Images/titan/images/bad/7_.png",
          "/Images/titan/images/bad/4_.png",
          "/Images/titan/images/bad/5_.png",
          "/Images/titan/images/bad/8_.png",
          "/Images/titan/images/bad/9_.png",
          "/Images/titan/images/bad/11_.png",  
          "/Images/titan/images/bad/12_.png",
          "/Images/titan/images/bad/13_.png",
          "/Images/titan/images/bad/18_.png",
          "/Images/titan/images/bad/20_.png",
          "/Images/titan/images/bad/42_.png",
          "/Images/titan/images/bad/48_.png",
          "/Images/titan/images/good/21_.png",
          "/Images/titan/images/bad/27_.png"

        ],
        githubUrl: "https://github.com/example/quality-control",
        featured: true
      },


      {
        title: "Rice Instance Segmentation: Transforming Quality Assessment in the Food Industry",
        description: "In the food industry, quality is everything. When it comes to cereal grains like rice, wheat, and corn, the physical size, shape, and appearance quality directly influence their market value. Traditionally, grading and quality inspection of rice grains rely heavily on manual labor, which is not only time-consuming but also subjective. With the rise of artificial intelligence and computer vision, instance segmentation has emerged as a cutting-edge solution to automate this process with speed and precision.\n**Why Grain Quality Matters**\nRice is a staple food for more than half the world’s population. Its quality is evaluated based on parameters such as:\nSize and length of individual grains\nShape and uniformity (e.g., long-grain, short-grain)\nDefects like broken grains, chalkiness, or discoloration\nPurity (detecting foreign materials or mixed varieties)\nEven small variations in these features can significantly affect pricing, consumer acceptance, and brand reputation.\n**What is Instance Segmentation in Rice Analysis?**\nInstance segmentation is a computer vision technique that detects and outlines each individual grain in an image, assigning a unique mask to it. Unlike simple image classification or bounding-box detection, instance segmentation provides pixel-level separation of grains, enabling precise measurements of their properties.\nFor rice inspection, this means:\nSeparation of overlapping grains in a pile\nAccurate measurement of grain dimensions (length, width, aspect ratio)\nDefect identification at the grain level (cracks, chalky spots, broken kernels)\n\n**How It Works**\n**Image Acquisition**\nHigh-resolution cameras capture images of rice samples under controlled lighting.\n**Data Annotation**\nRice grains are labeled with polygon masks, distinguishing individual grains—even when overlapping.\n**Model Training**\nState-of-the-art models are trained on annotated rice datasets.\n**Inference & Feature Extraction**\nDuring inspection, the trained model segments each grain, calculates dimensions, and identifies defects.\nPost-processing algorithms compute statistics like average grain length, broken grain ratio, and defect percentage.\n\n**Benefits of Rice Instance Segmentation**\nAutomated Grading – Consistent and objective quality assessment, free from human bias.\nSpeed & Scalability – Thousands of grains can be analyzed in seconds.\nCost Reduction – Less reliance on manual inspection.\nTraceability – Digital grain profiles stored for quality reports and audits.\n\n**Real-World Applications**\nRice Mills: Automated sorting of high-quality vs. broken grains.\nExport Quality Control: Ensuring international grade compliance.\nResearch & Breeding: Analyzing grain morphology for improved crop varieties.\nRetail & Packaging: Guaranteeing consistent quality in branded rice products.",
        category: "Computer Vision",
        technologies: ["Segmentation", "OpenCV", "Image Processing"],
        imageUrl: "/Images/Rice_.png",
        // imageUrl:"/Images/Rice/Image__2025-05-31__10-11-09_.bmp",

        additionalImages: [
          "/Images/Sam-results/Rice-Results/Image__2025-05-31__10-00-17_.png",
          "/Images/Sam-results/Rice-Results/Image__2025-05-31__10-01-40_.png",
          "/Images/Sam-results/Rice-Results/Image__2025-05-31__10-02-05_.png",
          // "/Images/Sam-results/Rice-Results/Image__2025-05-31__10-06-30_.png",
          "/Images/Sam-results/Rice-Results/Image__2025-05-31__10-02-45_.png",
          "/Images/Sam-results/Rice-Results/Image__2025-05-31__10-03-27_.png",
          "/Images/Sam-results/Rice-Results/Image__2025-05-31__10-04-28_.png",
          "/Images/Sam-results/Rice-Results/Image__2025-05-31__10-05-27_.png",
          "/Images/Sam-results/Rice-Results/Image__2025-05-31__10-07-20_.png",
          "/Images/Sam-results/Rice-Results/Image__2025-05-31__10-10-58_.png"

          
          // "/images/Sam-results/Rice-Results/Image__2025-07-30__16-24-33_.png"  
        
        ],

        githubUrl: "https://github.com/example/autonomous-vision",
        featured: true
      },


      {
        title: "OCR System for Automotive EIN/VIN Recognition: A Step Toward Smarter Vehicle Inspectionn",
        description: "In the automotive industry, accuracy and traceability are critical. From manufacturing plants to service centers, every vehicle part must be validated against its identity to ensure compliance, prevent counterfeiting, and streamline quality control. One key component of this process is EIN (Engine Identification Number) and VIN (Vehicle Identification Number) recognition. Traditionally, this task has been handled manually — but modern Optical Character Recognition (OCR) systems are revolutionizing the process\n\n**Why EIN and VIN Recognition Matters**\n-Traceability: VIN and EIN provide a digital fingerprint for vehicles and engines, linking them to manufacturing data, service history, and ownership records.\n-Quality Control: During production, OCR systems verify whether the right engine is installed in the correct vehicle.\n-Fraud Prevention: Automatic recognition helps detect tampered or fake identification numbers.\n-Efficiency: Manual inspection is time-consuming and error-prone, whereas OCR systems offer near real-time verification.\n\n**Challenges in Automotive OCR**\n**Varying Surfaces:**EINs may be stamped on rough metal, while VINs appear on stickers, engravings, or plates.\n**Lighting Conditions:**Factory floors have inconsistent lighting, reflections, or glare that interfere with recognition.\n**Font Variations**Different manufacturers use unique fonts, spacing, and layouts.\n**Noise and Distortion:**Dust, scratches, oil, or physical wear can obscure numbers.\nThese challenges demand a robust OCR pipeline capable of detecting, enhancing, and recognizing characters in real-world scenarios.\n\n**OCR System Architecture for VIN/EIN Recognition**\n\n**Image Acquisition**\n-Industrial cameras (e.g., Basler with Pylon SDK) capture high-resolution images of the target region.\n-Multi-camera setups allow parallel inspection of VIN plates, stickers, and engraved EINs.\n**Preprocessing & ROI Extraction**\n-OpenCV-based techniques enhance contrast, remove glare, and isolate the Region of Interest (ROI).\n-Methods like adaptive thresholding, morphological filtering, and perspective correction improve clarity.\n**OCR Engine**\nDeep Learning-based OCR (e.g., PaddleOCR, Tesseract with LSTM, or custom CNN models)recognizes alphanumeric characters.\n-Fine-tuned models handle specific fonts and noisy backgrounds.\n**Verification & Matching**\n-Recognized text is validated against ERP/MES databases.\n-Matching logic ensures the scanned EIN corresponds to the correct VIN in production records.\n**Real-time Integration**\n-Results are pushed into a factory system via APIs.\n-Feedback loops enable immediate alerts if mismatches are detected.\n\n**Key Benefits of Automotive OCR**\nAutomation: Eliminates manual entry and reduces operator errors.\nScalability: Handles thousands of vehicles daily with consistent performance.\nAccuracy: Achieves 95–99% recognition rates when combined with preprocessing and fine-tuning.\nTraceability & Compliance: Meets industry standards for production verification and fraud prevention.\n\n**Real-World Applications**\nAssembly Line Verification: Ensuring engines are matched with correct chassis.\nService Centers: Quick scanning of VIN for automated vehicle record lookup.\nCustoms & Border Control: Detecting fake or tampered VINs.\nAftermarket Industry: Verifying authenticity of used or replaced parts.\n\n🔑 Takeaway: An OCR system for automotive EIN/VIN recognition is not just about reading text — it’s about creating a smarter, automated, and reliable vehicle inspection ecosystem that bridges manufacturing, compliance, and customer trust.",
        category: "Automotive  AI",
        technologies: ["PaddleOCR", "Python", "OpenCV", "Text Recognition"],
        imageUrl: "/Images/Screenshot from 2025-01-27 15-29-53 (1)_.png",
        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },


      {
        title: "Instance Segmentation for Defect Detection: A Game-Changer in Industrial Quality Control",
        description:"In today’s manufacturing and quality assurance pipelines, detecting defects with precision is critical. From microelectronics to automotive components, even the smallest defect can compromise reliability, safety, or performance. Traditional inspection methods—either manual or classical image processing—often fall short when faced with complex product variations, inconsistent lighting, or tiny anomalies.\nThis is where instance segmentation steps in as a powerful tool for defect detection.\n\n**What is Instance Segmentation?**\nInstance segmentation is a computer vision technique that not only detects objects within an image (like object detection) but also segments them at the pixel level. Unlike bounding boxes, which provide only a rough localization, instance segmentation provides fine-grained masks of individual objects and defects.\n For defect detection, this means:\nPrecisely localizing defects, even when they are irregularly shaped.\nDifferentiating between multiple defect instances within the same image.\nEnabling pixel-level analysis, which is critical for tiny cracks, scratches, or misalignments.\n\n**Why Instance Segmentation for Defect Detection?**\n**Pixel-Level Precision**\nDefects like scratches, cracks, and surface contamination don’t follow neat boundaries. Instance segmentation captures their true shape.\n**Multi-Defect Handling**\nIn real-world inspection, multiple defects may appear on the same part. Instance segmentation allows distinguishing and analyzing each instance separately.\n**Quantitative Insights**\nExtract features like defect area, orientation, or position for further statistical analysis.\n**Scalability Across Industries**\nAutomotive (dent or weld defect detection),\nTextile (stain and hole detection),\nPackaging (seal or print errors).",
        category: "Automotive  AI",
        technologies: ["Segmentation", "Python", "OpenCV", "ImageProcessing"],
        imageUrl: "/Images/Sam-results/big/Image__2025-07-30__16-12-24_.png",

        additionalImages: [
          "/Images/Sam-results/big/Image__2025-07-30__16-25-44_.jpg",
          "/Images/Sam-results/big/Image__2025-07-30__16-13-27_.png",
          "/Images/Sam-results/big/Image__2025-07-30__16-25-59_.png",
          "/Images/Sam-results/big/Image__2025-07-30__16-10-23_.png",
          "/Images/Sam-results/big/Image__2025-07-30__16-18-31_.jpg",
          "/Images/Sam-results/big/Image__2025-07-30__16-24-44_.jpg",
          "/Images/Sam-results/big/Image__2025-07-30__16-23-55_.jpg",
          "/Images/Sam-results/big/Image__2025-07-30__16-24-33_.png"

        ],
        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },




      {
        title: "AI-Powered Crankcase Inspection: Real-Time Detection, Counting, and Quality Assurance",
        description: "In modern manufacturing, quality and precision are non-negotiable. A single missing bolt, plug, or bearing in a crankcase assembly can compromise the reliability of the entire engine, leading to costly failures and downtime. Traditional manual inspections are time-consuming, error-prone, and difficult to scale.\nThis is where AI-powered crankcase inspection comes in. By leveraging advanced computer vision models like Object Detection, combined with image augmentations and real-time processing, enterprises can now automate detection, counting, and validation of crankcase components—ensuring every unit meets quality standards before leaving the assembly line.\n**Why AI for Crankcase Inspection?**\nThe crankcase is a critical component that houses and supports moving engine parts. Any deviation in assembly—such as missing bolts or incorrectly placed bearings—can cause:\n⚠️ Mechanical failures\n💸 Warranty claims and recalls\n⏳ Production delays\nAI inspection systems solve these challenges by providing:\nConsistent accuracy (no human fatigue or oversight)\nScalable quality control across multiple lines\nInstant OK/NG flagging for real-time decision-making\n **How the AI-Powered System Works**\n1. Training Object Detetection Models for Crankcase Components\nWe start with a large dataset of crankcase images. Each component—bolts, bearings, plugs, guides—is annotated. To improve model robustness, we apply data augmentation such as:\nRotation & perspective changes\nBlur and glare simulation\nNoise and contrast variations\nThe  model is fine-tuned on this dataset, enabling it to detect components accurately even under challenging shop-floor conditions.\n2. Real-Time Detection & Counting\nOnce trained, the model runs in real time:\nCamera captures crankcase assembly images.\n Trained Modeel  detects all visible components.\nA post-processing logic counts each class of component.\nFor example:\nGround truth (expected): {\"Bolt\": 6, \"Bearing\": 2, \"Plug\": 1} \nPredicted: {\"Bolt\": 6, \"Bearing\": 1, \"Plug\": 1}\nIf counts match → OK ✅\nIf mismatch → NG ❌\nBusiness Impact of AI-Powered Inspection\n**Scalability**\nHandles high production volumes.\nEasily retrained for new crankcase designs.\n**Cost Efficiency**\nPrevents defective crankcases from shipping.\nCuts down on rework, warranty claims, and recalls.\n**Faster Production**\nReal-time inspection keeps pace with assembly lines\nReduces bottlenecks compared to manual checks.\n**Data-Driven Insights**\nHistorical inspection logs highlight recurring issues.\nHelps identify supplier defects or process inefficiencies.\n**Real-World Applications**\nAutomotive Manufacturing: Automated inspection of crankcase assemblies in car and truck production.\nAerospace: Ensuring crankcase housings meet strict aviation standards.\nHeavy Equipment: Detecting missing or misaligned parts in crankcases for tractors, excavators, and industrial engines.\nConclusion\nAI-powered crankcase inspection is transforming manufacturing quality control. By combining Object Detection Models detection power, robust image augmentation techniques, and real-time processing, enterprises can achieve zero-defect manufacturing, cut costs, and scale operations with confidence.",
        category: "Automotive  AI",
        technologies: ["Object Detection", "Python", "OpenCV", "Image Processing"],
        imageUrl: "/Images/Result_objDetUI/Screenshot from 2025-08-23 18-07-32_.png",
       
        additionalImages: [  
          "/Images/Hero2/17_.jpg",
          "/Images/Hero2/18_.jpg",
          "/Images/Hero2/32_.jpg",
          "/Images/Hero2/131_.jpg",
          "/Images/Hero2/87_.jpg",
          "/Images/Hero2/122_.jpg",
          "/Images/Hero2/33_.jpg",
          "/Images/Hero2/31_.jpg",
          "/Images/Hero2/144_.jpg",
        
        ],
        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },



      {
        title: "AI-Powered Engine OCR: Automating Text and Number Recognition in Manufacturing",
        description: "In today’s smart factories, precision and traceability are as important as quality. Every engine produced must carry a unique set of identifiers—such as serial numbers, VIN codes, and batch IDs—that ensure traceability across the supply chain. Traditionally, these identifiers are read and verified manually, which is:\nSlow\nError-prone\nHard to scale\nWith AI-powered Optical Character Recognition (OCR), manufacturers can now automate the reading and verification of engine numbers, ensuring 100% accuracy, speed, and compliance in real time.\n**Why Engine OCR Matters**\nEngines are stamped or engraved with critical identifiers, but these markings often come with challenges:\nNon-uniform surfaces (metal textures, engravings)\nVariable lighting in factory environments\nDirt, oil, or glare obstructing the text\nDifferent fonts and character styles\nMissing or misreading a single digit can cause traceability failures, leading to warranty disputes, compliance violations, and massive losses.\nEngine OCR solves this by using computer vision + deep learning to reliably detect and read text under challenging real-world conditions.\n**How the Solution Works**\n**1. Image Capture**\nHigh-resolution industrial cameras capture engine surfaces in real time.\nMultiple angles and lighting adjustments ensure visibility of all engraved or printed text.\n**2. Preprocessing & Augmentations**\nRaw images undergo preprocessing for maximum readability:\nContrast enhancement\nGlare and reflection removal\nAdaptive thresholding\nPerspective correction\nThese steps make text clearer before OCR runs.\n**3. OCR with Deep Learning**\nWe integrate state-of-the-art OCR models like PaddleOCR, Tesseract with deep learning backends, or transformer-based OCR models. These models extract engine identifiers such as:\nEngine Number\nVIN Code\nBatch/Serial IDs\n**4. Verification & Validation**\nExtracted text is compared with ERP/MES system records:\n✅ If text matches expected values → OK\n❌ If mismatch or unreadable → NG, triggering alerts for manual inspection.\n**Business Benefits of Engine OCR**\nTraceability at Scale\nEvery engine gets verified instantly.\nEnsures compliance with industry regulations and warranty requirements.\n**Error Reduction**\nEliminates human mistakes in reading complex alphanumeric codes.\n**Speed & Efficiency**\nInspections run in real time, keeping pace with production lines.\n**Cost Savings**\nPrevents defective or mislabeled engines from shipping.\nReduces warranty claims and legal disputes.\n**Analytics & Insights**\nOCR logs provide traceability across the entire supply chain.\n**Real-World Applications**\nAutomotive Plants: Reading and validating VINs & engine serials at assembly.\nHeavy Machinery: Ensuring engines are tracked from production to delivery.\nAerospace: Verifying engraved part IDs for compliance with safety standards.\n**Conclusion**\nAI-powered Engine OCR is redefining how manufacturers handle traceability and compliance. By combining high-resolution imaging, preprocessing, and deep learning-based OCR models, enterprises can ensure every engine is properly identified, logged, and verified—at scale, in real time. ",
        category: "Automotive  AI",
        technologies: ["OCR", "Python", "OpenCV", "Image Processing"],
        imageUrl: "/Images/Hero-ocrold/78_.jpg",
       

        additionalImages: [  
        "/Images/Hero-ocrold/6388_.png",
        "/Images/Hero-ocrold/6401_.png",
        "/Images/Hero-ocrold/6405_.png",
        "/Images/Hero-ocrold/6406_.png",
        "/Images/Hero-ocrold/6410_.png",
        "/Images/Hero-ocrold/6414_.png",
        "/Images/Hero-ocrold/6417_.png",
        "/Images/Hero-ocrold/6419_.png",
        "/Images/Hero-ocrold/6422_.png",
        "/Images/Hero-ocrold/6424_.png",
        "/Images/Hero-ocrold/6426_.png",
        
        ],
        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },


      {
        title: "Cylinder Head Inspection Systems: Ensuring Accuracy, Alignment, and Assembly",
        description: "The cylinder head is one of the most critical components in an engine. It houses valves, spark plugs, fuel injectors, and ensures proper combustion efficiency. For optimal performance, every element of the cylinder head assembly—from bolts and nuts to gaskets and valve trains—must be correctly installed and aligned. Even a single missing or misaligned component can compromise engine performance, reduce lifespan, or cause severe mechanical failures.\n**Why Cylinder Head Inspection Is Important**\nSafety and Reliability – Misaligned or missing bolts and nuts can cause leaks, overheating, or pressure failures.\nPerformance Assurance – Proper assembly ensures efficient combustion and smooth operation.\nCost Reduction – Prevents expensive warranty claims, rework, and production downtime.\nQuality Control – Maintains consistent assembly standards across large-scale manufacturing.\n**Key Functions of Cylinder Head Inspection Systems**\n✅ Presence Detection: Verifying that all bolts, nuts, and fasteners are present in the correct locations.\n✅ Alignment Verification: Ensuring parts such as camshafts, valves, and guides are correctly positioned.\n✅ Torque and Fitment Checks: Confirming that bolts are not just present, but tightened to the correct specification.\n✅ Surface and Seal Inspection: Detecting gaps, scratches, or surface irregularities that may affect sealing.\n**Technologies Used in Cylinder Head Inspection**\n**Machine Vision Systems**\nHigh-resolution cameras capture images of the assembly.\nAI models detect missing or incorrectly placed components.\n**Applications in the Automotive Industry**\nAssembly Verification: Ensures all cylinder head bolts and nuts are properly fixed.\nEngine Line QA: Automated systems integrated into conveyor lines for real-time inspection.\nPredictive Maintenance: Early detection of potential misalignments or weak assemblies.\nRegulatory Compliance: Meeting strict automotive safety and emission standards.",
        category: "Automotive  AI",
        technologies: ["Detection", "Python", "OpenCV", "Image Processing"],
        imageUrl: "/Images/Cylinder_Head/0_.jpg",
       

        additionalImages: [
          "/Images/Cylinder_Head/3_.jpg",
          "/Images/Cylinder_Head/7_.jpg",
          "/Images/Cylinder_Head/8_.jpg",
          "/Images/Cylinder_Head/10_.jpg",
          "/Images/Cylinder_Head/11_.jpg",
          "/Images/Cylinder_Head/13_.jpg",
          "/Images/Cylinder_Head/16_.jpg",
          "/Images/Cylinder_Head/18_.jpg",
          "/Images/Cylinder_Head/11_.jpg"         
        ],

        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },



      {
        title: "OCR for Electric Meter Glass Reading — Reliable, Robust, and Production-ready",
        description: "Reading electric meters behind glass is a deceptively hard OCR problem. Reflections, curvature, dirt, multiple text types (digits, unit labels, serial numbers), and inconsistent lighting all combine to trip up simple OCR systems. In this post I’ll walk through a practical, end-to-end approach for building a robust OCR pipeline for electric meter glass reading that reads all text, handles horizontal text, and uses careful post-processing to turn raw OCR outputs into reliable meter readings.\n**Why meter-glass OCR is challenging**\nReflections & glare from ambient light and camera flash obscure digits.\nGlass curvature / perspective distorts characters.\nMultiple text types: numeric counters, labels (kW·h, serial numbers), small printed text.\nVarying fonts & spacing: mechanical counters, seven-seg digits, printed text.\nPartial occlusions & dirt on the glass.\n**High-level pipeline overview**\nImage acquisition — controlled capture settings (exposure, polarizer, angle).\nPreprocessing — glare removal, dewarping, denoising, contrast enhancement.\nText detection — find all regions containing text (separate digits from labels).\nText orientation handling — detect and normalize horizontal text (and rotated text if present).\nRecognition (OCR) — digit and text recognition with models tuned to meter styles.\nPost-processing — parsing, error correction, unit/value normalization, confidence scoring and validation.\n**Text detection: find everything worth reading**\nDeep learning detectors: EAST, CRAFT or newer text detectors locate words/lines robustly and handle various fonts. These are particularly good where text and digits coexist.\nTwo-stage strategy: run a generic text detector to get candidate regions, then apply a smaller classifier to separate counter digits from auxiliary text (serials/labels). This helps apply specialized OCR models per class.",
        category: "Automotive  AI",
        technologies: ["OCR", "Python", "OpenCV", "Image Processing"],
        imageUrl: "/Images/energy_meter/Image__2024-12-21__11-12-44_.jpg",
      

        additionalImages: [
          "/Images/energy_meter/result3_.jpg",
          "/Images/energy_meter/result9_.jpg",
          "/Images/energy_meter/result10_.jpg",
          "/Images/energy_meter/result6_.jpg",
          "/Images/energy_meter/result7_.jpg",
          "/Images/energy_meter/result8_.jpg",
          "/Images/energy_meter/result11_.jpg",
          "/Images/energy_meter/result5_.jpg",
          "/Images/energy_meter/ result54_.jpg",          
        ],

        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },

     
      {
        title: "🧠 Defect Detection on Glass Bottles Using AI and Computer Vision",
          description: "🚀 Introduction \n In the manufacturing industry, quality control is one of the most crucial stages of production — especially in sectors like beverages, pharmaceuticals, and cosmetics, where glass bottles are widely used. Even minor defects such as cracks, scratches, bubbles, or inclusions can compromise the product’s integrity, safety, and brand reputation.\n Traditionally, defect detection has relied on manual inspection, which is labor-intensive, subjective, and prone to human error. However, with the rapid advancement of computer vision and artificial intelligence (AI), it is now possible to automate this process with high accuracy, speed, and consistency.\n **⚙️ Common Types of Glass Bottle Defects**\n Before diving into the solution, it’s important to understand the types of defects manufacturers aim to detect:\n **Cracks and Fractures:**\nFine lines or breaks in the bottle structure that can cause leaks or breakage.\n**Bubbles and Inclusions:**\nAir bubbles or foreign particles trapped within the glass during production.\n**Chips and Scratches:**\nSurface-level damage usually caused during handling or transportation.\n**Deformation:**\nBottles with irregular shapes due to improper molding or temperature control.\n**Contamination:**\nResidues, stains, or external particles inside or outside the bottle.\n**🤖 How AI-Based Defect Detection Works**\nModern defect detection systems leverage AI-powered image processing pipelines. Here's how it typically works:\n**1. Image Acquisition**\nHigh-resolution cameras (e.g., Basler, FLIR) capture multiple images of each bottle — often from different angles using a rotary inspection setup. Controlled lighting ensures consistent visibility of transparent or reflective glass surfaces.\n**2. Preprocessing**\nCaptured images are enhanced using OpenCV-based preprocessing techniques:\nBackground subtraction\nContrast enhancement\nEdge detection\nNoise filtering\n**3. Feature Extraction or Deep Learning**\nThere are two popular approaches:\n**Classical Computer Vision:**\nAlgorithms like Hough Transform, Canny Edge Detection, and Contour Analysis are used to identify irregularities.\n**Deep Learning (Modern Approach):**\nCNN-based architectures such as YOLOv8, ResNet, or DINOv2 Vision Transformers can automatically learn defect features.\nThese models can classify regions as OK or NG (Not Good) and even localize the defect with bounding boxes or segmentation masks.\n**4. Model Training and Inference**\nThe model is trained on a large dataset of labeled bottle images — containing examples of both defective and defect-free bottles. Once trained, the AI system can detect and classify defects in real time during production.\n**5. Integration with PLC or Automation Systems**\nWhen a defect is detected, the system can send a signal to a PLC (Programmable Logic Controller) to trigger an ejector mechanism that removes the defective bottle from the conveyor line.\n**🏁 Conclusion**\nAI-powered defect detection systems are transforming the glass manufacturing industry. By combining high-resolution imaging, deep learning, and industrial automation, companies can achieve near-perfect quality control, minimize waste, and enhance customer satisfaction.\nInvesting in AI-based inspection today is not just about automation — it’s about building a smarter, more reliable, and future-ready manufacturing ecosystem.",
          category: "Manufacturing and Industrial AI",
          technologies: ["OpenCV", "Defect Detection", "Python", "Image Processing"],
          imageUrl: "/Images/Glass_Bottle_Inspection/osw2 (1)_.png",
         
          additionalImages: [
            "/Images/Glass_Bottle_Inspection/Image__2025-09-04__18-43-08_.bmp",  
            "/Images/Glass_Bottle_Inspection/Image__2025-09-04__18-43-59_.bmp",
            "/Images/Glass_Bottle_Inspection/Image__2025-09-06__12-57-41_.bmp",
            "/Images/Glass_Bottle_Inspection/Image__2025-09-15__15-58-54_.bmp",
            "/Images/Glass_Bottle_Inspection/Image__2025-09-15__15-59-31_.bmp",
            "/Images/Glass_Bottle_Inspection/Image__2025-09-15__16-02-11_.bmp",
            "/Images/Glass_Bottle_Inspection/Image__2025-09-15__16-03-00_.bmp",        
          ],

          githubUrl: "https://github.com/example/barcode-qc",
          featured: false
        },  




      {
        title: "Bubble Leak Detection System in Fuel Pump FCU: Ensuring Reliability in Fuel Control Units",
          description: "In modern aerospace and automotive applications, Fuel Control Units (FCUs) play a critical role in precisely metering fuel flow to the engine. Any form of leakage or air bubble formation inside the FCU can severely impact its performance, efficiency, and safety. To address this, industries are now adopting automated Bubble Leak Detection Systems (BLDS) — a cutting-edge solution that ensures the integrity of fuel systems during production and quality testing.\n**Understanding the Problem: Why Bubbles Matter**Fuel pumps and FCUs are designed for high-precision fuel delivery under strict tolerances. The presence of air bubbles or micro-leaks can lead to:\nInconsistent fuel flow and pressure variations\nCavitation and premature wear of components\nErratic engine performance and starting issues\nPotential fuel leakage, posing fire or safety risks\nTraditionally, leak detection relied on manual visual inspection under submerged conditions. However, such methods are time-consuming, subjective, and less sensitive to micro-level defects.\n**Introducing the Bubble Leak Detection System (BLDS)**\nA Bubble Leak Detection System is an automated, camera-based inspection setup designed to detect and analyze the formation of bubbles in the fuel pump or FCU under controlled test conditions. It combines machine vision, pressure testing, and AI-based analytics to accurately identify even minute leaks that would otherwise go unnoticed.\n**How It Works**\nSetup & Pressurization:\nThe FCU is submerged in the test chamber and subjected to a defined pressure profile.\n**Imaging & Detection:**\nThe vision system continuously monitors the surface. Any bubble formation indicates potential leakage.\n**AI-Driven Analysis:**\nThe software identifies bubble size, rate, and origin using deep learning or optical flow algorithms.\n**Leak Localization & Reporting:**\nThe system pinpoints the exact leak point and automatically generates a digital test report with timestamps and video evidence.\n**Advantages of Automated Bubble Leak Detection**\n✅ High Sensitivity: Detects micro-leaks smaller than 10 microns.\n✅ Repeatability: Eliminates human error and subjectivity.\n✅ Traceability: Automatically logs inspection data for quality audits.\n✅ Non-Destructive Testing (NDT): No physical damage to components.\n✅ Faster Throughput: Enables high-speed testing in production environments.\n**Applications in Fuel Pump & FCU Manufacturing**\nThe BLDS is widely used in:\nAerospace FCU testing for turbine engines\nAutomotive fuel pump quality control\nHydraulic component testing\nInjector and valve leak validation.",
          category: "Industrial AI",
          technologies: ["OpenCV", "Leak Detection", "Python", "Image Processing"],
          imageUrl: "/Images/Bosch/Image__2025-04-15__09-59-10_.jpg",

          
          additionalImages: [
            "/Images/Bosch/Image__2025-04-15__09-59-14_.jpg",
            "/Images/Bosch/Image__2025-04-15__09-59-24_.jpg",
            "/Images/Bosch/Image__2025-04-15__09-59-28_.jpg",
            "/Images/Bosch/Image__2025-04-15__10-00-40_.jpg",
            "/Images/Bosch/Image__2025-04-15__10-00-49_.jpg",
            "/Images/Bosch/Image__2025-04-15__10-10-22_.jpg",
            "/Images/Bosch/Image__2025-04-15__10-10-47_.jpg",
            "/Images/Bosch/Image__2025-04-15__10-11-00_.jpg",
            "/Images/Bosch/Image__2025-04-15__10-12-21_.jpg",
            "/Images/Bosch/Image__2025-04-15__10-13-50_.jpg",
            "/Images/Bosch/Image__2025-04-15__10-15-43_.jpg",
            "/Images/Bosch/Image__2025-04-15__10-15-45_.jpg",
            "/Images/Bosch/Image__2025-04-15__10-24-29_.jpg",
            "/Images/Bosch/Image__2025-04-15__10-36-24_.jpg",
            "/Images/Bosch/Image__2025-04-15__11-29-40_.jpg",
          ],


          githubUrl: "https://github.com/example/barcode-qc",
          featured: false
      },  


      
      {
        title: "Pharmaceutical Blister Pack  OCR Inspection",
        description: "In the pharmaceutical industry, precision and traceability are non-negotiable. Every blister pack must carry accurate information — including batch number, manufacturing date, and expiry date — to ensure patient safety and regulatory compliance. Even the smallest misprint or missing character can lead to product recalls, compliance failures, and brand damage.\nTo address these challenges, manufacturers are turning to automated vision-based Blister Pack Inspection Systems, powered by Optical Character Recognition (OCR) and deep learning.\n**Why Blister Pack Inspection Is Critical**\nPharmaceutical packaging lines handle high-speed printing of variable data like:\nBatch numbers\nManufacturing and expiry dates\nBarcodes or QR codes\nLot codes and serial numbers\nPrinting errors may occur due to:\nInkjet nozzle clogging\nRibbon wear in thermal printers\nMisalignment or smudging\nVariations in foil reflection and lighting\nManual inspection is time-consuming and prone to human error — making AI-driven vision systems essential for real-time verification.\n**Automated Vision-Based Blister Pack Inspection**\nA Pharmaceutical Blister Pack Inspection System uses high-speed cameras and AI algorithms to detect printing errors, OCR mismatches, and code defects in real-time as the packs move along the production conveyor.\n**Key Features**\n**1. Optical Character Recognition (OCR) & Verification (OCV):**\nReads batch code, manufacturing date, and expiry date using OCR.\nCompares recognized text with expected reference data from MES or ERP systems.\n**2. Misprint & Smudge Detection:**\nDetects incomplete, distorted, or blurred characters using image processing and pattern matching.\n**3. Barcode/QR Code Validation:**\nDecodes and verifies serialized barcodes as per GS1 or FDA DSCSA standards.\n**4. Color and Alignment Inspection:**\nEnsures proper printing location and color contrast for regulatory readability.\n**5. Automated Rejection Mechanism:**\nTriggers pneumatic ejector to remove defective packs instantly.",
        category: "Medical AI",
        technologies: ["PaddleOCR", "OpenCV", "Python", "Quality Control"],
        imageUrl: "/Images/USV/Ocr_res/results/v5/Image__2025-05-01__13-02-20 (copy)_preprocessed_img_.jpg",
        
        additionalImages: [
          "/Images/USV/Ocr_res/results/v3/2_.jpg",
          "/Images/USV/Ocr_res/results/v3/11_.jpg",
          "/Images/USV/Ocr_res/results/v5/Image__2025-06-03__16-55-46_ocr_res_img_.jpg",
          "/Images/USV/Ocr_res/results/v5/Image__2025-05-01__13-01-01 (copy)_ocr_res_img_.jpg",
          "/Images/USV/Ocr_res/results/v5/Image__2025-05-01__13-01-25_ocr_res_img_.jpg",
          "/Images/USV/Ocr_res/results/v5/Image__2025-06-03__16-55-48_ocr_res_img_.jpg",
        ],

        githubUrl: "https://github.com/example/pharma-inspection",
        featured: false
      },



      
      // {
      // title: "Barcode Detection & Quality Control",
      //   description: "Automated barcode scanning and validation system with OK/NG status flagging. Implements real-time barcode matching with quality assessment for manufacturing workflows.",
      //   category: "Industrial AI",
      //   technologies: ["OpenCV", "ZBar", "Python", "Image Processing"],
      //   imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop",
      //   githubUrl: "https://github.com/example/barcode-qc",
      //   featured: false
      // },  

 
     
      
      // {
      //   title: "Autonomous Vehicle Vision",
      //   description: "Real-time object detection and lane tracking system for autonomous vehicles using YOLO and advanced filtering algorithms.",
      //   category: "Computer Vision",
      //   technologies: ["YOLO", "OpenCV", "ROS"],
      //   imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
      //   githubUrl: "https://github.com/example/autonomous-vision",
      //   featured: true
      // },
 
   
    ];

    initialProjects.forEach(project => this.createProject(project));

    // Seed blog posts
    const initialBlogPosts: InsertBlogPost[] = [
      {
        title: "Introduction to Transformer: Self-Attention and Multi-Head Attention",
        slug: "transformer-architecture-computer-vision",
        excerpt: "A comprehensive guide Transformersrevolutionized and how they're revolutionizing AI World.",
        content: `## What is a Transformer\nTransformer is a neural network architecture that has fundamentally changed the approach to Artificial Intelligence. Transformer was first introduced in the seminal paper '**Attention is All You Need**' in 2017 and has since become the go-to architecture for deep learning models, powering text-generative models like **OpenAI's GPT, Meta's Llama, and Google's Gemini**. Beyond text, Transformer is also applied in ** audio generation, image recognition, protein structure prediction, and even game playing**, demonstrating its versatility across numerous domains.\n\nFundamentally, text-generative Transformer models operate on the principle of **next-token prediction: given a text prompt from the user, what is the most probable next token (a word or part of a word) that will follow this input?** The core innovation and power of Transformers lie in their use of  **self-attention mechanism**, which allows them to process entire sequences and capture long-range dependencies more effectively than previous architectures.\nGPT-2 family of models are prominent examples of text-generative Transformers.\n ## Transformer Architecture  ![Transfrmer](/Images/transformers.webp) \n Every text-generative Transformer consists of these **three key components:**\n\n  **1.Embedding:** Text input is divided into smaller units called tokens, which can be words or subwords. These tokens are converted into numerical vectors called embeddings, which capture the semantic meaning of words\n\n **2.Transformer Block:** is the fundamental building block of the model that processes and transforms the input data. Each block includes:\n\n  **a). Attention Mechanism,** the core component of the Transformer block. It allows tokens to communicate with other tokens, capturing contextual information and relationships between words.\n\n  **b). MLP (Multilayer Perceptron) Layer,**  a feed-forward network that operates on each token independently. While the goal of the attention layer is to route information between tokens, the goal of the MLP is to refine each token's representation.\n\n**3.Output Probabilities:** The final linear and softmax layers transform the processed embeddings into probabilities, enabling the model to make predictions about the next token in a sequence.\n\n ## Embedding\n\n Let's say you want to generate text using a Transformer model. You add the prompt like this one: “Data visualization empowers users to”. This input needs to be converted into a format that the model can understand and process. That is where embedding comes in: it transforms the text into a numerical representation that the model can work with. To convert a prompt into embedding, we need to 1) tokenize the input, 2) obtain token embeddings, 3) add positional information, and finally 4) add up token and position encodings to get the final embedding.\n\n Let see how each of these steps is done.
        ![Transformer Diagram](/Images/embedding.png) \n\n **Step 1: Tokenization**\n\nTokenization is the process of breaking down the input text into smaller, more manageable pieces called tokens. These tokens can be a word or a subword. The words "Data" and "visualization" correspond to unique tokens, while the word "empowers" is split into two tokens. The full vocabulary of tokens is decided before training the model: GPT-2's vocabulary has 50,257 unique tokens. Now that we split our input text into tokens with distinct IDs, we can obtain their vector representation from embeddings\n\n **Step 2. Token Embedding**\n\n GPT-2 (small) represents each token in the vocabulary as a 768-dimensional vector; the dimension of the vector depends on the model. These embedding vectors are stored in a matrix of shape (50,257, 768), containing approximately 39 million parameters! This extensive matrix allows the model to assign semantic meaning to each token, in the sense that tokens with similar usage or meaning in language are placed close together in this high-dimensional space, while dissimilar tokens are farther apart.\n\n **Step 3. Positional Encoding**\n\n The Embedding layer also encodes information about each token's position in the input prompt. Different models use various methods for positional encoding. GPT-2 trains its own positional encoding matrix from scratch, integrating it directly into the training process.\n\n **Step 4. Final Embedding**\n\n Finally, we sum the token and positional encodings to get the final embedding representation. This combined representation captures both the semantic meaning of the tokens and their position in the input sequence.\n\n ## Transformer Block\n\nThe core of the Transformer's processing lies in the Transformer block, which comprises multi-head self-attention and a Multi-Layer Perceptron layer. Most models consist of multiple such blocks that are stacked sequentially one after the other. The token representations evolve through layers, from the first block to the last one, allowing the model to build up an intricate understanding of each token. This layered approach leads to higher-order representations of the input. The GPT-2 (small) model we are examining consists of 12 such blocks.\n\n ## Multi-Head Self-Attention\n\n The self-attention mechanism enables the model to capture relationships among tokens in a sequence, so that each token’s representation is influenced by the others. Multiple attention heads allow the model to consider these relationships from different perspectives; for example, one head may capture short-range syntactic links while another tracks broader semantic context. In the following section, we will walk through how multi-head self-attention is computed step by step.\n\n ## Step 1: Query, Key, and Value Matrices. ![QKV-img](/Images/QKV-img.png)\n\n  Each token's embedding vector is transformed into three vectors: **Query (Q), Key (K), and Value (V)**These vectors are derived by multiplying the input embedding matrix with learned weight matrices for **Q, K, and V**. Here's a web search analogy to help us build some intuition behind these matrices:\n\n**1. Query (Q)** is the search text you type in the search engine bar. This is the token you want to "find more information about."\n\n**2. Key (K)** is the title of each web page in the search result window. It represents the possible tokens the query can attend to.\n\n**3. Value (V)** is the actual content of web pages shown. Once we matched the appropriate search term (Query) with the relevant results (Key), we want to get the content (Value) of the most relevant pages.\n\n By using these QKV values, the model can calculate attention scores, which determine how much focus each token should receive when generating predictions.\n\n ## Step 2: Multi-Head Splitting \n\nQuery, key, and Value vectors are split into multiple heads—in GPT-2 (small)'s case, into 12 heads. Each head processes a segment of the embeddings independently, capturing different syntactic and semantic relationships. This design facilitates parallel learning of diverse linguistic features, enhancing the model's representational power.\n\n  ## Step 3: Masked Self-Attention\n\n In each head, we perform masked self-attention calculations. This mechanism allows the model to generate sequences by focusing on relevant parts of the input while preventing access to future tokens. ![Masked_Self_Attention](/Images/Masked_Self_Attention.png)\n\n **Dot Product:** The dot product of Query and Key matrices determines the attention score, producing a square matrix that reflects the relationship between all input tokens.
        \n\n **Scaling-Mask:**  The attention scores are scaled and a mask is applied to the upper triangle of the attention matrix to prevent the model from accessing future tokens, setting these values to negative infinity. The model needs to learn how to predict the next token without “peeking” into the future.\n\n **Softmax · Dropout:**  After masking and scaling, the attention scores are converted into probabilities by the softmax operation, then optionally regularized with dropout. Each row of the matrix sums to one and indicates the relevance of every other token to the left of it.\n\n ## Step 4: Output and Concatenation\n\n The model uses the masked self-attention scores and multiplies them with the Value matrix to get the final output of the self-attention mechanism. GPT-2 has 12 self-attention heads, each capturing different relationships between tokens. The outputs of these heads are concatenated and passed through a linear projection.\n\n ## MLP: Multi-Layer Perceptron ![MLP](/Images/MLP.png)\n\n After the multiple heads of self-attention capture the diverse relationships between the input tokens, the concatenated outputs are passed through the Multilayer Perceptron (MLP) layer to enhance the model's representational capacity. The MLP block consists of two linear transformations with a **GELU** activation function in between.\n\n The first linear transformation expands the dimensionality of the input four-fold from 768 to 3072. This expansion step allows the model to project the token representations into a higher-dimensional space, where it can capture richer and more complex patterns that may not be visible in the original dimension.\n\n The second linear transformation then reduces the dimensionality back to the original size of 768.This compression step brings the representations back to a manageable size while retaining the useful nonlinear transformations introduced in the expansion step.\n\n Unlike the self-attention mechanism, which integrates information across tokens, the MLP processes tokens independently and simply maps each token representation from one space to another, enriching the overall model capacity.\n\n ##Output Probabilities\n\n After the input has been processed through all Transformer blocks, the output is passed through the final linear layer to prepare it for token prediction. This layer projects the final representations into a 50,257 dimensional space, where every token in the vocabulary has a corresponding value called logit. Any token can be the next word, so this process allows us to simply rank these tokens by their likelihood of being that next word. We then apply the softmax function to convert the logits into a probability distribution that sums to one. This will allow us to sample the next token based on its likelihood. ![Output_prob](/Images/Output_prob.png)
        \n\n The final step is to generate the next token by sampling from this distribution The temperature hyperparameter plays a critical role in this process. Mathematically speaking, it is a very simple operation: model output logits are simply divided by the temperature:\n\n **temperature = 1:** Dividing logits by one has no effect on the softmax outputs.\n\n **temperature < 1:** Lower temperature makes the model more confident and deterministic by sharpening the probability distribution, leading to more predictable outputs.\n\n **temperature > 1:** Higher temperature creates a softer probability distribution, allowing for more randomness in the generated text – what some refer to as model “creativity”.\n\n In addition, the sampling process can be further refined using top-k and top-p parameters: \n\n **top-k sampling:** Limits the candidate tokens to the top k tokens with the highest probabilities, filtering out less likely options.\n\n **top-p sampling:** Considers the smallest set of tokens whose cumulative probability exceeds a threshold p, ensuring that only the most likely tokens contribute while still allowing for diversity.\n\n By tuning temperature, top-k, and top-p, you can balance between deterministic and diverse outputs, tailoring the model's behavior to your specific needs.\n\n ## Auxiliary Architectural Features\n\n There are several auxiliary architectural features that enhance the performance of Transformer models. While important for the model's overall performance, they are not as important for understanding the core concepts of the architecture. Layer Normalization, Dropout, and Residual Connections are crucial components in Transformer models, particularly during the training phase. Layer Normalization stabilizes training and helps the model converge faster. Dropout prevents overfitting by randomly deactivating neurons. Residual Connections allows gradients to flow directly through the network and helps to prevent the vanishing gradient problem.\n\n ## Layer Normalization\n\n Layer Normalization helps to stabilize the training process and improves convergence. It works by normalizing the inputs across the features, ensuring that the mean and variance of the activations are consistent. This normalization helps mitigate issues related to internal covariate shift, allowing the model to learn more effectively and reducing the sensitivity to the initial weights. Layer Normalization is applied twice in each Transformer block, once before the self-attention mechanism and once before the MLP layer.\n\n ## Dropout\n\n Dropout is a regularization technique used to prevent overfitting during training. It works by randomly deactivating a fraction of the neurons in the network during each training iteration. This forces the model to learn more robust features and prevents it from relying too heavily on any single neuron. In Transformer models, dropout is applied after the self-attention mechanism and the MLP layer, helping to improve generalization to unseen data.\n\n ## Residual Connections\n\n Residual Connections are skip connections that allow the input to bypass certain layers and be added directly to the output. This helps to alleviate the vanishing gradient problem, allowing gradients to flow more easily through the network during backpropagation. In Transformer models, residual connections are used around both the self-attention mechanism and the MLP layer, ensuring that important information is preserved and facilitating deeper architectures.\n\n ## Conclusion\n\n The Transformer architecture has revolutionized the field of artificial intelligence, enabling significant advancements in natural language processing and beyond. Its innovative use of self-attention mechanisms allows for efficient handling of long-range dependencies in data, making it a powerful tool for various applications. As research continues, we can expect further enhancements and adaptations of this architecture, solidifying its role as a cornerstone of modern AI development.
        \n\n **Acknowledgements** \n\n Special thanks to: \n\n - The authors of *Attention Is All You Need* \n\n **Credits** \n\n This article is adapted from **Transformers Explainers**.  
        \n\n All credit for the original explanation goes to the original author.`,
        category: "Deep Learning",
        imageUrl: "/Images/transformers.webp",
        // githubUrl: "https://github.com/example/multi-oc136019-21780ecad995?w=800&h=300&fit=crop",
        readTime: 8,
        published: true
      },


      {
        title: "Active Learning",
        slug: "what-is-active-learning-and-why-should-we-use-it",
        excerpt: "Discover active learning, a cost-effective machine learning method that boosts accuracy with fewer labels. Learn how it transforms AI training!",
        content: "# 🚀 Active Learning — The Smart Way to Train AI Faster\n\nIn a traditional AI training workflow, you collect a huge dataset, label everything, train your model, and hope it performs well in production. But here’s the problem — most of that data isn’t equally valuable. Some images, videos, or text samples don’t teach your model anything new, while a few tricky cases can dramatically improve performance.\n\nActive Learning flips this process. Instead of labeling everything blindly, your model itself identifies the most informative or “confusing” samples and asks you to label those first. This means less labeling, faster training, and better results with fewer resources.\n\n ## What is active learning?   ![Active](/Images/ai-glossary-active-learning.jpg) \n\n Active learning is an iterative machine learning technique where the model picks out the most important data points to label from a large pool of unlabeled data. These selected data points are manually labeled and added to the training dataset.\n\n The model is then retrained on the updated dataset and selects the next set of data points to label. This process repeats, with the model continually improving by focusing on the most informative data points. The cycle continues until the model either reaches the desired accuracy or meets the labeling criteria set in advance.\n\n **Principles of Active Learning**\n\n Active learning operates under the premise that a machine learning model can perform better with less training if it is allowed to choose the data from which it learns. This approach is particularly useful when labeled data is scarce or expensive to obtain. Active learning involves a query strategy to select the most informative samples, which are then labeled by an oracle (typically a human annotator) and added to the training set.\n\n ## Active Learning Strategies\n\n ## 1. Uncertainty Sampling\n\nThe model picks the unlabeled samples it is least confident about. There are different ways to see how uncertain the model is:\n\n**Least Confident Score:** The model targets the sample where it is least sure about its most likely guess. For example, if in a 3-class problem, the model predicts probabilities like (0.4, 0.3, 0.3) for one sample and (0.9, 0.05, 0.05) for another. It will choose the first one because the model is less confident about its top guess.\n\n **Margin Sampling**: The model selects examples with the smallest gap between the probabilities of the two most likely classes. This helps find cases where the model is unsure about its top options.\n\n **Entropy Sampling:** The model picks the instance with the highest entropy in its prediction. High entropy means the model's guesses are spread out across many classes and have a higher level of uncertainty.\n\n ## 2. Query-by-Committee (QBC)\n\n QBC strategy uses an ensemble of multiple models. Each model is trained on the current labeled data, but they might make different decisions due to variations in initialization or architecture.\n\nAll the models make predictions on unlabeled data points to select data to learn from next. QBC then picks the data point where the models disagree the most, because this shows they are unsure or confused about that point.\n\n ## 3. Diversity-Based Sampling\n\n Although uncertainty sampling focuses on the most difficult examples for the model, it can sometimes choose very similar data points.\n\n Diversity-based sampling aims to select a group of data points that are uncertain, different from each other, and represent the overall data. This is often done by using data features or embeddings.\n\n The process might first filter uncertain samples, then use clustering methods to group these samples. Alternatively, it can select a diverse set using a core-set approach based on their features.\n\n This helps cover more data variety and prevents the model from focusing on a small subset of data.\n\n ## 4. Expected Model Change / Expected Error Reduction \n\n The expected model change is another general active learning framework that uses a decision-theoretic approach. It involves selecting the instance that would impart the most change to the current model if we knew its label.\n\n On the other hand, the expected error reduction measures how much a model's mistakes are likely to be reduced in the future, rather than just how much the model might change now.\n\n The idea is to estimate the model's future error when trained with current labeled data plus a new sample from unlabeled data. The sample expected to minimize the most errors is selected for labeling.\n\n ## Active Learning in Practice: Computer Vision Use Cases \n\n Active learning is useful for computer vision tasks because labeling data is a bottleneck. Here are some of its common use cases:\n\n ## Image Classification  ![classification](/Images/Active-learning-framework-to-improve-classification-accuracy.png) \n\n Active learning greatly reduces the number of images that need labeling for image classification by focusing on the most uncertain images. \n\n For example, a model built to classify different dog breeds might struggle to distinguish between a Siberian Husky and an Alaskan Malamute.\n\n Instead of labeling thousands of random dog pictures, an active learning system would query the specific images where it's unsure between these two breeds. This way, the model quickly learns the subtle features that separate them by getting human input on these difficult pictures.\n\n ## Object Detection\n\n Labeling images for an object detection task is expensive as it requires identifying the presence of objects and drawing precise boxes around them. It demands a high level of attention to detail. Meeting this demand needs specialized tools and trained annotators, which further increases the cost and effort involved.\n\n Active learning helps by finding the images where the model is uncertain or likely to make mistakes, so those can be labeled first.\n\n For example, the model might be uncertain about a pedestrian partially hidden in the shadows at dusk or a cyclist seen from an unusual angle.The active learning system flags these kinds of images so labelers can work on them next. It improves the model by catching and fixing complex cases and increasing its accuracy and reliability in real-life situations.\n\n ## Semantic Segmentation \n\n Semantic segmentation requires labeling every pixel in an image, which makes it time-consuming. Active learning helps by selecting images or even specific regions that yield the highest uncertainty.\n\n For example, in medical imaging, a model that identifies tumors in MRI scans might be unsure about the exact boundaries of a tumor. \n\n The active learning system would then show these unclear areas to a radiologist to get them labeled accurately. It allows the expert to focus on the most critical pixels, which speeds up the process of creating a highly accurate segmentation model.\n\n ## Active learning requirements\n\n One of the most important considerations when using active learning is the quality of the data. To be effective, the data must be well-distributed across different classes so that the algorithm can identify relevant examples easily. If the data isn’t well-distributed, then it may be difficult for the algorithm to find good examples of each class, which could lead to poorer performance on later predictions.\n\n ## The good and bad of active learning\n\n Active Learning performs best when it’s possible to find a good representative of the data set (i.e., one with a high margin or low complexity). It also scales well to large numbers of labelled instances while preserving computational resources by focusing on the most informative examples first. However, it requires some subject-matter knowledge about the task at hand in order to make an informed choice about which instance is best for labeling.\n\n The idea behind Active Learning is to have the user chooses which instance to annotate, hence choosing the most informative.\n\n First, let’s define what an active learner is – in the context of machine learning; it refers to a model that helps label AI training data by querying its owner. For example, if you are trying to build a spam detector, one approach would be to ask human users whether email messages are spam or not. If, however, you could ask only a subset of the users, this would be an active learning technique called “selective sampling”, since it selects instances based on their predicted usefulness for labeling.\n\n One advantage of selective sampling over full coverage is that it can save time and cost while achieving the same or better accuracy. The main disadvantages are that it requires an oracle to tell the difference between important data and redundant data and that it is only applicable when there are enough labels to be had elsewhere.\n\n  ## Conclusion \n\n Active Learning is a technique where the machine itself decides which are the most important data points to be labelled by a human. This has multiple benefits over traditional methods of Machine Learning. However, there’s still much research to be done in this area in order to determine which tasks and datasets are best suited for active learning approaches.\n\n One question that remains unanswered is whether or not Active Learning always outperforms traditional methods – this is still an open question that requires further study. Additionally, it’s also not clear how well Active Learning scales with increasing data sizes. More work is needed in order to better understand the benefits and limitations of Active Learning approaches. Despite these uncertainties, Active Learning is a promising field that has already shown great potential for improving the accuracy of Machine Learning models.\n\n **Summary – Active Learning:** Active Learning is a data selection strategy used in supervised machine learning. It helps reduce labeling costs by selecting the most informative samples from a large pool of unlabeled data. While it can be applied to deep learning models, it is not exclusive to them.",
        category: "Deep Learning",
        imageUrl: "/Images/ZliqCaWtHYXtT8Q-_ActiveLearning.png",
        readTime: 8,
        published: true
      },


      {
        title: "DINOv3: The Universal Vision Foundation Model Redefining Computer Vision",
        slug: "DINOv3",
        excerpt: "Dinov3- Meta AI's groundbreaking vision foundation model that delivers state-of-the-art performance across diverse tasks without fine-tuning.",
        content: "Computer vision is experiencing a transformative moment. Just as large language models revolutionized natural language processing, vision foundation models are changing how we approach visual understanding. Meta AI's DINOv3, released in August 2025, represents a major leap forward in this evolution—a truly universal vision backbone that delivers state-of-the-art performance across diverse tasks without requiring fine-tuning.\n\n ## What is DINOv3?\n\n DINOv3 (Distillation with No Labels v3) is a state-of-the-art self-supervised Vision Transformer (ViT) that learns visual representations without any human annotations. The model employs a teacher-student distillation approach where a massive 7 billion parameter teacher model learns from unlabeled images, and smaller student models then learn to replicate the teacher's outputs.\n\n What makes this remarkable is the scale and simplicity of the approach. DINOv3 employs self-supervised learning (SSL) at an unprecedented scale, training on 1.7 billion images with a 7 billion parameter architecture. The result is a foundation model that generates rich, transferable features applicable to virtually any computer vision task.\n\n ## The Evolution: From DINO to DINOv3\n\n The DINO family has been pivotal in advancing self-supervised learning for vision:\n\n**DINO (2021):** Introduced the groundbreaking concept that Vision Transformers could learn meaningful representations through self-distillation without labels.\n\n **DINOv2 (2023)**: Scaled the approach and demonstrated cross-domain capabilities without fine-tuning, becoming one of the most widely adopted vision backbones in the community.\n\n **DINOv3 (2025)**: Takes everything to an unprecedented scale, expanding from DINOv2's 1 billion parameters to 7 billion, and from 142 million training images to 1.7 billion.\n\n Each iteration fundamentally expanded what seemed possible with unlabeled visual data.\n\n ## Key Features & Innovations:\n\n **Self-Supervised Learning:** Learns from unlabeled data, reducing reliance on costly human annotations.\n\n **Universal Backbone:** One model supports many tasks (classification, segmentation, depth, etc.), replacing task-specific models.\n\n **Gram Anchoring:** A new loss function that stabilizes training and preserves high-quality, detailed (dense) features for long training periods, overcoming a limitation of DINOv2.\n\n **High-Resolution & Scaling:** Effectively processes large images (e.g., 4K), creating strong features for various domains, including satellite imagery.\n\n **Model Architecture:** Vision Transformer ViT-7B (7B params) teacher; distilled family of models (ViT-S, B, L, H+ up to 7B). Also: small ConvNeXt variants included in family.\n\n ## DINOv3 Architecture & Training \n\n DINOv3 is not only a model but also a model development method that follows multiple stages. Starting with data curation, the initial 17B images are filtered down to 1.7B images. Then the model is pretrained using self-supervised learning, followed by Gram anchoring and high-resolution fine-tuning to improve performance for dense tasks. Finally, the model is distilled to smaller model sizes for easier deployment.![Dino](/Images/dino.png)\n\n ## Architecture Highlights\n\n **Scale:** 7 billion parameters (6.7× larger than DINOv2)\n\n **Backbone**: Vision Transformer (ViT) with 40 layers\n\n **Key Innovation** : Rotary Position Embeddings (RoPE)\n\n **Enables flexible resolution: 256×256 to 4096×4096 pixels**\n\n  ## Model Family \n\nDistilled variants for practical deployment:\n\n ViT-Small (21M), Base (86M), Large (300M), Huge (840M), Giant (7B)\n\n ConvNeXt alternatives available.\n\n ## The Dense Feature Challenge and Gram Anchoring\n\n One of the most significant technical challenges DINOv3 addresses is the degradation of dense features during extended training. A key challenge in scaling DINOv3 was that while global representations kept improving, dense features degraded over time.\n\n Dense features are patch-level representations that preserve fine-grained details essential for tasks like segmentation, depth estimation, and object tracking. The breakthrough came with Gram Anchoring—a novel method that maintains stable, high-quality dense features throughout long training schedules. This innovation is crucial for DINOv3's exceptional performance on dense prediction tasks. ![QKV](/Images/aKS2y6Tt2nPbaepm_image6.png) \n\n ## Universal Performance Without Fine-Tuning\n\n  Perhaps the most impressive aspect of DINOv3 is its versatility. Throw any computer vision challenge at it — object detection, semantic segmentation, depth estimation, 3D understanding — and it delivers state-of-the-art results with zero fine-tuning.\n\n The model achieves this by producing features so rich and well-structured that they work as universal vision building blocks. You literally freeze the backbone and add lightweight task-specific heads—no expensive fine-tuning required. This represents a fundamental shift from the traditional approach of training specialized models for each task.\n\n ## ‍High Resolution Images \n\n The third improvement in DINOv3 focuses on high-resolution images and how they can boost the local feature quality. DINOv3 employs multiple tricks to learn as much as possible from high-resolution images. By passing high-resolution images to the Gram teacher and subsequently downsampling the output, a stronger learning signal is generated than if a lower-resolution image was used directly.\n\n Furthermore, the model is adapted to higher-resolution images by training on images with up to 768px resolution. The learned positional embeddings from DINOv2 are also replaced with RoPE positional embeddings and RoPE jittering for better stability across image scales and resolutions. Together, these changes result in stable feature maps at image resolutions above 4k.![High](/Images/High_res.png) \n\n ## DINOv3 Benchmark Performance ![Benchmark](/Images/Dnionv3_benchmarks.png) \n\n DINOv3 achieves SOTA performance across many tasks. In semantic segmentation it outperforms DINOv2 by +6 mIoU point on ADE20K, proving the excellent performance on dense tasks. It also generalizes well to tasks like video tracking (+6.7 J&F-Mean) and instance retrieval (+10.9 GAP).",
        category: "Deep Learning",
        imageUrl: "/Images/dinov3.png",
        readTime: 12,
        published: true
      },

      // {
      //   title: "Deploying ML Models at Scale: Docker, Kubernetes, and Beyond",
      //   slug: "deploying-ml-models-scale-docker-kubernetes",
      //   excerpt: "Best practices for deploying machine learning models in production environments with containerization and orchestration.",
      //   content: "# Deploying ML Models at Scale\n\nDeploying machine learning models in production requires careful consideration...",
      //   category: "MLOps",
      //   imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=300&fit=crop",
      //   readTime: 15,
      //   published: true
      // },
      // {
      //   title: "Advanced OCR with PaddleOCR: From Text Detection to Industrial Applications",
      //   slug: "advanced-ocr-paddleocr-industrial-applications",
      //   excerpt: "Exploring PaddleOCR capabilities for automotive VIN/EIN recognition, pharmaceutical label validation, and barcode processing in production environments.",
      //   content: "# Advanced OCR with PaddleOCR: From Text Detection to Industrial Applications\n\nOptical Character Recognition (OCR) has become a cornerstone technology in industrial automation and quality control. In this comprehensive guide, we'll explore how PaddleOCR can be leveraged for complex real-world applications including automotive part identification, pharmaceutical packaging validation, and automated quality control systems.\n\n## Why PaddleOCR?\n\nPaddleOCR stands out in the OCR landscape due to its exceptional accuracy, multilingual support, and lightweight architecture that makes it ideal for edge deployment. Unlike traditional OCR solutions, PaddleOCR combines text detection and recognition in a unified pipeline that delivers superior performance across various document types and image qualities.\n\n## Automotive Industry Applications\n\n### VIN and EIN Recognition\n\nIn automotive manufacturing, accurate identification of Vehicle Identification Numbers (VIN) and Engine Identification Numbers (EIN) is critical for quality control and traceability. Our implementation using PaddleOCR achieves 98.5% accuracy in extracting these alphanumeric codes from various surfaces including metal stampings, etched plates, and printed labels.\n\n### Implementation Strategy\n\n1. **Preprocessing Pipeline**: Image enhancement using OpenCV for noise reduction and contrast optimization\n2. **Text Detection**: PaddleOCR's DB (Differentiable Binarization) model for precise text localization\n3. **Recognition**: CRNN (Convolutional Recurrent Neural Network) for character sequence recognition\n4. **Validation**: Pattern matching against standard VIN/EIN formats with checksum verification\n\n## Pharmaceutical Quality Control\n\n### Blister Pack Inspection\n\nPharmaceutical manufacturing requires stringent quality control to ensure patient safety. Our PaddleOCR-based solution validates critical information on blister packaging:\n\n- **Batch Codes**: Ensuring traceability throughout the supply chain\n- **Lot Numbers**: Maintaining manufacturing batch integrity\n- **Expiry Dates**: Preventing distribution of expired products\n- **MRP (Maximum Retail Price)**: Regulatory compliance verification\n\n### Technical Implementation\n\nThe system processes high-resolution images of blister packs using a multi-stage approach:\n\n1. **Region of Interest Detection**: Automated identification of text regions using computer vision\n2. **OCR Processing**: PaddleOCR extracts text with confidence scoring\n3. **Data Validation**: Rule-based verification against regulatory standards\n4. **Quality Flagging**: Automatic OK/NG status determination\n\n## Barcode Integration and Quality Control\n\n### Hybrid Approach\n\nCombining traditional barcode scanning with OCR creates a robust identification system:\n\n- **Primary**: Barcode scanning for rapid identification\n- **Secondary**: OCR for human-readable verification\n- **Validation**: Cross-referencing both methods for maximum accuracy\n\n### Quality Control Workflow\n\n1. **Image Acquisition**: High-resolution capture of product labels\n2. **Dual Processing**: Simultaneous barcode and OCR analysis\n3. **Data Correlation**: Matching extracted information\n4. **Status Determination**: OK flag for matches, NG for discrepancies\n5. **Reporting**: Detailed logs for quality assurance\n\n## Performance Optimization\n\n### Edge Deployment\n\nFor real-time industrial applications, we've optimized PaddleOCR for edge computing:\n\n- **Model Quantization**: Reducing model size while maintaining accuracy\n- **GPU Acceleration**: Leveraging CUDA for faster inference\n- **Batch Processing**: Optimizing throughput for high-volume scenarios\n\n### Accuracy Metrics\n\nOur implementations achieve industry-leading performance:\n\n- **VIN Recognition**: 98.5% accuracy across various surface types\n- **Pharmaceutical Labels**: 99.2% accuracy with regulatory compliance\n- **Barcode Validation**: 99.8% match rate with OCR verification\n\n## Future Developments\n\n### AI-Powered Enhancement\n\nWe're exploring integration with large language models for:\n\n- **Context Understanding**: Improved validation through semantic analysis\n- **Error Correction**: Intelligent correction of OCR misreads\n- **Adaptive Learning**: Continuous improvement through feedback loops\n\n## Conclusion\n\nPaddleOCR's versatility and accuracy make it an excellent choice for industrial OCR applications. From automotive part tracking to pharmaceutical quality control, the technology enables automated, reliable text recognition that meets stringent industry standards.\n\nThe combination of advanced preprocessing, robust recognition algorithms, and intelligent validation creates systems that not only match but often exceed human performance in text recognition tasks, while providing the consistency and speed required for modern manufacturing environments.",
      //   category: "Tutorial",
      //   imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=300&fit=crop",
      //   readTime: 18,
      //   published: true
      // }
    ];

    initialBlogPosts.forEach(post => this.createBlogPost(post));
  }

  async getProjects(category?: string): Promise<Project[]> {
    const allProjects = Array.from(this.projects.values());
    if (category && category !== "All") {
      return allProjects.filter(project => project.category === category);
    }
    return allProjects;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      id,
      title: insertProject.title,
      subtitle: insertProject.subtitle || null,
      description: insertProject.description,
      category: insertProject.category,
      technologies: insertProject.technologies as string[],
      imageUrl: insertProject.imageUrl || null,
      additionalImages: insertProject.additionalImages as string[] || null,
      githubUrl: insertProject.githubUrl || null,
      liveUrl: insertProject.liveUrl || null,
      featured: insertProject.featured || false,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async getBlogPosts(published?: boolean): Promise<BlogPost[]> {
    const allPosts = Array.from(this.blogPosts.values());
    if (published !== undefined) {
      return allPosts.filter(post => post.published === published);
    }
    return allPosts;
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async searchBlogPosts(query: string): Promise<BlogPost[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.blogPosts.values()).filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm)
    );
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const blogPost: BlogPost = {
      ...insertBlogPost,
      id,
      publishedAt: new Date(),
      createdAt: new Date(),
      published: insertBlogPost.published || false,
      imageUrl: insertBlogPost.imageUrl || null
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
      subject: insertContact.subject || null
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.currentSkillId++;
    const skill: Skill = {
      id,
      name: insertSkill.name,
      category: insertSkill.category,
      icon: insertSkill.icon,
      description: insertSkill.description,
      technologies: insertSkill.technologies as string[],
      color: insertSkill.color
    };
    this.skills.set(id, skill);
    return skill;
  }
}

export const storage = new MemStorage();

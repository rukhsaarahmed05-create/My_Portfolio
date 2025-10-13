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
      {
        title: "Medical Image Analysis",
        subtitle: "AI-Powered Pneumonia Detection System",
        description: "CNN-based system for automated detection of pneumonia in chest X-rays with 95% accuracy using transfer learning.",
        category: "Medical AI",
        technologies: ["PyTorch", "ResNet", "OpenCV"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
        additionalImages: [
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
          "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop"
        ],
        githubUrl: "https://github.com/example/medical-ai",
        liveUrl: "https://medical-ai-demo.com",
        featured: true
      },


      {
        title: "Automated Defect Detection on Shiny Metal Parts: From Faucets to Sanitary Ware",
        subtitle: "AI-Powered cracks and Dents Detection System",
        description: "Shiny metal components like faucets, taps, shower fittings, and sanitary ware must meet the highest standards of surface finish and durability. Even small defects such as cracks, dents, scratches, or water marks can compromise quality and result in costly rework or rejection. Traditional manual inspection struggles with reflective surfaces and tiny imperfections, making AI-powered defect detection a powerful solution.\n In this post, we’ll walk through the complete workflow of building a defect detection system for shiny metal parts — covering data acquisition, defect labeling, model training, multi-camera inspection, and deployment.\n\n**Common Defects in Shiny Metal Parts**\nCracks – fine lines or fractures that weaken the structure.\nDents – visible depressions caused during machining or handling.\nSurface Defects – scratches, abrasions, or uneven polishing.\nHoles – unwanted gaps or voids in cast or machined parts.\nUnfinished Parts – incomplete machining or missing polishing steps.\nWater Marks – spots or stains left during cleaning or plating.\nEach defect can appear differently depending on lighting, viewing angle, or polish level, making inspection especially challenging.\n\n**Step 1: Data Acquisition**\nSince shiny surfaces reflect light, capturing defects consistently is the biggest challenge. A multi-camera setup is used:\nMultiple View Angles: Top, side, and oblique views ensure no defect is hidden.\nControlled Lighting: Diffused dome or ring lights minimize glare and highlight surface inconsistencies.\nHigh-Resolution Cameras: Industrial cameras capture fine cracks and surface textures.\nTriggering System: Parts are placed on a rotating jig or conveyor, and synchronized cameras capture frames.\nThis results in a rich dataset covering all possible defect orientations.\n**Step 2: Data Annotation**\nDefect regions are annotated using bounding boxes, polygons, or segmentation masks.\nClasses include crack, dent, scratch, hole, unfinished, watermark.\nAnnotation tools like CVAT, Labelme, or Supervisely help create consistent labels.\nSince defects can be tiny, pixel-level annotation (segmentation) often works better than just bounding boxes.\n**Step 3: Model Training**\nFor shiny metal defect detection, a combination of object detection and anomaly detection works best:\nObject Detection (YOLOv8, Faster R-CNN): For visible, localized defects like dents or holes.\nSegmentation Models (U-Net, Mask R-CNN, Segment Anything): For detailed defect area localization\n**Step 4: Multi-Camera Inference Pipeline\nFor shiny metal parts like faucets and sanitary ware, a single camera cannot cover the full geometry due to reflections and hidden surfaces. To overcome this, the inspection system uses three synchronized cameras and a rotary mechanism:\n**Trigger-Based Capture**\nA rotary fixture holds the part and rotates it 360° in fixed increments.\nAt each rotation step, a trigger signal synchronizes all three cameras to capture images simultaneously.\nThis ensures complete coverage from three perspectives (front, side, angled view)\n**Image Processing Flow**\nEach camera sends images to the inference server.\nThe defect detection model (YOLO, Anomalib, or hybrid) analyzes every frame for cracks, dents, scratches, water marks, etc.\nResults are timestamped and indexed with the camera ID + rotation angle.\n**Multi-View Fusion**\nDefect detections are aggregated across all cameras and rotation steps\nIf any camera detects a defect at any angle, the part is flagged as NG (Not Good).\nOtherwise, after completing the full 360° rotation, the part is classified as OK.\n**Real-Time Feedback**\nThe system communicates with a PLC or rejection mechanism\nNG parts are automatically separated from the conveyor/assembly line.\nA dashboard UI displays the captured views, defect highlights (bounding boxes/heatmaps), and final decision\nThis multi-camera + rotary setup ensures 100% surface coverage with minimal blind spots, even for highly reflective metallic parts.",
        category: "Manufacturing AI",
        technologies: ["PyTorch", "ResNet", "OpenCV"],
        imageUrl: "/images/jaquar2/2025-08-25_15-01-18.jpg",
        
        
        additionalImages: [
          "/images/jaquar2/2025-08-20_14-38-51.jpg",
          "/images/jaquar2/2025-08-20_14-44-54.jpg",
          "/images/jaquar2/2025-08-20_15-18-59.jpg",
          "/images/jaquar2/2025-08-21_15-01-22.jpg",
          "/images/jaquar2/2025-08-21_09-46-23.jpg",
          "/images/jaquar2/2025-08-21_10-35-50.jpg",
          "/images/jaquar2/2025-08-21_16-53-45.jpg",
          "/images/jaquar2/2025-08-22_10-34-19.jpg",
          "/images/jaquar2/2025-08-22_13-52-06.jpg",
          "/images/jaquar2/2025-08-21_17-55-12.jpg",
          "/images/jaquar2/2025-08-23_11-07-57.jpg",
          "/images/jaquar2/2025-08-22_14-59-10.jpg",
          "/images/jaquar2/2025-08-25_16-16-33.jpg",
          "/images/jaquar2/2025-08-26_11-15-51.jpg"      
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
        imageUrl: "/images/Image__2025-05-08__14-13-33_ocr_res_img.jpg",
        additionalImages: [
          "/images/OCR/Image__2025-05-08__14-12-30_ocr_res_img.jpg",
          "/images/OCR/Image__2025-05-08__14-13-06_ocr_res_img.jpg",
          "/images/OCR/Image__2025-05-08__14-12-30_ocr_res_img.jpg",
          "/images/OCR/Asti/OCR/NG/Image__2025-05-08__16-11-30.jpg.png",
          "/images/OCR/Asti/OCR/OK/Image__2025-05-08__14-13-18.jpg.png",
          "/images/OCR/Asti/OCR/OK/Image__2025-05-08__14-13-27.jpg.png",
        
        ],
        featured: false
      },
    


      {
        title: "Smart PCB Component Verification with DINOv2",
        subtitle: "Vision Transformer-Based Quality Control",
        description: "In modern electronics manufacturing, speed and precision are everything. Even the smallest assembly defect—like a capacitor flipped the wrong way or a missing transistor—can lead to costly failures down the line. Traditionally, these checks require manual inspection or basic rule-based vision systems, which often miss subtle misalignments or orientation errors.I built a deep learning–powered PCB classification system using Meta’s DINOv2 Vision Transformer, designed to verify component placement at the ROI (Region of Interest) level with high accuracy.\n\n**Why ROI-Level Classification?**\n\nInstead of trying to judge the entire PCB at once, I focused on component-specific inspection. Each capacitor, transistor, or critical component is extracted as an ROI and analyzed individually. This approach improves accuracy, simplifies training, and allows fine-grained defect detection.\n\n**What My System Checks For**\n\n1. Component Presence – Detect if capacitors, transistors, or other parts are missing from their designated positions.\n2. Component Orientation – Ensure capacitors are installed correctly, with the correct polarity.\n3. Component Alignment – Verify that components are properly aligned and spaced according to design guidelines.\n4. Component Count – Confirm that the correct number of components are present on the PCB.\n5. Component Quality – Identify defects in components such as scratches, cracks, or misaligned pins.\n\n**How It Works**\n\n**Image Preprocessing**: The system first preprocesses the image to enhance contrast and remove noise. This includes resizing, color normalization, and applying filters to highlight key features.\n2.**Region of Interest (ROI) Extraction**: Using a bounding box approach, the system identifies and extracts individual components from the PCB image. This ensures that each component is analyzed independently.\n3.**Vision Transformer Model**: The DINOv2 model processes each ROI to classify it as either good or bad. The model is trained on a dataset of good and bad components, and it uses a confidence threshold to determine if a component is acceptable.\n4.**Post-Processing**: After the model has made its predictions, a post-processing step is applied to refine the results. This includes applying a non-maximum suppression algorithm to remove overlapping bounding boxes and applying a confidence threshold to the predictions.\n\n## **Why DINOv2?**\n\n**Self-Supervised Learning**: Learns from massive, diverse image datasets without needing millions of PCB-specific images.\n\n**Strong Generalization**: Performs well even with limited labeled defect data.\n\n**Fine Detail Recognition**: The transformer architecture captures both **global layout** and **tiny local changes**—perfect for component orientation checks.\n\n**Results**\n\nThe system achieved an accuracy of 98.5% in classifying components as either good or bad. This is a significant improvement over traditional vision systems, which often have an accuracy of around 80%.",
        category: "Industrial AI",
        technologies: ["Vision Transformers", "Robust Augmentation Pipeline ", "FlashAttention"],
        imageUrl: "/images/PCB/Ng/pcb Defet.png",
        additionalImages: [
          "/images/PCB/Ng/1.png",
          "/images/PCB/Ng/2.png", 
          "/images/PCB/Ng/3.png",
          "/images/PCB/ok/3.png",
        ],
        githubUrl: "https://github.com/example/medical-ai",
        liveUrl: "https://medical-ai-demo.com",
        featured: true
      },


      {
        title: "AI-Powered Engine Assembly Block Inspection",
        subtitle: "No More Manual Inspection ",

        description: "**Introduction**\n\nIn modern automotive manufacturing, the engine assembly block is one of the most critical components. Any missing part, misplaced element, or incorrectly installed component can compromise performance, cause costly recalls, and even lead to safety hazards.\n\nManual inspection is slow, labor-intensive, and prone to human error. This is where AI-powered visual inspection comes in — ensuring that every component is exactly where it should be, at production-line speeds.\n\n**Core Inspection Objectives**\n\nOur AI inspection system is designed to verify:\n\n1.Presence & Absence Detection – Confirm that every required component is installed.\n2.Position Verification – Ensure each part is placed in its correct location within the engine block.\n3.Orientation Check – Identify components that are flipped or incorrectly aligned.\n\n**How It Works**\n\n**1. Image Acquisition**\nHigh-resolution industrial cameras capture detailed images of the engine block from multiple angles.\n**2. Feature Extraction**Using computer vision techniques, the system identifies key visual features for each component—edges, contours, textures, and shapes—to create unique signatures for each part.\n**3. Object Detection & Localisation**An object detection model (e.g., YOLO, Faster R-CNN) locates each component within the assembly block image. This allows:\nPrecise bounding box localisation of each part\nChecking if the detected part falls inside its expected region\n\n4. Count & Presence Verification\nFor each component type:\nExpected Count (e.g., 10 bolts, 4 circlips, 2 gaskets) is stored in the system.\nDetected Count is calculated from object detection results.\nIf counts match and all detected parts are inside their correct positions → OK\nIf counts mismatch or any part is missing/misplaced → Fail\n\n**Example Use Cases**\n\nIn our deployment for an automotive manufacturing line, the system successfully:\nVerified that all bolts, circlips, and sensors were present and in correct positions.\nDetected missing coolant pipe seals before final assembly.\nIdentified misaligned mounting brackets that could cause vibration issues.\nFlagged extra or misplaced bolts that could damage the block during operation.",
        category: "Computer Vision",  
        technologies: ["Object Detecion ", "Augmentation ", "Feature Extraction"],
        imageUrl: "/images/Result_objDetUI/Screenshot from 2025-08-23 16-33-32.png",
        additionalImages: [
          "/images/honda/Screenshot from 2024-11-07 17-37-02.png",
          "/images/honda/Screenshot from 2024-11-07 18-38-47.png", 
          "/images/honda/Screenshot from 2024-11-07 18-41-01.png",
          "/images/honda/Screenshot from 2025-02-12 12-09-22.png",
          "/images/honda/Screenshot from 2025-02-12 12-09-41.png ",
        ],
        githubUrl: "https://github.com/example/medical-ai",
        liveUrl: "https://medical-ai-demo.com",
        featured: true
      },


      {
        title: "AI-Powered Surface Defect Detection in Manufacturing",
        description: "In precision manufacturing, the quality of a product’s surface is not just about aesthetics — it’s a critical factor for durability, performance, and customer satisfaction. Even the smallest defect can lead to structural weakness, premature wear, or product rejection.\nOur AI-based Surface Defect Detection system is designed to identify surface irregularities, dents, and scratches — from large visible marks to micro-level imperfections — in real-time on production lines.\n\n**Types of Defects Detected**\n1.Surface Irregularities – Imperfections formed during casting, molding, or finishing processes.\n2.Scratches – Linear damage from handling, machining, or assembly.\n3.Dents – Depressions of varying depths and sizes, from large indentations to very small micro-dents.\n4.Small-Scale Anomalies – Subtle, hard-to-spot defects that traditional inspection methods often miss.\n\n**Project Workflow**\n**1. High-Quality Data Preparation**\nA successful defect detection system begins with quality training data:\nCapturing high-resolution images using industrial-grade cameras.\nDiverse datasets covering different lighting conditions, angles, and surface textures.\nDetailed annotation of defects, including bounding boxes and depth labels for dents.\n\n2.**Advanced Image Processing**\nBefore feeding images into the AI model, preprocessing enhances defect visibility:\nContrast enhancement to highlight subtle surface variations.\nEdge detection to make scratches and fine dents more apparent.\nNoise reduction to avoid false positives.\n\n**3. Defect Detection Model**\nAn AI-driven detection model is trained to:\nLocate defects (bounding box/localisation).\nClassify the type of defect (dent, scratch, irregularity).\nEstimate severity for dents based on depth and size.\n\n**4. Depth & Size Analysis for Dents**\nUsing 3D surface mapping or shadow-based intensity analysis, the system can:\nDistinguish shallow cosmetic dents from deep structural damage.\nPrioritise defects for repair or rejection.\n\n**Real-World Benefits**\nPrecision — Detects even micro-defects invisible to the naked eye.\nSpeed — Processes each product in milliseconds without slowing production.\nConsistency — Removes human subjectivity from quality control.\nCost Efficiency — Prevents defective products from reaching customers.\n\n**Example Deployment**\nIn a metal automotive part inspection line, our system:\nDetected hairline scratches missed by manual QC.\nIdentified tiny impact dents that could lead to paint cracking.\nFlagged surface irregularities caused by improper molding pressure.\n\n**Conclusion**\nFrom high-quality data preparation to advanced image processing and real-time AI detection, our Surface Defect Detection system ensures every product meets the highest manufacturing standards. Whether it’s a deep dent or a barely visible scratch, our solution catches it before it leaves the factory — safeguarding both brand reputation and customer trust.",
        category: "Computer Vision",
        technologies: ["YOLO", "OpenCV", "ROS"],
        imageUrl: "/images/Minda/Screenshot from 2024-10-22 14-59-48 - Copy.png",

        additionalImages: [
          "/images/Minda/Screenshot from 2024-10-22 14-59-48.png",
          "/images/Minda/Screenshot from 2024-10-22 15-00-01.png",
          "/images/Minda/Screenshot from 2024-10-22 15-06-06.png",
          "/images/Minda/Screenshot from 2024-10-22 15-00-05.png",
          "/images/Minda/Screenshot from 2024-10-22 14-56-49.png",
          "/images/Minda/Screenshot from 2024-10-22 14-57-29.png",
          "/images/Minda/Screenshot from 2024-10-22 14-57-33.png",
          "/images/Minda/Screenshot from 2024-10-22 14-56-27.png",                    
        ],
        
        githubUrl: "https://github.com/example/autonomous-vision",
        featured: true
      },
     

      {
        title: "Crack and Damage Detection on Industrial Metal Parts: Ensuring Reliability and Safety",
        description:"Industrial metal parts are the backbone of manufacturing, automotive, aerospace, and heavy engineering industries. From gears and shafts to pipelines and machine components, these parts operate under extreme conditions—high loads, vibrations, and temperature variations. Over time, they are prone to cracks, corrosion, fatigue, and wear, which can compromise structural integrity and lead to costly failures.\n**Why Crack and Damage Detection Matters**\nSafety: Undetected cracks in critical components like turbines, aircraft parts, or pressure vessels can result in accidents or catastrophic failures.\nCost Savings: Early detection prevents expensive repairs, production downtime, and replacement costs.\nQuality Assurance: Ensures manufactured parts meet industry standards and customer requirements.\nPredictive Maintenance: Detecting early signs of damage enables industries to schedule maintenance before breakdowns occur.\n**Modern AI and Vision-Based Approaches**\nThe rise of computer vision and AI has transformed crack and defect detection:\nHigh-Resolution Imaging – Captures micro-level surface abnormalities.\nDeep Learning Models – Automatically classify defects like cracks, pits, corrosion, and deformation.\nReal-Time Monitoring – Cameras integrated with production lines for 24/7 inspection.\nPredictive Analytics – AI systems predict failure points based on historical defect data.",
        category: "Industrial  AI",
        technologies: ["Damage Detection", "Python", "OpenCV", "Crack Detection"],
        imageUrl: "/Images/Jaq1/Image__2025-03-29__15-32-30.jpg",

        additionalImages: [
         "/Images/Jaq1/Image__2025-03-29__15-32-30.jpg",
         "/Images/Jaq1/Image__2025-03-29__15-54-09.jpg",
         "/Images/Jaq1/Image__2025-03-29__16-02-12.jpg"        
        ],
        
        featured: false
      },
      
      {
        title: "Quality Control System",
        description: "**Automated Defect Detection in Watch Dials Using Anomalib**\nIn luxury watch manufacturing, quality is everything. Even the smallest defect—like a hairline scratch on the dial or a misprint on the day/date window—can impact both aesthetics and brand value. Traditional inspection methods rely on human inspectors under magnification, but this process is slow, subjective, and prone to errors\nWith advances in deep learning, we can now automate defect detection using anomaly detection frameworks such as Anomalib, an open-source library designed for visual anomaly detection in industrial settings.\n**Why Anomaly Detection for Watch Dials?**\nUnlike traditional classification or object detection tasks, defect detection in watch dials has a unique challenge:\nDefects are rare and unpredictable (e.g., scratches, smudges, misprints).\nThe majority of samples are normal (OK dials).\nAnnotating every possible defect type is impractical.\nAnomaly detection provides a solution by learning what a “good” watch dial looks like and flagging anything that deviates from that norm.\n**Highlighting Common Defects**\n**Scratches**\nFine scratches often appear on the dial surface or indices.\nAnomalib heatmaps highlight linear deviations from smooth textures.\n**Printing Defects (Day/Date)**\nMisalignment, missing ink, or double-printing on day/date apertures.\nAnomalib detects these as abnormal patterns since normal font shapes are well-learned.\n**Dust or Smudges**\nTiny particles or oil marks on the dial.\nDetected as local anomalies in otherwise clean surfaces.\n**Results & Benefits**\nHigh Precision: Detects even minute defects that human eyes may miss.\nAutomated Workflow: Can be integrated with inspection cameras on the assembly line.\nVisual Explainability: Heatmaps make it easy to understand where the defect is\nScalable: Works across different dial designs without retraining for each defect type.",
        category: "Industrial AI",
        technologies: ["TensorFlow", "CNN", "EdgeAI"],
        // imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
        imageUrl: "/images/titan/Screenshot from 2024-08-07 14-30-55.png",

        additionalImages: [
          "/Images/titan/images/bad/0.png",
          "/Images/titan/images/bad/3.png",
          "/Images/titan/images/bad/7.png",
          "/Images/titan/images/bad/4.png",
          "/Images/titan/images/bad/5.png",
          "/Images/titan/images/bad/8.png",
          "/Images/titan/images/bad/9.png",
          "/Images/titan/images/bad/11.png",  
          "/Images/titan/images/bad/12.png",
          "/Images/titan/images/bad/13.png",
          "/Images/titan/images/bad/18.png",
          "/Images/titan/images/bad/20.png",
          "/Images/titan/images/bad/42.png",
          "/Images/titan/images/bad/48.png",
          "/Images/titan/images/good/21.png",
          "/Images/titan/images/bad/27.png"

        ],
        githubUrl: "https://github.com/example/quality-control",
        featured: true
      },


      {
        title: "Rice Instance Segmentation: Transforming Quality Assessment in the Food Industry",
        description: "In the food industry, quality is everything. When it comes to cereal grains like rice, wheat, and corn, the physical size, shape, and appearance quality directly influence their market value. Traditionally, grading and quality inspection of rice grains rely heavily on manual labor, which is not only time-consuming but also subjective. With the rise of artificial intelligence and computer vision, instance segmentation has emerged as a cutting-edge solution to automate this process with speed and precision.\n**Why Grain Quality Matters**\nRice is a staple food for more than half the world’s population. Its quality is evaluated based on parameters such as:\nSize and length of individual grains\nShape and uniformity (e.g., long-grain, short-grain)\nDefects like broken grains, chalkiness, or discoloration\nPurity (detecting foreign materials or mixed varieties)\nEven small variations in these features can significantly affect pricing, consumer acceptance, and brand reputation.\n**What is Instance Segmentation in Rice Analysis?**\nInstance segmentation is a computer vision technique that detects and outlines each individual grain in an image, assigning a unique mask to it. Unlike simple image classification or bounding-box detection, instance segmentation provides pixel-level separation of grains, enabling precise measurements of their properties.\nFor rice inspection, this means:\nSeparation of overlapping grains in a pile\nAccurate measurement of grain dimensions (length, width, aspect ratio)\nDefect identification at the grain level (cracks, chalky spots, broken kernels)\n\n**How It Works**\n**Image Acquisition**\nHigh-resolution cameras capture images of rice samples under controlled lighting.\n**Data Annotation**\nRice grains are labeled with polygon masks, distinguishing individual grains—even when overlapping.\n**Model Training**\nState-of-the-art models like Mask R-CNN, Detectron2, or YOLACT are trained on annotated rice datasets.\n**Inference & Feature Extraction**\nDuring inspection, the trained model segments each grain, calculates dimensions, and identifies defects.\nPost-processing algorithms compute statistics like average grain length, broken grain ratio, and defect percentage.\n\n**Benefits of Rice Instance Segmentation**\nAutomated Grading – Consistent and objective quality assessment, free from human bias.\nSpeed & Scalability – Thousands of grains can be analyzed in seconds.\nCost Reduction – Less reliance on manual inspection.\nTraceability – Digital grain profiles stored for quality reports and audits.\n\n**Real-World Applications**\nRice Mills: Automated sorting of high-quality vs. broken grains.\nExport Quality Control: Ensuring international grade compliance.\nResearch & Breeding: Analyzing grain morphology for improved crop varieties.\nRetail & Packaging: Guaranteeing consistent quality in branded rice products.",
        category: "Computer Vision",
        technologies: ["YOLO", "OpenCV", "ROS"],
        imageUrl: "/images/Rice.png",
        // imageUrl:"/Images/Rice/Image__2025-05-31__10-11-09.bmp",

        additionalImages: [
          "/images/sam-results/Rice-Results/Image__2025-05-31__10-00-17.png",
          "/images/sam-results/Rice-Results/Image__2025-05-31__10-01-40.png",  
          "/images/sam-results/Rice-Results/Image__2025-05-31__10-02-05.png",                 
          // "/images/sam-results/Rice-Results/Image__2025-05-31__10-06-30.png",
          "/images/sam-results/Rice-Results/Image__2025-05-31__10-02-45.png",
          "/images/sam-results/Rice-Results/Image__2025-05-31__10-03-27.png",
          "/images/sam-results/Rice-Results/Image__2025-05-31__10-04-28.png",
          "/images/sam-results/Rice-Results/Image__2025-05-31__10-05-27.png",
          "/images/sam-results/Rice-Results/Image__2025-05-31__10-07-20.png",
          "/images/sam-results/Rice-Results/Image__2025-05-31__10-10-58.png"

          
          // "/images/sam-results/Rice-Results/Image__2025-07-30__16-24-33.png"  
        
        ],

        githubUrl: "https://github.com/example/autonomous-vision",
        featured: true
      },


      {
        title: "OCR System for Automotive EIN/VIN Recognition: A Step Toward Smarter Vehicle Inspectionn",
        description: "In the automotive industry, accuracy and traceability are critical. From manufacturing plants to service centers, every vehicle part must be validated against its identity to ensure compliance, prevent counterfeiting, and streamline quality control. One key component of this process is EIN (Engine Identification Number) and VIN (Vehicle Identification Number) recognition. Traditionally, this task has been handled manually — but modern Optical Character Recognition (OCR) systems are revolutionizing the process\n\n**Why EIN and VIN Recognition Matters**\n-Traceability: VIN and EIN provide a digital fingerprint for vehicles and engines, linking them to manufacturing data, service history, and ownership records.\n-Quality Control: During production, OCR systems verify whether the right engine is installed in the correct vehicle.\n-Fraud Prevention: Automatic recognition helps detect tampered or fake identification numbers.\n-Efficiency: Manual inspection is time-consuming and error-prone, whereas OCR systems offer near real-time verification.\n\n**Challenges in Automotive OCR**\n**Varying Surfaces:**EINs may be stamped on rough metal, while VINs appear on stickers, engravings, or plates.\n**Lighting Conditions:**Factory floors have inconsistent lighting, reflections, or glare that interfere with recognition.\n**Font Variations**Different manufacturers use unique fonts, spacing, and layouts.\n**Noise and Distortion:**Dust, scratches, oil, or physical wear can obscure numbers.\nThese challenges demand a robust OCR pipeline capable of detecting, enhancing, and recognizing characters in real-world scenarios.\n\n**OCR System Architecture for VIN/EIN Recognition**\n\n**Image Acquisition**\n-Industrial cameras (e.g., Basler with Pylon SDK) capture high-resolution images of the target region.\n-Multi-camera setups allow parallel inspection of VIN plates, stickers, and engraved EINs.\n**Preprocessing & ROI Extraction**\n-OpenCV-based techniques enhance contrast, remove glare, and isolate the Region of Interest (ROI).\n-Methods like adaptive thresholding, morphological filtering, and perspective correction improve clarity.\n**OCR Engine**\nDeep Learning-based OCR (e.g., PaddleOCR, Tesseract with LSTM, or custom CNN models)recognizes alphanumeric characters.\n-Fine-tuned models handle specific fonts and noisy backgrounds.\n**Verification & Matching**\n-Recognized text is validated against ERP/MES databases.\n-Matching logic ensures the scanned EIN corresponds to the correct VIN in production records.\n**Real-time Integration**\n-Results are pushed into a factory system via APIs.\n-Feedback loops enable immediate alerts if mismatches are detected.\n\n**Key Benefits of Automotive OCR**\nAutomation: Eliminates manual entry and reduces operator errors.\nScalability: Handles thousands of vehicles daily with consistent performance.\nAccuracy: Achieves 95–99% recognition rates when combined with preprocessing and fine-tuning.\nTraceability & Compliance: Meets industry standards for production verification and fraud prevention.\n\n**Real-World Applications**\nAssembly Line Verification: Ensuring engines are matched with correct chassis.\nService Centers: Quick scanning of VIN for automated vehicle record lookup.\nCustoms & Border Control: Detecting fake or tampered VINs.\nAftermarket Industry: Verifying authenticity of used or replaced parts.\n\n🔑 Takeaway: An OCR system for automotive EIN/VIN recognition is not just about reading text — it’s about creating a smarter, automated, and reliable vehicle inspection ecosystem that bridges manufacturing, compliance, and customer trust.",
        category: "Automotive  AI",
        technologies: ["PaddleOCR", "Python", "OpenCV", "Text Recognition"],
        imageUrl: "/images/Screenshot from 2025-01-27 15-29-53 (1).png",
        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },


      {
        title: "Instance Segmentation for Defect Detection: A Game-Changer in Industrial Quality Control",
        description:"In today’s manufacturing and quality assurance pipelines, detecting defects with precision is critical. From microelectronics to automotive components, even the smallest defect can compromise reliability, safety, or performance. Traditional inspection methods—either manual or classical image processing—often fall short when faced with complex product variations, inconsistent lighting, or tiny anomalies.\nThis is where instance segmentation steps in as a powerful tool for defect detection.\n\n**What is Instance Segmentation?**\nInstance segmentation is a computer vision technique that not only detects objects within an image (like object detection) but also segments them at the pixel level. Unlike bounding boxes, which provide only a rough localization, instance segmentation provides fine-grained masks of individual objects and defects.\n For defect detection, this means:\nPrecisely localizing defects, even when they are irregularly shaped.\nDifferentiating between multiple defect instances within the same image.\nEnabling pixel-level analysis, which is critical for tiny cracks, scratches, or misalignments.\n\n**Why Instance Segmentation for Defect Detection?**\n**Pixel-Level Precision**\nDefects like scratches, cracks, and surface contamination don’t follow neat boundaries. Instance segmentation captures their true shape.\n**Multi-Defect Handling**\nIn real-world inspection, multiple defects may appear on the same part. Instance segmentation allows distinguishing and analyzing each instance separately.\n**Quantitative Insights**\nExtract features like defect area, orientation, or position for further statistical analysis.\n**Scalability Across Industries**\nElectronics (PCB inspection),\nAutomotive (dent or weld defect detection),\nTextile (stain and hole detection),\nPackaging (seal or print errors).",
        category: "Automotive  AI",
        technologies: ["PaddleOCR", "Python", "OpenCV", "Text Recognition"],
        imageUrl: "/images/sam-results/big/Image__2025-07-30__16-12-24.png",

        additionalImages: [
          "/images/sam-results/big/Image__2025-07-30__16-25-44.jpg",
          "/images/sam-results/big/Image__2025-07-30__16-13-27.png",  
          "/images/sam-results/big/Image__2025-07-30__16-25-59.png",                 
          "/images/sam-results/big/Image__2025-07-30__16-10-23.png",
          "/images/sam-results/big/Image__2025-07-30__16-18-31.jpg",
          "/images/sam-results/big/Image__2025-07-30__16-24-44.jpg",
          "/images/sam-results/big/Image__2025-07-30__16-23-55.jpg",
          "/images/sam-results/big/Image__2025-07-30__16-24-33.png"  
        
        ],
        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },




      {
        title: "AI-Powered Crankcase Inspection: Real-Time Detection, Counting, and Quality Assurance",
        description: "In modern manufacturing, quality and precision are non-negotiable. A single missing bolt, plug, or bearing in a crankcase assembly can compromise the reliability of the entire engine, leading to costly failures and downtime. Traditional manual inspections are time-consuming, error-prone, and difficult to scale.\nThis is where AI-powered crankcase inspection comes in. By leveraging advanced computer vision models like Object Detection, combined with image augmentations and real-time processing, enterprises can now automate detection, counting, and validation of crankcase components—ensuring every unit meets quality standards before leaving the assembly line.\n**Why AI for Crankcase Inspection?**\nThe crankcase is a critical component that houses and supports moving engine parts. Any deviation in assembly—such as missing bolts or incorrectly placed bearings—can cause:\n⚠️ Mechanical failures\n💸 Warranty claims and recalls\n⏳ Production delays\nAI inspection systems solve these challenges by providing:\nConsistent accuracy (no human fatigue or oversight)\nScalable quality control across multiple lines\nInstant OK/NG flagging for real-time decision-making\n **How the AI-Powered System Works**\n1. Training Object Detetection Models for Crankcase Components\nWe start with a large dataset of crankcase images. Each component—bolts, bearings, plugs, guides—is annotated. To improve model robustness, we apply data augmentation such as:\nRotation & perspective changes\nBlur and glare simulation\nNoise and contrast variations\nThe  model is fine-tuned on this dataset, enabling it to detect components accurately even under challenging shop-floor conditions.\n2. Real-Time Detection & Counting\nOnce trained, the model runs in real time:\nCamera captures crankcase assembly images.\n Trained Modeel  detects all visible components.\nA post-processing logic counts each class of component.\nFor example:\nGround truth (expected): {\"Bolt\": 6, \"Bearing\": 2, \"Plug\": 1} \nPredicted: {\"Bolt\": 6, \"Bearing\": 1, \"Plug\": 1}\nIf counts match → OK ✅\nIf mismatch → NG ❌\nBusiness Impact of AI-Powered Inspection\n**Scalability**\nHandles high production volumes.\nEasily retrained for new crankcase designs.\n**Cost Efficiency**\nPrevents defective crankcases from shipping.\nCuts down on rework, warranty claims, and recalls.\n**Faster Production**\nReal-time inspection keeps pace with assembly lines\nReduces bottlenecks compared to manual checks.\n**Data-Driven Insights**\nHistorical inspection logs highlight recurring issues.\nHelps identify supplier defects or process inefficiencies.\n**Real-World Applications**\nAutomotive Manufacturing: Automated inspection of crankcase assemblies in car and truck production.\nAerospace: Ensuring crankcase housings meet strict aviation standards.\nHeavy Equipment: Detecting missing or misaligned parts in crankcases for tractors, excavators, and industrial engines.\nConclusion\nAI-powered crankcase inspection is transforming manufacturing quality control. By combining Object Detection Models detection power, robust image augmentation techniques, and real-time processing, enterprises can achieve zero-defect manufacturing, cut costs, and scale operations with confidence.",
        category: "Automotive  AI",
        technologies: ["Object Detection", "Python", "OpenCV", "Image Processing"],
        imageUrl: "/Images/Result_objDetUI/Screenshot from 2025-08-23 18-07-32.png",
       
        additionalImages: [  
          "/Images/Hero2/17.jpg",
          "/Images/Hero2/18.jpg",
          "/Images/Hero2/32.jpg",
          "/Images/Hero2/131.jpg",
          "/Images/Hero2/87.jpg",
          "/Images/Hero2/122.jpg",
          "/Images/Hero2/33.jpg",
          "/Images/Hero2/31.jpg",
          "/Images/Hero2/144.jpg",
        
        ],
        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },



      {
        title: "AI-Powered Engine OCR: Automating Text and Number Recognition in Manufacturing",
        description: "In today’s smart factories, precision and traceability are as important as quality. Every engine produced must carry a unique set of identifiers—such as serial numbers, VIN codes, and batch IDs—that ensure traceability across the supply chain. Traditionally, these identifiers are read and verified manually, which is:\nSlow\nError-prone\nHard to scale\nWith AI-powered Optical Character Recognition (OCR), manufacturers can now automate the reading and verification of engine numbers, ensuring 100% accuracy, speed, and compliance in real time.\n**Why Engine OCR Matters**\nEngines are stamped or engraved with critical identifiers, but these markings often come with challenges:\nNon-uniform surfaces (metal textures, engravings)\nVariable lighting in factory environments\nDirt, oil, or glare obstructing the text\nDifferent fonts and character styles\nMissing or misreading a single digit can cause traceability failures, leading to warranty disputes, compliance violations, and massive losses.\nEngine OCR solves this by using computer vision + deep learning to reliably detect and read text under challenging real-world conditions.\n**How the Solution Works**\n**1. Image Capture**\nHigh-resolution industrial cameras capture engine surfaces in real time.\nMultiple angles and lighting adjustments ensure visibility of all engraved or printed text.\n**2. Preprocessing & Augmentations**\nRaw images undergo preprocessing for maximum readability:\nContrast enhancement\nGlare and reflection removal\nAdaptive thresholding\nPerspective correction\nThese steps make text clearer before OCR runs.\n**3. OCR with Deep Learning**\nWe integrate state-of-the-art OCR models like PaddleOCR, Tesseract with deep learning backends, or transformer-based OCR models. These models extract engine identifiers such as:\nEngine Number\nVIN Code\nBatch/Serial IDs\n**4. Verification & Validation**\nExtracted text is compared with ERP/MES system records:\n✅ If text matches expected values → OK\n❌ If mismatch or unreadable → NG, triggering alerts for manual inspection.\n**Business Benefits of Engine OCR**\nTraceability at Scale\nEvery engine gets verified instantly.\nEnsures compliance with industry regulations and warranty requirements.\n**Error Reduction**\nEliminates human mistakes in reading complex alphanumeric codes.\n**Speed & Efficiency**\nInspections run in real time, keeping pace with production lines.\n**Cost Savings**\nPrevents defective or mislabeled engines from shipping.\nReduces warranty claims and legal disputes.\n**Analytics & Insights**\nOCR logs provide traceability across the entire supply chain.\n**Real-World Applications**\nAutomotive Plants: Reading and validating VINs & engine serials at assembly.\nHeavy Machinery: Ensuring engines are tracked from production to delivery.\nAerospace: Verifying engraved part IDs for compliance with safety standards.\n**Conclusion**\nAI-powered Engine OCR is redefining how manufacturers handle traceability and compliance. By combining high-resolution imaging, preprocessing, and deep learning-based OCR models, enterprises can ensure every engine is properly identified, logged, and verified—at scale, in real time. ",
        category: "Automotive  AI",
        technologies: ["OCR", "Python", "OpenCV", "Image Processing"],
        imageUrl: "/Images/Hero-ocrold/78.jpg",
       

        additionalImages: [  
        "/Images/Hero-ocrold/6388.png",
        "/Images/Hero-ocrold/6401.png",
        "/Images/Hero-ocrold/6405.png",
        "/Images/Hero-ocrold/6406.png",
        "/Images/Hero-ocrold/6410.png",
        "/Images/Hero-ocrold/6414.png",
        "/Images/Hero-ocrold/6417.png",
        "/Images/Hero-ocrold/6419.png",
        "/Images/Hero-ocrold/6422.png",
        "/Images/Hero-ocrold/6424.png",
        "/Images/Hero-ocrold/6426.png",
        
        ],
        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },


      {
        title: "Cylinder Head Inspection Systems: Ensuring Accuracy, Alignment, and Assembly",
        description: "The cylinder head is one of the most critical components in an engine. It houses valves, spark plugs, fuel injectors, and ensures proper combustion efficiency. For optimal performance, every element of the cylinder head assembly—from bolts and nuts to gaskets and valve trains—must be correctly installed and aligned. Even a single missing or misaligned component can compromise engine performance, reduce lifespan, or cause severe mechanical failures.\n**Why Cylinder Head Inspection Is Important**\nSafety and Reliability – Misaligned or missing bolts and nuts can cause leaks, overheating, or pressure failures.\nPerformance Assurance – Proper assembly ensures efficient combustion and smooth operation.\nCost Reduction – Prevents expensive warranty claims, rework, and production downtime.\nQuality Control – Maintains consistent assembly standards across large-scale manufacturing.\n**Key Functions of Cylinder Head Inspection Systems**\n✅ Presence Detection: Verifying that all bolts, nuts, and fasteners are present in the correct locations.\n✅ Alignment Verification: Ensuring parts such as camshafts, valves, and guides are correctly positioned.\n✅ Torque and Fitment Checks: Confirming that bolts are not just present, but tightened to the correct specification.\n✅ Surface and Seal Inspection: Detecting gaps, scratches, or surface irregularities that may affect sealing.\n**Technologies Used in Cylinder Head Inspection**\n**Machine Vision Systems**\nHigh-resolution cameras capture images of the assembly.\nAI models detect missing or incorrectly placed components.\n**Applications in the Automotive Industry**\nAssembly Verification: Ensures all cylinder head bolts and nuts are properly fixed.\nEngine Line QA: Automated systems integrated into conveyor lines for real-time inspection.\nPredictive Maintenance: Early detection of potential misalignments or weak assemblies.\nRegulatory Compliance: Meeting strict automotive safety and emission standards.",
        category: "Automotive  AI",
        technologies: ["Detection", "Python", "OpenCV", "Image Processing"],
        imageUrl: "/Images/Cylinder_Head/0.jpg",
       

        additionalImages: [
          "/Images/Cylinder_Head/3.jpg",
          "/Images/Cylinder_Head/7.jpg",
          "/Images/Cylinder_Head/8.jpg",
          "/Images/Cylinder_Head/10.jpg",
          "/Images/Cylinder_Head/11.jpg",
          "/Images/Cylinder_Head/13.jpg",
          "/Images/Cylinder_Head/16.jpg",
          "/Images/Cylinder_Head/18.jpg",
          "/Images/Cylinder_Head/11.jpg"         
        ],

        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },



      {
        title: "OCR for Electric Meter Glass Reading — Reliable, Robust, and Production-ready",
        description: "Reading electric meters behind glass is a deceptively hard OCR problem. Reflections, curvature, dirt, multiple text types (digits, unit labels, serial numbers), and inconsistent lighting all combine to trip up simple OCR systems. In this post I’ll walk through a practical, end-to-end approach for building a robust OCR pipeline for electric meter glass reading that reads all text, handles horizontal text, and uses careful post-processing to turn raw OCR outputs into reliable meter readings.\n**Why meter-glass OCR is challenging**\nReflections & glare from ambient light and camera flash obscure digits.\nGlass curvature / perspective distorts characters.\nMultiple text types: numeric counters, labels (kW·h, serial numbers), small printed text.\nVarying fonts & spacing: mechanical counters, seven-seg digits, printed text.\nPartial occlusions & dirt on the glass.\n**High-level pipeline overview**\nImage acquisition — controlled capture settings (exposure, polarizer, angle).\nPreprocessing — glare removal, dewarping, denoising, contrast enhancement.\nText detection — find all regions containing text (separate digits from labels).\nText orientation handling — detect and normalize horizontal text (and rotated text if present).\nRecognition (OCR) — digit and text recognition with models tuned to meter styles.\nPost-processing — parsing, error correction, unit/value normalization, confidence scoring and validation.\n**Text detection: find everything worth reading**\nDeep learning detectors: EAST, CRAFT or newer text detectors locate words/lines robustly and handle various fonts. These are particularly good where text and digits coexist.\nTwo-stage strategy: run a generic text detector to get candidate regions, then apply a smaller classifier to separate counter digits from auxiliary text (serials/labels). This helps apply specialized OCR models per class.",
        category: "Automotive  AI",
        technologies: ["OCR", "Python", "OpenCV", "Image Processing"],
        imageUrl: "/Images/energy_meter/Image__2024-12-21__11-12-44.jpg",
      

        additionalImages: [
          "/Images/energy_meter/result3.jpg",
          "/Images/energy_meter/result9.jpg",
          "/Images/energy_meter/result10.jpg",
          "/Images/energy_meter/result6.jpg",
          "/Images/energy_meter/result7.jpg",
          "/Images/energy_meter/result8.jpg",
          "/Images/energy_meter/result11.jpg",
          "/Images/energy_meter/result5.jpg",
          "/Images/energy_meter/ result54.jpg",          
        ],

        githubUrl: "https://github.com/example/automotive-ocr",
        featured: false
      },

     
      {
        title: "🧠 Defect Detection on Glass Bottles Using AI and Computer Vision",
          description: "🚀 Introduction \n In the manufacturing industry, quality control is one of the most crucial stages of production — especially in sectors like beverages, pharmaceuticals, and cosmetics, where glass bottles are widely used. Even minor defects such as cracks, scratches, bubbles, or inclusions can compromise the product’s integrity, safety, and brand reputation.\n Traditionally, defect detection has relied on manual inspection, which is labor-intensive, subjective, and prone to human error. However, with the rapid advancement of computer vision and artificial intelligence (AI), it is now possible to automate this process with high accuracy, speed, and consistency.\n **⚙️ Common Types of Glass Bottle Defects**\n Before diving into the solution, it’s important to understand the types of defects manufacturers aim to detect:\n **Cracks and Fractures:**\nFine lines or breaks in the bottle structure that can cause leaks or breakage.\n**Bubbles and Inclusions:**\nAir bubbles or foreign particles trapped within the glass during production.\n**Chips and Scratches:**\nSurface-level damage usually caused during handling or transportation.\n**Deformation:**\nBottles with irregular shapes due to improper molding or temperature control.\n**Contamination:**\nResidues, stains, or external particles inside or outside the bottle.\n**🤖 How AI-Based Defect Detection Works**\nModern defect detection systems leverage AI-powered image processing pipelines. Here's how it typically works:\n**1. Image Acquisition**\nHigh-resolution cameras (e.g., Basler, FLIR) capture multiple images of each bottle — often from different angles using a rotary inspection setup. Controlled lighting ensures consistent visibility of transparent or reflective glass surfaces.\n**2. Preprocessing**\nCaptured images are enhanced using OpenCV-based preprocessing techniques:\nBackground subtraction\nContrast enhancement\nEdge detection\nNoise filtering\n**3. Feature Extraction or Deep Learning**\nThere are two popular approaches:\n**Classical Computer Vision:**\nAlgorithms like Hough Transform, Canny Edge Detection, and Contour Analysis are used to identify irregularities.\n**Deep Learning (Modern Approach):**\nCNN-based architectures such as YOLOv8, ResNet, or DINOv2 Vision Transformers can automatically learn defect features.\nThese models can classify regions as OK or NG (Not Good) and even localize the defect with bounding boxes or segmentation masks.\n**4. Model Training and Inference**\nThe model is trained on a large dataset of labeled bottle images — containing examples of both defective and defect-free bottles. Once trained, the AI system can detect and classify defects in real time during production.\n**5. Integration with PLC or Automation Systems**\nWhen a defect is detected, the system can send a signal to a PLC (Programmable Logic Controller) to trigger an ejector mechanism that removes the defective bottle from the conveyor line.\n**🏁 Conclusion**\nAI-powered defect detection systems are transforming the glass manufacturing industry. By combining high-resolution imaging, deep learning, and industrial automation, companies can achieve near-perfect quality control, minimize waste, and enhance customer satisfaction.\nInvesting in AI-based inspection today is not just about automation — it’s about building a smarter, more reliable, and future-ready manufacturing ecosystem.",
          category: "Manufacturing and Industrial AI",
          technologies: ["OpenCV", "Defect Detection", "Python", "Image Processing"],
          imageUrl: "/Images/Glass_Bottle_Inspection/osw2 (1).png",
         
          additionalImages: [
            "/Images/Glass_Bottle_Inspection/Image__2025-09-04__18-43-08.bmp",  
            "/Images/Glass_Bottle_Inspection/Image__2025-09-04__18-43-59.bmp",
            "/Images/Glass_Bottle_Inspection/Image__2025-09-06__12-57-41.bmp",
            "/Images/Glass_Bottle_Inspection/Image__2025-09-15__15-58-54.bmp",
            "/Images/Glass_Bottle_Inspection/Image__2025-09-15__15-59-31.bmp",
            "/Images/Glass_Bottle_Inspection/Image__2025-09-15__16-02-11.bmp",
            "/Images/Glass_Bottle_Inspection/Image__2025-09-15__16-03-00.bmp",        
          ],

          githubUrl: "https://github.com/example/barcode-qc",
          featured: false
        },  



      {
        title: "Bubble Leak Detection System in Fuel Pump FCU: Ensuring Reliability in Fuel Control Units",
          description: "In modern aerospace and automotive applications, Fuel Control Units (FCUs) play a critical role in precisely metering fuel flow to the engine. Any form of leakage or air bubble formation inside the FCU can severely impact its performance, efficiency, and safety. To address this, industries are now adopting automated Bubble Leak Detection Systems (BLDS) — a cutting-edge solution that ensures the integrity of fuel systems during production and quality testing.\n**Understanding the Problem: Why Bubbles Matter**Fuel pumps and FCUs are designed for high-precision fuel delivery under strict tolerances. The presence of air bubbles or micro-leaks can lead to:\nInconsistent fuel flow and pressure variations\nCavitation and premature wear of components\nErratic engine performance and starting issues\nPotential fuel leakage, posing fire or safety risks\nTraditionally, leak detection relied on manual visual inspection under submerged conditions. However, such methods are time-consuming, subjective, and less sensitive to micro-level defects.\n**Introducing the Bubble Leak Detection System (BLDS)**\nA Bubble Leak Detection System is an automated, camera-based inspection setup designed to detect and analyze the formation of bubbles in the fuel pump or FCU under controlled test conditions. It combines machine vision, pressure testing, and AI-based analytics to accurately identify even minute leaks that would otherwise go unnoticed.\n**How It Works**\nSetup & Pressurization:\nThe FCU is submerged in the test chamber and subjected to a defined pressure profile.\n**Imaging & Detection:**\nThe vision system continuously monitors the surface. Any bubble formation indicates potential leakage.\n**AI-Driven Analysis:**\nThe software identifies bubble size, rate, and origin using deep learning or optical flow algorithms.\n**Leak Localization & Reporting:**\nThe system pinpoints the exact leak point and automatically generates a digital test report with timestamps and video evidence.\n**Advantages of Automated Bubble Leak Detection**\n✅ High Sensitivity: Detects micro-leaks smaller than 10 microns.\n✅ Repeatability: Eliminates human error and subjectivity.\n✅ Traceability: Automatically logs inspection data for quality audits.\n✅ Non-Destructive Testing (NDT): No physical damage to components.\n✅ Faster Throughput: Enables high-speed testing in production environments.\n**Applications in Fuel Pump & FCU Manufacturing**\nThe BLDS is widely used in:\nAerospace FCU testing for turbine engines\nAutomotive fuel pump quality control\nHydraulic component testing\nInjector and valve leak validation.",
          category: "Industrial AI",
          technologies: ["OpenCV", "Leak Detection", "Python", "Image Processing"],
          imageUrl: "/Images/Bosch/Image__2025-04-15__09-59-10.jpg",

          
          additionalImages: [
            "/Images/Bosch/Image__2025-04-15__09-59-14.jpg",
            "/Images/Bosch/Image__2025-04-15__09-59-24.jpg",
            "/Images/Bosch/Image__2025-04-15__09-59-28.jpg",
            "/Images/Bosch/Image__2025-04-15__10-00-40.jpg",
            "/Images/Bosch/Image__2025-04-15__10-00-49.jpg",
            "/Images/Bosch/Image__2025-04-15__10-10-22.jpg",
            "/Images/Bosch/Image__2025-04-15__10-10-47.jpg",
            "/Images/Bosch/Image__2025-04-15__10-11-00.jpg",
            "/Images/Bosch/Image__2025-04-15__10-12-21.jpg",
            "/Images/Bosch/Image__2025-04-15__10-13-50.jpg",
            "/Images/Bosch/Image__2025-04-15__10-15-43.jpg",
            "/Images/Bosch/Image__2025-04-15__10-15-45.jpg",
            "/Images/Bosch/Image__2025-04-15__10-24-29.jpg",
            "/Images/Bosch/Image__2025-04-15__10-36-24.jpg",
            "/Images/Bosch/Image__2025-04-15__11-29-40.jpg",
          ],


          githubUrl: "https://github.com/example/barcode-qc",
          featured: false
      },  


      
      {
        title: "Pharmaceutical Blister Pack  OCR Inspection",
        description: "In the pharmaceutical industry, precision and traceability are non-negotiable. Every blister pack must carry accurate information — including batch number, manufacturing date, and expiry date — to ensure patient safety and regulatory compliance. Even the smallest misprint or missing character can lead to product recalls, compliance failures, and brand damage.\nTo address these challenges, manufacturers are turning to automated vision-based Blister Pack Inspection Systems, powered by Optical Character Recognition (OCR) and deep learning.\n**Why Blister Pack Inspection Is Critical**\nPharmaceutical packaging lines handle high-speed printing of variable data like:\nBatch numbers\nManufacturing and expiry dates\nBarcodes or QR codes\nLot codes and serial numbers\nPrinting errors may occur due to:\nInkjet nozzle clogging\nRibbon wear in thermal printers\nMisalignment or smudging\nVariations in foil reflection and lighting\nManual inspection is time-consuming and prone to human error — making AI-driven vision systems essential for real-time verification.\n**Automated Vision-Based Blister Pack Inspection**\nA Pharmaceutical Blister Pack Inspection System uses high-speed cameras and AI algorithms to detect printing errors, OCR mismatches, and code defects in real-time as the packs move along the production conveyor.\n**Key Features**\n**1. Optical Character Recognition (OCR) & Verification (OCV):**\nReads batch code, manufacturing date, and expiry date using OCR.\nCompares recognized text with expected reference data from MES or ERP systems.\n**2. Misprint & Smudge Detection:**\nDetects incomplete, distorted, or blurred characters using image processing and pattern matching.\n**3. Barcode/QR Code Validation:**\nDecodes and verifies serialized barcodes as per GS1 or FDA DSCSA standards.\n**4. Color and Alignment Inspection:**\nEnsures proper printing location and color contrast for regulatory readability.\n**5. Automated Rejection Mechanism:**\nTriggers pneumatic ejector to remove defective packs instantly.",
        category: "Medical AI",
        technologies: ["PaddleOCR", "OpenCV", "Python", "Quality Control"],
        imageUrl: "/Images/USV/Ocr_res/results/v5/Image__2025-05-01__13-02-20 (copy)_preprocessed_img.jpg",
        
        additionalImages: [
          "/Images/USV/Ocr_res/results/v3/2.jpg",
          "/Images/USV/Ocr_res/results/v3/11.jpg",
          "/Images/USV/Ocr_res/results/v5/Image__2025-06-03__16-55-46_ocr_res_img.jpg",
          "/Images/USV/Ocr_res/results/v5/Image__2025-05-01__13-01-01 (copy)_ocr_res_img.jpg",
          "/Images/USV/Ocr_res/results/v5/Image__2025-05-01__13-01-25_ocr_res_img.jpg",
          "/Images/USV/Ocr_res/results/v5/Image__2025-06-03__16-55-48_ocr_res_img.jpg",
        ],

        githubUrl: "https://github.com/example/pharma-inspection",
        featured: false
      },

      
      {
      title: "Barcode Detection & Quality Control",
        description: "Automated barcode scanning and validation system with OK/NG status flagging. Implements real-time barcode matching with quality assessment for manufacturing workflows.",
        category: "Industrial AI",
        technologies: ["OpenCV", "ZBar", "Python", "Image Processing"],
        imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop",
        githubUrl: "https://github.com/example/barcode-qc",
        featured: false
      },  
     
      
      {
        title: "Autonomous Vehicle Vision",
        description: "Real-time object detection and lane tracking system for autonomous vehicles using YOLO and advanced filtering algorithms.",
        category: "Computer Vision",
        technologies: ["YOLO", "OpenCV", "ROS"],
        imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop",
        githubUrl: "https://github.com/example/autonomous-vision",
        featured: true
      },
 
   
    ];

    initialProjects.forEach(project => this.createProject(project));

    // Seed blog posts
    const initialBlogPosts: InsertBlogPost[] = [
      {
        title: "Understanding Transformer Architecture in Computer Vision",
        slug: "transformer-architecture-computer-vision",
        excerpt: "A comprehensive guide to Vision Transformers (ViTs) and how they're revolutionizing image classification tasks with attention mechanisms.",
        content: "# Understanding Transformer Architecture in Computer Vision\n\nVision Transformers (ViTs) have revolutionized the field of computer vision...",
        category: "Deep Learning",
        imageUrl: "https://images.unsplash.com/photo-1677442p",
        githubUrl: "https://github.com/example/multi-oc136019-21780ecad995?w=800&h=300&fit=crop",
        readTime: 8,
        published: true
      },

      {
        title: "Active Learning",
        slug: "What is Active Learning and Why Use It?",
        excerpt: "Discover active learning, a cost-effective machine learning method that boosts accuracy with fewer labels. Learn how it transforms AI training!",
        content: "# 🚀 Active Learning — The Smart Way to Train AI Faster\n\nIn a traditional AI training workflow, you collect a huge dataset, label everything, train your model, and hope it performs well in production. But here’s the problem — most of that data isn’t equally valuable. Some images, videos, or text samples don’t teach your model anything new, while a few tricky cases can dramatically improve performance.\n\nActive Learning flips this process. Instead of labeling everything blindly, your model itself identifies the most informative or “confusing” samples and asks you to label those first. This means less labeling, faster training, and better results with fewer resources.",
        category: "Deep Learning",
        imageUrl: "https://sdmntprpolandcentral.oaiusercontent.com/files/00000000-85f4-620a-9923-da3f93e3522d/raw?se=2025-08-14T17%3A43%3A34Z&sp=r&sv=2024-08-04&sr=b&scid=6cda2c91-2bef-597c-90da-12ff7fe706b1&skoid=bbd22fc4-f881-4ea4-b2f3-c12033cf6a8b&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-13T19%3A59%3A21Z&ske=2025-08-14T19%3A59%3A21Z&sks=b&skv=2024-08-04&sig=y5J5zgqqKD1gnZFuogXUSJnpdjg8JRu%2Bf6gQ79Ci6bI%3D",
        readTime: 8,
        published: true
      },


      {
        title: "Building Real-time Object Detection with YOLO and OpenCV",
        slug: "real-time-object-detection-yolo-opencv",
        excerpt: "Step-by-step tutorial on implementing a real-time object detection system using YOLOv8 and OpenCV with Python.",
        content: "# Building Real-time Object Detection with YOLO and OpenCV\n\nReal-time object detection is a crucial component...",
        category: "Tutorial",
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=300&fit=crop",
        readTime: 12,
        published: true
      },
      {
        title: "Deploying ML Models at Scale: Docker, Kubernetes, and Beyond",
        slug: "deploying-ml-models-scale-docker-kubernetes",
        excerpt: "Best practices for deploying machine learning models in production environments with containerization and orchestration.",
        content: "# Deploying ML Models at Scale\n\nDeploying machine learning models in production requires careful consideration...",
        category: "MLOps",
        imageUrl: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=300&fit=crop",
        readTime: 15,
        published: true
      },
      {
        title: "Advanced OCR with PaddleOCR: From Text Detection to Industrial Applications",
        slug: "advanced-ocr-paddleocr-industrial-applications",
        excerpt: "Exploring PaddleOCR capabilities for automotive VIN/EIN recognition, pharmaceutical label validation, and barcode processing in production environments.",
        content: "# Advanced OCR with PaddleOCR: From Text Detection to Industrial Applications\n\nOptical Character Recognition (OCR) has become a cornerstone technology in industrial automation and quality control. In this comprehensive guide, we'll explore how PaddleOCR can be leveraged for complex real-world applications including automotive part identification, pharmaceutical packaging validation, and automated quality control systems.\n\n## Why PaddleOCR?\n\nPaddleOCR stands out in the OCR landscape due to its exceptional accuracy, multilingual support, and lightweight architecture that makes it ideal for edge deployment. Unlike traditional OCR solutions, PaddleOCR combines text detection and recognition in a unified pipeline that delivers superior performance across various document types and image qualities.\n\n## Automotive Industry Applications\n\n### VIN and EIN Recognition\n\nIn automotive manufacturing, accurate identification of Vehicle Identification Numbers (VIN) and Engine Identification Numbers (EIN) is critical for quality control and traceability. Our implementation using PaddleOCR achieves 98.5% accuracy in extracting these alphanumeric codes from various surfaces including metal stampings, etched plates, and printed labels.\n\n### Implementation Strategy\n\n1. **Preprocessing Pipeline**: Image enhancement using OpenCV for noise reduction and contrast optimization\n2. **Text Detection**: PaddleOCR's DB (Differentiable Binarization) model for precise text localization\n3. **Recognition**: CRNN (Convolutional Recurrent Neural Network) for character sequence recognition\n4. **Validation**: Pattern matching against standard VIN/EIN formats with checksum verification\n\n## Pharmaceutical Quality Control\n\n### Blister Pack Inspection\n\nPharmaceutical manufacturing requires stringent quality control to ensure patient safety. Our PaddleOCR-based solution validates critical information on blister packaging:\n\n- **Batch Codes**: Ensuring traceability throughout the supply chain\n- **Lot Numbers**: Maintaining manufacturing batch integrity\n- **Expiry Dates**: Preventing distribution of expired products\n- **MRP (Maximum Retail Price)**: Regulatory compliance verification\n\n### Technical Implementation\n\nThe system processes high-resolution images of blister packs using a multi-stage approach:\n\n1. **Region of Interest Detection**: Automated identification of text regions using computer vision\n2. **OCR Processing**: PaddleOCR extracts text with confidence scoring\n3. **Data Validation**: Rule-based verification against regulatory standards\n4. **Quality Flagging**: Automatic OK/NG status determination\n\n## Barcode Integration and Quality Control\n\n### Hybrid Approach\n\nCombining traditional barcode scanning with OCR creates a robust identification system:\n\n- **Primary**: Barcode scanning for rapid identification\n- **Secondary**: OCR for human-readable verification\n- **Validation**: Cross-referencing both methods for maximum accuracy\n\n### Quality Control Workflow\n\n1. **Image Acquisition**: High-resolution capture of product labels\n2. **Dual Processing**: Simultaneous barcode and OCR analysis\n3. **Data Correlation**: Matching extracted information\n4. **Status Determination**: OK flag for matches, NG for discrepancies\n5. **Reporting**: Detailed logs for quality assurance\n\n## Performance Optimization\n\n### Edge Deployment\n\nFor real-time industrial applications, we've optimized PaddleOCR for edge computing:\n\n- **Model Quantization**: Reducing model size while maintaining accuracy\n- **GPU Acceleration**: Leveraging CUDA for faster inference\n- **Batch Processing**: Optimizing throughput for high-volume scenarios\n\n### Accuracy Metrics\n\nOur implementations achieve industry-leading performance:\n\n- **VIN Recognition**: 98.5% accuracy across various surface types\n- **Pharmaceutical Labels**: 99.2% accuracy with regulatory compliance\n- **Barcode Validation**: 99.8% match rate with OCR verification\n\n## Future Developments\n\n### AI-Powered Enhancement\n\nWe're exploring integration with large language models for:\n\n- **Context Understanding**: Improved validation through semantic analysis\n- **Error Correction**: Intelligent correction of OCR misreads\n- **Adaptive Learning**: Continuous improvement through feedback loops\n\n## Conclusion\n\nPaddleOCR's versatility and accuracy make it an excellent choice for industrial OCR applications. From automotive part tracking to pharmaceutical quality control, the technology enables automated, reliable text recognition that meets stringent industry standards.\n\nThe combination of advanced preprocessing, robust recognition algorithms, and intelligent validation creates systems that not only match but often exceed human performance in text recognition tasks, while providing the consistency and speed required for modern manufacturing environments.",
        category: "Tutorial",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=300&fit=crop",
        readTime: 18,
        published: true
      }
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

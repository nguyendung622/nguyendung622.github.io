// ============================================================
// FILE DU LIEU CA NHAN - CAP NHAT THONG TIN O DAY
// ============================================================

const profileData = {
  // Truong co hau to "En" la ban tieng Anh; thieu thi trang hien ban tieng Viet.

  // --- THONG TIN CA NHAN ---
  name: "Nguyễn Dũng",
  nameEn: "Dung Nguyen",
  degree: "TS.",
  degreeSuffixEn: "Ph.D.",
  title: "Giảng viên",
  titleEn: "Lecturer",
  department: "Khoa Công nghệ Thông tin",
  departmentEn: "Faculty of Information Technology",
  university: "Trường Đại học Khoa học, Đại học Huế",
  universityEn: "University of Sciences, Hue University",
  address: "77 Nguyễn Huệ, TP. Huế, Việt Nam",
  addressEn: "77 Nguyen Hue Street, Hue City, Vietnam",

  // --- LIEN HE ---
  emails: [
    "ndung@husc.edu.vn",
    "nguyendung@hueuni.edu.vn"
  ],
  orcid: "0009-0000-4510-7504",
  orcidUrl: "https://orcid.org/0009-0000-4510-7504",

  // --- GIOI THIEU ---
  bio: "Tôi là giảng viên Khoa Công nghệ Thông tin, Trường Đại học Khoa học, Đại học Huế, công tác từ năm 2010. Nghiên cứu của tôi tập trung vào thị giác máy tính, đặc biệt là phát hiện đối tượng dựa trên Transformer, đối tượng nhỏ trong ảnh UAV và video giám sát.\nTôi cũng ứng dụng các phương pháp này vào ảnh y tế và nông nghiệp thông minh, đồng thời là chủ nhiệm đề tài cấp Đại học Huế về phát hiện đối tượng từ video giám sát.",
  bioEn: "I am a lecturer at the Faculty of Information Technology, University of Sciences, Hue University, where I have worked since 2010. My research focuses on computer vision, especially Transformer-based object detection and small objects in UAV imagery and surveillance video.\nI also apply these methods to medical imaging and smart agriculture, and I am the principal investigator of a Hue University project on object detection in surveillance video.",

  // --- HUONG NGHIEN CUU ---
  researchInterests: [
    "Phát hiện đối tượng",
    "Học sâu",
    "Thị giác máy tính",
    "Transformer",
    "Nhận dạng ảnh y tế",
    "Nhận dạng đối tượng nông nghiệp thông minh",
    "Xử lý ảnh",
    "Học máy",
    "IoT",
    "Công nghệ phần mềm"
  ],
  researchInterestsEn: [
    "Object detection",
    "Deep learning",
    "Computer vision",
    "Transformers",
    "Medical image recognition",
    "Object recognition in smart agriculture",
    "Image processing",
    "Machine learning",
    "IoT",
    "Software engineering"
  ],

  // --- BA TASK NGHIEN CUU ---
  // Cung mot canh, bon loai dau ra. box va polygon dat thu cong, toa do theo pixel cua anh.
  researchTasks: {
    demo: {
      src: "assets/images/research/task-demo.jpg", width: 510, height: 340,
      alt: "Một xe buýt trên đường phố, nhìn từ trên cao",
      altEn: "A bus on a city street, seen from above",
      label: "xe buýt", labelEn: "bus", score: "0.97",
      actionLabel: "xe đang chạy", actionLabelEn: "bus moving", actionScore: "0.91",
      box: [84, 70, 372, 264],
      polygon: "98,73 140,72 362,170 369,190 370,238 305,262 150,205 88,158 86,105",
      author: "Syced", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      source: "https://commons.wikimedia.org/wiki/File:Shibuya_crossing_(12214).jpg"
    },
    items: [
      {
        id: "classification", name: "Phân loại", nameEn: "Classification",
        question: "Trong ảnh có gì?", questionEn: "What is in the image?",
        output: "Một nhãn cho toàn bộ ảnh", outputEn: "One label for the whole image",
        use: "Ví dụ: phân loại tổn thương da, nhận dạng thiên địch.",
        useEn: "For example: skin lesion classification, natural enemy recognition.",
        references: ["EfficientNet", "Natural Enemy Recognition"]
      },
      {
        id: "detection", name: "Phát hiện đối tượng", nameEn: "Object detection",
        question: "Đối tượng nào, nằm ở đâu?", questionEn: "Which objects, and where?",
        output: "Khung bao và nhãn cho từng đối tượng", outputEn: "A box and label for each object",
        use: "Ví dụ: giám sát qua camera, đối tượng nhỏ trong ảnh UAV, đếm gia súc.",
        useEn: "For example: camera surveillance, small objects in UAV images, cattle monitoring.",
        references: ["V-DETR", "Swin Transformer", "UAV Imagery", "YOLOv8s-CBAM", "RT-DETR", "Linformer", "MLP-like"]
      },
      {
        id: "segmentation", name: "Phân đoạn", nameEn: "Segmentation",
        question: "Đối tượng chiếm những điểm ảnh nào?", questionEn: "Which pixels belong to the object?",
        output: "Mặt nạ theo từng điểm ảnh", outputEn: "A pixel-level mask",
        use: "Ví dụ: xác định vùng khối u trên ảnh MRI não.",
        useEn: "For example: outlining tumour regions in brain MRI.",
        references: ["MSUNet"]
      },
      {
        id: "action", name: "Nhận dạng hành động", nameEn: "Action recognition",
        question: "Hành động nào đang hoặc sắp xảy ra?", questionEn: "What action is happening, or about to happen?",
        output: "Một nhãn hành động cho cả đoạn video", outputEn: "One action label for the whole clip",
        use: "Ví dụ: phát hiện hành vi bạo lực qua camera giám sát, dự đoán hành động tiếp theo.",
        useEn: "For example: detecting violence in surveillance video, anticipating the next action.",
        references: ["Violence Detection"]
      }
    ]
  },

  // --- MO HINH NGHIEN CUU ---
  // "task" trung voi id trong researchTasks; "id" trung voi so do 3D trong model-viewer.js.
  // "steps" theo dung so thu tu tren so do. Day la cac mo hinh SOTA, khong phai mo hinh cua tac gia.
  researchModels: [
    {
      id: "dinov3", task: "classification", name: "DINOv3",
      source: "https://arxiv.org/abs/2508.10104", sourceLabel: "DINOv3 (2025)",
      summary: "Vision Transformer học tự giám sát, không cần nhãn thủ công. Đặc trưng tổng quát này chỉ cần thêm một lớp phân loại đơn giản, hữu ích khi dữ liệu có nhãn ít.",
      summaryEn: "A self-supervised Vision Transformer that needs no manual labels. Its general-purpose features need only a simple classifier on top, which helps when labelled data is scarce.",
      steps: [
        { name: "Ảnh đầu vào", nameEn: "Input image", desc: "Ảnh cần phân loại.", descEn: "The image to classify." },
        { name: "Chia patch", nameEn: "Patch embedding", desc: "Chia ảnh thành các ô và nhúng thành token.", descEn: "Splits the image into patches and embeds them as tokens." },
        { name: "ViT encoder", nameEn: "ViT encoder", desc: "Self-attention trên toàn ảnh; huấn luyện tự giám sát với Gram anchoring.", descEn: "Self-attention across the image, trained self-supervised with Gram anchoring." },
        { name: "Token đặc trưng", nameEn: "Feature tokens", desc: "Biểu diễn tổng quát của ảnh, dùng được cho nhiều bài toán.", descEn: "A general image representation usable for many tasks." },
        { name: "Lớp phân loại", nameEn: "Classifier", desc: "Lớp đơn giản huấn luyện trên đặc trưng có sẵn.", descEn: "A simple layer trained on the existing features." },
        { name: "Xác suất các lớp", nameEn: "Class probabilities", desc: "Lớp có xác suất cao nhất là kết quả.", descEn: "The class with the highest probability is the result." }
      ]
    },
    {
      id: "convnext", task: "classification", name: "ConvNeXt V2",
      source: "https://arxiv.org/abs/2301.00808", sourceLabel: "ConvNeXt V2 (2023)",
      summary: "Mạng tích chập hiện đại, đồng thiết kế với masked autoencoder và lớp chuẩn hoá GRN. Có nhiều kích cỡ, từ rất nhẹ đến rất lớn.",
      summaryEn: "A modern ConvNet co-designed with masked autoencoders and the GRN normalisation layer. It comes in many sizes, from very light to very large.",
      steps: [
        { name: "Ảnh đầu vào", nameEn: "Input image", desc: "Ảnh cần phân loại.", descEn: "The image to classify." },
        { name: "Stem", nameEn: "Stem", desc: "Lớp tích chập đầu tiên giảm độ phân giải.", descEn: "The first convolution lowers the resolution." },
        { name: "Các tầng ConvNeXt", nameEn: "ConvNeXt stages", desc: "Khối tích chập kèm GRN, giảm độ phân giải dần.", descEn: "Convolutional blocks with GRN, gradually lowering resolution." },
        { name: "Global pooling", nameEn: "Global pooling", desc: "Gộp bản đồ đặc trưng thành một vector.", descEn: "Collapses the feature maps into one vector." },
        { name: "Lớp phân loại", nameEn: "Classifier", desc: "Tính điểm cho từng lớp.", descEn: "Scores each class." },
        { name: "Xác suất các lớp", nameEn: "Class probabilities", desc: "Lớp có xác suất cao nhất là kết quả.", descEn: "The class with the highest probability is the result." }
      ]
    },
    {
      id: "rfdetr", task: "detection", name: "RF-DETR",
      source: "https://arxiv.org/abs/2511.09554", sourceLabel: "RF-DETR (2025)",
      summary: "Detection Transformer thời gian thực, dùng tìm kiếm kiến trúc để chọn cấu hình theo từng bộ dữ liệu. Theo bài gốc, đây là bộ phát hiện thời gian thực đầu tiên vượt 60 AP trên COCO.",
      summaryEn: "A real-time Detection Transformer that uses architecture search to pick a configuration for each dataset. Its authors report it as the first real-time detector above 60 AP on COCO.",
      steps: [
        { name: "Ảnh đầu vào", nameEn: "Input image", desc: "Ảnh hoặc khung hình video.", descEn: "An image or video frame." },
        { name: "Backbone DINOv2", nameEn: "DINOv2 backbone", desc: "ViT huấn luyện trước, tính attention trong cửa sổ để chạy nhanh.", descEn: "A pre-trained ViT with windowed attention for speed." },
        { name: "Projector", nameEn: "Projector", desc: "Đưa đặc trưng về dạng phù hợp cho decoder.", descEn: "Adapts the features for the decoder." },
        { name: "Object queries", nameEn: "Object queries", desc: "Các truy vấn học được, mỗi truy vấn tìm một đối tượng.", descEn: "Learned queries, each looking for one object." },
        { name: "Decoder", nameEn: "Decoder", desc: "Cross-attention nối truy vấn với đặc trưng ảnh.", descEn: "Cross-attention links the queries to image features." },
        { name: "Prediction heads", nameEn: "Prediction heads", desc: "Dự đoán lớp và toạ độ hộp.", descEn: "Predict the class and box coordinates." },
        { name: "Tập hộp dự đoán", nameEn: "Predicted boxes", desc: "Không cần bước hậu xử lý NMS.", descEn: "No NMS post-processing needed." }
      ]
    },
    {
      id: "dfine", task: "detection", name: "D-FINE",
      source: "https://arxiv.org/abs/2410.13842", sourceLabel: "D-FINE (2024)",
      summary: "DETR thời gian thực định vị rất chính xác nhờ thay việc dự đoán toạ độ cố định bằng tinh chỉnh dần các phân phối xác suất (FDR).",
      summaryEn: "A real-time DETR with precise localisation, replacing fixed coordinate regression with iterative refinement of probability distributions (FDR).",
      steps: [
        { name: "Ảnh đầu vào", nameEn: "Input image", desc: "Ảnh hoặc khung hình video.", descEn: "An image or video frame." },
        { name: "Backbone", nameEn: "Backbone", desc: "Trích xuất đặc trưng ở nhiều tỉ lệ.", descEn: "Extracts features at several scales." },
        { name: "Encoder", nameEn: "Encoder", desc: "Kết hợp đặc trưng giữa các tỉ lệ.", descEn: "Combines features across scales." },
        { name: "Object queries", nameEn: "Object queries", desc: "Các truy vấn, mỗi truy vấn tìm một đối tượng.", descEn: "Queries, each looking for one object." },
        { name: "Decoder", nameEn: "Decoder", desc: "Các lớp sâu truyền tri thức định vị cho lớp nông (GO-LSD).", descEn: "Deeper layers pass localisation knowledge to shallower ones (GO-LSD)." },
        { name: "FDR", nameEn: "FDR", desc: "Tinh chỉnh dần phân phối xác suất của cạnh hộp.", descEn: "Iteratively refines probability distributions of box edges." },
        { name: "Tập hộp dự đoán", nameEn: "Predicted boxes", desc: "Hộp có độ chính xác định vị cao.", descEn: "Boxes with precise localisation." }
      ]
    },
    {
      id: "yolo26", task: "detection", name: "YOLO26",
      source: "https://docs.ultralytics.com/models/yolo26", sourceLabel: "Tài liệu YOLO26", sourceLabelEn: "YOLO26 documentation",
      summary: "Thế hệ YOLO end-to-end, bỏ bước NMS, nhẹ và phù hợp thiết bị biên. Dùng ProgLoss và STAL để cải thiện đối tượng nhỏ.",
      summaryEn: "An end-to-end YOLO generation that drops NMS, is light and suits edge devices. ProgLoss and STAL improve small-object detection.",
      steps: [
        { name: "Ảnh đầu vào", nameEn: "Input image", desc: "Ảnh hoặc khung hình video.", descEn: "An image or video frame." },
        { name: "Backbone", nameEn: "Backbone", desc: "Trích xuất đặc trưng ở nhiều tỉ lệ.", descEn: "Extracts features at several scales." },
        { name: "Neck", nameEn: "Neck", desc: "Trộn đặc trưng giữa các tỉ lệ.", descEn: "Fuses features across scales." },
        { name: "Head đa tỉ lệ", nameEn: "Multi-scale heads", desc: "Dự đoán đối tượng lớn nhỏ ở từng tỉ lệ.", descEn: "Predict large and small objects at each scale." },
        { name: "Kết quả", nameEn: "Output", desc: "Đầu ra trực tiếp, không cần NMS.", descEn: "Direct output with no NMS." }
      ]
    },
    {
      id: "sam3", task: "segmentation", name: "SAM 3",
      source: "https://arxiv.org/abs/2511.16719", sourceLabel: "SAM 3 (2025)",
      summary: "Phân đoạn theo khái niệm: nhập một cụm từ như \"xe buýt vàng\" hoặc ảnh mẫu, mô hình tìm, phân đoạn và theo dõi mọi đối tượng phù hợp trong ảnh và video.",
      summaryEn: "Concept segmentation: given a phrase like \"yellow school bus\" or an image exemplar, the model finds, segments and tracks every matching object in images and video.",
      steps: [
        { name: "Ảnh hoặc video", nameEn: "Image or video", desc: "Dữ liệu đầu vào.", descEn: "The input." },
        { name: "Prompt khái niệm", nameEn: "Concept prompt", desc: "Cụm danh từ, ảnh mẫu hoặc cả hai.", descEn: "A noun phrase, image exemplars or both." },
        { name: "Backbone dùng chung", nameEn: "Shared backbone", desc: "Dùng chung cho bộ phát hiện và bộ theo dõi.", descEn: "Shared by the detector and the tracker." },
        { name: "Bộ phát hiện", nameEn: "Detector", desc: "Tìm các đối tượng khớp với khái niệm trong ảnh.", descEn: "Finds objects matching the concept in the image." },
        { name: "Presence head", nameEn: "Presence head", desc: "Tách việc nhận biết khái niệm khỏi việc định vị.", descEn: "Decouples recognising the concept from localising it." },
        { name: "Bộ theo dõi video", nameEn: "Video tracker", desc: "Dùng bộ nhớ để giữ định danh đối tượng qua các khung hình.", descEn: "Uses memory to keep object identities across frames." },
        { name: "Mặt nạ và định danh", nameEn: "Masks and identities", desc: "Một mặt nạ cho mỗi đối tượng khớp.", descEn: "One mask for each matching object." }
      ]
    },
    {
      id: "mask2former", task: "segmentation", name: "Mask2Former",
      source: "https://arxiv.org/abs/2112.01527", sourceLabel: "Mask2Former (2021)",
      summary: "Một kiến trúc cho cả phân đoạn ngữ nghĩa, thực thể và toàn cảnh. Vẫn là lựa chọn phổ biến khi huấn luyện trên dữ liệu riêng.",
      summaryEn: "One architecture for semantic, instance and panoptic segmentation. It remains a common choice when training on your own data.",
      steps: [
        { name: "Ảnh đầu vào", nameEn: "Input image", desc: "Ảnh cần phân đoạn.", descEn: "The image to segment." },
        { name: "Backbone", nameEn: "Backbone", desc: "Trích xuất đặc trưng ở nhiều tỉ lệ.", descEn: "Extracts features at several scales." },
        { name: "Pixel decoder", nameEn: "Pixel decoder", desc: "Khôi phục đặc trưng độ phân giải cao.", descEn: "Recovers high-resolution features." },
        { name: "Object queries", nameEn: "Object queries", desc: "Mỗi truy vấn ứng với một vùng cần phân đoạn.", descEn: "Each query stands for one region to segment." },
        { name: "Masked attention", nameEn: "Masked attention", desc: "Giới hạn cross-attention trong vùng mặt nạ đang dự đoán.", descEn: "Restricts cross-attention to the predicted mask region." },
        { name: "Dự đoán", nameEn: "Prediction", desc: "Tính lớp và mặt nạ cho từng truy vấn.", descEn: "Computes a class and mask for each query." },
        { name: "Mặt nạ phân đoạn", nameEn: "Segmentation masks", desc: "Kết quả theo từng điểm ảnh.", descEn: "The pixel-level result." }
      ]
    },
    {
      id: "nnunet", task: "segmentation", name: "nnU-Net",
      source: "https://www.nature.com/articles/s41592-020-01008-z", sourceLabel: "nnU-Net (Nature Methods, 2021)",
      summary: "Khung phân đoạn ảnh y tế tự cấu hình theo từng bộ dữ liệu, dựa trên kiến trúc U-Net. Vẫn là mốc so sánh quan trọng trong lĩnh vực y sinh.",
      summaryEn: "A biomedical segmentation framework that configures itself for each dataset, built on the U-Net architecture. It remains a key baseline in the field.",
      steps: [
        { name: "Ảnh y tế", nameEn: "Medical image", desc: "Ví dụ: ảnh CT hoặc MRI.", descEn: "For example, a CT or MRI scan." },
        { name: "Tự cấu hình", nameEn: "Self-configuration", desc: "Phân tích dữ liệu để chọn tiền xử lý, kích thước patch và kiến trúc.", descEn: "Analyses the data to choose preprocessing, patch size and architecture." },
        { name: "Nhánh mã hoá", nameEn: "Encoder path", desc: "Giảm độ phân giải dần, tăng độ giàu đặc trưng.", descEn: "Gradually lowers resolution and enriches features." },
        { name: "Bottleneck", nameEn: "Bottleneck", desc: "Biểu diễn cô đọng nhất của ảnh.", descEn: "The most compact representation of the image." },
        { name: "Nhánh giải mã", nameEn: "Decoder path", desc: "Khôi phục độ phân giải, ghép đặc trưng từ skip connection.", descEn: "Restores resolution, merging features from skip connections." },
        { name: "Mặt nạ phân đoạn", nameEn: "Segmentation mask", desc: "Vùng cần xác định, theo từng điểm ảnh.", descEn: "The target region, marked pixel by pixel." }
      ]
    },
    {
      id: "vjepa2", task: "action", name: "V-JEPA 2",
      source: "https://arxiv.org/abs/2506.09985", sourceLabel: "V-JEPA 2 (2025)",
      summary: "Mô hình video tự giám sát, học bằng cách dự đoán biểu diễn của phần video bị che. Theo bài gốc, đạt 77,3% top-1 trên Something-Something v2 và recall@5 39,7 khi dự đoán hành động trên Epic-Kitchens-100. Phiên bản V-JEPA 2.1 đã ra mắt năm 2026.",
      summaryEn: "A self-supervised video model that learns by predicting the representation of masked video. Its authors report 77.3% top-1 on Something-Something v2 and 39.7 recall@5 for action anticipation on Epic-Kitchens-100. A V-JEPA 2.1 version followed in 2026.",
      steps: [
        { name: "Đoạn video", nameEn: "Video clip", desc: "Chuỗi khung hình đầu vào.", descEn: "The input sequence of frames." },
        { name: "Tubelet", nameEn: "Tubelets", desc: "Chia video thành các khối nhỏ theo không gian và thời gian.", descEn: "Splits the video into small space-time blocks." },
        { name: "Encoder ViT", nameEn: "ViT encoder", desc: "Mã hoá video thành biểu diễn; có thể đóng băng khi dùng.", descEn: "Encodes video into representations; can stay frozen in use." },
        { name: "Predictor", nameEn: "Predictor", desc: "Khi huấn luyện, dự đoán biểu diễn của phần bị che.", descEn: "During training, predicts representations of the masked parts." },
        { name: "Attentive probe", nameEn: "Attentive probe", desc: "Lớp nhẹ huấn luyện riêng cho từng bài toán.", descEn: "A light layer trained for each task." },
        { name: "Xác suất hành động", nameEn: "Action probabilities", desc: "Hành động đang xảy ra hoặc sắp xảy ra.", descEn: "The action happening now or about to happen." }
      ]
    },
    {
      id: "videomae2", task: "action", name: "VideoMAE V2",
      source: "https://arxiv.org/abs/2303.16727", sourceLabel: "VideoMAE V2 (2023)",
      summary: "Tiền huấn luyện video bằng cách che phần lớn token rồi tái tạo lại. Cơ chế che kép ở cả encoder và decoder giúp huấn luyện được mô hình rất lớn.",
      summaryEn: "Pre-trains on video by masking most tokens and reconstructing them. Dual masking in both encoder and decoder makes very large models trainable.",
      steps: [
        { name: "Đoạn video", nameEn: "Video clip", desc: "Chuỗi khung hình đầu vào.", descEn: "The input sequence of frames." },
        { name: "Che token", nameEn: "Token masking", desc: "Khi huấn luyện, encoder chỉ thấy một phần nhỏ của video.", descEn: "During training, the encoder sees only a small part of the video." },
        { name: "Encoder ViT", nameEn: "ViT encoder", desc: "Học biểu diễn không gian và thời gian.", descEn: "Learns space-time representations." },
        { name: "Decoder", nameEn: "Decoder", desc: "Chỉ dùng khi tiền huấn luyện, để tái tạo phần bị che.", descEn: "Used only in pre-training, to reconstruct the masked parts." },
        { name: "Lớp phân loại", nameEn: "Classifier", desc: "Thêm vào khi tinh chỉnh cho nhận dạng hành động.", descEn: "Added when fine-tuning for action recognition." },
        { name: "Xác suất hành động", nameEn: "Action probabilities", desc: "Hành động có xác suất cao nhất là kết quả.", descEn: "The action with the highest probability is the result." }
      ]
    },
    {
      id: "posec3d", task: "action", name: "PoseC3D",
      source: "https://arxiv.org/abs/2104.13586", sourceLabel: "PoseC3D (2021)",
      summary: "Đại diện cho hướng dựa trên khung xương: chuyển tư thế người thành chồng heatmap 3D, ít nhạy với nhiễu ước lượng tư thế và xử lý được nhiều người. Phù hợp với phân tích hành vi qua camera, nhưng không phải mô hình mới nhất.",
      summaryEn: "Represents the skeleton-based approach: turns human pose into a 3D heatmap stack, robust to pose estimation noise and able to handle several people. It suits behaviour analysis from cameras but is not the newest model.",
      steps: [
        { name: "Đoạn video", nameEn: "Video clip", desc: "Chuỗi khung hình đầu vào.", descEn: "The input sequence of frames." },
        { name: "Chồng heatmap tư thế", nameEn: "Pose heatmap stack", desc: "Ước lượng tư thế trên từng khung rồi xếp chồng theo thời gian.", descEn: "Estimates pose per frame and stacks it over time." },
        { name: "Mạng tích chập 3D", nameEn: "3D ConvNet", desc: "Học đặc trưng không gian và thời gian từ chồng heatmap.", descEn: "Learns space-time features from the heatmap stack." },
        { name: "Global pooling", nameEn: "Global pooling", desc: "Gộp đặc trưng thành một vector.", descEn: "Collapses the features into one vector." },
        { name: "Lớp phân loại", nameEn: "Classifier", desc: "Tính điểm cho từng hành động.", descEn: "Scores each action." },
        { name: "Xác suất hành động", nameEn: "Action probabilities", desc: "Hành động có xác suất cao nhất là kết quả.", descEn: "The action with the highest probability is the result." }
      ]
    }
  ],

  // --- HINH ANH MINH HOA HUONG NGHIEN CUU ---
  // boxes: [x0, y0, x1, y1, nhan, nhan tieng Anh, diem, tong mau]; toa do tinh theo pixel cua anh.
  // Khung khong co nhan se hien nho. Khung va diem la minh hoa, duoc dat thu cong.
  applications: [
    {
      src: "assets/images/research/natural-enemy.jpg", width: 960, height: 640,
      title: "Nhận dạng thiên địch",
      titleEn: "Natural enemy recognition",
      desc: "Phân biệt thiên địch có lợi với sâu hại trên cây trồng, như bọ rùa và đàn rệp, hướng tới nông nghiệp thông minh.",
      descEn: "Telling beneficial natural enemies from crop pests, such as a ladybird and aphid colonies, for smart agriculture.",
      author: "neil.dalphin", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      source: "https://commons.wikimedia.org/wiki/File:Aphids_and_Ladybird_(26439659021).jpg",
      papers: ["Natural Enemy Recognition"],
      boxes: [
        [524, 172, 570, 214, "thiên địch", "natural enemy", "0.98"],
        [484, 326, 670, 611, "sâu hại", "pest", "0.94", "warm"],
        [206, 226, 380, 494, null, null, null, "warm"],
        [304, 333, 448, 638, null, null, null, "warm"]
      ]
    },
    {
      src: "assets/images/research/uav-aerial.jpg", width: 960, height: 640,
      title: "Đối tượng nhỏ từ UAV (kiểu VisDrone)",
      titleEn: "Small objects from UAVs (VisDrone style)",
      desc: "VisDrone là bộ dữ liệu ảnh drone với rất nhiều đối tượng nhỏ. Ảnh này chỉ có cùng góc nhìn, không thuộc bộ dữ liệu đó.",
      descEn: "VisDrone is a drone image dataset full of small objects. This photo only shares the viewpoint and is not from that dataset.",
      author: "Bjankuloski06", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Victoria_Ave_and_Court_St_intersection,_Waiuku_(aerial_photo).jpg",
      papers: ["UAV Imagery"],
      boxes: [
        [540, 604, 567, 622, "ô tô", "car", "0.87"],
        [403, 539, 428, 554], [452, 556, 475, 572], [584, 606, 610, 623], [494, 626, 521, 640],
        [279, 557, 303, 575], [165, 529, 192, 545], [36, 601, 71, 625], [75, 588, 104, 606],
        [150, 464, 181, 477], [472, 348, 493, 359], [174, 406, 196, 419], [599, 483, 614, 497],
        [629, 497, 649, 509], [651, 487, 671, 499], [674, 472, 693, 485], [822, 475, 837, 495],
        [844, 483, 859, 497], [684, 554, 709, 568], [619, 564, 646, 578], [927, 527, 947, 544]
      ]
    },
    {
      src: "assets/images/research/camera-hue.jpg", width: 810, height: 540,
      title: "Phát hiện đối tượng qua camera",
      titleEn: "Object detection from cameras",
      desc: "Nhận biết phương tiện và người tham gia giao thông trong khung hình camera, ở đây là một đường phố tại Huế.",
      descEn: "Finding vehicles and road users in camera footage, shown here on a street in Hue.",
      author: "David McKelvey", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0",
      source: "https://commons.wikimedia.org/wiki/File:Peak_Hour_Traffic,_Hue,_Vietnam_(7073497299).jpg",
      papers: ["Surveillance Camera Systems", "RT-DETR"],
      boxes: [
        [15, 212, 262, 538, "người đi xe máy", "motorcyclist", "0.97"],
        [628, 305, 798, 478, "xe máy", "motorbike", "0.96"],
        [703, 165, 808, 440, "xe khách", "bus", "0.95"],
        [205, 285, 360, 520], [330, 315, 393, 420], [453, 310, 505, 433],
        [577, 323, 620, 367], [530, 325, 565, 382], [657, 330, 685, 378]
      ]
    },
    {
      src: "assets/images/research/behavior-crossing.jpg", width: 960, height: 639,
      title: "Nhận dạng hành vi qua camera",
      titleEn: "Behavior recognition from cameras",
      desc: "Từ góc nhìn camera giám sát, hệ thống không chỉ tìm thấy người mà còn nhận biết họ đang làm gì, như đi qua đường hay đứng chờ.",
      descEn: "From a surveillance viewpoint, the system does more than find people: it recognises what they are doing, such as crossing or waiting.",
      author: "Syced", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      source: "https://commons.wikimedia.org/wiki/File:Shibuya_crossing_(12214).jpg",
      papers: ["Violence Detection"],
      boxes: [
        [763, 250, 952, 420, "đang chờ", "waiting", "0.92", "warm"],
        [562, 462, 584, 510, "đi qua đường", "crossing", "0.94", "warm"],
        [604, 453, 622, 496], [636, 443, 660, 497], [669, 423, 690, 470], [686, 410, 707, 452],
        [723, 401, 740, 444], [545, 416, 562, 458], [618, 373, 638, 418], [636, 354, 654, 398],
        [670, 350, 688, 399], [685, 350, 702, 394],
        [720, 519, 740, 564, null, null, null, "warm"],
        [812, 506, 832, 547], [844, 526, 870, 564],
        [188, 128, 404, 271, "xe buýt", "bus", "0.97"]
      ]
    }
  ],

  // --- HOAT DONG HOC THUAT ---
  // Chep anh vao assets/images/conference/ roi them muc vao day. De trong thi trang an phan nay.
  // Vi du:
  // {
  //   src: "assets/images/conference/iwis2024-web.jpg", width: 1200, height: 800,
  //   category: "Báo cáo hội nghị", categoryEn: "Conference talk",
  //   caption: "Báo cáo tại IWIS 2024", captionEn: "Presenting at IWIS 2024",
  //   author: "Tên người chụp"  // bo qua neu tu chup
  // }
  activities: [
    {
      src: "assets/images/conference/testceo2026-web.jpg", width: 1200, height: 800,
      category: "Ra mắt sản phẩm", categoryEn: "Product launch",
      caption: "Lễ ra mắt phần mềm TestCEO", captionEn: "Launch of the TestCEO software",
      detail: "Phần mềm quản lý khảo thí và đánh giá tích hợp của DHTE và VTED. Hà Nội, 10/2026.",
      detailEn: "Integrated examination management and assessment software by DHTE and VTED. Hanoi, October 2026."
    },
    {
      src: "assets/images/conference/aibc2026-web.jpg", width: 1200, height: 800,
      category: "Ra mắt sản phẩm", categoryEn: "Product launch",
      caption: "Lễ ra mắt sản phẩm hợp tác DHTE và British Council", captionEn: "Launch of DHTE and British Council joint products",
      detail: "Dự án phát triển sản phẩm tích hợp AI: AiBC và bộ đề thi thử IELTS Ready. Hà Nội, 9/2026.",
      detailEn: "A project developing AI-integrated products: AiBC and the IELTS Ready mock test set. Hanoi, September 2026."
    },
    {
      src: "assets/images/conference/fair2025-web.jpg", width: 1200, height: 800,
      category: "Hội nghị quốc gia", categoryEn: "National conference",
      caption: "Báo cáo tại FAIR 2025", captionEn: "Presenting at FAIR 2025",
      detail: "Bài báo về phát hiện biển báo giao thông tại Việt Nam. Hội nghị khoa học quốc gia FAIR, Hà Nội, 8/2025.",
      detailEn: "A paper on traffic sign detection in Vietnam, at the National Conference on Fundamental and Applied IT Research (FAIR). Hanoi, August 2025."
    },
    {
      src: "assets/images/conference/iwis2024-web.jpg", width: 1200, height: 800,
      category: "Hội nghị quốc tế", categoryEn: "International conference",
      caption: "Tham dự IWIS 2024", captionEn: "Attending IWIS 2024",
      detail: "International Workshop on Intelligent Systems, có bài báo về cải thiện phát hiện đối tượng bằng Transformer. Ulsan, Hàn Quốc, 8/2024.",
      detailEn: "The International Workshop on Intelligent Systems, with a paper on improving Transformer-based object detection. Ulsan, Republic of Korea, August 2024."
    },
    {
      src: "assets/images/conference/gtsd2024-web.jpg", width: 949, height: 633,
      category: "Hội nghị quốc tế", categoryEn: "International conference",
      caption: "Báo cáo tại GTSD 2024", captionEn: "Presenting at GTSD 2024",
      detail: "Bài báo về cải thiện phát hiện đối tượng nhỏ dựa trên Swin Transformer. TP. Hồ Chí Minh, 7/2024.",
      detailEn: "A paper on improving small object detection with Swin Transformer. Ho Chi Minh City, July 2024."
    },
    {
      src: "assets/images/conference/fair2024-web.jpg", width: 833, height: 555,
      category: "Hội nghị quốc gia", categoryEn: "National conference",
      caption: "Báo cáo tại FAIR 2024", captionEn: "Presenting at FAIR 2024",
      detail: "Bài báo về cải tiến mô hình DETR bằng Linformer, trình bày tại Hội nghị khoa học quốc gia FAIR lần thứ XVII.",
      detailEn: "A paper on enhancing the DETR model with Linformer, presented at the 17th National Conference on Fundamental and Applied IT Research (FAIR)."
    },
    {
      src: "assets/images/conference/ai-education-london-web.jpg", width: 1200, height: 800,
      category: "AI trong giáo dục", categoryEn: "AI in education",
      caption: "Kết nối AI cho giáo dục phổ thông tại Việt Nam", captionEn: "Connecting AI for general education in Vietnam",
      detail: "Chuyến đi trong khuôn khổ chương trình, tại London, Anh.",
      detailEn: "A trip as part of the programme, in London, United Kingdom."
    }
  ],

  // --- HINH ANH HUE VA NHA TRUONG ---
  // Doi anh: dat file vao assets/images/hue/ roi sua "src"; anh cua ban thi de "author" la ten nguoi chup.
  places: {
    panorama: {
      src: "assets/images/hue/bridge-panorama.jpg", width: 1920, height: 722,
      alt: "Toàn cảnh cầu Trường Tiền bắc qua sông Hương, phía xa là dãy núi",
      altEn: "Panorama of Truong Tien Bridge across the Perfume River, with mountains in the distance",
      author: "Supanut Arunoprayote", license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0",
      source: "https://commons.wikimedia.org/wiki/File:Truong_Tien_bridge_(I).jpg"
    },
    // box: khung nhan dien tren anh, tinh theo % khung anh ty le 3:2 (x, y la goc tren-trai).
    gallery: [
      {
        src: "assets/images/hue/husc-nguyen-hue.jpg", width: 960, height: 639,
        caption: "Trường Đại học Khoa học, nhìn từ đường Nguyễn Huệ",
        captionEn: "University of Sciences, seen from Nguyen Hue Street",
        author: "Lưu Ly", license: "",
        source: "https://commons.wikimedia.org/wiki/File:%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc_Hu%E1%BA%BF.jpg",
        box: { x: 5.5, y: 17.6, w: 66.8, h: 48.6, label: "Trường ĐH Khoa học", labelEn: "University of Sciences", score: "0.99" }
      },
      {
        src: "assets/images/hue/husc-dong-da.jpg", width: 960, height: 641,
        caption: "Trường Đại học Khoa học, nhìn từ đường Đống Đa",
        captionEn: "University of Sciences, seen from Dong Da Street",
        author: "Lưu Ly", license: "",
        source: "https://commons.wikimedia.org/wiki/File:%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc_Hu%E1%BA%BF1.jpg",
        box: { x: 5.9, y: 26.7, w: 89, h: 32.4, label: "Trường ĐH Khoa học", labelEn: "University of Sciences", score: "0.98" }
      },
      {
        src: "assets/images/hue/bridge-river.jpg", width: 960, height: 640,
        caption: "Cầu Trường Tiền (Tràng Tiền) trên sông Hương",
        captionEn: "Truong Tien Bridge on the Perfume River",
        author: "Bex Walton", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0",
        source: "https://commons.wikimedia.org/wiki/File:Truong_Tien_Bridge_(26401787063).jpg",
        box: { x: 17.6, y: 27.9, w: 81.8, h: 35.4, label: "cầu Trường Tiền", labelEn: "Truong Tien Bridge", score: "0.97" }
      },
      {
        src: "assets/images/hue/thai-hoa-palace.jpg", width: 960, height: 640,
        caption: "Điện Thái Hoà, Đại Nội Huế",
        captionEn: "Palace of Supreme Harmony, Imperial City of Hue",
        author: "Lưu Ly", license: "",
        source: "https://commons.wikimedia.org/wiki/File:Dien_Thai_Hoa.jpg",
        box: { x: 26.3, y: 9, w: 45.3, h: 19.2, label: "điện Thái Hoà", labelEn: "Supreme Harmony Palace", score: "0.96" }
      },
      {
        src: "assets/images/hue/meridian-gate.jpg", width: 960, height: 540,
        caption: "Ngọ Môn, Hoàng thành Huế",
        captionEn: "The Meridian Gate, Imperial City of Hue",
        author: "Supanut Arunoprayote", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0",
        source: "https://commons.wikimedia.org/wiki/File:Meridian_Gate,_Hue_(I).jpg",
        box: { x: 9, y: 26.9, w: 82.3, h: 39.8, label: "Ngọ Môn", labelEn: "Meridian Gate", score: "0.99" }
      },
      {
        src: "assets/images/hue/thien-mu.jpg", width: 960, height: 640,
        caption: "Tháp Phước Duyên, chùa Thiên Mụ",
        captionEn: "Phuoc Duyen Tower, Thien Mu Pagoda",
        author: "Dominik Tefert", license: "",
        source: "https://commons.wikimedia.org/wiki/File:Hue_Thien_Mu-Pagoda.JPG",
        box: { x: 40.3, y: 34.7, w: 22.2, h: 56.3, label: "tháp Phước Duyên", labelEn: "Phuoc Duyen Tower", score: "0.98" }
      },
      {
        src: "assets/images/hue/khai-dinh.jpg", width: 960, height: 640,
        caption: "Lăng Khải Định",
        captionEn: "Tomb of Emperor Khai Dinh",
        author: "dronepicr", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0",
        source: "https://commons.wikimedia.org/wiki/File:Khai_Dinh_tomb_Hue_(27767136409).jpg",
        box: { x: 9, y: 22.3, w: 78.4, h: 41.5, label: "lăng Khải Định", labelEn: "Khai Dinh Tomb", score: "0.97" }
      },
      {
        src: "assets/images/hue/minh-mang.jpg", width: 960, height: 720,
        caption: "Lăng Minh Mạng",
        captionEn: "Tomb of Emperor Minh Mang",
        author: "Chainwit.", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0",
        source: "https://commons.wikimedia.org/wiki/File:L%C4%83ng_Minh_M%E1%BA%A1ng_-_Mausoleum_of_Emperor_Minh_M%E1%BA%A1ng_(2024)_-_img_05.jpg",
        box: { x: 8, y: 7.3, w: 84, h: 89.6, label: "lăng Minh Mạng", labelEn: "Minh Mang Tomb", score: "0.95" }
      },
      {
        src: "assets/images/hue/tu-duc.jpg", width: 960, height: 640,
        caption: "Lăng Tự Đức, bên hồ Lưu Khiêm",
        captionEn: "Tomb of Emperor Tu Duc, by Luu Khiem Lake",
        author: "ashfelt", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0",
        source: "https://commons.wikimedia.org/wiki/File:Hue_-_Tomb_of_Emperor_Tu_Duc_-_012.jpg",
        box: { x: 28.1, y: 29.8, w: 44.1, h: 26.8, label: "lăng Tự Đức", labelEn: "Tu Duc Tomb", score: "0.96" }
      }
    ]
  },

  // --- GIANG DAY ---
  teaching: [
    {
      name: "Thiết kế và Quản trị Website Báo chí",
      nameEn: "News Website Design and Administration",
      descriptionEn: "Designing, building and managing online news websites",
      url: "https://nguyendung622.github.io/tkweb",
      description: "Xây dựng, thiết kế và quản trị website báo chí trực tuyến"
    },
    {
      name: "XML và Ứng dụng",
      nameEn: "XML and Applications",
      descriptionEn: "The XML language and its applications in data storage and exchange",
      url: "https://nguyendung622.github.io/xml",
      description: "Ngôn ngữ XML và các ứng dụng trong lưu trữ, trao đổi dữ liệu"
    },
    {
      name: "Lập trình ứng dụng cho thiết bị di động",
      nameEn: "Mobile Application Development",
      descriptionEn: "Developing applications for Android and iOS",
      url: "https://nguyendung622.github.io/giao_trinh_flutter",
      description: "Phát triển ứng dụng trên nền tảng Android và iOS"
    }
  ],

  // --- DE TAI / DU AN ---
  projects: [
    {
      title: "Xây dựng hệ thống cơ sở dữ liệu về tài nguyên sinh vật trên địa bàn tỉnh Gia Lai",
      titleEn: "Building a database system of biological resources in Gia Lai Province",
      sponsorEn: "University of Sciences, Hue University",
      period: "2025-2027",
      sponsor: "Trường Đại học Khoa học",
      role: "Thành viên",
      status: "Đang thực hiện"
    },
    {
      title: "Nâng cao hiệu quả phát hiện đối tượng từ video giám sát (Mã: DHH2025-01-226)",
      titleEn: "Improving object detection performance in surveillance video (Code: DHH2025-01-226)",
      sponsorEn: "Hue University",
      period: "01/2025 - 12/2026",
      sponsor: "Đại học Huế",
      role: "Chủ nhiệm",
      status: "Hoàn thành"
    },
    {
      title: "Nghiên cứu ứng dụng trí tuệ nhân tạo (AI) để dự báo đánh giá tổn thất điện năng trên lưới điện khu vực Thừa Thiên Huế giai đoạn 2021-2025",
      titleEn: "Applying artificial intelligence to forecast and assess power losses on the Thua Thien Hue regional grid, 2021-2025",
      sponsorEn: "University of Sciences, Hue University",
      period: "2020-2021",
      sponsor: "Trường Đại học Khoa học",
      role: "Thành viên",
      status: "Hoàn thành"
    },
    {
      title: "Ứng dụng Công nghệ AI vào kết quả đề tài \"Xây dựng cơ sở dữ liệu 4D phục vụ phát triển du lịch cho huyện Lý Sơn, tỉnh Quảng Ngãi\"",
      titleEn: "Applying AI technology to the results of the project \"Building a 4D database for tourism development in Ly Son District, Quang Ngai Province\"",
      sponsorEn: "University of Agriculture and Forestry",
      period: "2020-2022",
      sponsor: "Trường Đại học Nông lâm",
      role: "Thành viên",
      status: "Đã hoàn thành"
    },
    {
      title: "Xây dựng cơ sở dữ liệu 4D phục vụ phát triển du lịch cho huyện đảo Lý Sơn, tỉnh Quảng Ngãi",
      titleEn: "Building a 4D database for tourism development in Ly Son Island District, Quang Ngai Province",
      sponsorEn: "Quang Ngai Province",
      period: "04/2020 - 04/2022",
      sponsor: "Tỉnh Quảng Ngãi",
      role: "Thành viên chính",
      status: "Đã hoàn thành"
    },
    {
      title: "Xây dựng hệ thống hỗ trợ người dân với công nghệ AI (trí tuệ nhân tạo) để tiếp cận dịch vụ hành chính công trực tuyến trong chính quyền điện tử tại tỉnh Thừa Thiên Huế",
      titleEn: "An AI-powered system helping citizens access online public administrative services in the e-government of Thua Thien Hue Province",
      sponsorEn: "Thua Thien Hue Province",
      period: "03/2022 - 03/2024",
      sponsor: "Tỉnh Thừa Thiên Huế",
      role: "Thành viên",
      status: "Đã hoàn thành"
    },
    {
      title: "Đánh giá hiện trạng đa dạng sinh học và bổ sung cơ sở dữ liệu về tài nguyên sinh vật các thuỷ vực nội địa tỉnh Phú Yên phục vụ phát triển tổng hợp và bền vững kinh tế - xã hội",
      titleEn: "Assessing biodiversity and extending the biological resources database of inland water bodies in Phu Yen Province for integrated, sustainable socio-economic development",
      sponsorEn: "Phu Yen Province",
      period: "03/2022 - 03/2024",
      sponsor: "Tỉnh Phú Yên",
      role: "Thành viên",
      status: "Đã hoàn thành"
    },
    {
      title: "Nghiên cứu tổng thể khu vực hồ Ayun Hạ, tỉnh Gia Lai phục vụ quản lý tổng hợp và phát triển bền vững kinh tế - xã hội",
      titleEn: "Comprehensive study of the Ayun Ha Lake area, Gia Lai Province, for integrated management and sustainable socio-economic development",
      sponsorEn: "Gia Lai Province",
      period: "03/2021 - 03/2023",
      sponsor: "Tỉnh Gia Lai",
      role: "Thành viên",
      status: "Đã hoàn thành"
    },
    {
      title: "Xây dựng cây quyết định mờ theo cách tiếp cận của đại số gia tử",
      titleEn: "Building fuzzy decision trees using the hedge algebra approach",
      sponsorEn: "University of Sciences, Hue University",
      period: "2016-2017",
      sponsor: "Trường Đại học Khoa học",
      role: "Thành viên",
      status: "Đã hoàn thành"
    },
    {
      title: "Ứng dụng mô hình Transformer trong các nhiệm vụ của thị giác máy tính (Mã: ĐHKH2025A-02)",
      titleEn: "Applying Transformer models to computer vision tasks (Code: ĐHKH2025A-02)",
      period: "01/2025 - 12/2025",
      sponsor: "Trường Đại học Khoa học",
      sponsorEn: "University of Sciences, Hue University",
      role: "Thành viên",
      status: ""
    },
    {
      title: "Xây dựng hệ thống Khảo sát người học tốt nghiệp tại Trường Đại học Khoa học Huế (Mã: ĐHKH2023A-07)",
      titleEn: "Building a graduate survey system for the University of Sciences, Hue University (Code: ĐHKH2023A-07)",
      period: "2023-2024",
      sponsor: "Trường Đại học Khoa học",
      sponsorEn: "University of Sciences, Hue University",
      role: "Chủ nhiệm",
      status: ""
    },
    {
      title: "Xây dựng hệ thống quản lý đào tạo khối chuyên Trường Đại học Khoa học, Đại học Huế",
      titleEn: "Building a training management system for the gifted programme of the University of Sciences, Hue University",
      period: "2023",
      sponsor: "Trường Đại học Khoa học",
      sponsorEn: "University of Sciences, Hue University",
      role: "Thành viên",
      status: ""
    },
    {
      title: "Xây dựng hệ thống Phản ánh các vấn đề của Trường Đại học Khoa học, Đại học Huế trên nền tảng iOS",
      titleEn: "Building an iOS issue-reporting system for the University of Sciences, Hue University",
      period: "2023",
      sponsor: "Trường Đại học Khoa học",
      sponsorEn: "University of Sciences, Hue University",
      role: "Thành viên",
      status: ""
    },
    {
      title: "Xây dựng hệ thống thi trắc nghiệm cho Trường Đại học Khoa học",
      titleEn: "Building a multiple-choice examination system for the University of Sciences",
      period: "2021",
      sponsor: "Trường Đại học Khoa học",
      sponsorEn: "University of Sciences, Hue University",
      role: "Chủ nhiệm",
      status: ""
    },
    {
      title: "WCF và ứng dụng trong phát triển ứng dụng di động của Khoa Công nghệ Thông tin (Mã: CS-DTKH-2015001)",
      titleEn: "WCF and its use in mobile application development at the Faculty of Information Technology (Code: CS-DTKH-2015001)",
      period: "2015",
      sponsor: "Trường Đại học Khoa học",
      sponsorEn: "University of Sciences, Hue University",
      role: "Chủ nhiệm",
      status: ""
    }
  ],

  // --- CONG TRINH NGHIEN CUU ---
  // Du lieu bai bao se duoc nap tu Google Sheet trong index.html
  publications: [],

  // --- SACH / GIAO TRINH ---
  books: [
    {
      isbn: "978-604-974-152-4",
      title: "Giáo trình XML và ứng dụng",
      titleEn: "XML and Its Applications",
      type: "Giáo trình",
      typeEn: "Textbook",
      field: "Khoa học máy tính và khoa học thông tin khác",
      fieldEn: "Computer and information sciences",
      publisher: "NXB Đại học Huế",
      publisherEn: "Hue University Publishing House",
      noteEn: "Published in Vietnamese",
      year: "2019",
      authors: "Nguyễn Mậu Hân (Chủ biên), Nguyễn Dũng, Nguyễn Hoàng Hà",
      authorsEn: "Nguyen Mau Han (Editor-in-chief), Nguyen Dung, Nguyen Hoang Ha"
    }
  ],

  // --- HOC VAN ---
  // Tu CSDL Khoa hoc Dai hoc Hue (scientist/id/3229), rieng dong Tien si do tac gia cho biet.
  // Bo sung: year (nam tot nghiep), place/placeEn (co so dao tao), major/majorEn (nganh).
  education: [
    { degree: "Tiến sĩ", degreeEn: "Doctorate", year: "" },
    { degree: "Thạc sĩ", degreeEn: "Master's degree", year: "2013" },
    { degree: "Cử nhân", degreeEn: "Bachelor's degree", year: "2010" },
    { degree: "Cử nhân Tiếng Anh", degreeEn: "Bachelor's degree in English", year: "2023" }
  ],
  educationField: "Khoa học máy tính",
  educationFieldEn: "Computer science",

  // --- QUA TRINH CONG TAC ---
  career: [
    {
      from: "11/2010", to: "",
      role: "Giảng viên", roleEn: "Lecturer",
      place: "Khoa Công nghệ Thông tin, Trường Đại học Khoa học, Đại học Huế",
      placeEn: "Faculty of Information Technology, University of Sciences, Hue University"
    }
  ],
  teachingAreas: ["Công nghệ phần mềm", "Lập trình .NET", "Lập trình di động"],
  teachingAreasEn: ["Software engineering", ".NET programming", "Mobile programming"],

  // --- CHI SO TRICH DAN (GOOGLE SCHOLAR) ---
  // Nhap so tu trang Scholar va thang cap nhat, vi du: citations: 120, hIndex: 6, asOf: "11/2026".
  // De null thi trang khong hien muc nay.
  scholarMetrics: { citations: null, hIndex: null, asOf: "" },

  // --- LIEN KET NGOAI ---
  links: {
    googleScholar: "https://scholar.google.com/citations?user=bWXae6IAAAAJ&hl=vi",
    researchgate: "https://www.researchgate.net/profile/Dung-Nguyen-401",
    github: "",
    linkedin: ""
  }
};

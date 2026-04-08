// ============================================================
// FILE DU LIEU CA NHAN - CAP NHAT THONG TIN O DAY
// ============================================================

const profileData = {
  // --- THONG TIN CA NHAN ---
  name: "Nguyễn Dũng",
  nameEn: "Nguyen Dung",
  title: "Giảng viên",
  department: "Khoa Công nghệ Thông tin",
  university: "Trường Đại học Khoa học, Đại học Huế",
  universityEn: "University of Sciences, Hue University",
  address: "77 Nguyễn Huệ, TP. Huế, Việt Nam",

  // --- LIEN HE ---
  emails: [
    "ndung@husc.edu.vn",
    "nguyendung@hueuni.edu.vn"
  ],
  orcid: "0009-0000-4510-7504",
  orcidUrl: "https://orcid.org/0009-0000-4510-7504",

  // --- GIOI THIEU ---
  bio: "Tôi là giảng viên tại Khoa Công nghệ Thông tin, Trường Đại học Khoa học, Đại học Huế. Nghiên cứu của tôi tập trung vào các lĩnh vực trí tuệ nhân tạo, học máy và các ứng dụng thực tiễn trong xử lý dữ liệu.",

  // --- HUONG NGHIEN CUU ---
  researchInterests: [
    "Phát hiện đối tượng",
    "Học sâu",
    "Thị giác máy tính",
    "Transformer",
    "Xử lý ảnh",
    "Học máy",
    "IoT"
  ],

  // --- GIANG DAY ---
  teaching: [
    {
      name: "Thiết kế và Quản trị Website Báo chí",
      url: "http://tkweb.d-blog.xyz",
      description: "Xây dựng, thiết kế và quản trị website báo chí trực tuyến"
    },
    {
      name: "XML và Ứng dụng",
      url: "http://xml.d-blog.xyz",
      description: "Ngôn ngữ XML và các ứng dụng trong lưu trữ, trao đổi dữ liệu"
    },
    {
      name: "Lập trình ứng dụng cho thiết bị di động",
      url: null,
      description: "Phát triển ứng dụng trên nền tảng Android và iOS"
    }
  ],

  // --- DE TAI / DU AN ---
  projects: [
    {
      title: "Xây dựng hệ thống cơ sở dữ liệu về tài nguyên sinh vật trên địa bàn tỉnh Gia Lai",
      period: "2025-2027",
      sponsor: "Trường Đại học Khoa học",
      role: "Thành viên",
      status: "Đang thực hiện"
    },
    {
      title: "Nâng cao hiệu quả phát hiện đối tượng từ video giám sát (Mã: DHH2025-01-226)",
      period: "01/2025 - 12/2026",
      sponsor: "Đại học Huế",
      role: "Chủ nhiệm",
      status: "Đang thực hiện"
    },
    {
      title: "Nghiên cứu ứng dụng trí tuệ nhân tạo (AI) để dự báo đánh giá tổn thất điện năng trên lưới điện khu vực Thừa Thiên Huế giai đoạn 2021-2025",
      period: "2020-2021",
      sponsor: "Trường Đại học Khoa học",
      role: "Thành viên",
      status: "Hoàn thành"
    },
    {
      title: "Ứng dụng Công nghệ AI vào kết quả đề tài \"Xây dựng cơ sở dữ liệu 4D phục vụ phát triển du lịch cho huyện Lý Sơn, tỉnh Quảng Ngãi\"",
      period: "2020-2022",
      sponsor: "Trường Đại học Nông lâm",
      role: "Thành viên",
      status: "Đã hoàn thành"
    },
    {
      title: "XÂY DỰNG CƠ SỞ DỮ LIỆU 4D PHỤC VỤ PHÁT TRIỂN DU LỊCH CHO HUYỆN ĐẢO LÝ SƠN, TỈNH QUẢNG NGÃI",
      period: "04/2020 - 04/2022",
      sponsor: "Tỉnh Quảng Ngãi",
      role: "Thành viên chính",
      status: "Đã hoàn thành"
    },
    {
      title: "Xây dựng hệ thống hỗ trợ người dân với công nghệ AI (trí tuệ nhân tạo) để tiếp cận dịch vụ hành chính công trực tuyến trong chính quyền điện tử tại tỉnh Thừa Thiên Huế",
      period: "03/2022 - 03/2024",
      sponsor: "Tỉnh Thừa Thiên Huế",
      role: "Thành viên",
      status: "Đã hoàn thành"
    },
    {
      title: "Đánh giá hiện trạng đa dạng sinh học và bổ sung cơ sở dữ liệu về tài nguyên sinh vật các thuỷ vực nội địa tỉnh Phú Yên phục vụ phát triển tổng hợp và bền vững kinh tế - xã hội",
      period: "03/2022 - 03/2024",
      sponsor: "Tỉnh Phú Yên",
      role: "Thành viên",
      status: "Đã hoàn thành"
    },
    {
      title: "Nghiên cứu tổng thể khu vực hồ Ayun Hạ, tỉnh Gia Lai phục vụ quản lý tổng hợp và phát triển bền vững kinh tế - xã hội",
      period: "03/2021 - 03/2023",
      sponsor: "Tỉnh Gia Lai",
      role: "Thành viên",
      status: "Đã hoàn thành"
    },
    {
      title: "Xây dựng cây quyết định mờ theo cách tiếp cận của đại số gia tử",
      period: "2016-2017",
      sponsor: "Trường Đại học Khoa học",
      role: "Thành viên",
      status: "Đã hoàn thành"
    }
  ],

  // --- CONG TRINH NGHIEN CUU ---
  // Du lieu bai bao se duoc nap tu Google Sheet trong index.html
  publications: [],

  // --- HOC VAN ---
  education: [],

  // --- LIEN KET NGOAI ---
  links: {
    googleScholar: "https://scholar.google.com/citations?user=bWXae6IAAAAJ&hl=vi",
    researchgate: "https://www.researchgate.net/profile/Dung-Nguyen-401",
    github: "",
    linkedin: ""
  }
};

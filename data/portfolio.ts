// Content and signed asset URLs transcribed from grid-portfolio.html.
export interface PortfolioImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
export interface PortfolioLink {
  href: string;
  label: string;
  newTab?: boolean;
}
export interface Publication {
  image: PortfolioImage;
  authors: string[];
  title: string;
  venue: PortfolioLink;
  links: PortfolioLink[];
}
export interface IndustryExperience {
  image: PortfolioImage;
  title: string;
  date: string;
  description: string;
  notableLabel?: string;
  projects: PortfolioLink[];
}
export interface Project {
  id?: string;
  image: PortfolioImage;
  title: string;
  date: string;
  description: string;
  technologies: string;
}
export interface Honor {
  title: string;
  date?: string;
  description: { before: string; emphasis?: string; after?: string };
  link?: PortfolioLink & { title: string; ariaLabel: string };
}
export interface Certification {
  image: PortfolioImage;
  title: string;
  issuer: string;
  dates: { label: string; value: string }[];
  link: PortfolioLink;
}
export interface Book {
  image: PortfolioImage;
  title: string;
  author: string;
  link: PortfolioLink;
  ariaLabel: string;
}
export interface SocialLink {
  href: string;
  ariaLabel: string;
  title: string;
  path: string;
  newTab?: boolean;
  download?: string;
}

export const navigationItems: readonly PortfolioLink[] = [
  {
    href: "#publications",
    label: "Publications",
  },
  {
    href: "#experience",
    label: "Experience",
  },
  {
    href: "#projects",
    label: "Selected Projects",
  },
  {
    href: "#honors",
    label: "Honors",
  },
  {
    href: "#certifications",
    label: "Certifications",
  },
  {
    href: "#others",
    label: "Others",
  },
];

export const socialLinks: readonly SocialLink[] = [
  {
    href: "mailto:rezabuddawlatuhin@gmail.com",
    ariaLabel: "Email Rezab Ud Dawla",
    title: "Email",
    path: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z",
  },
  {
    href: "https://scholar.google.com/citations?user=8CsMgtMAAAAJ&hl=en&oi=ao",
    ariaLabel: "Rezab Ud Dawla on Google Scholar",
    title: "Google Scholar",
    path: "M12 24a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm0-24L0 9.5l4.84 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.16 4.44L24 9.5 12 0Z",
    newTab: true,
  },
  {
    href: "https://github.com/rezabtuhin",
    ariaLabel: "Rezab Ud Dawla on GitHub",
    title: "GitHub",
    path: "M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z",
    newTab: true,
  },
  {
    href: "https://www.linkedin.com/in/rezabuddawla",
    ariaLabel: "Rezab Ud Dawla on LinkedIn",
    title: "LinkedIn",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.54V9H7.1v11.45Z",
    newTab: true,
  },
  {
    href: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/pdfs/Resume___Rezab_Ud_Dawla.pdf?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvcGRmcy9SZXN1bWVfX19SZXphYl9VZF9EYXdsYS5wZGYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NjkwMDMyLCJleHAiOjE5NDYzNzAwMzJ9.vL7PJ-1JmpZpmP1MRH6C6xkWDaHeOyEgb7vSRJ7zfgE6WwcJ1dgHpPMUr9VQ_A765znBLbgLrWHYmlTJIfec_A",
    ariaLabel: "Download Rezab Ud Dawla's curriculum vitae",
    title: "Download CV",
    path: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9L14 3ZM14 3v6h6M8 13h8M8 17h5",
    download: "Rezab_Ud_Dawla_CV.pdf",
  },
];

export const portrait: PortfolioImage = {
  src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/me/rezab_ud_dawla.jpg?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL21lL3JlemFiX3VkX2Rhd2xhLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg2OTAwNzUsImV4cCI6MTk0NjM3MDA3NX0.PeKltYzGszuohi571YOH4sPgilnZY4wrE7tSArqqYHm-9blCgXv66lmyNdTLv6Wmj5v8J7KwsyPNH-TRDvdIuA",
  alt: "Portrait of Rezab Ud Dawla",
  width: 1503,
  height: 1421,
};

export const publications: readonly Publication[] = [
  {
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/publication_images/SGG1.webp?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL3B1YmxpY2F0aW9uX2ltYWdlcy9TR0cxLndlYnAiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NjkwMTQ0LCJleHAiOjE5NDYzNzAxNDR9.icstihkAst_8dfV49dLjKJOozYPF7D7z_IiLabjuNHni9OX_YCmyeSZCUr_wI1Z576WB8Pqd0TrLXQhYSz4trg",
      alt: "Methodology figure for Attention-Based Scene Graph Generation: A Review",
      width: 742,
      height: 988,
    },
    authors: [
      "Afsana Airin",
      "Rezab Ud Dawla",
      "Ahmed Shabab Noor",
      "Muhib Al Hasan",
      "Ahmed Rafi Hasan",
      "Akib Zaman",
      "Dewan Md. Farid",
    ],
    title: "Attention-Based Scene Graph Generation: A Review",
    venue: {
      href: "https://ieeexplore.ieee.org/xpl/conhome/10029388/proceeding",
      label:
        "14th International Conference on Software, Knowledge, Information Management and Applications, 2022.",
      newTab: true,
    },
    links: [
      {
        href: "https://doi.org/10.1109/SKIMA57145.2022.10029570",
        label: "DOI",
      },
      {
        href: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/pdfs/Attention-Based%20Scene%20Graph%20Generation:%20A%20Review.pdf?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvcGRmcy9BdHRlbnRpb24tQmFzZWQgU2NlbmUgR3JhcGggR2VuZXJhdGlvbjogQSBSZXZpZXcucGRmIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODY4OTk2OCwiZXhwIjoxOTQ2MzY5OTY4fQ.2Iu0BUTHx1X1sr9168jmTsIy60JriF0zkeEYkUTPCqMJRIeyQTH0XBvazd8a39bFUhjdzXUDhUDI_Lf7R0pjBQ",
        label: "PDF",
      },
    ],
  },
  {
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/publication_images/lr.webp?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL3B1YmxpY2F0aW9uX2ltYWdlcy9sci53ZWJwIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODY5MDE5NSwiZXhwIjoxOTQ2MzcwMTk1fQ.xn_M1-JlKL1oe6IheDSroSjpxEamFs6oDSK1kZuNGw0SdC9rc5C3-8sGyeyli4MoiOveO9UIA77VUrp9cXemLw",
      alt: "Methodology figure for A Novel Method for Imbalanced Data Classification Based on Label Reassignment",
      width: 9355,
      height: 2867,
    },
    authors: [
      "Ahmed Shabab Noor",
      "Afsana Airin",
      "Rezab Ud Dawla",
      "Ahmed Rafi Hasan",
      "Muhib Al Hasan",
      "Akib Zaman",
      "Dewan Md. Farid",
    ],
    title:
      "A Novel Method for Imbalanced Data Classification Based on Label Reassignment",
    venue: {
      href: "https://ieeexplore.ieee.org/xpl/conhome/9977436/proceeding",
      label: "TENCON 2022 — IEEE Region 10 Conference, Hong Kong, 2022.",
      newTab: true,
    },
    links: [
      {
        href: "https://ieeexplore.ieee.org/document/9978090/",
        label: "IEEE Xplore",
      },
      {
        href: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/pdfs/A%20Novel%20Method%20for%20Imbalanced%20Data%20Classification%20based%20on%20Label%20Reassignment.pdf?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvcGRmcy9BIE5vdmVsIE1ldGhvZCBmb3IgSW1iYWxhbmNlZCBEYXRhIENsYXNzaWZpY2F0aW9uIGJhc2VkIG9uIExhYmVsIFJlYXNzaWdubWVudC5wZGYiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NjkwMDAwLCJleHAiOjE5NDYzNzAwMDB9.YwzDh7OP44dXm5YT7CKi2ljoEuHqjku-dcvdJLUDqEkpbuVKAyt-JEX7JKo7g6tBx5V5BpaXvKoq3Lvc2kyvIQ",
        label: "PDF",
      },
    ],
  },
  {
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/publication_images/data_loc.webp?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL3B1YmxpY2F0aW9uX2ltYWdlcy9kYXRhX2xvYy53ZWJwIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODY5MDIzMCwiZXhwIjoxOTQ2MzcwMjMwfQ.O7fDd0lR1xQZr7KT8wH-vFX65Nm4q3FuatDQalUXrqKvWr5U2CHoRStBNtU6vbhCE4m27R4iU8AkGOyPeflhgQ",
      alt: "Methodology figure for The Impact of Data Locality on the Performance of Cluster-Based Under-Sampling",
      width: 3832,
      height: 1008,
    },
    authors: [
      "Ahmed Shabab Noor",
      "Muhib Al Hasan",
      "Ahmed Rafi Hasan",
      "Rezab Ud Dawla",
      "Afsana Airin",
      "Akib Zaman",
      "Dewan Md. Farid",
    ],
    title:
      "The Impact of Data Locality on the Performance of Cluster-Based Under-Sampling",
    venue: {
      label:
        "Machine Intelligence and Emerging Technologies, LNICST 491, Springer, 2023.",
      href: "",
    },
    links: [
      {
        href: "https://doi.org/10.1007/978-3-031-34622-4_16",
        label: "DOI",
      },
      {
        href: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/pdfs/The%20Impact%20of%20Data%20Locality%20on%20the%20Performance%20of%20Cluster-Based%20Under-Sampling.pdf?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvcGRmcy9UaGUgSW1wYWN0IG9mIERhdGEgTG9jYWxpdHkgb24gdGhlIFBlcmZvcm1hbmNlIG9mIENsdXN0ZXItQmFzZWQgVW5kZXItU2FtcGxpbmcucGRmIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODY4OTgzOCwiZXhwIjoxOTQ2MzY5ODM4fQ.7l7s2muiIbUIFllPIjdRGZqlFfh9rovB1PA7RcFO_jlGF3IqcMvcaVM0RAOmcO7jdzuTHzroPbqZ0lkIVpX30Q",
        label: "PDF",
      },
    ],
  },
];

export const industryExperience: readonly IndustryExperience[] = [
  {
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/companies/linno.jpg?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL2NvbXBhbmllcy9saW5uby5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NjkwMzU2LCJleHAiOjE5NDYzNzAzNTZ9.k42JzRQVjF4YRR8E7BP_84F4HxDnAu9XJkHt3r3IUahGPi-hqZY7jItfyehKzTGFy1bVCsuNma3bCvPZv0YAAQ",
      alt: "Linno logo",
      width: 400,
      height: 400,
    },
    title: "Software Engineer — Linno",
    date: "January 2026 – Present (Dhaka, Bangladesh)",
    description:
      "I develop secure full-stack features and REST APIs with PHP and React, using role-based access control, optimized SQL queries, and Redis caching. I also built a self-hosted RAG support assistant with FastAPI, llama.cpp, hybrid retrieval, and confidence-based human escalation.",
    notableLabel: "Notable project:",
    projects: [
      {
        href: "#ai-troubleshooting-assistant",
        label: "AI Troubleshooting Assistant",
      },
    ],
  },
  {
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/companies/sharetrip.webp?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL2NvbXBhbmllcy9zaGFyZXRyaXAud2VicCIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg2OTAzOTksImV4cCI6MTk0NjM3MDM5OX0.PTGK_-qWQiLieaDgLtnxLyS5fV3rHXYK0OLn_m62RH7tVUdORw-6-nuXPeyaKALlFpF4B2ooxV20FNkkD-AlRw",
      alt: "ShareTrip logo",
      width: 2500,
      height: 2500,
    },
    title: "Software Engineer — ShareTrip",
    date: "July 2024 – January 2026 (Dhaka, Bangladesh)",
    description:
      "I built Python and FastAPI services and ETL workflows for an internal analytics platform. I improved high-volume booking systems through Redis caching, background job queues, and containerized deployments.",
    notableLabel: "Notable projects:",
    projects: [
      {
        href: "#single-sign-on-platform",
        label: "Single Sign-On Platform",
      },
      {
        href: "#reporting-analytics-management-system",
        label: "Reporting and Analytics Management System",
      },
    ],
  },
  {
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/companies/reddot.jpg?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL2NvbXBhbmllcy9yZWRkb3QuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODY5MDM4NCwiZXhwIjoxOTQ2MzcwMzg0fQ.wkBQVaSDMdILwEOC3vkom3ZN6YQMykpqEma5uxJ8quHHiMlKYq8NcuQnEss6DDX0XujUx_6kRsw6JZRw5wr7jA",
      alt: "RedDot Digital Limited logo",
      width: 1040,
      height: 1040,
    },
    title: "Software Engineer Intern — RedDot Digital Limited",
    date: "October 2023 – February 2024 (Dhaka, Bangladesh)",
    description:
      "I developed and tested Laravel features, including PHPUnit coverage, across the full software-development lifecycle within an Agile team.",
    projects: [],
  },
  {
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/companies/uiu.jpeg?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL2NvbXBhbmllcy91aXUuanBlZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg2OTA0MTcsImV4cCI6MTk0NjM3MDQxN30.y5FrUPVN81ONqRiR8Uvfi_ndSt77a5nNWOsPZADPWADnIIqDErnDQk_U_8wlKhXmOCcuiH-DpGS5GUgHMNv_VQ",
      alt: "United International University logo",
      width: 500,
      height: 500,
    },
    title: "Undergraduate Teaching Assistant — United International University",
    date: "February 2023 – May 2023 (Dhaka, Bangladesh)",
    description:
      "Taught CSE 4165: Web Programming to approximately 45 students, assessed course learning outcomes, and supervised student software projects.",
    projects: [],
  },
];

export const projects: readonly Project[] = [
  {
    id: "ai-troubleshooting-assistant",
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/projects_architecture/helpscout_assistant.webp?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL3Byb2plY3RzX2FyY2hpdGVjdHVyZS9oZWxwc2NvdXRfYXNzaXN0YW50LndlYnAiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NjkwNTQwLCJleHAiOjE5NDYzNzA1NDB9.GvTdmd-Ls-hKssNinb6xTiG-2qtngNQSFjwwmRdZLF0kXHAFor7Ca_NFWmQNzusTKGnm970oPatbQDRtz3FgCA",
      alt: "Architecture diagram for the AI Troubleshooting Assistant",
      width: 1672,
      height: 892,
    },
    title: "AI Troubleshooting Assistant",
    date: "Industry work · March 2026 – June 2026",
    description:
      "Built and deployed a RAG pipeline with a quantized, self-hosted small language model for first-line technical support. Combined semantic and keyword retrieval, confidence-based human escalation, and evaluation on labeled historical conversations.",
    technologies: "Python · llama.cpp · FastAPI · Vector DB · HelpScout API",
  },
  {
    id: "single-sign-on-platform",
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/projects_architecture/SSO_architecture.webp?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL3Byb2plY3RzX2FyY2hpdGVjdHVyZS9TU09fYXJjaGl0ZWN0dXJlLndlYnAiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NjkwNjI3LCJleHAiOjE5NDYzNzA2Mjd9.xc_fvUELcGb3GKk56p8bAB_aZldAG9Rdi1NPH1XxczaADL_N2tWcy2vuzTL-YcScG374vEFIzAokzlUr4Bm2Cw",
      alt: "Architecture diagram for the Single Sign-On Platform",
      width: 1672,
      height: 888,
    },
    title: "Single Sign-On Platform",
    date: "Industry work · November 2024 – May 2025",
    description:
      "Built a centralized SSO platform with Redis-backed session sharing, role- and service-based access control, event tracking, and secure management APIs.",
    technologies: "Yii · MySQL · Redis · RabbitMQ · Swagger UI",
  },
  {
    id: "reporting-analytics-management-system",
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/projects_architecture/reporting_management.webp?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL3Byb2plY3RzX2FyY2hpdGVjdHVyZS9yZXBvcnRpbmdfbWFuYWdlbWVudC53ZWJwIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODY5MDYwNywiZXhwIjoxOTQ2MzcwNjA3fQ.3CWLeOkPwyviIOv-IW7Sb-sWBvJD0VWH1IxI1byijP0KV24JICLHK5xtGgQ3MkBj17xMs7SA1Ci4x3VcW6lvaw",
      alt: "Architecture diagram for the Reporting and Analytics Management System",
      width: 1672,
      height: 848,
    },
    title: "Reporting and Analytics Management System",
    date: "Industry work · September 2025 – December 2025",
    description:
      "Developed authenticated FastAPI endpoints, ETL pipelines, and Streamlit dashboards, with Redis caching and Docker-based deployments.",
    technologies: "Python · FastAPI · Streamlit · MySQL · Redis · Docker",
  },
  {
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/projects_architecture/rock_detection.webp?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL3Byb2plY3RzX2FyY2hpdGVjdHVyZS9yb2NrX2RldGVjdGlvbi53ZWJwIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4ODY5MDY0MywiZXhwIjozNTIzMTcwNjQzfQ.XZMSvCoAJVF814gyr8u13CXkM5cw6DBuP5XKM7rpM895tdLlRoEOXaKGsJTsiFe3tNPquDWWRNBxyhw83HDMgA",
      alt: "Rock detection model and sample classification results",
      width: 1774,
      height: 788,
    },
    title: "Rock Detection Model",
    date: "UIU Mars Rover Team · 2022",
    description:
      "Built a binary vision model on a custom dataset for classifying fossil and metamorphic rocks. Applied VGG16 feature extraction and increased reported accuracy from 82% to 97%.",
    technologies: "Python · Pandas · OpenCV · TensorFlow · VGG16",
  },
];

export const honors: readonly Honor[] = [
  {
    title: "University Scholarship Recipient",
    description: {
      before:
        "Received nine merit-based scholarships in recognition of consistent academic excellence across individual semesters and overall academic performance, with each award covering either 25% or 50% of tuition.",
    },
  },
  {
    title: "1st Runner-Up - CSE Project Showcase",
    description: {
      before: "Led Team Firefox in developing and presenting the ",
      emphasis: "UIU Club Management System",
      after:
        ". The platform centralized club membership records, event scheduling, and activity tracking to simplify administrative work and encourage stronger student participation.",
    },
    date: "Team Lead · Intra-university project show competition · Fall 2022",
    link: {
      href: "https://github.com/rezabtuhin/uiucms",
      label: "\n\n",
      newTab: true,
      title: "View code on GitHub",
      ariaLabel: "View the UIU Club Management System code on GitHub",
    },
  },
];

export const certifications: readonly Certification[] = [
  {
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/certifications/github_foundation.webp?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL2NlcnRpZmljYXRpb25zL2dpdGh1Yl9mb3VuZGF0aW9uLndlYnAiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NjkwNjc2LCJleHAiOjE5NDYzNzA2NzZ9.wGasiAHRa8yFyoWXpnEYOioj5BY9x3PeX_Z-DszE7LHVGC2ZL6rg_k5OA-F39J_PqFxhUaC-OBIn3DJro2hwpg",
      alt: "GitHub Foundations certificate issued to Rezab Ud Dawla",
      width: 1287,
      height: 994,
    },
    title: "GitHub Foundations",
    issuer: "GitHub",
    dates: [
      {
        label: "Issued",
        value: "July 2024",
      },
      {
        label: "Expires",
        value: "July 2027",
      },
    ],
    link: {
      href: "https://www.credly.com/badges/a41b67a3-915a-443e-9911-0bba5035a81a/print",
      label: "View credential ↗",
      newTab: true,
    },
  },
];

export const books: readonly Book[] = [
  {
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/reading/illustrated_guide_to_ai.webp?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL3JlYWRpbmcvaWxsdXN0cmF0ZWRfZ3VpZGVfdG9fYWkud2VicCIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg2OTA3MDEsImV4cCI6MTk0NjM3MDcwMX0.V4AOB6LT8Z6-IroB7MW1_4F0ub93A8IpcM_9UrEPX3pkCfSCeosLauUjfaIigwWXZfkG2w0gV9Tyn_PyHU6x2A",
      alt: "Cover of Illustrated Guide to AI by The Welch Labs",
      width: 750,
      height: 1036,
    },
    title: "Illustrated Guide to AI",
    author: "The Welch Labs",
    link: {
      href: "https://www.welchlabs.com/store/illustrated-guide-to-ai",
      label: "\n\n",
      newTab: true,
    },
    ariaLabel: "Open Illustrated Guide to AI by The Welch Labs in a new tab",
  },
  {
    image: {
      src: "https://xizhvfokbwpywdhmevcs.supabase.co/storage/v1/object/sign/snacks/images/reading/wool.jpg?token=eyJraWQiOiJkYjk4MjExZC0xMWY3LTRhNzAtYTNlMi1lNWIyMmNkOWIyZGQiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJzbmFja3MvaW1hZ2VzL3JlYWRpbmcvd29vbC5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg4NjkwNzQwLCJleHAiOjE5NDYzNzA3NDB9.ZC56wAWehcuiGnMJg5lOe-_PwYGsPFIYmiPIqk4lvHtn2DcEhVHGCXpbAaH5SM7UQN_AV5kHnVfswqWdsJrP5g",
      alt: "Cover of Wool by Hugh Howey",
      width: 922,
      height: 1417,
    },
    title: "Wool",
    author: "Hugh Howey",
    link: {
      href: "https://www.amazon.co.uk/Wool-Trilogy-Hugh-Howey/dp/0099580489",
      label: "\n\n",
      newTab: true,
    },
    ariaLabel: "Open Wool by Hugh Howey in a new tab",
  },
];

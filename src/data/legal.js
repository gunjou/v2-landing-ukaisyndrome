// Isi halaman legal (REAL, disalin dari situs lama). URL dipertahankan karena tertaut di Play Store / App Store.
// Struktur section: { heading, body?, items?: [string | { label, text }], footnote? }

const email = "admin@ukaisyndrome.id";

export const legalPages = {
  "privacy-policy-id": {
    lang: "id",
    alternate: "/privacy-policy",
    alternateLabel: "View in English",
    title: "Kebijakan Privasi",
    description: "Cara Syndrome UKAI mengumpulkan, menggunakan, dan melindungi informasi Anda.",
    effective: "Tanggal berlaku: 13 September 2025",
    intro:
      "Outlook-Project (“kami”) membangun aplikasi seluler Syndrome UKAI sebagai layanan gratis. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda saat Anda menggunakan Aplikasi kami. Dengan menggunakan Aplikasi, Anda menyetujui praktik yang dijelaskan dalam Kebijakan Privasi ini.",
    sections: [
      {
        heading: "Informasi yang Kami Kumpulkan",
        body: "Saat Anda menggunakan Aplikasi, kami dapat mengumpulkan jenis informasi berikut:",
        items: [
          { label: "Informasi Perangkat", text: "seperti alamat IP, sistem operasi, dan data penggunaan aplikasi (misalnya, halaman yang dikunjungi, waktu yang dihabiskan)." },
          { label: "Data Lokasi", text: "perkiraan atau lokasi yang tepat, jika Anda memberikan izin, untuk mengaktifkan fitur berbasis lokasi." },
          { label: "Data yang Disediakan Pengguna", text: "seperti nama, alamat email, nomor telepon, atau usia, saat Anda memilih untuk memberikannya." },
        ],
      },
      {
        heading: "Cara Kami Menggunakan Informasi",
        items: [
          "Menyediakan fungsionalitas inti aplikasi.",
          "Meningkatkan kinerja aplikasi dan pengalaman pengguna.",
          "Menyediakan konten dan rekomendasi yang dipersonalisasi.",
          "Mengirimkan pemberitahuan penting (misalnya, pembaruan, pesan terkait layanan).",
          "Memastikan keamanan, kepatuhan, dan pencegahan penipuan.",
        ],
      },
      {
        heading: "Layanan Pihak Ketiga",
        body: "Aplikasi dapat menggunakan layanan pihak ketiga yang mengumpulkan informasi untuk membantu kami meningkatkan dan mendukung layanan kami. Ini termasuk tetapi tidak terbatas pada:",
        items: ["Layanan Google Play (Google Play Services)"],
      },
      {
        heading: "Pembagian & Pengungkapan Data",
        body: "Kami dapat membagikan informasi hanya dalam kasus berikut:",
        items: [
          "Ketika diwajibkan oleh hukum atau proses hukum.",
          "Untuk melindungi hak, properti, atau keselamatan pengguna kami atau orang lain.",
          "Dengan penyedia layanan tepercaya yang beroperasi atas nama kami di bawah perjanjian kerahasiaan yang ketat.",
        ],
        footnote: "Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga.",
      },
      {
        heading: "Penyimpanan & Kontrol Data",
        items: [
          "Kami menyimpan data yang disediakan pengguna selama diperlukan untuk menyediakan layanan kami dan untuk jangka waktu yang wajar setelahnya.",
          `Anda dapat meminta penghapusan data Anda kapan saja dengan menghubungi kami di ${email}.`,
          "Anda juga dapat menghentikan semua pengumpulan data segera dengan menghapus instalasi (uninstall) Aplikasi.",
        ],
      },
      {
        heading: "Privasi Anak",
        body: "Aplikasi kami tidak ditujukan untuk anak di bawah usia 13 tahun. Kami tidak dengan sengaja mengumpulkan informasi pribadi dari anak-anak. Jika kami menyadari bahwa kami telah mengumpulkan data pribadi dari anak di bawah usia 13 tahun, kami akan segera menghapusnya.",
      },
      {
        heading: "Keamanan",
        body: "Kami menerapkan perlindungan administratif, teknis, dan fisik yang wajar untuk melindungi informasi Anda dari akses, kehilangan, atau penyalahgunaan yang tidak sah. Namun, tidak ada sistem yang 100% aman, dan kami tidak dapat menjamin keamanan mutlak.",
      },
      {
        heading: "Perubahan pada Kebijakan Ini",
        body: "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Pembaruan akan diposting di halaman ini dengan “Tanggal Berlaku” yang direvisi. Kami mendorong Anda untuk meninjau Kebijakan Privasi ini secara berkala.",
      },
      {
        heading: "Hubungi Kami",
        items: [
          { label: "Email", text: email },
          { label: "Website", text: "https://ukaisyndrome.id" },
        ],
      },
    ],
  },

  "privacy-policy": {
    lang: "en",
    alternate: "/privacy-policy-id",
    alternateLabel: "Lihat dalam Bahasa Indonesia",
    title: "Privacy Policy",
    description: "How Syndrome UKAI collects, uses, and protects your information.",
    effective: "Effective date: September 13, 2025",
    intro:
      "Outlook-Project (“we”, “our”, or “us”) built the Syndrome UKAI mobile application (“Application”) as a free service. This Privacy Policy explains how we collect, use, and protect your information when you use our Application. By using the Application, you agree to the practices described in this Privacy Policy.",
    sections: [
      {
        heading: "Information We Collect",
        body: "When you use the Application, we may collect the following types of information:",
        items: [
          { label: "Device Information", text: "such as IP address, operating system, and app usage data (e.g., pages visited, time spent)." },
          { label: "Location Data", text: "approximate or precise location, if you grant permission, to enable location-based features." },
          { label: "User-Provided Data", text: "such as name, email address, phone number, or age, when you choose to provide it." },
        ],
      },
      {
        heading: "How We Use Information",
        items: [
          "Delivering core app functionality.",
          "Improving app performance and user experience.",
          "Providing personalized content and recommendations.",
          "Sending important notifications (e.g., updates, service-related messages).",
          "Ensuring safety, compliance, and fraud prevention.",
        ],
      },
      {
        heading: "Third-Party Services",
        body: "The Application may use third-party services that collect information to help us improve and support our services. These include but are not limited to:",
        items: ["Google Play Services"],
      },
      {
        heading: "Data Sharing & Disclosure",
        body: "We may share information only in the following cases:",
        items: [
          "When required by law or legal processes.",
          "To protect the rights, property, or safety of our users or others.",
          "With trusted service providers who operate on our behalf under strict confidentiality agreements.",
        ],
        footnote: "We do not sell or rent your personal information to third parties.",
      },
      {
        heading: "Data Retention & Control",
        items: [
          "We retain user-provided data for as long as necessary to deliver our services and for a reasonable period thereafter.",
          `You may request deletion of your data at any time by contacting us at ${email}.`,
          "You can also stop all data collection immediately by uninstalling the Application.",
        ],
      },
      {
        heading: "Children’s Privacy",
        body: "Our Application is not directed at children under 13 years old. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child under 13, we will promptly delete it.",
      },
      {
        heading: "Security",
        body: "We implement reasonable administrative, technical, and physical safeguards to protect your information against unauthorized access, loss, or misuse. However, no system is 100% secure, and we cannot guarantee absolute security.",
      },
      {
        heading: "Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised “Effective Date”. We encourage you to review this Privacy Policy periodically.",
      },
      {
        heading: "Contact Us",
        items: [
          { label: "Email", text: email },
          { label: "Website", text: "https://ukaisyndrome.id" },
        ],
      },
    ],
  },

  "data-deletion-request-id": {
    lang: "id",
    alternate: "/data-deletion-request",
    alternateLabel: "View in English",
    title: "Permintaan Penghapusan Akun dan Data",
    description: "Cara mengajukan penghapusan akun dan data aplikasi Syndrome UKAI.",
    effective: "Aplikasi Syndrome UKAI",
    intro: "Kami, Outlook-Project, memproses permintaan penghapusan akun melalui email.",
    mailto: { label: "Kirim email permintaan", email, subject: "Permintaan Penghapusan Akun - Syndrome UKAI" },
    sections: [
      {
        heading: "Detail yang Wajib Disertakan",
        items: [
          { label: "Subjek Email", text: "Permintaan Penghapusan Akun - Syndrome UKAI" },
          { label: "Identifikasi Akun", text: "Email atau username" },
          { label: "Konfirmasi", text: "Penghapusan permanen" },
        ],
      },
      {
        heading: "Data yang Dihapus & Dipertahankan",
        body: "Setelah verifikasi:",
        items: [
          { label: "Dihapus", text: "Semua data pengguna" },
          { label: "Dipertahankan", text: "Data anonim untuk kepatuhan dan analitik. Lihat Kebijakan Privasi." },
        ],
      },
    ],
  },

  "data-deletion-request": {
    lang: "en",
    alternate: "/data-deletion-request-id",
    alternateLabel: "Lihat dalam Bahasa Indonesia",
    title: "Account and Data Deletion Request",
    description: "How to request deletion of your Syndrome UKAI account and data.",
    effective: "Application Syndrome UKAI",
    intro:
      "We, Outlook-Project, process account deletion requests via email. Please send your request to the contact address below to begin the process.",
    mailto: { label: "Send request email", email, subject: "Account Deletion Request - Syndrome UKAI" },
    sections: [
      {
        heading: "Required Details in the Email",
        body: "To ensure your request is processed quickly and securely, you must include the following details in your email:",
        items: [
          { label: "Email Subject", text: "Account Deletion Request - Syndrome UKAI" },
          { label: "Account Identification", text: "Include email or username" },
          { label: "Request Confirmation", text: "Permanent deletion request" },
        ],
      },
      {
        heading: "Data Deleted and Retained",
        body: "After verification:",
        items: [
          { label: "Deleted", text: "All user data" },
          { label: "Retained", text: "Anonymized data for compliance and analytics. See Privacy Policy." },
        ],
      },
    ],
  },
};

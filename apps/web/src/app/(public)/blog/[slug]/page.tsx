"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, ArrowRight, Share2, Bookmark } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  contentHtml: string;
}

const posts: BlogPost[] = [
  {
    slug: "chuyen-dich-danh-gia-tu-web2-sang-web3",
    title: 'Tương lai của đánh giá Năng lực số: Chuyển dịch từ Web2 sang Web3',
    excerpt: 'Tại sao các chứng chỉ file PDF truyền thống đang dần mất giá trị và cách công nghệ Soulbound Token (SBT) giải quyết bài toán chống làm giả vĩnh viễn trên Polygon.',
    date: '10 Tháng 7, 2026',
    author: 'Đỗ Khắc Gia Khoa',
    readTime: '5 phút đọc',
    category: "Blockchain",
    contentHtml: `
      <p>Làn sóng số hóa diễn ra mạnh mẽ trên thế giới kéo theo nhu cầu cấp thiết về việc xác minh và lưu trữ hồ sơ học tập một cách chuẩn hóa. Từ lâu, các chứng chỉ định dạng PDF đã được xem là tiêu chuẩn vàng của kỷ nguyên Web2. Tuy nhiên, khi đi sâu vào thực tế tuyển dụng của doanh nghiệp, định dạng này đã bộc lộ những điểm yếu chết người.</p>
      
      <h3>1. Những kẽ hở của chứng chỉ Web2 (PDF)</h3>
      <p>Chứng chỉ dạng PDF hoặc ảnh số rất dễ bị can thiệp bằng các công cụ chỉnh sửa đồ họa thông thường. Một ứng viên có thể thay đổi họ tên, ngày cấp hoặc thậm chí nâng mức xếp loại từ trung bình lên giỏi chỉ trong vài phút. Nhà tuyển dụng rất khó và tốn kém chi phí nếu muốn hậu kiểm chéo với đơn vị cấp bằng (trường đại học, viện nghiên cứu).</p>
      
      <h3>2. Định nghĩa Soulbound Token (SBT)</h3>
      <p>Được đề xuất lần đầu bởi Vitalik Buterin (nhà sáng lập Ethereum), Soulbound Token là một loại NFT đặc biệt liên kết chặt chẽ với địa chỉ ví của một cá nhân duy nhất (gọi là "Soul"). Điểm cốt lõi của SBT là <strong>không thể chuyển nhượng, mua bán hoặc tặng cho người khác</strong>. Điều này làm cho nó trở thành mảnh ghép hoàn hảo để bảo chứng thông tin cá nhân như học vị, kinh nghiệm làm việc và năng lực số.</p>
      
      <h3>3. Cách DIGVOS ứng dụng SBT trên mạng Polygon</h3>
      <p>DIGVOS sử dụng giao thức ERC-5192 (chuẩn Soulbound Token tối giản) trên mạng chuỗi khối Polygon để tối ưu hóa chi phí giao dịch (phí gas). Mỗi khi học viên hoàn thành kỳ thi đánh giá thích ứng CAT Test và đạt một trần năng lực số theo tiêu chuẩn DigComp 3.0:</p>
      <ul>
        <li>Hệ thống AI đối chiếu kết quả và mã hóa dữ liệu.</li>
        <li>Hợp đồng thông minh của DIGVOS tự động đúc (mint) một token SBT tương ứng gửi về ví học viên.</li>
        <li>Bất kỳ doanh nghiệp nào có mã băm giao dịch (Transaction Hash) đều có thể đối chiếu mã hóa và xác minh trong 1 giây mà không cần thông qua đơn vị trung gian.</li>
      </ul>

      <p>Sự chuyển dịch từ Web2 sang Web3 không đơn giản chỉ là đổi mới công nghệ, mà là sự thay đổi triết lý quản lý: trả lại quyền sở hữu thông tin cho chính người học, đồng thời thiết lập niềm tin tuyệt đối giữa nhà trường và nhà tuyển dụng.</p>
    `
  },
  {
    slug: "thuat-toan-trac-nghiem-thich-ung-cat-digcomp",
    title: 'Ứng dụng thuật toán Trắc nghiệm Thích ứng (CAT) trong đào tạo chuẩn quốc gia',
    excerpt: 'Tìm hiểu cách thuật toán tinh chỉnh câu hỏi theo thời gian thực giúp đo lường chính xác trần năng lực số của sinh viên theo khung DigComp 3.0.',
    date: '08 Tháng 7, 2026',
    author: 'Hoàng Ái Phương',
    readTime: '8 phút đọc',
    category: "CAT Testing",
    contentHtml: `
      <p>Việc đo lường năng lực số của một cá nhân là bài toán phức tạp. Các đề thi truyền thống thường có số lượng câu hỏi cố định và giống nhau cho mọi đối tượng. Điều này dẫn tới hai hệ quả tiêu cực: Thí sinh giỏi cảm thấy đề quá dễ và nhàm chán, trong khi thí sinh yếu cảm thấy nản lòng trước các câu hỏi quá tầm. Thuật toán CAT sinh ra để giải quyết bài toán này.</p>
      
      <h3>1. Thuật toán CAT hoạt động ra sao?</h3>
      <p>Computer Adaptive Testing (CAT) hoạt động dựa trên Lý thuyết Ứng đáp Câu hỏi (Item Response Theory - IRT). Thay vì chọn câu hỏi ngẫu nhiên, hệ thống sẽ thực hiện quy trình lặp sau:</p>
      <ul>
        <li>Bắt đầu bằng một câu hỏi có độ khó trung bình (0.0 logit).</li>
        <li>Nếu thí sinh trả lời đúng: Hệ thống đánh giá trần năng lực của họ cao hơn và chọn một câu hỏi khó hơn cho lượt tiếp theo.</li>
        <li>Nếu thí sinh trả lời sai: Hệ thống đánh giá năng lực của họ thấp hơn và chọn một câu hỏi dễ hơn để xác định lại vùng nền tảng.</li>
        <li>Quá trình dừng lại khi sai số đo lường (Standard Error) đạt mức tối thiểu cho phép (dưới 0.15 logit).</li>
      </ul>

      <h3>2. Tích hợp khung năng lực số DigComp 3.0</h3>
      <p>Khung năng lực số châu Âu DigComp 3.0 chia năng lực số thành 5 nhóm lớn với 8 mức độ thành thạo. DIGVOS đã số hóa ngân hàng câu hỏi thành các node độ khó tương ứng với các cấp độ này. Nhờ CAT Test, học viên chỉ cần làm trung bình 15-20 câu hỏi thay vì 60 câu như trước, tiết kiệm 70% thời gian nhưng vẫn đạt độ chính xác tương đương 99%.</p>
    `
  },
  {
    slug: "tro-ly-ai-cham-diem-thuc-hanh-gemini-api",
    title: 'Trợ lý AI chấm điểm thực hành: Đồng minh mới của Giảng viên thời đại số',
    excerpt: 'Làm thế nào API Gemini có thể phân tích ngữ nghĩa, so khớp ma trận Rubrics chấm điểm bài làm và phát hiện các dấu hiệu gian lận thông minh trong bài tập Word/Excel.',
    date: '05 Tháng 7, 2026',
    author: 'Nguyễn Tiến Đạt',
    readTime: '6 phút đọc',
    category: "Trí tuệ Nhân tạo",
    contentHtml: `
      <p>Trong giảng dạy kỹ năng tin học văn phòng và năng lực số, việc chấm điểm thủ công các tệp thực hành (Word, Excel, code cơ bản) luôn là gánh nặng lớn đối với giảng viên. DIGVOS đã tích hợp công nghệ AI từ Google Gemini API để tự động hóa toàn bộ quy trình này một cách công bằng và chi tiết.</p>
      
      <h3>1. Phân tích ngữ nghĩa thay vì so khớp ký tự tĩnh</h3>
      <p>Các hệ thống chấm điểm tự động cũ chỉ so khớp văn bản một cách cơ học (ví dụ: đúng từng dấu chấm, dấu phẩy). Trợ lý AI của chúng tôi sử dụng mô hình ngôn ngữ lớn để hiểu ngữ nghĩa của tài liệu. Ví dụ, nếu học sinh sử dụng các cách diễn đạt khác nhau hoặc các công thức lồng ghép tương đương trong Excel, AI vẫn nhận diện và cho điểm tối đa nhờ khả năng suy luận logic.</p>
      
      <h3>2. Chấm điểm dựa trên ma trận tiêu chí Rubrics</h3>
      <p>AI của DIGVOS hoạt động bằng cách đọc tệp bài làm, so khớp với tệp đáp án và ma trận tiêu chí Rubrics do giảng viên tải lên. Hệ thống sẽ sinh ra một bảng phân tích chi tiết: Chỉ rõ phần nào học sinh đã làm tốt, phần nào bị thiếu công thức và chấm điểm chi tiết cho từng cấu phần năng lực thành phần.</p>
    `
  }
];

export default function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4 text-slate-900">
        <h1 className="text-2xl font-bold text-slate-950">Không Tìm Thấy Bài Viết</h1>
        <p className="text-sm text-slate-500 font-light">
          Bài viết bạn đang truy cập có thể đã bị xóa hoặc sai đường dẫn liên kết.
        </p>
        <Link href="/blog">
          <button className="text-xs text-[#5a96b0] font-bold border-b border-[#5a96b0]">
            Quay lại cổng tin tức
          </button>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-10 text-left text-slate-900 space-y-8 relative">
      {/* SEO structured data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": "2026-07-10",
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "DIGVOS"
            }
          })
        }}
      />

      {/* Nút quay lại */}
      <Link href="/blog" className="inline-flex items-center space-x-2 text-slate-400 hover:text-slate-900 text-xs font-semibold transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại Cổng tin tức</span>
      </Link>

      {/* Tiêu đề & Category */}
      <div className="space-y-4">
        <span className="bg-[#5a96b0]/15 text-[#5a96b0] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-block">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-slate-950 tracking-tight leading-tight">
          {post.title}
        </h1>
        <p className="text-sm text-slate-500 font-light leading-relaxed italic border-l-2 border-slate-200 pl-4">
          {post.excerpt}
        </p>
      </div>

      {/* Meta Bar */}
      <div className="flex justify-between items-center py-4 border-y border-slate-100 text-xs text-slate-500 font-light">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 font-medium text-slate-700">
            <User className="w-4 h-4 text-[#5a96b0]" />
            <span>{post.author}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1.5">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* HTML Nội dung bài viết phong cách Editorial */}
      <div 
        className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-light text-sm sm:text-base space-y-6 pt-2"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* CTA Box cuối bài viết */}
      <div className="mt-12 glass-premium p-8 rounded-2xl border border-slate-200/80 bg-white/50 text-center space-y-4">
        <h4 className="font-bold text-slate-900 text-lg">Bạn muốn xác thực trần năng lực số của mình?</h4>
        <p className="text-xs text-slate-500 max-w-md mx-auto font-light leading-relaxed">
          Tham gia ngay bài đánh giá trắc nghiệm thích ứng chuẩn DigComp 3.0 và nhận chứng chỉ mã hóa on-chain miễn phí.
        </p>
        <Link href="/select-role?action=register" className="inline-block pt-2">
          <button className="bg-[#5a96b0] hover:bg-[#487a90] text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-md flex items-center space-x-2 transition-all">
            <span>Thi đánh giá ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </article>
  );
}

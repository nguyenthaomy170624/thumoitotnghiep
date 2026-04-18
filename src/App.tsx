import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';

/* ================= SECTION ================= */
const Section = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
<section id={id} className={cn('py-10 px-4 max-w-5xl mx-auto sm:py-14 sm:px-6', className)}>    {children}
  </section>
);

/* ================= COUNTDOWN ================= */
const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance <= 0) return;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  return (
<div className="flex justify-center items-center gap-4 sm:gap-8 flex-nowrap overflow-x-auto">      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="font-serif text-[clamp(1.6rem,4vw,2.8rem)] tracking-wide">
            {u.value.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-brand-accent/40 mt-2">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
};



/* ================= DATA ================= */
const detailCards = [
  {
    label: 'Thời gian',
    title: 'Thứ Tư, 22/04/2026',
    body: '15:00 – 15:45',
  },
  {
    label: 'Địa điểm',
    title: 'Trường Đại học Tài chính – Marketing',
    body: '306 Võ Văn Hát, Long Trường, TP. Hồ Chí Minh',
    link:
      'https://www.google.com/maps/search/?api=1&query=Trường+Đại+học+Tài+chính+Marketing+306+Võ+Văn+Hát',
    linkLabel: 'Xem chỉ đường',
  },
  {
    label: 'Gửi xe',
    body: 'Xem sơ đồ gửi xe',
    image: '/images/sodo.jpg',
  },
 
  {
    label: 'Liên hệ',
    title: 'Nguyễn Thảo My',
    body: '0789 933 225',
    tel: '0789933225',
  },
];

export default function App() {
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [rsvp, setRsvp] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
const [message, setMessage] = useState<string | null>(null);
const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const graduationDate = new Date('2026-04-22T15:00:00');

  /* ================= SEND DATA ================= */
 const sendRSVP = async (status: string) => {
  setMessage(null);
  setErrorMsg(null);

  if (!name.trim()) {
    setErrorMsg("Vui lòng nhập tên của bạn");
    return;
  }

  try {
    setLoading(true);

    await fetch("https://script.google.com/macros/s/AKfycbxemUoSNwiYWvZYMTSFvnacmj1zcobRPzV9boEKPOZK57S6jwG-67i--FrZnPZY-orx/exec", {
      method: "POST",
      body: JSON.stringify({
        name,
        status,
      }),
    });

    if (status === "Đi") {
      setMessage("Hẹn gặp bạn tại buổi lễ!");
    } else {
      setMessage("Hy vọng sẽ gặp bạn dịp gần nhất!");
    }

  } catch (error) {
    setErrorMsg("Có lỗi xảy ra, vui lòng thử lại");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-white text-brand-accent selection:bg-brand-accent/10">

      {/* Top line */}
      <div className="sticky top-0 z-50 h-[5px] w-full bg-brand-accent/90" />

      {/* HERO */}
      <section className="relative min-h-[100dvh] flex items-center justify-center px-6 md:px-10 py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-16 right-12 w-64 h-64 rounded-full border border-brand-accent/5" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-brand-accent/10 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto grid md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-24 items-center">

          {/* TEXT */}
          <motion.div className="text-center md:text-left space-y-3 sm:space-y-4">
            <p className="text-[clamp(10px,1.5vw,12px)] uppercase tracking-[0.45em] text-brand-accent/40">
              Graduation Invitation
            </p>

            <p className="text-[clamp(14px,2vw,16px)] text-brand-accent/70 leading-relaxed">
              Trân trọng kính mời tham dự lễ tốt nghiệp của
            </p>

            <h1 className="font-serif text-[clamp(2.4rem,6vw,4.8rem)] leading-tight tracking-tight">
              Nguyễn Thảo My
            </h1>

            <div className="h-px w-16 bg-brand-accent/30 mx-auto md:mx-0" />

            <p className="text-[clamp(13px,2vw,15px)] uppercase tracking-[0.18em] text-brand-accent/60">
              Tân cử nhân
              <br />
              Ngành Hệ thống thông tin quản lý
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div>
            <div className="relative aspect-[4/5] max-w-[420px] mx-auto overflow-hidden rounded-2xl shadow-2xl">
              <img src="/images/anhmyne.jpg" className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-[14px] border-white/20" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* COUNTDOWN */}
<Section>
 <div className="text-center space-y-2">
    {/* Title */}
    <p className="text-[15px] uppercase tracking-[0.45em] font-bold text-brand-accent/40 text-center">
      Countdown to Celebration
    </p>

    {/* Line decor */}
    <div className="mx-auto mb-10 h-px w-16 bg-brand-accent/30" />

    {/* Box */}
    <div className="rounded-2xl border border-brand-accent/10 bg-white/60 backdrop-blur-sm px-6 py-8 shadow-sm">
      <Countdown targetDate={graduationDate} />
    </div>

  </div>
</Section>
<p className="text-[15px] uppercase tracking-[0.45em] font-bold text-brand-accent/40  text-center">
            Thông tin buổi lễ
          </p>
      {/* DETAILS */}
      <Section id="thong-tin">
        <div className="grid md:grid-cols-2 gap-6 text-center ">
          
          {detailCards.map((item) => (
            <div
              key={item.label}
              className="bg-white px-8 py-10 rounded-2xl border border-brand-accent/10 shadow-sm hover:shadow-md transition"
            >
              <span className="text-[11px] uppercase tracking-[0.3em] text-brand-accent/40 block mb-4">
                {item.label}
              </span>

              {item.title && (
                <p className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] italic mb-3">
                  {item.title}
                </p>
              )}

              {item.image ? (
                <button
                  onClick={() => setOpenImage(item.image!)}
                  className="text-[12px] uppercase tracking-[0.2em] border-b border-brand-accent pb-1 hover:opacity-60 transition"
                >
                  {item.body}
                </button>
              ) : item.tel ? (
                <p className="text-[clamp(1.2rem,2.5vw,1.8rem)]">
                  <a href={`tel:${item.tel}`}>{item.body}</a>
                </p>
              ) : (
                <p className="text-brand-accent/70 leading-relaxed">
                  {item.body}
                </p>
              )}
            </div>
          ))}

        </div>
      </Section>
 <div className="text-center">

          <p className="text-[15px] uppercase tracking-[0.45em] font-bold text-brand-accent/40  text-center">
            Xác nhận tham dự
          </p>
            </div>
      {/* RSVP */}
      <Section>
        <div className="text-center space-y-6">


          {/* INPUT */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên của bạn"
            className="px-6 py-3 rounded-full border border-brand-accent/30 text-center w-[260px]"
          />

          <div className="flex justify-center gap-4">

            <button
              disabled={loading}
              onClick={() => sendRSVP('Đi')}
              className="px-6 py-3 rounded-full border border-brand-accent hover:bg-brand-accent hover:text-white"
            >
              {loading ? "Đang gửi..." : "Đồng ý" }

            </button>

            <button
              disabled={loading}
              onClick={() => sendRSVP('Không')}
              className="px-6 py-3 rounded-full border border-brand-accent/40"
              
            >              {loading ? "Đang gửi..." : "Từ chối" }

            </button>
{(message || errorMsg) && (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
    
    <div className={`flex items-center gap-3 px-5 py-3 rounded-full shadow-lg backdrop-blur-md border
      ${message 
        ? "bg-white/80 border-brand-accent/10 text-brand-accent" 
        : "bg-red-50 border-red-200 text-red-500"
      }`}>

      <span className="text-lg">
        {message ? "" : ""}
      </span>

<span className="text-sm italic whitespace-nowrap">
        {message || errorMsg}
      </span>

    </div>

  </div>
)}
          </div>


        </div>
      </Section>

      {/* POPUP */}
      {openImage && (
        <div
          onClick={() => setOpenImage(null)}
          className="fixed inset-0 flex items-center justify-center bg-black/60"
        >
          <img src={openImage} className="max-h-[80vh]" />
        </div>
      )}

    </div>
  );
}

import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import aiProcessingVideo from "../Assets/video/AIprocessing.mp4";

export default function AiProcessing() {
  const navigate = useNavigate();
  const { completeAssessment } = useApp();
  const navigatedRef = useRef(false);

  const handleVideoEnded = useCallback(() => {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    completeAssessment();
    navigate("/financial-dashboard", { replace: true });
  }, [navigate, completeAssessment]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-sky-50 via-white to-white px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-[min(850px,85vw)]">
        {/* ─── Heading ─── */}
        <div className="text-center">
          <h1 className="text-[26px] font-extrabold text-navy-950 sm:text-[30px]">
            AI Analysis in Progress
          </h1>
          <p className="mx-auto mt-2.5 max-w-xl text-[14px] leading-relaxed text-navy-900/60 sm:text-[15px]">
            Analyzing your financial profile and preparing your personalized
            insights...
          </p>
        </div>

        {/* ─── Video container ─── */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_10px_36px_-14px_rgba(13,37,73,0.22)] sm:p-4">
          <video
            src={aiProcessingVideo}
            autoPlay
            playsInline
            muted
            onEnded={handleVideoEnded}
            className="block h-auto w-full rounded-2xl bg-navy-950"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

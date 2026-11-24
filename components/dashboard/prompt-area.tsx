"use client";

import { useLayoutEffect, useRef, useState } from "react";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M12 18.75V5.25M18.75 12 12 5.25 5.25 12" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/** Large prompt box. UI only: generation is not wired up yet. */
export default function PromptArea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Auto-grow up to a max height.
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 320)}px`;
  }, [value]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  }

  const hasValue = value.trim().length > 0 || imagePreview !== null;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full flex-col rounded-[32px] border border-gray-200/70 bg-white p-3 shadow-xl shadow-gray-900/5 transition-shadow focus-within:shadow-2xl focus-within:shadow-gray-900/10"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {imagePreview && (
        <div className="relative mb-1 w-fit px-2 pt-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- local data URL preview */}
          <img src={imagePreview} alt="첨부 이미지 미리보기" className="h-20 w-20 rounded-2xl object-cover" />
          <button
            type="button"
            onClick={() => setImagePreview(null)}
            aria-label="이미지 제거"
            className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700"
          >
            <XIcon className="h-3 w-3" />
          </button>
        </div>
      )}

      <textarea
        ref={textareaRef}
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="어떤 썸네일을 만들까요?"
        className="min-h-32 w-full resize-none border-0 bg-transparent p-4 text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none"
      />

      <div className="flex items-center justify-between px-1 pb-1">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="이미지 첨부"
          title="이미지 첨부"
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          <PlusIcon className="h-6 w-6" />
        </button>

        <button
          type="submit"
          disabled={!hasValue}
          aria-label="생성"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}

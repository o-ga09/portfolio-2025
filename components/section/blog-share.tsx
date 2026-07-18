"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { XIcon, LineIcon, FacebookIcon } from "@/components/icons/social-icons";

type BlogShareProps = {
  url: string;
  title: string;
};

export default function BlogShare({ url, title }: BlogShareProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      label: "Xでシェア",
      href: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: XIcon,
    },
    {
      label: "Facebookでシェア",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: FacebookIcon,
    },
    {
      label: "LINEでシェア",
      href: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`,
      icon: LineIcon,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードAPIが使えない環境では何もしない
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
        <Share2 className="w-4 h-4" />
        シェア
      </div>
      <div className="flex items-center gap-2">
        {shareLinks.map((link) => (
          <Button key={link.label} variant="outline" size="icon" asChild>
            <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
              <link.icon className="w-4 h-4" />
            </a>
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          type="button"
          aria-label="リンクをコピー"
          onClick={handleCopy}
        >
          {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}

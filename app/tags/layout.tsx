import { ViewTransitionProvider } from "@/components/ui/view-transition-provider";

export default function TagsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ViewTransitionProvider>{children}</ViewTransitionProvider>;
}

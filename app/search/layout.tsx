import { searchMetadata } from "@/lib/metadata";

export const metadata = searchMetadata;

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

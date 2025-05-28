"use client";

import Link from "next/link";
import { ComponentProps, FC } from "react";
import { useViewTransitionRouter } from "@/hooks/useViewTransitionRouter";

type Props = ComponentProps<typeof Link>;

export const ViewTransitionsLink: FC<Props> = ({ ...nextLinkProps }) => {
  const router = useViewTransitionRouter();

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    router.push(e.currentTarget.href.toString());
  };

  return <Link {...nextLinkProps} onClick={handleLinkClick} />;
};

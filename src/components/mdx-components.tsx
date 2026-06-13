import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

type AnchorProps = React.ComponentPropsWithoutRef<"a">;

function MdxAnchor({ href = "", children, ...props }: AnchorProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

export const mdxComponents: MDXRemoteProps["components"] = {
  a: MdxAnchor,
};

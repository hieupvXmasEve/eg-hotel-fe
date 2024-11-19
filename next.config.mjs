import createNextIntlPlugin from "next-intl/plugin";
import withMDX from "@next/mdx";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.eg-paradiseangkorvilla.com",
        port: "",
        pathname: "/upload/Images/**",
      },
      {
        protocol: "https",
        hostname: "194.233.83.149",
        port: "5001",
        pathname: "/upload/Images/**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  output: "standalone",
};

export default withNextIntl(withMDX()(nextConfig));

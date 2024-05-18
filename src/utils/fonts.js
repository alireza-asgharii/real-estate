import localFont from "next/font/local";

export const yekan = localFont({
  src: [
    {
      path: "../styles/fonts/YekanBakh-Light.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../styles/fonts/YekanBakh-Regular.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../styles/fonts/YekanBakh-Bold.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/YekanBakh-Heavy.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../styles/fonts/YekanBakh-Fat.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

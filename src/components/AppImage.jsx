import React from "react";
import Image from "next/image";

const isString = (value) => typeof value === "string";

const resolveImageSrc = (src) => {
  if (!src) return "";
  if (isString(src)) return src;
  return src?.src || "";
};

const shouldSkipOptimization = (src) => {
  if (!isString(src)) return false;

  return src.startsWith("data:") || src.endsWith(".svg") || src.includes(".svg?");
};

const AppImage = ({
  src,
  alt,
  width = 1200,
  height = 1200,
  fill = false,
  sizes = "100vw",
  unoptimized,
  className,
  ...props
}) => {
  const resolvedSrc = resolveImageSrc(src);

  if (!resolvedSrc) return null;

  return (
    <Image
      src={resolvedSrc}
      alt={alt || ""}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      unoptimized={unoptimized ?? shouldSkipOptimization(resolvedSrc)}
      className={className}
      {...props}
    />
  );
};

export default AppImage;

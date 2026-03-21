"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import AppProviders from "./AppProviders";

dayjs.extend(relativeTime);

export default function ClientRoot({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <AppProviders>{children}</AppProviders>;
}

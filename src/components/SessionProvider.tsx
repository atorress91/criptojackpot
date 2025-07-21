"use client";
import {useSessionValidator} from "@/hooks/useSessionValidator";
import React from "react";

export default function SessionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useSessionValidator();

  return <>{children}</>;
}
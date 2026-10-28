import React from "react";
import { Metadata } from "next";
import DotnetPracticalHubClient from "./DotnetPracticalHubClient";

export const metadata: Metadata = {
  title: ".NET Practical Learning Portal | Job-Oriented Enterprise C# & Cloud Training | NextSem Academy",
  description: "Comprehensive 50-day enterprise practical training system for C# 12, .NET 9, Entity Framework Core, ASP.NET Core Web APIs, Blazor, Docker, and Azure Cloud with live GitHub verification.",
  keywords: [
    "dotnet practical portal",
    "c# practical coding lab",
    "dotnet 9 practical exercises",
    "asp.net core web api tutorial",
    "entity framework core lab",
    "blazor practical challenges",
    "azure cloud dotnet training",
    "nextsem academy dotnet portal",
    "bca dotnet practicals",
    "c# enterprise bootcamp"
  ],
  alternates: {
    canonical: "https://nextsem.online/practical/dotnet"
  },
  openGraph: {
    title: ".NET Practical Learning Portal | NextSem Academy",
    description: "Hands-on, job-oriented practical coding portal for .NET 9 & C# 12 developers. C# Core ➔ EF Core ➔ Web APIs ➔ Blazor ➔ GitHub ➔ Azure Cloud.",
    url: "https://nextsem.online/practical/dotnet",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: ".NET Practical Learning Portal | 50-Day Enterprise Training",
    description: "Hands-on, job-oriented practical coding portal for .NET 9 & C# 12 developers. C# Core ➔ EF Core ➔ Web APIs ➔ Blazor ➔ GitHub ➔ Azure Cloud.",
    images: ["https://nextsem.online/og-image.png"],
    creator: "@nextsemacademy"
  }
};

export default function DotnetPracticalPage() {
  return <DotnetPracticalHubClient />;
}

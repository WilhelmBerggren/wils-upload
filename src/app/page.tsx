"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";

import { OurFileRouter } from "./api/uploadthing/core";
import { useState } from "react";

import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  const [link, setLink] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Analytics />

      <p className="text-xl p-4">Wil&apos;s Upload Thing</p>
      <span className="text-md p-4">
        Using the free tier of&nbsp;
        <a className="color-blue-400 underline" href="uploadthing.com">
          uploadthing.com
        </a>
      </span>
      <span className="text-md p-4">
        If it doesn&apos;t work, you can go and host your own.
      </span>
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
          setLink(res?.[0].fileUrl ?? "");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
          setError(error.message);
        }}
      />
      <>
        {link && (
          <>
            <a className="color-blue-400 text-center">Success! Link:</a>
            <a className="color-blue-400 text-center">{link}</a>
            <button
              className="border-2 border-blue-400 rounded-md p-2 m-2"
              onClick={() => {
                navigator.clipboard.writeText(link);
                setCopied(true);
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </>
        )}
      </>
      <span className="text-md p-4">
        {error && <span className="color-red-400 underline">{error}</span>}
      </span>
    </main>
  );
}

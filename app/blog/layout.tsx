import WebGpuBackground from "../components/WebGpuBackground";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WebGpuBackground />
      {children}
    </>
  );
}

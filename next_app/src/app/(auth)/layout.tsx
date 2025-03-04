export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-neutral-900 px-4 md:px-0">
      <div className="m-auto max-w-md rounded-xl bg-white p-8">{children}</div>
    </div>
  );
}

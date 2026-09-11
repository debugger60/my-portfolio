import { OsProvider } from "@/components/os/providers";
import { OsApp } from "@/components/os/os-app";

export default function Page() {
  return (
    <OsProvider>
      <OsApp />
    </OsProvider>
  );
}

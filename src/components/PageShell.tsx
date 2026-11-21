import { Header } from "./Header";
import { Footer, WhatsAppFloat } from "./sections/Closing";

/** Estructura común para páginas internas. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-28">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

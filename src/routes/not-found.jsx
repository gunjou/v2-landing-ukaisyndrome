import { Button, Container, Heading, Logo, Text } from "../components/ui";

export function meta() {
  return [{ title: "Halaman tidak ditemukan — Syndrome UKAI" }, { name: "robots", content: "noindex" }];
}

export default function NotFound() {
  return (
    <main>
      <Container className="flex min-h-[60svh] flex-col items-center justify-center py-20 text-center">
        <Logo title={null} className="size-14" />
        <p className="mt-6 text-sm font-semibold text-highlight">404</p>
        <Heading as="h1" size="md" className="mt-2">Halaman tidak ditemukan</Heading>
        <Text className="mt-3 max-w-md">Halaman yang Anda cari mungkin sudah dipindahkan atau alamatnya salah ketik.</Text>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to="/">Kembali ke Beranda</Button>
          <Button href="/#program" variant="secondary">Lihat Program</Button>
        </div>
      </Container>
    </main>
  );
}

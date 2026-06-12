import ClientNotFoundRedirect from "@/components/client-not-found-redirect";

export default function NotFound() {
  const target = "/";

  return <ClientNotFoundRedirect target={target} />;
}

import SourcesManager from "@/components/SourcesManager";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SourcesPage({ searchParams }: PageProps) {
  const projectId = typeof searchParams.projectId === "string" ? searchParams.projectId : undefined;
  return <SourcesManager projectId={projectId} />;
}

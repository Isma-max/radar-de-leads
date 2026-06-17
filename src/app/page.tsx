import Dashboard from "@/components/Dashboard";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function HomePage({ searchParams }: PageProps) {
  const projectId = typeof searchParams.projectId === "string" ? searchParams.projectId : undefined;
  return <Dashboard projectId={projectId} />;
}

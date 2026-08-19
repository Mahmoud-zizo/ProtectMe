import { getRequestDetail } from "../../dashboard/dashboardAction";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import Link from "next/link";
import RequestTimeline from "./_components/RequestTimeline";
import { StatusBadge } from "./_components/timelineConfig";

function PageHeader({
  requestId,
  status,
}: {
  requestId: string;
  status: string;
}) {
  return (
    <div className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-3">
        <Link
          href="/dashboard"
          className="text-slate-400 hover:text-slate-700 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
        <div>
          <h1 className="text-base font-bold text-slate-800">
            Booking Details
          </h1>
          <p className="text-xs text-slate-400 font-mono">{requestId}</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
}

export default async function RequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();
  if (!session?.user) redirect("/login");

  const request = await getRequestDetail(id);
  if (!request) notFound();

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-teal-50/30 font-sans">
      <PageHeader requestId={request.id} status={request.status} />

      <div className="max-w-2xl mx-auto px-6 py-8">
        <RequestTimeline
          requestId={request.id}
          status={request.status}
          createdAt={request.createdAt}
          slotDate={request.slot?.date}
          customerName={request.customerName}
          phoneNumber={request.phoneNumber}
          address={request.address}
          carMake={request.carMake}
          carModel={request.carModel}
          carYear={request.carYear}
          branchName={request.branch.name}
          services={request.services}
          notes={request.notes}
          quote={request.quote}
        />
      </div>
    </main>
  );
}

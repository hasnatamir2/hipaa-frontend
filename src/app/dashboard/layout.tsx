import DashboardLayout from "@/components/dashboard/layout";

export default function DashboardMainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <DashboardLayout>{children}</DashboardLayout>;
}

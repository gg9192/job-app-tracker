import { JobApplication } from "@/app/applications/page";
import {
    TableHead,
    TableHeader,
    TableRow,
    Table,
    TableBody,
    TableCell,
} from "./ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

interface ApplicationListViewProps {
    applications: JobApplication[];
    onUpdateStatus: (id: string, newStatus: JobApplication["status"]) => void;
}

const getStatusProps = (
    status: JobApplication["status"],
): { name: string; className: string } => {
    switch (status) {
        case "APPLIED":
            return { name: "Applied", className: "status-applied" };
        case "INTERVIEWING":
            return { name: "Interviewing", className: "status-interviewing" };
        case "OFFER":
            return { name: "Offer", className: "status-offer" };
        case "REJECTED":
            return { name: "Rejected", className: "status-rejected" };
        case "WITHDRAWN":
            return { name: "Withdrawn", className: "status-withdrawn" };
        default:
            return { name: "Unknown", className: "status-unknown" };
    }
};

export default function JobApplicationTable({
    applications,
    onUpdateStatus,
}: ApplicationListViewProps) {
    const allStatuses: JobApplication["status"][] = [
        "APPLIED",
        "INTERVIEWING",
        "OFFER",
        "REJECTED",
        "WITHDRAWN",
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const totalPages = Math.ceil(applications.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentApplications = applications.slice(
        indexOfFirstItem,
        indexOfLastItem,
    );

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);
    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(Number(value));
        setCurrentPage(1);
    };

    function Paginator() {
        return (
            <div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious />
                        </PaginationItem>
                        {
                            Array.from({ length: totalPages }, (_, i) => i).map(
                                (el) => (
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive>
                                            {el}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )
                        }
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        )
    }


    return (
        <div className="rounded-lg shadow-xl p-4 overflow-hidden">
            {applications.length === 0 ? (
                <p className="text-center py-10">
                    No applications found matching your criteria.
                </p>
            ) : (
                <>
                    <div className="overflow-x-auto rounded-lg border mb-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tl-lg">
                                        Job Title
                                    </TableHead>
                                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Company
                                    </TableHead>
                                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Location
                                    </TableHead>
                                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Status
                                    </TableHead>
                                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Applied Date
                                    </TableHead>
                                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Tags
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentApplications.map((app) => {
                                    const { name: statusName, className: statusClassName } =
                                        getStatusProps(app.status);
                                    return (
                                        <TableRow key={app.id}>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {app.title}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                                                {app.company}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                                                {app.location}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                                                <Select
                                                    value={app.status}
                                                    onValueChange={(value) =>
                                                        onUpdateStatus(
                                                            app.id,
                                                            value as JobApplication["status"],
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger
                                                        className={`w-[130px] p-1 text-xs font-semibold ${statusClassName} border-0`}
                                                    >
                                                        <SelectValue placeholder="Select Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {allStatuses.map((s) => (
                                                            <SelectItem key={s} value={s}>
                                                                {getStatusProps(s).name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                                                {app.dateApplied}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                                                {app.tags?.map((tag) => (
                                                    <Badge key={tag} className="mr-1">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <Paginator></Paginator>
                </>
            )}
        </div>
    );
}

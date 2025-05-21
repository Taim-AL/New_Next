"use client"
import { useParams } from "next/navigation";

export default function SpecilizationPage() {
    const params = useParams();
    const spId = params.specilizationId as string;
    return(
        <>
        <h1>
        specilization page {spId}
        </h1>
        </>
    )
}
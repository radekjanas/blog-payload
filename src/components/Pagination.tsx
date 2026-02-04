import Link from "next/link";

type Props = {
    page: number;
    totalPages: number;
    basePath: string;
};

export function Pagination({ page, totalPages, basePath }: Props) {
    return (
        <nav aria-label="Pagination">
            <ul style={{ display: "flex", gap: "1rem" }}>
                {page > 1 && (
                    <li>
                        <Link href={`${basePath}?page=${page - 1}`}>← Poprzednia</Link>
                    </li>
                )}

                <li>
                    Strona {page} z {totalPages}
                </li>

                {page < totalPages && (
                    <li>
                        <Link href={`${basePath}?page=${page + 1}`}>Następna →</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

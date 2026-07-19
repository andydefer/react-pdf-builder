import { ReactNode } from 'react';

export interface TableRowProps {
    children: ReactNode;
    className?: string;
}

export function TableRow({ children, className = '' }: TableRowProps) {
    return <tr className={className}>{children}</tr>;
}
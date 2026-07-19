import { ReactNode } from 'react';

export interface GridProps {
    children: ReactNode;
    columns?: number;
    gap?: number;
    className?: string;
}

export function Grid({
    children,
    columns = 2,
    gap = 4,
    className = '',
}: GridProps) {
    const gridClass = `grid-cols-${columns}`;
    const gapClass = `gap-${gap}`;

    return (
        <div className={`grid ${gridClass} ${gapClass} ${className}`}>
            {children}
        </div>
    );
}
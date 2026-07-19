
export interface DividerProps {
    variant?: 'solid' | 'dashed' | 'dotted';
    size?: number;
    color?: string;
    className?: string;
}

export function Divider({
    variant = 'solid',
    size = 2,
    color = 'gray-300',
    className = '',
}: DividerProps) {
    const variantClass = {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
    }[variant];

    const colorClass = `border-${color}`;

    return (
        <hr
            className={`border-${size} ${variantClass} ${colorClass} ${className}`}
        />
    );
}
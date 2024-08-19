import { formatCurrency } from "../helpers"

type BudgetDisplayProps = {
    fn: number
    text: string
}

export default function BudgetDisplay({fn, text}: BudgetDisplayProps) {
    return (
        <p className="text-white font-bold grid grid-cols-1 gap-3 text-center">
            <span className="text-6xl font-black">{formatCurrency(fn)}</span>
            {text}
        </p>
    )
}

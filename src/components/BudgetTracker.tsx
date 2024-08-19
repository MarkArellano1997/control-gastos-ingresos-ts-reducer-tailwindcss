import { useMemo } from "react"
import { Activity } from "../types"
import BudgetDisplay from "./BudgetDisplay"

type BudgetTrackerProps = {
    activities: Activity[]
}

export default function BudgetTracker({ activities }: BudgetTrackerProps) {

    const bills = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.quantity : total, 0), [activities])

    const winnings = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.quantity : total, 0), [activities])

    const difference = useMemo(() => winnings - bills, [activities])

    return (
        <>
            <h2 className="text-center text-white text-4xl font-bold">Resumen de Movimientos</h2>

            <div className="flex justify-between">

                <BudgetDisplay
                    fn={winnings}
                    text='Ingresos'
                />

                <BudgetDisplay
                    fn={bills}
                    text='Gastos'
                />

                <BudgetDisplay
                    fn={difference}
                    text='Diferencia'
                />

            </div>
        </>
    )
}

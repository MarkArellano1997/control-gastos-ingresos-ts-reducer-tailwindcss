import { Dispatch, useMemo } from "react"
import { Activity } from "../types"
import { formatCurrency } from "../helpers"
import { categories } from "../data/categories"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { XCircleIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activity-reducer"

type ActivityListProps = {
  activities: Activity[]
  dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

  const categoryName = useMemo(() =>
    (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : ''), [activities])

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

  return (
    <>
      <h2 className="text-4xl text-center font-bold">
        Gastos e Ingresos
      </h2>
      {isEmptyActivities ? <p className="text-center p-5">No hay Gastos ni Ingreso</p> :
        activities.map(activity => (
          <div
            key={activity.id}
            className="shadow px-5 py-10 mt-5 flex justify-between items-center"
          >
            <div className="space-y-2 relative">

              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 2 ? 'bg-cyan-400' : 'bg-red-400'}`}
              >
                {categoryName(+activity.category)}
              </p>

              <p
                className="pt-5 text-2xl font-bold"
              >
                {activity.name}
              </p>

              <p className="font-black text-4xl text-cyan-500">
                {formatCurrency(activity.quantity)}
              </p>

            </div>
            <div className="flex gap-5 items-center">
              <button>
                <PencilSquareIcon
                  className="h-8 w-8"
                  onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
                />
              </button>
              <button>
                <XCircleIcon
                  className="h-8 w-8 text-red-500"
                  onClick={()=>dispatch({type:'remove-activity', payload:{id: activity.id}})}
                />
              </button>
            </div>
          </div>
        ))}


    </>
  )
}

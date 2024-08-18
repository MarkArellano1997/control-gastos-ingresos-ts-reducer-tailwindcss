import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    quantity: 0
}

export default function Form({ dispatch, state }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(()=>{
        if (state.activeId) {
            const selectedActivity = state.activities.filter(activity=> activity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'quantity'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        const { name, quantity } = activity
        return name.trim() !== '' && quantity > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'add-activity', payload: { newActivity: activity } })
        setActivity({
            ...initialState,
            id: uuidv4()
        })

    }


    return (
        <form
            className="bg-white space-y-5 p-10 rounded-lg"
            onSubmit={handleSubmit}
        >

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category">Categoría</label>
                <select
                    id="category"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name">Actividad</label>
                <input
                    value={activity.name}
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="quantity">Cantidad</label>
                <input
                    value={activity.quantity}
                    id="quantity"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    onChange={handleChange}
                />
            </div>

            <input
                className="w-full uppercase bg-gray-700 p-2 text-white rounded-lg hover:bg-gray-500 font-bold disabled:opacity-10"
                type="submit"
                value={activity.category===1 ? 'Agregar Gasto': 'Agregar Ingreso'}
                disabled={!isValidActivity()}
            />

        </form>
    )
}

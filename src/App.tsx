import { useEffect, useReducer } from "react"
import ActivityList from "./components/ActivityList"
import Form from "./components/Form"
import { ActivityReducer, initialState } from "./reducers/activity-reducer"
import BudgetTracker from "./components/BudgetTracker"

function App() {

  const [state,dispatch] = useReducer(ActivityReducer, initialState)

  useEffect(()=>{
    localStorage.setItem('activity', JSON.stringify(state.activities))
  },[state.activities])

  return (
    <>
      <header className="bg-cyan-500 py-3 px-2">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold uppercase text-white">
            Control de Gastos e Ingresos
          </h1>

          <button
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          onClick={()=>dispatch({type:'restar-app'})}
          >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-cyan-600 px-5 py-10">
        <div className="max-w-4xl mx-auto">
          <Form
            state ={state}
            dispatch = {dispatch}
          />
        </div>
      </section>

      <section className="px-5 py-10 bg-gray-500">
        <div className="max-w-4xl mx-auto">
          <BudgetTracker
            activities = {state.activities}
          />
        </div>
      </section>

      <section className="px-5 py-10">
        <div className="max-w-4xl mx-auto">
          <ActivityList
            activities = {state.activities}
            dispatch = {dispatch}
          />
        </div>
      </section>
    </>
  )
}

export default App

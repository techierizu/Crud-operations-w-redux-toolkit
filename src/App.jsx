import RecordTable from "./components/RecordTable"
import { Provider } from "react-redux"
import { store } from "./store/store"

const App = () => {
  return (
    <Provider store={store}>
      <RecordTable/>
    </Provider>
  )
}

export default App 
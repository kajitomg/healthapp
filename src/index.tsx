import ReactDOM from 'react-dom/client'
import {App} from './app'
import {Provider} from "react-redux";
import {Services} from "./services";
import config from "./config.ts";
import {ServicesContext} from "./context.ts";

const services = new Services(config)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={services.redux}>
    <ServicesContext.Provider value={services}>
      <App />
    </ServicesContext.Provider>
  </Provider>
)

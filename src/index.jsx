import { createRoot } from "react-dom/client"
import Main from "./components/page-main/Main"

const rootElement = document.getElementById("root")
const root = createRoot(rootElement)

root.render(<Main/>)
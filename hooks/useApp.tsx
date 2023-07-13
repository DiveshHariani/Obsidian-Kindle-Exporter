import { AppContext } from '../ExporterModal'
import * as React from "react";

const useApp = () => {
    return React.useContext(AppContext);
}

export default useApp;
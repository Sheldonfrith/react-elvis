import { ElvisDisplayConfig } from "../helpers/types";
import { useContext, useEffect, useState } from "react";
import { ElvisContext } from "..";
import { usePrevious } from "./usePrevious";

export function useRegisterAsyncFunction<ArgsType extends any[], ReturnType>(
  identifier: string,
  f_unwrapped: (...args: ArgsType) => Promise<ReturnType>,
  config: ElvisDisplayConfig,
  registerFunction: (
    identifier: string,
    f: (...args: ArgsType) => Promise<ReturnType>,
    config: ElvisDisplayConfig
  ) => (...args: ArgsType) => Promise<ReturnType>
): ((...args: ArgsType) => Promise<ReturnType>) | undefined {
  const elvis = useContext(ElvisContext);
  const [f, setF] = useState<(...args: ArgsType) => Promise<ReturnType>>();
  const prevWrappedFunctions = usePrevious(elvis.async.wrappedFunctions);
  //call register whenever dependency changes
  useEffect(() => {
    registerFunction(identifier, f_unwrapped, config);
  }, [f_unwrapped, identifier, config]);
  // keep up to date
  useEffect(() => {
    if (elvis.async.wrappedFunctions === prevWrappedFunctions) return;
    if (elvis.async.wrappedFunctions[identifier] !== f) {
      setF(() => elvis.async.wrappedFunctions[identifier]);
    }
  }, [elvis.async.wrappedFunctions, f]);
  return f;
}

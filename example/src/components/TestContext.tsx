import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  PropsWithChildren,
} from "react";
import { customMockRequest } from "../lib/helpers/mockAsyncFunctions";
import { assert } from "../lib/helpers/myAssert";
import { customFunctionConfig } from "../lib/config/messages";
import * as elvis from "../react-elvis";

//define types here

//initialize state structure here
export const TestContext = React.createContext({
  returnType: "2" as string | undefined,
  setReturnType: (v: string) => {},
  testFunction2: (callback: (...args: any) => Promise<any>) => () => {},
});

const TestProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [returnType, setReturnType] = useState<string>("success");

  const testFunction2 = useCallback(
    (callback: (...args: any) => Promise<any>) => {
      return () => console.log("testFunction2", callback(), returnType);
    },
    [returnType]
  );
  return (
    <TestContext.Provider
      value={{
        returnType,
        setReturnType,
        testFunction2,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
export default TestProvider;

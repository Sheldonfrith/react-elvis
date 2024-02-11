import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  PropsWithChildren,
} from "react";
import { customMockRequest } from "../lib/helpers/mockAsyncFunctions";
import { assert } from "../lib/helpers/myAssert";

//define types here

//initialize state structure here
export const TestContext = React.createContext({
  returnType: "2" as string | undefined,
  setReturnType: (v: string) => {},
  timeToCompletion: "1" as string | undefined,
  setTimeToCompletion: (v: string) => {},
  testAsyncFunctionThatRequiresState_Unwrapped: async (
    controller: AbortController
  ) => {
    return "1" as unknown;
  },
});

const TestProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [returnType, setReturnType] = useState<string>("success");
  const [timeToCompletion, setTimeToCompletion] = useState<string>();
  const testAsyncFunctionThatRequiresState_Unwrapped = useCallback(
    async (controller: AbortController) => {
      assert(
        returnType !== undefined,
        "returnType must be defined for testAsyncFunctionThatRequiresState"
      );
      assert(
        timeToCompletion !== undefined,
        "timeToCompletion must be defined for testAsyncFunctionThatRequiresState"
      );
      return customMockRequest(controller, {
        timeToComplete: {
          value: timeToCompletion,
        },
        completionType: {
          value: returnType,
        },
      });
    },
    [returnType, timeToCompletion]
  );

  return (
    <TestContext.Provider
      value={{
        returnType,
        setReturnType,
        timeToCompletion,
        setTimeToCompletion,
        testAsyncFunctionThatRequiresState_Unwrapped,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
export default TestProvider;

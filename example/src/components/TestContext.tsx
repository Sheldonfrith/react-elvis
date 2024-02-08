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
  testAsyncFunctionThatRequiresState: {
    f: (
      timeToCompletion: string | undefined,
      returnType: string | undefined
    ): Promise<any> => Promise.resolve(),
    abortController: new AbortController(),
  },
  returnType: "2" as string | undefined,
  timeToCompletion: "1" as string | undefined,
  setReturnType: (v: string) => {},
  setTimeToCompletion: (v: string) => {},
});

const TestProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [returnType, setReturnType] = useState<string>("success");
  const [timeToCompletion, setTimeToCompletion] = useState<string>();

  const testAsyncFunctionThatRequiresState_Unwrapped = async (
    controller: AbortController,
    timeToCompletion: string | undefined,
    returnType: string | undefined
  ) => {
    assert(
      returnType,
      "returnType must be defined for testAsyncFunctionThatRequiresState"
    );
    assert(
      timeToCompletion,
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
  };

  const testAsyncFunctionThatRequiresState = elvis.useWrap_Abortable(
    "testAsyncFunctionThatRequiresState",
    testAsyncFunctionThatRequiresState_Unwrapped,
    customFunctionConfig
  );
  return (
    <TestContext.Provider
      value={{
        testAsyncFunctionThatRequiresState,
        returnType,
        timeToCompletion,
        setReturnType,
        setTimeToCompletion,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
export default TestProvider;

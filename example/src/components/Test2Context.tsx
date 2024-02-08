import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  PropsWithChildren,
} from "react";
import { assert } from "../lib/helpers/myAssert";
import { customMockRequest } from "../lib/helpers/mockAsyncFunctions";
import { TestContext } from "./TestContext";
import { customFunctionConfig } from "../lib/config/messages";
import * as elvis from "../react-elvis";
import { ElvisContext } from "../react-elvis/components/contexts/ElvisContext";

//initialize state structure here
export const Test2Context = React.createContext({
  timeToCompletion: "1" as string | undefined,
  setTimeToCompletion: (v: string) => {},
  testFunction2_Inner: async () => {
    return "1" as string | undefined;
  },
  testAsyncFunctionThatRequiresState_Unwrapped: async (
    controller: AbortController
  ) => {
    return "1" as unknown;
  },
});

const Test2Provider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [timeToCompletion, setTimeToCompletion] = useState<string>();
  const testFunction2_Inner = useCallback(async () => {
    return timeToCompletion;
  }, [timeToCompletion]);
  const context = useContext(TestContext);

  const testAsyncFunctionThatRequiresState_Unwrapped = useCallback(
    async (controller: AbortController) => {
      assert(
        context.returnType !== undefined,
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
          value: context.returnType,
        },
      });
    },
    [context.returnType, timeToCompletion]
  );

  //   const cc = useContext(ElvisContext);
  //   const testAsyncFunctionThatRequiresState = cc.useDELETE_ME_useWrapTest(
  //     testAsyncFunctionThatRequiresState_Unwrapped
  //   );
  //   useEffect(() => {
  //     console.log(
  //       "SHould run testasync function",
  //       context.returnType,
  //       timeToCompletion
  //     );
  //     if (!!context.returnType && !!timeToCompletion) {
  //       testAsyncFunctionThatRequiresState();
  //     }
  //   }, [context.returnType, timeToCompletion]);

  return (
    <Test2Context.Provider
      value={{
        timeToCompletion,
        setTimeToCompletion,
        testFunction2_Inner,
        testAsyncFunctionThatRequiresState_Unwrapped,
      }}
    >
      {children}
    </Test2Context.Provider>
  );
};
export default Test2Provider;

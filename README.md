# React-Elvis (Error and Loading Visualizer)

Makes it easy to show error, loading, cancelled, and success states to your user for ANY ASYNC FUNCTION (external api/http requests, database requests, internal long-running processes, etc).

## Installation

```
npm install react-elvis
```

OR

```
yarn add react-elvis
```

## Basic Usage

1. Wrap your App Component with ElvisProvider

```
import { ElvisProvider } from "react-elvis";

export default function App() {
  return (
    <ElvisProvider>
      // your app goes here
    </ElvisProvider>
  );
}
```

_`ElvisProvider` is a react context. Any component that wants to use react-elvis must be a child of this `ElvisProvider`._

2. Choose a Default Displayer Component

_We provide a ready-made, configurable default displayer using popups, if you dont want to bother with making your own._

```
import { ElvisDefault } from "react-elvis";

export default function Page(){
    return (
        <div>
            // SOME TOP-LEVEL COMPONENT
            <ElvisDefault />
        </div>
    );
}
```

3. Wrap any Async Function

```
import * as elvis from "react-elvis";

async function AnyAsyncFunction (anyArgs){
    // do anything
}

// abortController argument must come first

async function AnyCancellableAsyncFunction (abortController, anyOtherArgs){
    // do anything
}

export default function AnyComponent(){
    const MyFunctionName = elvis.useWrap("MyFunctionName", AnyAsyncFunction )

    // OR IF YOU WANT ACCESS TO THE ABORTCONTROLLER FOR CANCELLING THE ASYNC FUNCTION DO THIS ...

    const { f: MyFunctionName, abortController } = elvis.useWrap_Abortable("MyFunctionName", AnyCancellableAsyncFunction);

}
```

4. Use the Wrapped Function Normally

Thats it. When you call this function your user's will now be able to see that something is loading, they will be notified about errors, and they will also see success and cancellation states.

_Note: This only works within react components, contexts, or hooks._

## Advanced Usage:

1. Configure the ElvisProvider

**Example:**

```
import { ElvisProvider } from "react-elvis";

export default function App() {
  return (
    <ElvisProvider config={{
        graceTimeToDetectDefaultDisplayers: 10000
    }}>
      // your app goes here
    </ElvisProvider>
  );
}
```

**Details:**

```
export type ElvisConfig = {
  graceTimeToDetectDefaultDisplayers?: number; //1000
  // in milliseconds, use if your default display component might take longer than usual to render

  disableDefaultErrorDisplayerCheck?: boolean; // false
  disableDefaultLoadingDisplayerCheck?: boolean; // false
  // not recommended, React-Elvis will throw errors if it cannot find a way to display a loading or error state
};
```

2. Create Custom Display Components

#### Basic Usage (See the "example" app for details and advanced usage):

```
import * as elvis from 'react-elvis';


export function SomeReactComponent(){
....


  const { error, clearError, residualError } = elvis.useHandleErrorDisplay("MyFunctionName");
  const timeToDisplayCancelledState = 500;
  const timeToDisplaySuccessState = 500;
  const { loading, cancelled, success, abortController } = elvis.useHandleLoadingDisplay("MyFunctionName", timeToDisplayCancelledState, timeToDisplaySuccessState);

if (loading){
    return <p>{loading.title}</p>
}
if (error){
    return <p>{error.message}</p>
}
return <p>Ready</p>;

}

```

### Or, for a Default Display Component:

```
...
  const { error, clearError, residualError } = elvis.useRegisterDefaultErrorDisplay();
  const { loading, cancelled, success, abortController } =
    elvis.useRegisterDefaultLoadingDisplay(timeToDisplayCancelledState, timeToDisplaySuccessState);
...
```

###

3. Customize Displays for an Async Function

```
import * as elvis from "react-elvis";

async function AnyAsyncFunction (anyArgs){
    // do anything
}

export default function AnyComponent(){
    const MyFunctionName = elvis.useWrap("MyFunctionName", AnyAsyncFunction, {
        loading: {
            "title": "Loading MyFunctionName",
            "message": "... whatever you want to say to the user ..."
        },
        definedErrors: [
            (error)=> {
                if (isMySpecialError(error)){
                    return {
                        title: "My Special Error",
                        message: "Telling the user about MySpecialError ...",
                        canIgnore: true
                    }
                }
            }
        ]
    } )
    return (
        <button
        onClick={MyFunctionName}>
        Try MyFunctionName
        </button>
    );
}
```

##### Details:

```

export type ElvisDisplayConfig = {
  defaultError?: UserFacingError;
  loading?: UserFacingLoading;
  success?: UserFacingSuccess;
  cancelled?: UserFacingCancelled;
  definedErrors?: UserFacingErrorFilter[];
};

export type UserFacingError = {
  title: string;
  message: string;
  canIgnore: boolean;
  optionalMetadata?: Record<string, unknown>;
};
export type UserFacingLoading = {
  title: string;
  message: string;
  abortController?: AbortController;
};
export type UserFacingSuccess = {
  title: string;
  message: string;
};
export type UserFacingCancelled = {
  title: string;
  message: string;
};
export type UserFacingErrorFilter = (
  error: unknown
) => UserFacingError | undefined;
```

## TODO

- Add regression tests to allow future collaboration

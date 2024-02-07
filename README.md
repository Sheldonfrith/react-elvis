# React-Elvis (Error and Loading Visualizer)

Easiest tool for showing error, loading, cancelled, and success states to your user for **any async function**...

*... http requests, database requests, internal long-running processes, etc*

# [*See Example*](https://sheldonfrith.com/elvis)

## Installation

```Shell
npm install react-elvis
```

OR

```shell
yarn add react-elvis
```

# Basic Usage

## 1. Wrap your App (Top Level) Component with ElvisProvider

```TSX
import { ElvisProvider } from "react-elvis";

export default function App() {
  return (
    <ElvisProvider>
      // your app goes here
    </ElvisProvider>
  );
}
```

_`ElvisProvider` is a react context. Any component that wants to use react-elvis must be a child of `ElvisProvider`._

## 2. Choose a Default Displayer Component

_We provide a ready-made, configurable default displayer using popups, if you dont want to bother with making your own._

```TSX
import { ElvisDefault } from "react-elvis";

// You should choose a component that will always be rendered, application-wide, so your user can always see error and loading states
export default function SomeComponent(){
    return (
        ...
            <ElvisDefault />
        ...
    );
}
```

## 3. Wrap any Async Function

```TSX
import * as elvis from "react-elvis";

async function AnyAsyncFunction (anyArgs){
    // do anything
}

export default function AnyComponent(){
    const MyFunctionName = elvis.useWrap("MyFunctionName", AnyAsyncFunction )
    ....
}
```
**OR, If you want to make it cancellable (ie. have access to the `AbortController`):**
```TSX
import * as elvis from "react-elvis";

// abortController argument must come first
async function AnyCancellableAsyncFunction (abortController, anyOtherArgs){
    // do anything
}

export default function AnyComponent(){
    const { f: MyFunctionName, abortController } = elvis.useWrap_Abortable("MyFunctionName", AnyCancellableAsyncFunction);
    ....
}
```

## 4. Use the Wrapped Function Normally

Thats it. When you call this function your user's will now be able to see that something is loading, they will be notified about errors, and they will also see success and cancellation states.

_Note: This only works within react components, contexts, or hooks._

# Advanced Usage:

### 1. Configure the ElvisProvider

**Example:**

```TSX
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

```TSX
export type ElvisConfig = {
  graceTimeToDetectDefaultDisplayers?: number; //1000
  // in milliseconds, use if your default display component might take longer than usual to render

  disableDefaultErrorDisplayerCheck?: boolean; // false
  disableDefaultLoadingDisplayerCheck?: boolean; // false
  // not recommended, React-Elvis will throw errors if it cannot find a way to display a loading or error state
};
```

### 2. Create Custom Display Components

#### Basic Usage (See the "example" app for details and advanced usage):

```TSX
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

#### Or, for a Default Display Component:

```TSX
...
  const { error, clearError, residualError } = elvis.useRegisterDefaultErrorDisplay();
  const { loading, cancelled, success, abortController } =
    elvis.useRegisterDefaultLoadingDisplay(timeToDisplayCancelledState, timeToDisplaySuccessState);
...
```

### 3. Customize Displays for an Async Function

```TSX
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

```TSX

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

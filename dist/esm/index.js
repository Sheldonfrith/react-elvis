import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var unhandledPromiseRejectionError = {
    defaultError: {
        title: "Unhandled Promise Rejection Error",
        message: "React-Eals automatic error handling cannot properly handle 'unhandled promise rejections'. You need to ensure that every promise in your code catches all internal errors and 'rejects' with them.",
        canIgnore: false,
    },
};
var DefaultUserFacingError = {
    title: "Unidentified Error",
    message: "An unidentified error occurred. Restarting the application may resolve the issue. If the problem persists, please contact support.",
    canIgnore: false,
};
var DefaultUserFacingLoading = {
    title: "Loading",
    message: "Please wait.",
};
var DefaultUserFacingSuccess = {
    title: "Success",
    message: "The operation was successful. 👍",
};
var DefaultUserFacingCancelled = {
    title: "Cancelled",
    message: "The operation was cancelled. ❌",
};

/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed: " + condition);
    }
}

/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/
var ElvisContext = React.createContext({
    async: {
        wrappedFunctions: {},
        register: function (identifier, f, config) {
            return function () {
                return new Promise(function (resolve, reject) { });
            };
        },
        abortable: {
            register: function (identifier, f, config) {
                return function () {
                    return new Promise(function (resolve, reject) { });
                };
            },
            getAbortController: function (identifier) {
                return undefined;
            },
        },
    },
    display: {
        error: {
            handle: function (identifier) { return ({
                error: undefined,
                clearError: function () { },
                residualError: undefined,
            }); },
            default: function () { return ({
                error: undefined,
                clearError: function () { },
                residualError: undefined,
            }); },
        },
        loading: {
            handle: function (identifier, durationOfCancelledState, durationOfSuccessState) {
                return {
                    loading: undefined,
                    cancelled: undefined,
                    success: undefined,
                };
            },
            default: function (durationOfCancelledState, durationOfSuccessState) {
                return {
                    loading: undefined,
                    cancelled: undefined,
                    success: undefined,
                    abortController: undefined,
                };
            },
        },
    },
});

/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/
function useErrorDisplaySetup(identifier, registerFunction) {
    var context = useContext(ElvisContext);
    var _a = useState(), errorState = _a[0], setErrorState = _a[1];
    // this captures the current or previous error state, and is erased as soon as the same function is called again
    var _b = useState(), residualErrorState = _b[0], setResidualErrorState = _b[1];
    // will still be available after clearing the error state
    useEffect(function () {
        if (errorState) {
            setResidualErrorState(errorState);
        }
    }, [errorState]);
    useEffect(function () {
        if (!context) {
            throw new Error("ElvisContext not loaded");
        }
        registerFunction({
            id: identifier,
            onErrorDetected: function (error) {
                setErrorState(error);
            },
            onNewFunctionCall: function () {
                setResidualErrorState(undefined);
            },
        });
    }, []);
    return {
        error: errorState,
        clearError: function () { return setErrorState(undefined); },
        residualError: residualErrorState,
    };
}

/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/
function useLoadingDisplaySetup(identifier, registerFunction, durationOfCancelledState, durationOfSuccessState) {
    useContext(ElvisContext);
    var _a = useState(), loadingState = _a[0], setLoadingState = _a[1];
    var _b = useState(), abortController = _b[0], setAbortController = _b[1];
    var _c = useState(), cancelledState = _c[0], setCancelledState = _c[1];
    var _d = useState(), successState = _d[0], setSuccessState = _d[1];
    useEffect(function () {
        if (cancelledState) {
            setTimeout(function () {
                setCancelledState(undefined);
            }, durationOfCancelledState);
        }
    }, [cancelledState]);
    useEffect(function () {
        if (successState) {
            setTimeout(function () {
                setSuccessState(undefined);
            }, durationOfSuccessState);
        }
    }, [successState]);
    var onLoadingStart = useCallback(function (loading, abortController) {
        setLoadingState(loading);
        if (abortController) {
            setAbortController(abortController);
        }
    }, [setLoadingState, setAbortController]);
    var onLoadingEnd = useCallback(function (success) {
        setLoadingState(undefined);
        setSuccessState(success);
    }, [setLoadingState, setSuccessState]);
    var onLoadingCancel = useCallback(function (cancelled) {
        setLoadingState(undefined);
        setCancelledState(cancelled);
    }, [setLoadingState, setCancelledState]);
    var onErrorDetected = useCallback(function () {
        setCancelledState(undefined);
        setSuccessState(undefined);
    }, [setCancelledState, setSuccessState]);
    useEffect(function () {
        registerFunction({
            id: identifier,
            onLoadingStart: onLoadingStart,
            onLoadingEnd: onLoadingEnd,
            onLoadingCancel: onLoadingCancel,
            onErrorDetected: onErrorDetected,
        });
    }, []);
    return {
        loading: loadingState,
        cancelled: cancelledState,
        success: successState,
        abortController: abortController,
    };
}

/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/
function findErrorDisplayers_Internals(errorDisplayers, defaultErrorDisplayer, identifier, error) {
    var displayers = errorDisplayers.filter(function (d) { return d.id === identifier; });
    var displayersApplicable = displayers.filter(function (d) {
        return !d.onlyTheseErrors || d.onlyTheseErrors.some(function (f) { return f(error); });
    });
    if (displayersApplicable.length > 0) {
        return displayersApplicable;
    }
    var d = defaultErrorDisplayer;
    assert(d, "No default Error Displayer found.");
    return [d];
}

/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/
function handleErrorDetected_Internals(id, error, registeredFunctions, findErrorDisplayers, findLoadingDisplayer) {
    var f = registeredFunctions[id];
    var ds = findErrorDisplayers(id, error);
    ds.forEach(function (d) {
        var _a;
        var definedError = (_a = f === null || f === void 0 ? void 0 : f.config.definedErrors) === null || _a === void 0 ? void 0 : _a.find(function (f) { return f(error); });
        if (definedError) {
            d.onErrorDetected(definedError(error));
        }
        else {
            d.onErrorDetected((f === null || f === void 0 ? void 0 : f.config.defaultError) || DefaultUserFacingError);
        }
    });
    var ld = findLoadingDisplayer(id);
    ld.onErrorDetected();
}

function identicalAsyncFunctionRegistered(identifier, f, config, abortable, registeredFunctions) {
    var match = registeredFunctions[identifier];
    var somethingExists = !!match;
    if (!somethingExists) {
        return;
    }
    var callbackSame = match.callback === f;
    var abortableSame = match.abortable === abortable;
    var configSame = !!match.config || !!config ? match.config === config : true;
    return somethingExists && callbackSame && abortableSame && configSame;
}

/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/
var catchPromiseErrors = function (promise) {
    return promise
        .then(function (data) { return [data, undefined]; })
        .catch(function (error) {
        return Promise.resolve([undefined, error]);
    });
};

function usePrevious(value) {
    var ref = useRef();
    useEffect(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
}

function useRegisterAsyncFunction(identifier, f_unwrapped, config, registerFunction) {
    var elvis = useContext(ElvisContext);
    var _a = useState(), f = _a[0], setF = _a[1];
    var prevWrappedFunctions = usePrevious(elvis.async.wrappedFunctions);
    //call register whenever dependency changes
    useEffect(function () {
        registerFunction(identifier, f_unwrapped, config);
    }, [f_unwrapped, identifier, config]);
    // keep up to date
    useEffect(function () {
        if (elvis.async.wrappedFunctions === prevWrappedFunctions)
            return;
        if (elvis.async.wrappedFunctions[identifier] !== f) {
            setF(function () { return elvis.async.wrappedFunctions[identifier]; });
        }
    }, [elvis.async.wrappedFunctions, f]);
    return f;
}

function useRegisterAsyncFunctionAbortable(identifier, f_unwrapped, config, registerFunction) {
    var elvis = useContext(ElvisContext);
    var _a = useState(), f = _a[0], setF = _a[1];
    var prevWrappedFunctions = usePrevious(elvis.async.wrappedFunctions);
    //initial registration
    useEffect(function () {
        registerFunction(identifier, f_unwrapped, config);
    }, [f_unwrapped]);
    // keep up to date
    useEffect(function () {
        if (elvis.async.wrappedFunctions === prevWrappedFunctions)
            return;
        if (elvis.async.wrappedFunctions[identifier] !== f) {
            setF(function () { return elvis.async.wrappedFunctions[identifier]; });
        }
    }, [elvis.async.wrappedFunctions, f]);
    return f;
}

function resetableAbortController(resetAbortControllerCallback, onabort) {
    var n = new AbortController();
    n.signal.onabort = function (e) {
        var fresh = resetableAbortController(resetAbortControllerCallback, onabort);
        resetAbortControllerCallback(fresh);
        onabort(e);
    };
    return n;
}

function processAsyncFunctionExecutionRequest(executionRequest, registeredFunctions, functionWrapper) {
    return __awaiter(this, void 0, void 0, function () {
        var maxWaitTime, now, howOld, match, _a, _b, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    maxWaitTime = 2000;
                    now = Date.now();
                    howOld = now - executionRequest.calledAt;
                    if (howOld > maxWaitTime) {
                        executionRequest.reject(new Error("We were unable to execute the function in time. Function: ".concat(executionRequest.id, ". Args: ").concat(executionRequest.args, " ")));
                        return [2 /*return*/];
                    }
                    match = registeredFunctions[executionRequest.id];
                    if (!!match) return [3 /*break*/, 1];
                    executionRequest.reject(new Error("We were unable to find a registered function with the id: ".concat(executionRequest.id)));
                    return [3 /*break*/, 5];
                case 1:
                    if (!(match.versionTimestamp >= executionRequest.versionTimestamp)) return [3 /*break*/, 5];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    _b = (_a = executionRequest).resolve;
                    return [4 /*yield*/, functionWrapper(match, executionRequest.args)];
                case 3:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _c.sent();
                    executionRequest.reject(e_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function processQueue(queue, registeredFunctions, functionWrapper, setQueue) {
    return __awaiter(this, void 0, void 0, function () {
        var currentItem, remainingItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(queue.length > 0)) return [3 /*break*/, 3];
                    currentItem = queue[0], remainingItems = queue.slice(1);
                    setQueue(remainingItems);
                    // Process the rest of the queue after the current item
                    return [4 /*yield*/, processQueue(remainingItems, registeredFunctions, functionWrapper, setQueue)];
                case 1:
                    // Process the rest of the queue after the current item
                    _a.sent();
                    // Execute the current item
                    return [4 /*yield*/, processAsyncFunctionExecutionRequest(currentItem, registeredFunctions, functionWrapper)];
                case 2:
                    // Execute the current item
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}

/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/
var ElvisProvider = function (_a) {
    var elvisConfig = _a.config, children = _a.children;
    //! STATE VARIABLES //
    var _b = useState([]), loadingDisplayers = _b[0], setLoadingDisplayers = _b[1];
    var _c = useState([]), errorDisplayers = _c[0], setErrorDisplayers = _c[1];
    var _d = useState(), defaultLoadingDisplayer = _d[0], setDefaultLoadingDisplayer = _d[1];
    var _e = useState(), defaultErrorDisplayer = _e[0], setDefaultErrorDisplayer = _e[1];
    var _f = useState([]), pendingUncatchableErrors = _f[0], setPendingUncatchableErrors = _f[1];
    var _g = useState({}), registeredFunctions = _g[0], setRegisteredFunctions = _g[1];
    var _h = useState({}), abortControllers = _h[0], setAbortControllers = _h[1];
    var _j = useState({}), wrappedFunctions = _j[0], setWrappedFunctions = _j[1];
    var _k = useState([]), asyncFunctionExecutionQueue = _k[0], setAsyncFunctionExecutionQueue = _k[1];
    var _l = useState([]), abortEventsQueue = _l[0], setAbortEventsQueue = _l[1];
    //! DEBUGGING //
    useEffect(function () {
        console.log("asyncFunctionExecutionQueue", asyncFunctionExecutionQueue);
    }, [asyncFunctionExecutionQueue]);
    //!
    // ! HELPER TO SETUP ABORT CONTROLLER ON NEW REGISTER REQUEST //
    var setupAbortControllerForNewAsyncFunction = useCallback(function (id) {
        setAbortControllers(function (prev) {
            var _a;
            if (id in prev && prev[id])
                return prev;
            var c = resetableAbortController(function (fresh) {
                return setAbortControllers(function (prev) {
                    var _a;
                    return __assign(__assign({}, prev), (_a = {}, _a[id] = fresh, _a));
                });
            }, function (e) {
                setAbortEventsQueue(function (prev) {
                    return __spreadArray(__spreadArray([], prev, true), [id], false);
                });
            });
            return __assign(__assign({}, prev), (_a = {}, _a[id] = c, _a));
        });
    }, [setAbortControllers]);
    useEffect(function () {
        if (!abortEventsQueue.length)
            return;
        setAbortEventsQueue(function (prev) {
            var s = new Set(prev);
            s.forEach(function (id) {
                handleLoadingCancel(id);
            });
            return [];
        });
    }, [abortEventsQueue]);
    //! Handling function executions //
    useEffect(function () {
        if (!asyncFunctionExecutionQueue.length)
            return;
        processQueue(asyncFunctionExecutionQueue, registeredFunctions, runAsyncFunctionWithEventHandlers, setAsyncFunctionExecutionQueue);
    }, [asyncFunctionExecutionQueue, registeredFunctions]);
    //! DISPLAYER FINDERS //
    var findLoadingDisplayer = useCallback(function (id) {
        var displayer = loadingDisplayers.find(function (d) { return d.id === id; });
        var d = displayer || defaultLoadingDisplayer;
        assert(d, "No default Loading Displayer found. ".concat(id, " and ").concat(JSON.stringify(loadingDisplayers)));
        return d;
    }, [loadingDisplayers, defaultLoadingDisplayer]);
    var findErrorDisplayers = useCallback(function (id, error) {
        return findErrorDisplayers_Internals(errorDisplayers, defaultErrorDisplayer, id, error);
    }, [errorDisplayers, defaultErrorDisplayer]);
    var findAllErrorDisplayers = useCallback(function (id) {
        var displayers = errorDisplayers.filter(function (d) { return d.id === id; });
        if (displayers.length > 0) {
            return displayers;
        }
        else {
            if (defaultErrorDisplayer) {
                return [defaultErrorDisplayer];
            }
            throw new Error("No default Error Displayer found.");
        }
    }, [errorDisplayers, defaultErrorDisplayer]);
    //! EVENT HANDLERS //
    var handleLoadingStart = useCallback(function (id) {
        var _a;
        var d = findLoadingDisplayer(id);
        var f = registeredFunctions[id];
        d.onLoadingStart(((_a = f === null || f === void 0 ? void 0 : f.config) === null || _a === void 0 ? void 0 : _a.loading) || DefaultUserFacingLoading, abortControllers[id]);
        // error displayer
        var errorDisplayers = findAllErrorDisplayers(id);
        errorDisplayers.forEach(function (d) {
            d.onNewFunctionCall();
        });
    }, [findAllErrorDisplayers, findLoadingDisplayer, registeredFunctions]);
    var handleLoadingCancel = useCallback(function (id) {
        var _a;
        var d = findLoadingDisplayer(id);
        var f = registeredFunctions[id];
        d.onLoadingCancel(((_a = f === null || f === void 0 ? void 0 : f.config) === null || _a === void 0 ? void 0 : _a.cancelled) || DefaultUserFacingCancelled);
    }, [findLoadingDisplayer, registeredFunctions]);
    var handleLoadingEnd = useCallback(function (id) {
        var _a;
        var d = findLoadingDisplayer(id);
        var f = registeredFunctions[id];
        d.onLoadingEnd(((_a = f === null || f === void 0 ? void 0 : f.config) === null || _a === void 0 ? void 0 : _a.success) || DefaultUserFacingSuccess);
    }, [findLoadingDisplayer, registeredFunctions]);
    var handleErrorDetected = useCallback(function (id, error) {
        handleErrorDetected_Internals(id, error, registeredFunctions, findErrorDisplayers, findLoadingDisplayer);
    }, [findLoadingDisplayer, findErrorDisplayers, registeredFunctions]);
    //! DEFAULT DISPLAYERS CHECK //
    //wait for app to load, then check for default displayers
    useEffect(function () {
        setTimeout(function () {
            setDefaultErrorDisplayer(function (prev) {
                if (!prev && !(elvisConfig === null || elvisConfig === void 0 ? void 0 : elvisConfig.disableDefaultErrorDisplayerCheck)) {
                    throw new Error("No default error displayer found. Please register a default error displayer or disable the default displayer check using the config prop in the Eals Provider.");
                }
                return prev;
            });
            setDefaultLoadingDisplayer(function (prev) {
                if (!prev && !(elvisConfig === null || elvisConfig === void 0 ? void 0 : elvisConfig.disableDefaultLoadingDisplayerCheck)) {
                    throw new Error("No default loading displayer found. Please register a default loading displayer or disable the default displayer check using the config prop in the Eals Provider.");
                }
                return prev;
            });
        }, (elvisConfig === null || elvisConfig === void 0 ? void 0 : elvisConfig.graceTimeToDetectDefaultDisplayers) || 1000);
    }, []);
    //! UNHANDLED PROMISE REJECTION HANDLER //
    // filter for when the user's code is missing promise rejection handlers
    useEffect(function () {
        registerUnabortable("unhandledrejection", function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); }, unhandledPromiseRejectionError);
        var unhandledRejectionHandler = function (event) {
            setPendingUncatchableErrors(function (prev) {
                return __spreadArray(__spreadArray([], prev, true), [
                    {
                        query: {
                            id: "unhandledrejection",
                            versionTimestamp: -1, // does not matter is not used
                            callback: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/];
                            }); }); }, // does not matter is not used
                            config: unhandledPromiseRejectionError,
                            abortable: "not-abortable", // does not matter is not used
                        },
                        error: event.reason,
                    },
                ], false);
            });
        };
        window.addEventListener("unhandledrejection", unhandledRejectionHandler, {
            once: true,
        });
        return function () {
            window.removeEventListener("unhandledrejection", unhandledRejectionHandler);
        };
    }, []);
    // handle the uncatchable errors
    useEffect(function () {
        if (pendingUncatchableErrors.length > 0) {
            var error = pendingUncatchableErrors[0];
            handleErrorDetected(error.query.id, error.error);
            setPendingUncatchableErrors(function (prev) {
                return prev.slice(1);
            });
        }
    }, [pendingUncatchableErrors, handleErrorDetected]);
    //! WRAPPERS - CORE FUNCTIONALITY //
    var createFunctionExecutionRequestAndGetPromise = useCallback(function (id, versionTimestamp, newArgs) {
        return new Promise(function (resolve, reject) {
            setAsyncFunctionExecutionQueue(function (prev) {
                return __spreadArray(__spreadArray([], prev, true), [
                    {
                        calledAt: Date.now(),
                        id: id,
                        versionTimestamp: versionTimestamp,
                        args: newArgs,
                        resolve: resolve,
                        reject: reject,
                    },
                ], false);
            });
        });
    }, []);
    var runAsyncFunctionWithEventHandlers = useCallback(function (f, args) { return __awaiter(void 0, void 0, void 0, function () {
        var abortController, _a, result, error, _b, result, error, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 5, , 6]);
                    // Set loading to true while the request is in progress
                    handleLoadingStart(f.id);
                    if (!(f.abortable === "abortable")) return [3 /*break*/, 2];
                    abortController = abortControllers[f.id];
                    assert(abortController, "No abort controller found for id " + f.id);
                    return [4 /*yield*/, catchPromiseErrors(
                        // We handle passing in the abort controller for them, to make the final API cleaner
                        f.callback.apply(
                        // We handle passing in the abort controller for them, to make the final API cleaner
                        f, __spreadArray([abortController], args, false)))];
                case 1:
                    _a = _c.sent(), result = _a[0], error = _a[1];
                    if (error) {
                        throw error;
                    }
                    handleLoadingEnd(f.id);
                    return [2 /*return*/, result];
                case 2: return [4 /*yield*/, catchPromiseErrors(f.callback.apply(f, args))];
                case 3:
                    _b = _c.sent(), result = _b[0], error = _b[1];
                    if (error) {
                        throw error;
                    }
                    handleLoadingEnd(f.id);
                    return [2 /*return*/, result];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _c.sent();
                    handleLoadingEnd(f.id);
                    handleErrorDetected(f.id, error_1);
                    console.error("Error handled by react-elvis", error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [
        handleLoadingStart,
        handleLoadingEnd,
        handleErrorDetected,
        abortControllers,
    ]);
    //! Display Registration Helpers ///
    function registerLoadingDisplayer(c) {
        setLoadingDisplayers(function (prev) {
            return __spreadArray(__spreadArray([], prev, true), [__assign({}, c)], false);
        });
    }
    function registerDefaultLoadingDisplayer(c) {
        setDefaultLoadingDisplayer(__assign({}, c));
    }
    //! NEW FUNCTION REGISTRATION FUNCTIONS //
    var registerAbortable = useCallback(function (id, f, config) {
        var abortable = "abortable";
        setRegisteredFunctions(function (prev) {
            var _a;
            if (identicalAsyncFunctionRegistered(id, f, config, abortable, prev)) {
                return prev;
            }
            var timestamp = Date.now();
            var p = prev[id];
            var isNew = !p;
            var n = isNew
                ? {
                    id: id,
                    versionTimestamp: timestamp,
                    callback: f,
                    abortable: abortable,
                    config: config,
                }
                : __assign(__assign({}, p), { versionTimestamp: timestamp, callback: f, abortable: abortable, config: config });
            if (isNew && abortable === "abortable") {
                setupAbortControllerForNewAsyncFunction(id);
            }
            setWrappedFunctions(function (prev) {
                var _a;
                return __assign(__assign({}, prev), (_a = {}, _a[id] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, createFunctionExecutionRequestAndGetPromise(id, timestamp, args)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                }, _a));
            });
            return __assign(__assign({}, prev), (_a = {}, _a[id] = n, _a));
        });
        return wrappedFunctions[id];
    }, [registeredFunctions, abortControllers, wrappedFunctions]);
    var registerUnabortable = useCallback(function (id, f, config) {
        var abortable = "not-abortable";
        setRegisteredFunctions(function (prev) {
            var _a;
            if (identicalAsyncFunctionRegistered(id, f, config, abortable, prev)) {
                return prev;
            }
            var timestamp = Date.now();
            var p = prev[id];
            var isNew = !p;
            var n = isNew
                ? {
                    id: id,
                    versionTimestamp: timestamp,
                    callback: f,
                    abortable: abortable,
                    config: config,
                }
                : __assign(__assign({}, p), { versionTimestamp: timestamp, callback: f, abortable: abortable, config: config });
            setWrappedFunctions(function (prev) {
                var _a;
                return __assign(__assign({}, prev), (_a = {}, _a[id] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, createFunctionExecutionRequestAndGetPromise(id, timestamp, args)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                }, _a));
            });
            return __assign(__assign({}, prev), (_a = {}, _a[id] = n, _a));
        });
        return wrappedFunctions[id];
    }, [registeredFunctions, abortControllers, wrappedFunctions]);
    //! USER FACING FUNCTIONS
    var ufRegisterAbortable = useCallback(function (identifier, f_unwrapped, config) {
        return useRegisterAsyncFunctionAbortable(identifier, f_unwrapped, config, registerAbortable);
    }, [registerAbortable]);
    var ufRegisterUnabortable = useCallback(function (identifier, f_unwrapped, config) {
        return useRegisterAsyncFunction(identifier, f_unwrapped, config, registerUnabortable);
    }, [registerUnabortable]);
    var getAbortController = useCallback(function (id) {
        return abortControllers[id];
    }, [abortControllers]);
    function displayErrorDefault() {
        return useErrorDisplaySetup("", function (c) {
            return setDefaultErrorDisplayer(__assign({}, c));
        });
    }
    function displayErrorHandle(id) {
        return useErrorDisplaySetup(id, function (c) {
            setErrorDisplayers(function (prev) {
                return __spreadArray(__spreadArray([], prev, true), [__assign({}, c)], false);
            });
        });
    }
    function displayLoadingDefault(durationOfCancelledState, durationOfSuccessState) {
        return useLoadingDisplaySetup("", registerDefaultLoadingDisplayer, durationOfCancelledState, durationOfSuccessState);
    }
    function displayLoadingHandle(id, durationOfCancelledState, durationOfSuccessState) {
        return useLoadingDisplaySetup(id, registerLoadingDisplayer, durationOfCancelledState, durationOfSuccessState);
    }
    return (React.createElement(ElvisContext.Provider, { value: {
            async: {
                wrappedFunctions: wrappedFunctions,
                register: ufRegisterUnabortable,
                abortable: {
                    register: ufRegisterAbortable,
                    getAbortController: getAbortController,
                },
            },
            display: {
                error: {
                    handle: displayErrorHandle,
                    default: displayErrorDefault,
                },
                loading: {
                    handle: displayLoadingHandle,
                    default: displayLoadingDefault,
                },
            },
        } }, children));
};

/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/
function deepOverwrite(obj1) {
    var objects = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objects[_i - 1] = arguments[_i];
    }
    for (var _a = 0, objects_1 = objects; _a < objects_1.length; _a++) {
        var obj = objects_1[_a];
        for (var k in obj) {
            var vs = obj[k], vt = obj1[k];
            if (Object(vs) == vs && Object(vt) === vt) {
                obj1[k] = deepOverwrite(vt, vs);
                continue;
            }
            obj1[k] = obj[k];
        }
    }
    return obj1;
}

var CustomizableButton = function (props) {
    var _a = useState(props.style), s = _a[0], setS = _a[1];
    props.hoverStyle; props.style; props.children; var passThroughProps = __rest(props, ["hoverStyle", "style", "children"]);
    return (React.createElement("button", __assign({}, passThroughProps, { style: s, onMouseEnter: function (e) {
            setS(deepOverwrite(__assign({}, props.style), __assign({}, props.hoverStyle)));
            props.onMouseEnter ? props.onMouseEnter(e) : null;
        }, onMouseLeave: function (e) {
            setS(props.style);
            props.onMouseLeave ? props.onMouseLeave(e) : null;
        } }), props.children));
};

/**MIT License

Copyright (c) 2024 Sheldon Frith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

For more information and to contribute to this project, visit:
https://github.com/Sheldonfrith/react-elvis
*/
var LoadingSpinner = function (_a) {
    var size = _a.size, color = _a.color;
    if (!color) {
        color = "white";
    }
    return (React.createElement("span", { style: {
            fontSize: size || "1em",
            verticalAlign: "middle",
        } },
        React.createElement("style", { dangerouslySetInnerHTML: {
                __html: ".elvis-loading-spinner {\n  display: inline-block;\n  width: 2.5em;\n  height: 2.5em;\n}\n.elvis-loading-spinner:after {\n  content: \" \";\n  display: block;\n  width: 2.5em;\n  height: 2.5em;\n  margin: 0.2em;\n  border-radius: 50%;\n  border: 0.3em solid ".concat(color, ";\n  animation: elvis-loading-spinner 1.0s linear infinite;\n  border-color: ").concat(color, " transparent ").concat(color, " transparent;\n}\n@keyframes elvis-loading-spinner {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}"),
            } }),
        React.createElement("div", { className: "elvis-loading-spinner" })));
};

function useElvis() {
    return useContext(ElvisContext);
}

var defaultProps = {
    cancelledStatusDuration_ms: 500,
    successStatusDuration_ms: 500,
    colors: {
        neutral: "gray",
        good: "green",
        bad: "red",
        background: "black",
        text: "white",
        semiTransparentText: "rgba(255, 255, 255, 0.5)",
    },
    hoverColors: {
        neutral: "rgba(128, 128, 128, 0.5)",
        good: "rgba(0, 255, 0, 0.5)",
        bad: "rgba(255, 0, 0, 0.5)",
        background: "rgb(20,20,20)",
        text: "white",
        semiTransparentText: "rgba(255, 255, 255, 0.5)",
    },
    text: {
        ignore: "Ignore",
        cancel: "Cancel",
        reload: "Reload",
    },
};
var ElvisDefault = function (props) {
    var p = __assign({}, defaultProps);
    p.colors = __assign(__assign({}, p.colors), props.colors);
    p.hoverColors = __assign(__assign({}, p.hoverColors), props.colors);
    p.text = __assign(__assign({}, p.text), props.text);
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var elvis = useElvis();
    var _b = elvis.display.error.default(), error = _b.error, clearError = _b.clearError; _b.residualError;
    var _c = elvis.display.loading.default(p.cancelledStatusDuration_ms, p.successStatusDuration_ms), loading = _c.loading, cancelled = _c.cancelled, success = _c.success, abortController = _c.abortController;
    // control isOpen
    useEffect(function () {
        if (!isOpen) {
            if (error || loading || cancelled || success) {
                setIsOpen(true);
            }
        }
        if (isOpen) {
            if (!error && !loading && !cancelled && !success) {
                setIsOpen(false);
            }
        }
    }, [isOpen, error, clearError, loading, cancelled, success]);
    var getTitle = useCallback(function () {
        if (error) {
            return error.title;
        }
        if (loading) {
            return loading.title;
        }
        if (cancelled) {
            return cancelled.title;
        }
        return success === null || success === void 0 ? void 0 : success.title;
    }, [error, loading, cancelled, success]);
    var getBody = useCallback(function () {
        if (error) {
            return error.message;
        }
        if (loading) {
            return (React.createElement("div", { style: {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                } },
                React.createElement(LoadingSpinner, { size: "1em" }),
                React.createElement("div", { style: {
                        width: "10%",
                    } }),
                loading.message));
        }
        if (cancelled) {
            return cancelled.message;
        }
        return success === null || success === void 0 ? void 0 : success.message;
    }, [error, loading, cancelled, success]);
    var getActions = useCallback(function () {
        if (error) {
            return (React.createElement("div", { style: {
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                } },
                error.canIgnore ? (React.createElement(CustomizableButton, { key: "ignore", style: {
                        backgroundColor: p.colors.neutral,
                        color: p.colors.text,
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                        margin: "0.5rem",
                    }, hoverStyle: {
                        backgroundColor: p.hoverColors.neutral,
                        color: p.hoverColors.text,
                    }, onClick: function () {
                        clearError();
                    } }, p.text.ignore)) : null,
                React.createElement(CustomizableButton, { key: "reload", style: {
                        backgroundColor: p.colors.bad,
                        color: p.colors.text,
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                        margin: "0.5rem",
                    }, hoverStyle: {
                        backgroundColor: p.hoverColors.bad,
                        color: p.hoverColors.text,
                    }, onClick: function () {
                        window.location.reload();
                    } }, p.text.reload)));
        }
        else if (loading && abortController) {
            return (React.createElement("div", { style: {
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                } },
                React.createElement(CustomizableButton, { style: {
                        backgroundColor: p.colors.bad,
                        color: p.colors.text,
                        padding: "0.5rem",
                        borderRadius: "0.375rem",
                        margin: "0.5rem",
                    }, hoverStyle: {
                        backgroundColor: p.hoverColors.bad,
                        color: p.hoverColors.text,
                    }, onClick: function () {
                        abortController.abort();
                    } }, p.text.cancel)));
        }
        else ;
    }, [error, loading, cancelled, success, abortController]);
    if (!isOpen) {
        return null;
    }
    return (React.createElement("div", { style: {
            backgroundColor: p.colors.semiTransparentText,
            color: p.colors.text,
            position: "fixed",
            inset: "0px",
            display: "flex",
            alignItems: "center",
            backdropFilter: "blur(8px)",
            justifyContent: "center",
        } },
        React.createElement("div", { style: {
                backgroundColor: p.colors.background,
                padding: "2rem",
                borderRadius: "0.25rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                overflow: "auto",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "around",
                maxWidth: "48rem",
                minWidth: "50vw",
                minHeight: "25vh",
            } },
            React.createElement("div", { style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "18vh",
                    justifyContent: "space-between",
                } },
                React.createElement("h1", { style: {
                        fontSize: "2.25rem",
                        lineHeight: "2.5rem",
                        fontWeight: 700,
                        textAlign: "center",
                        marginBottom: "1rem",
                    } }, getTitle()),
                React.createElement("p", null, getBody()),
                React.createElement("div", { style: { display: "flex", flexDirection: "row", width: "100%" } }, getActions())))));
};

export { ElvisContext, ElvisDefault, ElvisProvider, useElvis };
//# sourceMappingURL=index.js.map

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
import React, { ReactNode, useCallback, useEffect, useState } from "react";

import CustomizableButton from "./CustomizableButton";
import LoadingSpinner from "./LoadingSpinner";
import { useRegisterDefaultErrorDisplay } from "../../hooks/useRegisterDefaultErrorDisplay";
import { useRegisterDefaultLoadingDisplay } from "../../hooks/useRegisterDefaultLoadingDisplay";

const defaultProps: ElvisDefaultProps = {
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

interface ElvisDefaultColors {
  neutral: string;
  good: string;
  bad: string;
  background: string;
  text: string;
  semiTransparentText: string;
}
interface ElvisDefaultFontFamily {
  title: string;
  body: string;
}
interface ElvisDefaultText {
  ignore: string;
  cancel: string;
  reload: string;
}

interface ElvisDefaultProps {
  cancelledStatusDuration_ms: number;
  successStatusDuration_ms: number;
  colors: ElvisDefaultColors;
  hoverColors: ElvisDefaultColors;
  text: ElvisDefaultText;
}

interface OptionalElvisDefaultProps {
  cancelledStatusDuration_ms?: number;
  successStatusDuration_ms?: number;
  colors?: Partial<ElvisDefaultColors>;
  fontFamily?: Partial<ElvisDefaultFontFamily>;
  text?: Partial<ElvisDefaultText>;
}

export const ElvisDefault: React.FC<OptionalElvisDefaultProps> = (props) => {
  const p: ElvisDefaultProps = { ...defaultProps };
  p.colors = { ...p.colors, ...props.colors };
  p.hoverColors = { ...p.hoverColors, ...props.colors };
  p.text = { ...p.text, ...props.text };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { error, clearError, residualError } = useRegisterDefaultErrorDisplay();
  const { loading, cancelled, success, abortController } =
    useRegisterDefaultLoadingDisplay(
      p.cancelledStatusDuration_ms,
      p.successStatusDuration_ms
    );

  // control isOpen
  useEffect(() => {
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
  const getTitle = useCallback(() => {
    if (error) {
      return error.title;
    }
    if (loading) {
      return loading.title;
    }
    if (cancelled) {
      return cancelled.title;
    }
    return success?.title;
  }, [error, loading]);
  const getBody = useCallback(() => {
    if (error) {
      return error.message;
    }
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <LoadingSpinner size="1em" />
          <div
            style={{
              width: "10%",
            }}
          ></div>
          {loading.message}
        </div>
      );
    }
    if (cancelled) {
      return cancelled.message;
    }
    return success?.message;
  }, [error, loading]);
  const getActions = useCallback(() => {
    if (error) {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {error.canIgnore ? (
            <CustomizableButton
              key="ignore"
              style={{
                backgroundColor: p.colors.neutral,
                color: p.colors.text,
                padding: "0.5rem",
                borderRadius: "0.375rem",
                margin: "0.5rem",
              }}
              hoverStyle={{
                backgroundColor: p.hoverColors.neutral,
                color: p.hoverColors.text,
              }}
              onClick={() => {
                clearError();
              }}
            >
              {p.text.ignore}
            </CustomizableButton>
          ) : null}
          <CustomizableButton
            key="reload"
            style={{
              backgroundColor: p.colors.bad,
              color: p.colors.text,
              padding: "0.5rem",
              borderRadius: "0.375rem",
              margin: "0.5rem",
            }}
            hoverStyle={{
              backgroundColor: p.hoverColors.bad,
              color: p.hoverColors.text,
            }}
            onClick={() => {
              window.location.reload();
            }}
          >
            {p.text.reload}
          </CustomizableButton>
        </div>
      );
    } else if (loading && abortController) {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <CustomizableButton
            style={{
              backgroundColor: p.colors.bad,
              color: p.colors.text,
              padding: "0.5rem",
              borderRadius: "0.375rem",
              margin: "0.5rem",
            }}
            hoverStyle={{
              backgroundColor: p.hoverColors.bad,
              color: p.hoverColors.text,
            }}
            onClick={() => {
              abortController.abort();
            }}
          >
            {p.text.cancel}
          </CustomizableButton>
        </div>
      );
    } else {
    }
  }, [error, loading, abortController]);
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: p.colors.semiTransparentText,
        color: p.colors.text,
        position: "fixed",
        inset: "0px",
        display: "flex",
        alignItems: "center",
        backdropFilter: "blur(8px)",
        justifyContent: "center",
      }}
    >
      <div
        style={{
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
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "18vh",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              fontSize: "2.25rem",
              lineHeight: "2.5rem",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {getTitle()}
          </h1>
          <p>{getBody()}</p>
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            {getActions()}
          </div>
        </div>
      </div>
    </div>
  );
};

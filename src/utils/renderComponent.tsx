import { Button, Card, CardBody, Spinner } from "@chakra-ui/react";
import { ReactNode } from "react";

type RenderComponentProps = {
  loading: {
    isLoading: boolean;
    style?: React.CSSProperties;
  };
  error: {
    isError: boolean;
    onErrorRetry: () => void;
    style?: React.CSSProperties;
  };
  component: ReactNode;
};

export const renderComponent = ({
  loading,
  error,
  component,
}: RenderComponentProps) => {
  if (loading.isLoading) {
    return (
      <div style={loading.style} className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (error.isError) {
    return (
      <div
        style={error.style}
        className="flex flex-col justify-around items-center"
      >
        Something went wrong
        <Button onClick={error.onErrorRetry}>Try Again</Button>
      </div>
    );
  }
  return component;
};

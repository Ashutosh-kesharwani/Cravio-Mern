import { TriangleAlert } from "lucide-react";
import ErrorState from "../../components/ErrorState/ErrorState";

const SomethingWentWrong = ({ resetErrorBoundary }) => (
  <ErrorState
    icon={<TriangleAlert size={90} strokeWidth={1.8} />}
    code="ERROR"
    title="Something Went Wrong"
    subtitle="An unexpected error occurred while rendering this page."
    showRetry
    onRetry={() => {
      if (resetErrorBoundary) {
        resetErrorBoundary();
      } else {
        window.location.reload();
      }
    }}
  />
);

export default SomethingWentWrong;

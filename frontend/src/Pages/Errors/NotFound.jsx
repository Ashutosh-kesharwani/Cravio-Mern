import { SearchX } from "lucide-react";
import ErrorState from "../../components/ErrorState/ErrorState";

const NotFound = () => (
  <ErrorState
    icon={<SearchX size={90} strokeWidth={1.8} />}
    code="404"
    title="Page Not Found"
    subtitle="Looks like this page has been moved, deleted, or never existed."
  />
);

export default NotFound;

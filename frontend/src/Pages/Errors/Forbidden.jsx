import { ShieldX } from "lucide-react";
import ErrorState from "../../components/ErrorState/ErrorState";

const Forbidden = () => (
  <ErrorState
    icon={<ShieldX size={90} strokeWidth={1.8} />}
    code="403"
    title="Access Denied"
    subtitle="You don't have permission to view this page."
  />
);

export default Forbidden;

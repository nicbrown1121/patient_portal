import { useRouter } from "next/router";
import Patient from "../../components/Patient";

export default function PatientPage() {
  const router = useRouter();

  const { id } = router.query;

  return <Patient id={id} />;
}

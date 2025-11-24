import { useParams } from "react-router-dom";

export default function EditExpensePage() {
  const { id } = useParams();
  return (
    <div className="page-container">
      <h1>Редактировать расход №{id}</h1>
    </div>
  );
}

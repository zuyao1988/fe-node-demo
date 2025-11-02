import type { RootState } from "../store/store.ts";
import { useSelector } from "react-redux";

export default function Header() {
  const count = useSelector((state: RootState) => state.counter.value);

  const userCountDiv = (
    <div className="pb-4">
      <p>Total Users: {count}</p>
    </div>
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        React + Node Demo (TypeScript)
      </h1>
      {count > 0 && userCountDiv}
    </>
  );
}

import { title } from "@/components/primitives";
import { TodosTable } from "@/components/todos-table";
import { fetchTodos } from "@/data/firestore";

async function fetchTodosApiCall() {
  console.log("fetchTodosApiCall called");
  // const todos = await fetchTodos();
  // return todos
  const res = await fetch(`${process.env.BASE_URL}/api/todos`, {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function TodosPage() {
  const response = await fetchTodosApiCall();
  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>TO-DO-LIST </h1>
      <TodosTable todos={response.data ?? []} />
    </div>
  );
}

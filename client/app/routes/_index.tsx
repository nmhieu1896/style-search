import { css } from "#ss/css";
import BaseCombobox from "#comps/combobox";
import { LoaderFunctionArgs, json } from "@remix-run/server-runtime";
import { useFetcher, useLoaderData } from "@remix-run/react";

let count = 1;
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  if (url.searchParams.get("inc") === "plus") count++;
  if (url.searchParams.get("inc") === "double") count = count * 2;
  //wait for randomly 1->3 second
  const scopedCount = count;
  await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 3000) + 1000));
  console.log("LOADER", scopedCount);
  return json({ count });
};
export const action = () => {
  console.log("action");
  return json({ count: count });
};

export default function Page() {
  const fetcher1 = useFetcher<typeof loader>();
  const fetcher2 = useFetcher<typeof loader>();
  console.log(fetcher1.data);
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <fetcher1.Form className="group">
      <p>Count: {fetcher1.data?.count}</p>
      <button
        name="inc"
        value="plus"
        className={css({ border: "1px solid red", p: "4", cursor: "pointer" })}
      >
        plus one
      </button>
      <button
        name="inc"
        value="double"
        className={css({ border: "1px solid red", p: "4", cursor: "pointer" })}
      >
        x10
      </button>
    </fetcher1.Form>
  );
}

let options = [
  { id: 1, name: "Aerospace" },
  { id: 2, name: "Mechanical" },
  { id: 3, name: "Civil" },
  { id: 4, name: "Biomedical" },
  { id: 5, name: "Nuclear" },
  { id: 6, name: "Industrial" },
  { id: 7, name: "Chemical" },
  { id: 8, name: "Agricultural" },
  { id: 9, name: "Electrical" },
];

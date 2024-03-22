import {
  Accessor,
  Resource,
  Setter,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import "./Counter.css";
import ky from "ky";
import { Link } from "@solidjs/meta";
import { A } from "@solidjs/router";

type TODO = { completed: boolean; title: string; id: number };
type SignalTodo = Partial<Omit<TODO, "completed">> & { completed: Accessor<boolean> };

const fetchTodoItem = async (id: number) =>
  ky.get(`https://jsonplaceholder.typicode.com/todos/${id}`).json<TODO>();

class DataFetch {
  id: Accessor<number>;
  setId: Setter<number>;
  setCompleted: Setter<boolean>;
  data: Accessor<SignalTodo>;

  constructor(initId: number) {
    let [id, setId] = createSignal(initId);
    //Similar to tanstack useQuery
    const [data] = createResource(id, fetchTodoItem);
    console.log("loading: ", data.loading);
    const [completed, setCompleted] = createSignal(data()?.completed || false);
    this.id = id;
    this.setId = setId;
    this.setCompleted = setCompleted;
    //Replace completed:boolean by completed:Accessor<boolean>
    this.data = () => ({ ...data(), completed });
    //update completed signal when data changes
    createEffect(() => {
      if (data()) setCompleted(data()?.completed || false);
    });

    onCleanup(() => {
      console.log(
        "cleaning up in case you want to define some Event handlers right in constructor"
      );
    });
  }

  toggleComplete() {
    this.setCompleted((completed) => !completed);
  }
}

export default function Counter() {
  let instance = new DataFetch(1);
  console.log("INIT COUNTER");

  createEffect(() => {
    console.log("fetched Id: ", instance.data());
  });

  return (
    <div class="counter-wrapper">
      <button type="button" class="increment" onClick={() => instance.setId(instance.id() + 1)}>
        Clicks: {instance.id()}
      </button>
      <button class="increment" onClick={() => instance.toggleComplete()}>
        <span>taskId: {instance.data().id}</span>
        <span>taskTitle: {instance.data().title?.slice(0, 10)}</span>
        <span
          classList={{
            "text-green": instance.data().completed(),
            "text-red": !instance.data().completed(),
          }}
        >
          {instance.data().completed() ? "completed" : "not completed"}
        </span>
      </button>
    </div>
  );
}

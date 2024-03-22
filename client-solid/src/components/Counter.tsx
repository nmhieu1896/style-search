import {
  Accessor,
  Resource,
  Setter,
  Suspense,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
  onMount,
  useTransition,
} from "solid-js";
import "./Counter.css";
import ky from "ky";

type TODO = { completed: boolean; title: string; id: number };
type SignalTodo = Partial<Omit<TODO, "completed">> & { completed: Accessor<boolean> };

const fetchTodoItem = async (id: number) =>
  ky.get(`https://jsonplaceholder.typicode.com/todos/${id}`).json<TODO>();

class DataFetch {
  id: Accessor<number>;
  // setId: Setter<number>;
  setId: any;
  setCompleted: Setter<boolean>;
  data: Accessor<SignalTodo>;

  constructor(initId: number, transition = true) {
    let [id, setId] = createSignal(initId);
    //Similar to tanstack useQuery
    const [data] = createResource(id, fetchTodoItem);
    const [isPending, start] = useTransition();
    const [completed, setCompleted] = createSignal(data()?.completed || false);
    this.id = id;
    this.setId = transition ? (id: number) => start(() => setId(id)) : setId;
    this.setCompleted = setCompleted;
    // Replace completed:boolean by completed:Accessor<boolean>
    // Signal can be used as a field of an object
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

export default function Counter(props: { transition?: boolean }) {
  let instance = new DataFetch(1, props.transition);

  return (
    <div class="counter-wrapper">
      <button type="button" class="increment" onClick={() => instance.setId(instance.id() + 1)}>
        Clicks {props.transition ? "with transition" : ""}: {instance.id()}
      </button>
      <Suspense fallback={<LoadingButton />}>
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
      </Suspense>
    </div>
  );
}

const LoadingButton = () => {
  return (
    <button class="increment">
      <span>taskId: ...</span>
      <span>taskTitle: ...</span>
      <span>waiting</span>
    </button>
  );
};

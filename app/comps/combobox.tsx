import { css } from "#ss/css";
import {
  Button,
  ComboBox,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  type ComboBoxProps,
} from "react-aria-components";

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

type Option = (typeof options)[number];

type Props = {} & ComboBoxProps<Option>;

export default function BaseCombobox({ ...rest }: Props) {
  return (
    <ComboBox<Option> {...rest}>
      <Label>Favorite Animal</Label>
      <div>
        <Input className={`${inputCss}`} />
        <Button>▼</Button>
      </div>
      <Popover>
        <ListBox>
          {/* {(item) => <ListBoxItem key={item.id}>{item.name}</ListBoxItem>} */}
          <ListBoxItem>Aardvark</ListBoxItem>
          <ListBoxItem>Cat</ListBoxItem>
          <ListBoxItem>Dog</ListBoxItem>
          <ListBoxItem>Kangaroo</ListBoxItem>
          <ListBoxItem>Panda</ListBoxItem>
          <ListBoxItem>Snake</ListBoxItem>
        </ListBox>
      </Popover>
    </ComboBox>
  );
}

const inputCss = css({
  border: "blueviolet 1px solid",
  px: "4",
  py: "2",
});

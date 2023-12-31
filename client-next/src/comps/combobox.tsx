import { css, cva } from "#ss/css";
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

type Option = { id: any; name: string };

type Props = { options: Option[] } & ComboBoxProps<Option>;

export default function BaseCombobox({ options, ...rest }: Props) {
  return (
    <ComboBox<Option> {...rest} menuTrigger="focus">
      <Label>Favorite Animal</Label>
      <div>
        <Input className={`${inputCss}`} />
        {/* <Button className="px_2">▼</Button> */}
      </div>
      <Popover>
        <ListBox className={listboxCss}>
          {options.map((item, idx) => (
            <ListBoxItem
              key={idx}
              id={item.id}
              className={({ isSelected, isFocusVisible }) =>
                `${listboxItemCss({ isSelected, isFocused: isFocusVisible })}`
              }
            >
              {item.name}
            </ListBoxItem>
          ))}
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

const listboxCss = css({
  border: "blue 1px solid",
  borderRadius: "4px",
  display: "grid",
  gap: "2",
  width: "var(--trigger-width)",
  px: 2,
  py: 2,
});

const listboxItemCss = cva({
  base: {
    px: 2,
    py: 2,
    cursor: "pointer",
    "&:hover, &:focus-visible": {
      bg: "#00CED1A0",
    },
  },
  variants: {
    isFocused: {
      true: {
        border: "blue 1px solid",
        bg: "#00CED1A0",
      },
    },
    isSelected: {
      true: {
        fontWeight: "bold",
        color: "blue",
      },
    },
  },
});

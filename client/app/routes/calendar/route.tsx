import { css } from "#ss/css";
import { Outlet } from "@remix-run/react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";
import { I18nProvider } from "react-aria";

const wrapperCss = css({
  display: "grid",
  gap: "2",
});

const btnCss = css({
  px: "2",
  cursor: "pointer",
});
const inputWrapperCss = css({
  border: "1px solid red",
  rounded: "md",
  px: "4",
  py: "2",
  display: "flex",
  gap: "2",
});

const inputCss = css({
  display: "flex",
  gap: "1",
});

const popupHeader = css({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  gap: "2",
  mb: "4",
  "& > h2": {
    textAlign: "center",
  },
});

const calendarGrid = css({
  border: "1px solid antiquewhite",
  p: "4",
  rounded: "lg",
  "& thead": {
    height: "40px",
  },
  "& tbody": {
    display: "grid",
    gap: "2",
  },
  "& tr": {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4",
    "& td": {
      cursor: "pointer",
      textAlign: "center",
      '& > div[data-outside-visible-range="true"]': {
        color: "gray",
      },
      '& > div[data-selected="true"]': {
        background: "antiquewhite",
      },
    },
  },
});

export default function Page() {
  return (
    <div>
      <I18nProvider locale="vi-VN">
        <DatePicker
          className={wrapperCss}
          onChange={(e) => {
            console.log(e);
          }}
        >
          <Label className="">Date</Label>
          <Group className={`${inputWrapperCss}`}>
            <DateInput className={`${inputCss}`}>
              {(segment) => {
                // console.log(segment);
                return <DateSegment segment={segment} />;
              }}
            </DateInput>
            <Button className={btnCss}>▼</Button>
          </Group>
          <Popover>
            <Dialog>
              <Calendar className={`${calendarGrid}`}>
                <header className={`${popupHeader}`}>
                  <Button slot="previous">◀</Button>
                  <Heading />
                  <Button slot="next">▶</Button>
                </header>
                <CalendarGrid>{(date) => <CalendarCell date={date} />}</CalendarGrid>
              </Calendar>
            </Dialog>
          </Popover>
        </DatePicker>
      </I18nProvider>
    </div>
  );
}

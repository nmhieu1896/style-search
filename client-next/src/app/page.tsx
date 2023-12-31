"use client";
import { css } from "#ss/css";
import BaseCombobox from "#/comps/combobox";

export default function Page() {
  return (
    <div className="group">
      <BaseCombobox options={options} />
    </div>
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

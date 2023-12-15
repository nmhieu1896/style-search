import { defineTextStyles } from "@pandacss/dev";

export const textStyles = defineTextStyles({
  body: {
    description: "The body text style - used in paragraphs",
    value: {
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "20px",
      lineHeight: "1.2",
      letterSpacing: "0",
      textDecoration: "None",
      textTransform: "None",
    },
  },
});

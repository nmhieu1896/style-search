import { defineLayerStyles } from "@pandacss/dev";

export const layerStyles = defineLayerStyles({
  container: {
    description: "container styles",
    value: {
      bg: "gray.50",
      border: "2px solid",
      borderColor: "gray.500",
    },
  },
});

export const fetchAIInsights = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary:
          "Revenue is growing steadily. Inventory needs optimization.",
        insights: [
          {
            id: 1,
            type: "success",
            message: "Revenue increased by 18%",
          },
          {
            id: 2,
            type: "warning",
            message: "Inventory low in 3 categories",
          },
          {
            id: 3,
            type: "info",
            message: "Customer growth is stable",
          },
          {
            id: 4,
            type: "danger",
            message: "High refund rate detected",
          },
        ],
      });
    }, 700);
  });
};
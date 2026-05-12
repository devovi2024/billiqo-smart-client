export const fetchTransactions = async ({ status = "all" }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const all = [
        { id: 1, customer: "John Doe", amount: 1200, status: "paid" },
        { id: 2, customer: "Sarah Khan", amount: 850, status: "failed" },
        { id: 3, customer: "Alex Smith", amount: 2100, status: "paid" },
        { id: 4, customer: "Maria Islam", amount: 500, status: "failed" },
      ];

      const filtered =
        status === "all"
          ? all
          : all.filter((t) => t.status === status);

      resolve(filtered);
    }, 700);
  });
};
// export const fetchCustomers = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         { id: 1, name: "John Doe", phone: "0123456789", spent: 1200 },
//         { id: 2, name: "Sarah Khan", phone: "0198765432", spent: 850 },
//         { id: 3, name: "Alex Smith", phone: "0171122334", spent: 2100 },
//       ]);
//     }, 700);
//   });
// };

export const fetchCustomers = async ({ search, page }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const all = [
        { id: 1, name: "John Doe", phone: "0123456789", spent: 1200 },
        { id: 2, name: "Sarah Khan", phone: "0198765432", spent: 850 },
        { id: 3, name: "Alex Smith", phone: "0171122334", spent: 2100 },
        { id: 4, name: "Maria Islam", phone: "0189988776", spent: 500 },
        { id: 5, name: "David Lee", phone: "0161122334", spent: 1750 },
      ];

      const filtered = all.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );

      const limit = 2;
      const start = (page - 1) * limit;
      const data = filtered.slice(start, start + limit);

      resolve({
        data,
        totalPages: Math.ceil(filtered.length / limit),
      });
    }, 700);
  });
};
export const fetchAIInsights = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary: "Revenue is growing steadily. Inventory needs optimization.",
        insights: [
          { id: 1, type: "success", message: "Revenue increased by 18%" },
          { id: 2, type: "warning", message: "Inventory low in 3 categories" },
          { id: 3, type: "info", message: "Customer growth is stable" },
          { id: 4, type: "danger", message: "High refund rate detected" },
        ],
      });
    }, 700);
  });
};


// Level 1: Main Function (Outer)
// export const fetchAIInsights = async () => { ... }
// API call simulate
// data return

// Level 2: Promise Function (Middle layer)
// new Promise((resolve) => { ... })
// asynchronous operation handle
// future data create 
// data ready given then promise
// Resolve means signal to send data.Resolve means the operation is successfully completed and the data is returned.
// (resolve = success + return data)


// Level 3: setTimeout Function (Inner delay engine)
//        setTimeout(() => {
 //          resolve(...)
//        }, 700);
// Simulates fake server response, sending data after 700ms.

/*
┌──────────────────────────────┐
│ 1. fetchAIInsights called    │
└──────────────┬───────────────┘
               ↓
*/

 /*
┌──────────────────────────────┐
│ 2. Promise is created        │
└──────────────┬───────────────┘
               ↓
*/

 /*
┌──────────────────────────────┐
│ 3. Wait 700ms (setTimeout)   │
└──────────────┬───────────────┘
               ↓
*/

 /*
┌──────────────────────────────┐
│ 4. resolve(data) executed    │
└──────────────┬───────────────┘
               ↓
*/

 /*
┌──────────────────────────────┐
│ 5. Data is returned          │
└──────────────────────────────┘
*/

/*
- Step 1: Function starts
- Step 2: Promise is initialized
- Step 3: Fake delay simulates server (700ms)
- Step 4: Promise resolves with data
- Step 5: Final data is returned to caller
*/
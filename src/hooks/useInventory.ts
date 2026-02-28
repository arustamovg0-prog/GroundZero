import { useState, useEffect } from "react";

export function useInventory(productId: string) {
  const [status, setStatus] = useState<
    "Available" | "Full" | "Error" | "Loading"
  >("Loading");

  useEffect(() => {
    let isMounted = true;
    const checkOdooInventory = async () => {
      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.1) reject(new Error("Odoo API Error"));
            else {
              // Simulate "Full" status for specific products randomly or based on ID
              // Let's make 'virtual' full for demonstration, others mostly available
              const isFull =
                productId === "virtual" ? true : Math.random() < 0.1;
              resolve(isFull ? "Full" : "Available");
            }
          }, 1000);
        });

        if (isMounted) {
          // For demo purposes, we'll force 'virtual' to be Full, others Available
          setStatus(productId === "virtual" ? "Full" : "Available");
        }
      } catch (err) {
        if (isMounted) setStatus("Error");
      }
    };

    checkOdooInventory();
    return () => {
      isMounted = false;
    };
  }, [productId]);

  return { status };
}

import { useState, useEffect } from "react";

export function useInventory(productId: string) {
  const [status, setStatus] = useState<
    "Available" | "Full" | "Error" | "Loading"
  >("Loading");

  useEffect(() => {
    let isMounted = true;
    const checkOdooInventory = async () => {
      try {
        const response = await fetch(`/api/inventory?product=${productId}`);
        const data = await response.json();
        
        if (isMounted) {
          if (response.ok && data.status === "FULL") {
            setStatus("Full");
          } else {
            setStatus("Available");
          }
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

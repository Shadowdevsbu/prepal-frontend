import { useState, useEffect } from "react"
import { getReceivedPreppals } from "@/lib/api/get-receivedPals"


type Preppal = {
  id: string | number;
  name: string;
};

export default function GetReceivedPreppals() {
  const [receivedPreppals, setReceivedPreppals] = useState<Preppal[]>([])

  useEffect(() => {
    const fetchReceivedPreppals = async () => {
      const data = await getReceivedPreppals()
      setReceivedPreppals(data)
    }

    fetchReceivedPreppals()
  }, [])

  return (
    <main>
      <h1>Received Preppals</h1>
      <ul>
        {receivedPreppals.map((preppal) => (
          <li key={preppal.id}>{preppal.name}</li>
        ))}
      </ul>
    </main>
  )
}
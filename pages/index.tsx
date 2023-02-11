import Home from "@/components/Home"

export default function Index() {
  // if (typeof(process.env.GCP_API_KEY) == 'undefined') {
  //   console.log('No Google Platform API key')
  // }

  return (
    <>
      <main>
        <Home/>
      </main>
    </>
  )
}
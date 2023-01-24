import Link from 'next/link'

export default function Index() {
  // if (typeof(process.env.GCP_API_KEY) == 'undefined') {
  //   console.log('No Google Platform API key')
  // }

  return (
    <>
      <main className="homePage">
        <Link href="/admin/locations">Locations</Link>
      </main>
    </>
  )
}
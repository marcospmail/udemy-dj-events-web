import Link from 'next/link'

import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'

import { API_URL } from '@/config/index'

export default function HomePage({ events }) {

  return (
    <Layout>
      <h1>Home</h1>

      {events.length === 0 &&
        <h3>No events to show</h3>
      }

      {events.map(evt => (
        <EventItem key={evt.id} event={evt} />
      ))}

      {events.length > 0 && (
        <Link href={`/events`}>
          <a className="btn-secondary">View all events</a>
        </Link>
      )}

    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  return {
    props: { events },
  }
}

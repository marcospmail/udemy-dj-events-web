import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import EventMap from '@/components/EventMap'
import Layout from '@/components/Layout'

import styles from '@/styles/Event.module.css'

import { API_URL } from '@/config/index'

export default function EventPage({ event }) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(event.date).toLocaleDateString('pt-br')} at {event.time}
        </span>

        <h1>{event.name}</h1>

        {event.image && (
          <div className={styles.image}>
            <Image src={event.image.formats.medium.url} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>

        <h3>Description:</h3>
        <p>{event.description}</p>

        <h3>Venue:</h3>
        <p>{event.address}</p>

        <EventMap event={event} />

        <Link href="/events"><a className={styles.back}>Back</a></Link>

      </div>
    </Layout>
  )
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/events`)
//   const events = await res.json()

//   const paths = events.map(v => ({
//     params: {
//       slug: v.slug
//     }
//   }))

//   return { paths, fallback: true }
// }

export async function getServerSideProps(context) {
  const slug = context.params.slug

  const res = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await res.json()

  return {
    props: {
      event: events[0]
    }
  }
}

import cookie from 'cookie'

export default function (req, res) {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: new Date(0),
        sameSite: 'strict',
        path: '/'
      })
    )

    res.status(200).json({ message: 'Success' })
    return
  }

  res.setHeader('Allow', ['POST'])
  res.status(405).json({ message: `Method ${req.method} not allowed` })
}
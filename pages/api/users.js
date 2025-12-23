// Next.js API route - Backend'e proxy görevi görür
export default async function handler(req, res) {
  const backendUrl = 'http://localhost:3000/api/users'

  try {
    if (req.method === 'GET') {
      const response = await fetch(backendUrl)
      const data = await response.json()
      
      // Backend'den gelen veriyi kontrol et ve array formatına çevir
      let usersArray = []
      if (Array.isArray(data)) {
        usersArray = data
      } else if (data && Array.isArray(data.users)) {
        usersArray = data.users
      } else if (data && Array.isArray(data.data)) {
        usersArray = data.data
      } else if (data && typeof data === 'object') {
        // Eğer tek bir object ise array'e çevir
        usersArray = [data]
      }
      
      res.status(200).json(usersArray)
    } else if (req.method === 'POST') {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body)
      })
      const data = await response.json()
      res.status(response.status).json(data)
    } else {
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Proxy Error:', error)
    res.status(500).json({ error: 'Backend API ile iletişim kurulamadı' })
  }
}


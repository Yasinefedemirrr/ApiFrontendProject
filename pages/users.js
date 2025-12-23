import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Users.module.css'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/users')
      
      if (!response.ok) {
        throw new Error('API isteği başarısız')
      }
      
      const data = await response.json()
      
      // API'den gelen verinin array olduğundan emin ol
      if (Array.isArray(data)) {
        setUsers(data)
      } else if (data && Array.isArray(data.users)) {
        // Eğer data.users şeklinde geliyorsa
        setUsers(data.users)
      } else if (data && Array.isArray(data.data)) {
        // Eğer data.data şeklinde geliyorsa
        setUsers(data.data)
      } else {
        // Array değilse boş array yap veya tek elemanı array'e çevir
        setUsers(Array.isArray(data) ? data : [])
        console.warn('API\'den array formatında veri gelmedi:', data)
      }
      
      setError(null)
    } catch (err) {
      setError('Kullanıcılar yüklenirken hata oluştu: ' + err.message)
      console.error('Hata:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>← Ana Sayfa</Link>
          <h1 className={styles.title}>Kullanıcı Listesi</h1>
          <button onClick={fetchUsers} className={styles.refreshBtn}>
            Yenile
          </button>
        </div>

        {loading && <p className={styles.loading}>Yükleniyor...</p>}
        
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <p className={styles.hint}>
              Backend API'nin çalıştığından emin olun (http://localhost:3000)
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            {!Array.isArray(users) || users.length === 0 ? (
              <p className={styles.empty}>Henüz kullanıcı bulunmuyor.</p>
            ) : (
              <div className={styles.userList}>
                {users.map((user) => (
                  <div key={user.id || user._id} className={styles.userCard}>
                    <h3>{user.name || 'İsimsiz'}</h3>
                    <p><strong>Email:</strong> {user.email || 'Email yok'}</p>
                    {user.id && <p><strong>ID:</strong> {user.id}</p>}
                    {user._id && <p><strong>ID:</strong> {user._id}</p>}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}


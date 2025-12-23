import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../styles/AddUser.module.css'

export default function AddUser() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Kullanıcı eklenirken hata oluştu')
      }

      const data = await response.json()
      setMessage('Kullanıcı başarıyla eklendi!')
      setFormData({ name: '', email: '' })
      
      // 2 saniye sonra kullanıcı listesine yönlendir
      setTimeout(() => {
        router.push('/users')
      }, 2000)
    } catch (err) {
      setError('Hata: ' + err.message)
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
          <h1 className={styles.title}>Yeni Kullanıcı Ekle</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">İsim:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Kullanıcı adı"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="ornek@email.com"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitBtn}
          >
            {loading ? 'Ekleniyor...' : 'Kullanıcı Ekle'}
          </button>
        </form>

        {message && (
          <div className={styles.success}>
            <p>{message}</p>
            <p>Kullanıcı listesine yönlendiriliyorsunuz...</p>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <p className={styles.hint}>
              Backend API'nin çalıştığından emin olun (http://localhost:3000)
            </p>
          </div>
        )}
      </main>
    </div>
  )
}


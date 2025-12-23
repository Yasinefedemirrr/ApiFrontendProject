import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Kullanıcı Yönetim Sistemi</h1>
        <p className={styles.description}>
          API entegrasyonu ile kullanıcı listeleme ve ekleme
        </p>
        <div className={styles.grid}>
          <Link href="/users" className={styles.card}>
            <h2>Kullanıcıları Listele &rarr;</h2>
            <p>API'den kullanıcıları çek ve listele</p>
          </Link>
          <Link href="/add-user" className={styles.card}>
            <h2>Kullanıcı Ekle &rarr;</h2>
            <p>Yeni kullanıcı ekle (POST isteği)</p>
          </Link>
        </div>
      </main>
    </div>
  )
}


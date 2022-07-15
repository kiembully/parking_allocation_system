import Head from "next/head";
import styles from '../styles/Layout.module.scss';

const Layout = ({ children }) => {
    return (
        <>
        <Head>
            <title>Parking Allocation System</title>
        </Head>
        <div className={styles.container}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
        </>
    );
}

export default Layout;
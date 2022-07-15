import Layout from "../components/Layout";

const App = ({Component, pageProps}) => {
    return (
        <Layout pageMeta={{}}>
          <Component {...pageProps} />
        </Layout>
    );
}

export default App;
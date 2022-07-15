import Layout from "../components/layout";

const App = ({Component, pageProps}) => {
    return (
        <Layout pageMeta={{}}>
          <Component {...pageProps} />
        </Layout>
    );
}

export default App;
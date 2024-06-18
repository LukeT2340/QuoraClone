

const Home = () => {
    const logout  = () => {
        window.open(
            `${process.env.REACT_APP_BACKEND_URL}/auth/logout`,
            "_self"
        )
    }
    return (
        <>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default Home
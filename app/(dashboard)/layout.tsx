const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <p>Navbar (dashboard)</p>
            {children}
        </div>
    )
}

export default Layout;
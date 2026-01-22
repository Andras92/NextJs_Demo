const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <p>Navbar(root)</p>
            {children}
        </div>
    )
}

export default Layout;